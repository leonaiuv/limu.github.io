// 项目页面动画效果

// 滚动动画
const animateOnScroll = function() {
  const elements = document.querySelectorAll('.feature-item, .detail-item, .case-content');
  
  elements.forEach(element => {
    const elementTop = element.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    
    if(elementTop < windowHeight * 0.8) {
      element.classList.add('animate');
    }
  });
};

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
  // 初始检查
  animateOnScroll();
  
  // 滚动时检查
  window.addEventListener('scroll', animateOnScroll);
  
  // 添加标签页切换功能
  const tabs = document.querySelectorAll('.tab');
  if (tabs.length > 0) {
    tabs.forEach(tab => {
      tab.addEventListener('click', function() {
        // 移除所有标签的活动状态
        tabs.forEach(t => t.classList.remove('active'));
        // 添加当前标签的活动状态
        this.classList.add('active');
        
        // 隐藏所有内容面板
        const panes = document.querySelectorAll('.tab-pane');
        panes.forEach(pane => pane.classList.remove('active'));
        
        // 显示当前内容面板
        const target = this.getAttribute('data-tab');
        document.getElementById(target).classList.add('active');
      });
    });
  }
  
  // 检查React组件是否正确加载
  setTimeout(function() {
    const challengesGrid = document.querySelector('.challenges-grid');
    const getStartedContent = document.querySelector('.get-started-content');
    
    if (challengesGrid && challengesGrid.children.length === 0) {
      console.warn('挑战卡片React组件未成功加载，尝试回退到HTML');
      
      // 创建回退HTML内容
      const fallbackHTML = `
        <div class="fallback-challenges">
          <div class="challenge-card">
            <h3>网页内容理解限制</h3>
            <p><strong>挑战：</strong>网页结构复杂，内容多样，难以准确抽取和理解</p>
            <p><strong>解决方案：</strong>采用多层次内容提取策略，结合语义分析和结构分析，提高内容理解准确度</p>
          </div>
          <div class="challenge-card">
            <h3>上下文窗口限制</h3>
            <p><strong>挑战：</strong>LLM的上下文窗口有限，无法处理整个长网页</p>
            <p><strong>解决方案：</strong>实现智能内容分块和重要信息提取，配合RAG系统处理长内容</p>
          </div>
          <div class="challenge-card">
            <h3>用户意图识别准确度</h3>
            <p><strong>挑战：</strong>正确识别用户意图，尤其是模糊或复杂的指令</p>
            <p><strong>解决方案：</strong>开发多轮对话确认机制，结合意图分类和提示工程优化</p>
          </div>
          <div class="challenge-card">
            <h3>安全与隐私考量</h3>
            <p><strong>挑战：</strong>确保不处理敏感信息，同时保持功能完整性</p>
            <p><strong>解决方案：</strong>实现内容过滤系统，隐私数据检测，以及安全沙箱执行环境</p>
          </div>
        </div>
      `;
      
      challengesGrid.innerHTML = fallbackHTML;
    }
    
    if (getStartedContent && getStartedContent.children.length === 0) {
      console.warn('项目结论React组件未成功加载，尝试回退到HTML');
      
      // 创建回退HTML内容
      const fallbackHTML = `
        <div class="fallback-conclusion">
          <h2>项目结论</h2>
          <p>对话式Web助手展示了AI Agent如何增强网页浏览体验，通过自然语言交互和上下文理解能力，为用户提供更加智能、流畅的网页交互方式。这个项目是我探索AI Agent与Web技术结合的重要实践。</p>
          <div class="conclusion-buttons">
            <a href="https://github.com/limu" class="primary-button" target="_blank">GitHub仓库</a>
            <a href="../index.html#projects" class="secondary-button">返回作品集</a>
          </div>
        </div>
      `;
      
      getStartedContent.innerHTML = fallbackHTML;
    }
  }, 1000);
}); 