
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
                        reasoningDiv.innerHTML = reasoningDiv.innerHTML.replace('<em>思考中...</em>', '') + 
                            delta.reasoning_content.replace(/\n/g, '<br>');
                        messagesContainer.scrollTop = messagesContainer.scrollHeight;
                    }
                    
                    if(delta.content) {
                        contentDiv.innerHTML += delta.content.replace(/\n/g, '<br>');
                        fullResponse += delta.content;
                        messagesContainer.scrollTop = messagesContainer.scrollHeight;
                    }
                } catch(e) {
                    console.error('解析错误:', e);
                }
            });
        }

        // 更新聊天历史
        chatHistory.push(
            { role: 'user', content: message },
            { 
                role: 'assistant', 
                content: fullResponse,
                reasoning: reasoningDiv.innerHTML
            }
        );
        
        // 保存到localStorage
        localStorage.setItem('chatHistory', JSON.stringify(chatHistory));

    } catch(error) {
        console.error('API请求错误:', error);
        const errorDiv = document.createElement('div');
        errorDiv.className = 'message system';
        errorDiv.textContent = `请求失败: ${error.message}`;
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
