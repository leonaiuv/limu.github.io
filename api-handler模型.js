const BASE_URL = 'https://api.deepseek.com/v1';

let chatHistory = JSON.parse(localStorage.getItem('chatHistory') || '[]');
let apiKey = localStorage.getItem('deepseek_api_key') || '';

// 初始化API key相关UI元素
document.addEventListener('DOMContentLoaded', () => {
    const apiKeyInput = document.getElementById('api-key-input');
    const apiKeyBtn = document.getElementById('api-key-btn');
    const apiKeyClear = document.getElementById('api-key-clear');
    const inputContainer = document.getElementById('input-container');
    
    // 如果存在已保存的API key，则自动填充并设置确认状态
    if (apiKey) {
        apiKeyInput.value = apiKey;
        apiKeyInput.classList.add('confirmed');
        apiKeyBtn.classList.add('confirmed');
        apiKeyClear.classList.add('visible');
    }

    // 添加API key按钮点击事件
    apiKeyBtn.addEventListener('click', () => {
        const newApiKey = apiKeyInput.value.trim();
        if (newApiKey) {
            apiKey = newApiKey;
            localStorage.setItem('deepseek_api_key', apiKey);
            
            // 更新UI状态
            apiKeyInput.classList.add('confirmed');
            apiKeyBtn.classList.add('confirmed');
            apiKeyClear.classList.add('visible');
        } else {
            alert('请输入有效的API Key');
        }
    });

    // 添加清除按钮点击事件
    apiKeyClear.addEventListener('click', () => {
        apiKey = '';
        localStorage.removeItem('deepseek_api_key');
        apiKeyInput.value = '';
        
        // 重置UI状态
        apiKeyInput.classList.remove('confirmed');
        apiKeyBtn.classList.remove('confirmed');
        apiKeyClear.classList.remove('visible');
        
        // 聚焦到输入框
        apiKeyInput.focus();
    });
});

// 初始化时渲染历史消息
document.addEventListener('DOMContentLoaded', () => {
  chatHistory.forEach(msg => {
    if(msg.role === 'user') {
      addMessage('user', msg.content);
    } else if(msg.role === 'assistant') {
      const element = addMessage('ai', msg.content);
      element.querySelector('.thinking').innerHTML = msg.reasoning;
      element.querySelector('.content').innerHTML = msg.content.replace(/\n/g, '<br>');
    }
  });
});

async function sendToDeepSeek(message) {
  const chatWindow = document.getElementById('chat-window');
  const inputField = document.getElementById('input');
  const sendBtn = document.getElementById('send-btn');

  // 检查API key是否存在
  if (!apiKey) {
    alert('请先输入API Key');
    document.getElementById('api-key-input').focus();
    return;
  }

  // Add user message
  addMessage('user', message);
  
  // Disable input
  inputField.disabled = true;
  sendBtn.disabled = true;
  
  try {
    // Create AI message placeholder
    const aiMessageElement = addMessage('ai', 'Thinking...');

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
          
          // 新增滚动控制函数
          function autoScroll(element) {
              if(element) {
                  element.scrollTop = element.scrollHeight;
              }
          }
          
          // 修改消息处理逻辑
          if(delta.reasoning_content) {
              const thinkingElement = aiMessageElement.querySelector('.thinking');
              thinkingElement.innerHTML += delta.reasoning_content.replace(/\n/g, '<br>');
              autoScroll(thinkingElement);  // 使用统一滚动函数
              autoScroll(chatWindow);       // 同时滚动主窗口
          }
          
          if(delta.content) {
              const contentElement = aiMessageElement.querySelector('.content');
              contentElement.innerHTML += delta.content.replace(/\n/g, '<br>');
              fullResponse += delta.content;
              // 使用延时确保DOM更新完成
              setTimeout(() => {
                  autoScroll(contentElement.closest('.message').parentElement);
                  autoScroll(chatWindow);
              }, 50);
          }
        } catch(e) {
          console.error('解析错误:', e);
        }
      });
    }

    // 更新聊天历史（带思维链）
    chatHistory.push(
      { role: 'user', content: message },
      { 
        role: 'assistant', 
        content: fullResponse,
        reasoning: aiMessageElement.querySelector('.thinking').innerHTML
      }
    );
// 实时更新存储
localStorage.setItem('chatHistory', JSON.stringify(chatHistory));

  } catch(error) {
    console.error('API请求错误:', error);
    addMessage('system', `请求失败: ${error.message}`);
  } finally {
    inputField.disabled = false;
    sendBtn.disabled = false;
    inputField.focus();
  }
}

function addMessage(role, content) {
  const chatWindow = document.getElementById('chat-window');
  const messageDiv = document.createElement('div');
  messageDiv.className = `message ${role}`;
  
  const container = document.createElement('div');
  container.className = 'text';
  
  if(role === 'ai') {
    const thinkingDiv = document.createElement('div');
    thinkingDiv.className = 'thinking';
    thinkingDiv.innerHTML = '<em>思考中...</em>';
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'content';
    
    container.appendChild(thinkingDiv);
    container.appendChild(contentDiv);
  } else {
    container.textContent = content;
  }
  
  messageDiv.appendChild(container);
  // 修改addMessage函数的滚动触发
  chatWindow.appendChild(messageDiv);
  setTimeout(() => {
      autoScroll(chatWindow);
  }, 0);
  return container;
}

// 初始化事件监听
document.getElementById('send-btn').addEventListener('click', () => {
  const input = document.getElementById('input');
  if(input.value.trim()) {
    sendToDeepSeek(input.value.trim());
    input.value = '';
    setTimeout(() => {
      autoScroll(chatWindow);
    }, 0);
  }
});

document.getElementById('input').addEventListener('keypress', (e) => {
  if(e.key === 'Enter') {
    document.getElementById('send-btn').click();
    setTimeout(() => {
      autoScroll(chatWindow);
    }, 0);
  }
});

// 新增清空事件监听
document.getElementById('clear-btn').addEventListener('click', () => {
    localStorage.removeItem('chatHistory');
    chatHistory = [];
    document.getElementById('chat-window').innerHTML = '';
});