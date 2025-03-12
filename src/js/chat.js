
// 从localStorage中获取API Key，如果不存在则设为空字符串
let apiKey = localStorage.getItem('deepseekApiKey') || '';

// 获取页面上的DOM元素引用
const apiKeyInput = document.getElementById('apiKey');           // API Key输入框
const saveApiBtn = document.getElementById('saveApi');           // 保存API Key按钮
const clearApiBtn = document.getElementById('clearApi');         // 清除API Key按钮
const messagesContainer = document.getElementById('messages');   // 消息显示容器
const userInput = document.getElementById('userInput');          // 用户输入框
const sendButton = document.getElementById('sendMessage');       // 发送消息按钮

// 页面加载时，如果存在API Key则填充到输入框中
if (apiKey) {
  apiKeyInput.value = apiKey;
}

// 从localStorage加载历史聊天记录，如果不存在则初始化为空数组
const messages = JSON.parse(localStorage.getItem('chatMessages')) || [];
renderMessages();

// API Key相关事件处理
// 保存API Key到localStorage
saveApiBtn.addEventListener('click', () => {
  apiKey = apiKeyInput.value;
  localStorage.setItem('deepseekApiKey', apiKey);
  alert('API Key已保存');
});

// 清除API Key
clearApiBtn.addEventListener('click', () => {
  apiKey = '';
  apiKeyInput.value = '';
  localStorage.removeItem('deepseekApiKey');
  alert('API Key已清除');
});

// 发送消息的核心函数
function sendMessage() {
  const text = userInput.value.trim();  // 获取并清理用户输入
  if (!text) return;  // 如果输入为空则直接返回
  
  // 检查是否设置了API Key
  if (!apiKey) {
    alert('请先设置API Key');
    return;
  }

  // 将用户消息添加到消息列表
  messages.push({ role: 'user', content: text });
  
  // 添加模拟的AI响应（待实现真实API调用）
  messages.push({ role: 'ai', content: '这是一个模拟的AI响应。在实际应用中，这里应该调用Deepseek API。' });
  
  // 将更新后的消息历史保存到localStorage
  localStorage.setItem('chatMessages', JSON.stringify(messages));
  
  // 更新UI显示
  renderMessages();
  userInput.value = '';  // 清空输入框
}

// 渲染消息列表到页面
function renderMessages() {
  // 将消息数组转换为HTML字符串
  messagesContainer.innerHTML = messages.map(msg => `
    <div class="message ${msg.role === 'user' ? 'user-message' : 'ai-message'}">
      ${msg.content}
    </div>
  `).join('');
  
  // 将滚动条定位到最新消息
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// 事件监听器设置
// 点击发送按钮时发送消息
sendButton.addEventListener('click', sendMessage);

// 在输入框中按Enter键时发送消息（Shift+Enter用于换行）
userInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();  // 阻止默认的换行行为
    sendMessage();
  }
});
