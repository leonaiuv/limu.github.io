// 存储和获取API Key
let apiKey = localStorage.getItem('deepseekApiKey') || '';

// DOM元素
const apiKeyInput = document.getElementById('apiKey');
const saveApiBtn = document.getElementById('saveApi');
const clearApiBtn = document.getElementById('clearApi');
const messagesContainer = document.getElementById('messages');
const userInput = document.getElementById('userInput');
const sendButton = document.getElementById('sendMessage');

// 初始化
if (apiKey) {
  apiKeyInput.value = apiKey;
}

// 加载历史消息
const messages = JSON.parse(localStorage.getItem('chatMessages')) || [];
renderMessages();

// API Key 相关操作
saveApiBtn.addEventListener('click', () => {
  apiKey = apiKeyInput.value;
  localStorage.setItem('deepseekApiKey', apiKey);
  alert('API Key已保存');
});

clearApiBtn.addEventListener('click', () => {
  apiKey = '';
  apiKeyInput.value = '';
  localStorage.removeItem('deepseekApiKey');
  alert('API Key已清除');
});

// 发送消息
function sendMessage() {
  const text = userInput.value.trim();
  if (!text) return;
  
  if (!apiKey) {
    alert('请先设置API Key');
    return;
  }

  // 添加用户消息
  messages.push({ role: 'user', content: text });
  
  // 模拟AI响应
  messages.push({ role: 'ai', content: '这是一个模拟的AI响应。在实际应用中，这里应该调用Deepseek API。' });
  
  // 保存消息历史
  localStorage.setItem('chatMessages', JSON.stringify(messages));
  
  // 更新UI
  renderMessages();
  userInput.value = '';
}

// 渲染消息
function renderMessages() {
  messagesContainer.innerHTML = messages.map(msg => `
    <div class="message ${msg.role === 'user' ? 'user-message' : 'ai-message'}">
      ${msg.content}
    </div>
  `).join('');
  
  // 滚动到底部
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// 事件监听
sendButton.addEventListener('click', sendMessage);
userInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
});
