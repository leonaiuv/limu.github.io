
const BASE_URL = 'https://api.deepseek.com/v1';

let chatHistory = JSON.parse(localStorage.getItem('chatHistory') || '[]');
let apiKey = localStorage.getItem('deepseek_api_key') || '';

// 初始化API key相关UI元素
document.addEventListener('DOMContentLoaded', () => {
    const apiKeyInput = document.getElementById('apiKey');
    const apiKeyBtn = document.getElementById('saveApi');
    const apiKeyClear = document.getElementById('clearApi');
    
    // 如果存在已保存的API key，则自动填充
    if (apiKey) {
        apiKeyInput.value = apiKey;
    }

    // 添加API key按钮点击事件
    apiKeyBtn.addEventListener('click', () => {
        const newApiKey = apiKeyInput.value.trim();
        if (newApiKey) {
            apiKey = newApiKey;
            localStorage.setItem('deepseek_api_key', apiKey);
            alert('API Key已保存');
        } else {
            alert('请输入有效的API Key');
        }
    });

    // 添加清除按钮点击事件
    apiKeyClear.addEventListener('click', () => {
        apiKey = '';
        localStorage.removeItem('deepseek_api_key');
        apiKeyInput.value = '';
        apiKeyInput.focus();
    });
});

// 初始化时渲染历史消息
document.addEventListener('DOMContentLoaded', () => {
    const messagesContainer = document.getElementById('messages');
    chatHistory.forEach(msg => {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${msg.role}`;
        
        const textDiv = document.createElement('div');
        textDiv.className = 'message-text';
        
        if (msg.role === 'assistant') {
            if (msg.reasoning) {
                const reasoningDiv = document.createElement('div');
                reasoningDiv.className = 'reasoning';
                reasoningDiv.innerHTML = msg.reasoning;
                textDiv.appendChild(reasoningDiv);
            }
            textDiv.innerHTML += msg.content.replace(/\n/g, '<br>');
        } else {
            textDiv.textContent = msg.content;
        }
        
        messageDiv.appendChild(textDiv);
        messagesContainer.appendChild(messageDiv);
    });
});

async function sendToDeepSeek(message) {
    const messagesContainer = document.getElementById('messages');
    const inputField = document.getElementById('userInput');
    const sendBtn = document.getElementById('sendMessage');

    // 检查API key是否存在
    if (!apiKey) {
        alert('请先输入API Key');
        document.getElementById('apiKey').focus();
        return;
    }

    // 添加用户消息
    const userMessageDiv = document.createElement('div');
    userMessageDiv.className = 'message user';
    const userTextDiv = document.createElement('div');
    userTextDiv.className = 'message-text';
    userTextDiv.textContent = message;
    userMessageDiv.appendChild(userTextDiv);
    messagesContainer.appendChild(userMessageDiv);
    
    // 禁用输入
    inputField.disabled = true;
    sendBtn.disabled = true;
    
    try {
        // 创建AI消息占位符
        const aiMessageDiv = document.createElement('div');
        aiMessageDiv.className = 'message assistant';
        const aiTextDiv = document.createElement('div');
        aiTextDiv.className = 'message-text';
        
        const reasoningDiv = document.createElement('div');
        reasoningDiv.className = 'reasoning';
        reasoningDiv.innerHTML = '<em>思考中...</em>';
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'content';
        
        aiTextDiv.appendChild(reasoningDiv);
        aiTextDiv.appendChild(contentDiv);
        aiMessageDiv.appendChild(aiTextDiv);
        messagesContainer.appendChild(aiMessageDiv);

        const response = await fetch(`${BASE_URL}/chat/completions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: 'deepseek-reasoner',
                messages: chatHistory.concat({ role: 'user', content: message }),
                stream: true
            })
        });

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let fullResponse = '';

        while(true) {
            const { done, value } = await reader.read();
            if(done) break;

            const chunk = decoder.decode(value);
            const chunks = chunk.split('data: ');
            
            chunks.forEach(dataChunk => {
                if(!dataChunk) return;
                try {
                    const data = JSON.parse(dataChunk.trim());
                    const delta = data.choices[0].delta;
                    
                    if(delta.reasoning_content) {
                        reasoningDiv.innerHTML += delta.reasoning_content.replace(/\n/g, '<br>');
                        autoScroll(reasoningDiv);
                    }
                    
                    if(delta.content) {
                        contentDiv.innerHTML += delta.content.replace(/\n/g, '<br>');
                        fullResponse += delta.content;
                        setTimeout(() => {
                            autoScroll(contentDiv.closest('.message').parentElement);
                        }, 50);
                    }
                } catch(e) {
                    console.error('解析错误:', e);
                }
            });
        }

        // 添加自动滚动函数
        function autoScroll(element) {
          if(element) {
            element.scrollTop = element.scrollHeight;
          }
        }
        
        // 更新聊天历史后实时保存
        chatHistory.push(
          { role: 'user', content: message },
          { 
            role: 'assistant', 
            content: fullResponse,
            reasoning: reasoningDiv.innerHTML
          }
        );
        localStorage.setItem('chatHistory', JSON.stringify(chatHistory));

    } catch(error) {
        console.error('API请求错误:', error);
        const errorDiv = document.createElement('div');
        errorDiv.className = 'message error';
        errorDiv.innerHTML = `<i class="fas fa-exclamation-circle"></i> 请求失败: ${error.message}`;
        messagesContainer.appendChild(errorDiv);
    } finally {
        inputField.disabled = false;
        sendBtn.disabled = false;
        inputField.focus();
    }
}

// 初始化事件监听
document.addEventListener('DOMContentLoaded', () => {
    const sendBtn = document.getElementById('sendMessage');
    const inputField = document.getElementById('userInput');

    sendBtn.addEventListener('click', () => {
        const message = inputField.value.trim();
        if(message) {
            sendToDeepSeek(message);
            inputField.value = '';
        }
    });

    inputField.addEventListener('keypress', (e) => {
        if(e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendBtn.click();
        }
    });
});

document.getElementById('userInput').addEventListener('keypress', (e) => {
  if(e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    document.getElementById('sendMessage').click();
  }
});

// 导出聊天记录功能
function exportChatHistory() {
    // 将聊天记录转换为文本格式
    let exportText = '';
    chatHistory.forEach(msg => {
        const role = msg.role === 'user' ? '用户' : 'AI';
        exportText += `【${role}】\n`;
        if (msg.role === 'assistant' && msg.reasoning) {
            exportText += `思考过程：\n${msg.reasoning.replace(/<br>/g, '\n')}\n`;
        }
        exportText += `${msg.content}\n\n`;
    });

    // 创建Blob对象，指定UTF-8编码
    const blob = new Blob([exportText], { type: 'text/plain;charset=utf-8' });
    
    // 创建下载链接
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `聊天记录_${new Date().toLocaleString().replace(/[/:]/g, '-')}.txt`;
    
    // 触发下载
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(a.href);
}

// 添加导出按钮事件监听器
document.addEventListener('DOMContentLoaded', () => {
    const exportBtn = document.getElementById('exportChat');
    if (exportBtn) {
        exportBtn.addEventListener('click', exportChatHistory);
    }
});

// 添加清除消息的事件监听器
document.getElementById('clearMessage').addEventListener('click', () => {
  if (confirm('确定要清除所有聊天记录吗？此操作不可撤销。')) {
    // 清除本地存储
    localStorage.removeItem('chatHistory');
    chatHistory = [];
    
    // 清除消息显示区域
    const messagesContainer = document.getElementById('messages');
    messagesContainer.innerHTML = '';
  }
});
