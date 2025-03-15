// 主要JavaScript功能

// 页面加载完成后的初始化
document.addEventListener('DOMContentLoaded', () => {
    initializeAnimations();
    setupCardInteractions();
});

// 初始化动画效果
function initializeAnimations() {
    // 监听元素进入视口
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });

    // 观察所有数学卡片
    document.querySelectorAll('.math-card').forEach(card => {
        observer.observe(card);
    });

    // 观察时间线项目
    document.querySelectorAll('.timeline-item').forEach(item => {
        observer.observe(item);
    });
}

// 设置卡片交互
function setupCardInteractions() {
    const mathCards = document.querySelectorAll('.math-card');
    
    mathCards.forEach(card => {
        // 添加鼠标进入效果
        card.addEventListener('mouseenter', (e) => {
            const header = card.querySelector('.math-card-header');
            header.style.transition = 'background-color 0.3s ease';
        });

        // 添加点击效果
        card.addEventListener('click', (e) => {
            // 这里可以添加导航到详细页面的逻辑
            const subject = card.querySelector('h3').textContent;
            console.log(`Clicked on ${subject}`);
        });
    });
}

// 平滑滚动功能
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});
