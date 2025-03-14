// 获取div元素
const demoDiv = document.getElementById('demoDiv');

// 添加点击事件演示
demoDiv.addEventListener('click', () => {
    const paddingIndicator = '<div class="padding-indicator">padding</div>';
    demoDiv.innerHTML = `${paddingIndicator}<p>你点击了这个div容器！</p>`;
    setTimeout(() => {
        demoDiv.innerHTML = `${paddingIndicator}<p>这是一个基本的div容器</p>`;
    }, 1000);
});

// 添加键盘交互
document.addEventListener('keydown', (event) => {
    if (event.code === 'Space') {
        event.preventDefault(); // 防止页面滚动
        demoDiv.style.backgroundColor = '#ffeb3b';
        demoDiv.style.transform = 'scale(1.1)';
        setTimeout(() => {
            demoDiv.style.backgroundColor = '#ffffff';
            demoDiv.style.transform = 'translateY(0)';
        }, 300);
    }
});

// 提取通用的控制处理函数
function createControlHandler(element, property, displayElement, formatValue = (v) => v + 'px') {
    return function () {
        const value = this.value;
        element.style[property] = formatValue(value);
        displayElement.textContent = formatValue(value);
        showPropertyChange(element, property, formatValue(value));
    };
}

// 初始化控制面板
function initializeControls() {
    const demoDiv = document.getElementById('demoDiv');
    
    // 宽度控制
    const widthControl = document.getElementById('widthControl');
    const widthDisplay = widthControl.parentElement.querySelector('.value-display');
    widthControl.addEventListener('input', function() {
        demoDiv.style.width = this.value + 'px';
        widthDisplay.textContent = this.value + 'px';
    });

    // 高度控制
    const heightControl = document.getElementById('heightControl');
    const heightDisplay = heightControl.parentElement.querySelector('.value-display');
    heightControl.addEventListener('input', function() {
        demoDiv.style.height = this.value + 'px';
        heightDisplay.textContent = this.value + 'px';
    });

    // 圆角控制
    const radiusControl = document.getElementById('radiusControl');
    const radiusDisplay = radiusControl.parentElement.querySelector('.value-display');
    radiusControl.addEventListener('input', function() {
        demoDiv.style.borderRadius = this.value + 'px';
        radiusDisplay.textContent = this.value + 'px';
    });

    // 内边距控制
    const paddingControl = document.getElementById('paddingControl');
    const paddingDisplay = paddingControl.parentElement.querySelector('.value-display');
    paddingControl.addEventListener('input', function() {
        const value = this.value;
        demoDiv.style.padding = value + 'px';
        paddingDisplay.textContent = value + 'px';
        showPropertyChange(demoDiv, 'padding', value + 'px');
    });

    // 外边距控制
    const marginControl = document.getElementById('marginControl');
    const marginDisplay = marginControl.parentElement.querySelector('.value-display');
    marginControl.addEventListener('input', function() {
        const value = this.value;
        demoDiv.style.margin = value + 'px';
        marginDisplay.textContent = value + 'px';
        showPropertyChange(demoDiv, 'margin', value + 'px');
    });

    // 背景颜色控制
    const bgColorControl = document.getElementById('bgColorControl');
    const bgColorDisplay = bgColorControl.parentElement.querySelector('.value-display');
    bgColorControl.addEventListener('input', function() {
        demoDiv.style.backgroundColor = this.value;
        bgColorDisplay.textContent = this.value;
    });

    // 边框颜色控制
    const borderColorControl = document.getElementById('borderColorControl');
    const borderColorDisplay = borderColorControl.parentElement.querySelector('.value-display');
    borderColorControl.addEventListener('input', function() {
        demoDiv.style.borderColor = this.value;
        borderColorDisplay.textContent = this.value;
    });
}

// 显示属性变化提示
function showPropertyChange(element, propertyName, value) {
    const tooltip = document.createElement('div');
    tooltip.className = 'property-change';
    tooltip.textContent = `${propertyName}: ${value}`;
    
    const rect = element.getBoundingClientRect();
    tooltip.style.left = `${rect.right + 10}px`;
    tooltip.style.top = `${rect.top}px`;
    
    document.body.appendChild(tooltip);
    setTimeout(() => tooltip.style.opacity = '1', 10);
    setTimeout(() => {
        tooltip.style.opacity = '0';
        setTimeout(() => tooltip.remove(), 300);
    }, 1500);
}

// 代码复制功能
document.querySelector('.copy-btn').addEventListener('click', function() {
    const code = this.nextElementSibling.textContent;
    navigator.clipboard.writeText(code).then(() => {
        const originalText = this.textContent;
        this.textContent = '已复制！';
        this.style.backgroundColor = '#28a745';
        setTimeout(() => {
            this.textContent = originalText;
            this.style.backgroundColor = '#007bff';
        }, 2000);
    });
});

// 页面加载完成后初始化
window.addEventListener('load', () => {
    // 初始化控制面板
    initializeControls();

    // 显示欢迎提示
    const tooltip = document.createElement('div');
    tooltip.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(0,0,0,0.8);
        color: white;
        padding: 10px 20px;
        border-radius: 20px;
        font-size: 14px;
        opacity: 0;
        transition: opacity 0.3s;
    `;
    tooltip.textContent = '按空格键查看特效！';
    document.body.appendChild(tooltip);

    // 显示提示
    setTimeout(() => {
        tooltip.style.opacity = '1';
        setTimeout(() => {
            tooltip.style.opacity = '0';
            setTimeout(() => tooltip.remove(), 300);
        }, 3000);
    }, 1000);
});
