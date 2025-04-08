/**
 * Notion风格动态背景
 * 创建移动的渐变圆点效果
 */
document.addEventListener('DOMContentLoaded', function() {
    // 查找或创建背景容器
    let bgContainer = document.querySelector('.notion-bg');
    
    // 如果页面中没有找到背景容器，则创建一个
    if (!bgContainer) {
        console.log('未找到背景容器，正在创建新容器');
        bgContainer = document.createElement('div');
        bgContainer.className = 'notion-bg';
        document.body.insertBefore(bgContainer, document.body.firstChild);
    } else {
        console.log('找到现有背景容器');
    }
    
    console.log('Notion背景已初始化'); 
    
    // 清空现有内容
    bgContainer.innerHTML = '';
    
    // 创建背景圆点
    const dotsCount = 15; // 增加圆点数量
    
    for (let i = 0; i < dotsCount; i++) {
        createDot(bgContainer);
    }
    
    // 添加测试圆点，便于调试
    addTestDot(bgContainer);
});

/**
 * 创建一个动态移动的背景圆点
 * @param {HTMLElement} container - 背景容器元素
 */
function createDot(container) {
    // 创建圆点元素
    const dot = document.createElement('div');
    dot.className = 'notion-bg-dot';
    
    // 随机大小 (40-120px) - 增大圆点尺寸
    const size = Math.floor(Math.random() * 80) + 40;
    dot.style.width = `${size}px`;
    dot.style.height = `${size}px`;
    
    // 随机起始位置
    const x = Math.floor(Math.random() * 100);
    const y = Math.floor(Math.random() * 100);
    dot.style.left = `${x}%`;
    dot.style.top = `${y}%`;
    
    // 随机透明度 (0.05-0.12) - 增加透明度
    const opacity = (Math.random() * 0.07 + 0.05).toFixed(2);
    dot.style.opacity = opacity;
    
    // 随机颜色（偏蓝色、紫色、粉色）
    const hue = Math.floor(Math.random() * 60) + 200; // 200-260 范围是蓝紫色
    const saturation = Math.floor(Math.random() * 30) + 70; // 70-100%
    const lightness = Math.floor(Math.random() * 20) + 70; // 70-90%
    dot.style.backgroundColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    
    // 随机动画时长 (20-40s)
    const duration = Math.floor(Math.random() * 20) + 20;
    dot.style.animationDuration = `${duration}s`;
    
    // 随机动画延迟
    const delay = Math.floor(Math.random() * 10);
    dot.style.animationDelay = `-${delay}s`;
    
    // 添加到容器
    container.appendChild(dot);
    
    console.log(`添加背景圆点: 大小=${size}px, 位置=(${x}%, ${y}%), 不透明度=${opacity}`);
}

/**
 * 添加一个固定的测试圆点便于调试
 * @param {HTMLElement} container - 背景容器元素
 */
function addTestDot(container) {
    const testDot = document.createElement('div');
    testDot.className = 'notion-bg-dot';
    testDot.style.width = '100px';
    testDot.style.height = '100px';
    testDot.style.left = '50%';
    testDot.style.top = '50%';
    testDot.style.backgroundColor = 'blue';
    testDot.style.opacity = '0.2';
    testDot.style.filter = 'blur(20px)';
    container.appendChild(testDot);
    console.log('添加测试圆点到中心位置');
} 