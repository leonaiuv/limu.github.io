
// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', () => {
    // 初始化所有页面功能
    initScrollAnimations();
    initTechTags();
    initFeatureCards();
    initUseCaseCards();
});

// 初始化滚动动画
function initScrollAnimations() {
    // 注册GSAP的ScrollTrigger插件
    gsap.registerPlugin(ScrollTrigger);

    // 产品英雄区动画
    gsap.from('.product-hero-content', {
        opacity: 0,
        y: 50,
        duration: 1,
        delay: 0.5
    });

    gsap.from('.product-hero-image', {
        opacity: 0,
        x: 50,
        duration: 1,
        delay: 0.8
    });

    // 技术标签动画
    gsap.from('.tech-tag', {
        opacity: 0,
        y: 20,
        duration: 0.5,
        stagger: 0.1,
        delay: 1
    });

    // 功能特性卡片动画
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach((card, index) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            opacity: 0,
            y: 50,
            duration: 0.8,
            delay: index * 0.2
        });
    });

    // 技术细节项动画
    const techDetailItems = document.querySelectorAll('.tech-detail-item');
    techDetailItems.forEach((item, index) => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            opacity: 0,
            y: 50,
            duration: 0.8,
            delay: index * 0.2
        });
    });

    // 使用场景卡片动画
    const useCaseCards = document.querySelectorAll('.use-case-card');
    useCaseCards.forEach((card, index) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            opacity: 0,
            y: 50,
            duration: 0.8,
            delay: index * 0.2
        });
    });

    // 开始使用区域动画
    gsap.from('.get-started-content', {
        scrollTrigger: {
            trigger: '.get-started-section',
            start: 'top 80%',
            toggleActions: 'play none none none'
        },
        opacity: 0,
        y: 50,
        duration: 1
    });
}

// 初始化技术标签交互
function initTechTags() {
    const techTags = document.querySelectorAll('.tech-tag');
    
    techTags.forEach(tag => {
        tag.addEventListener('mouseenter', () => {
            // 添加悬浮效果
            gsap.to(tag, {
                scale: 1.1,
                duration: 0.3,
                ease: 'power2.out'
            });
        });

        tag.addEventListener('mouseleave', () => {
            // 移除悬浮效果
            gsap.to(tag, {
                scale: 1,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });
}

// 初始化功能特性卡片交互
function initFeatureCards() {
    const featureCards = document.querySelectorAll('.feature-card');
    
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            // 图标动画
            const icon = card.querySelector('.feature-icon svg');
            gsap.to(icon, {
                scale: 1.2,
                rotate: 360,
                duration: 0.5,
                ease: 'power2.out'
            });
        });

        card.addEventListener('mouseleave', () => {
            // 恢复图标原始状态
            const icon = card.querySelector('.feature-icon svg');
            gsap.to(icon, {
                scale: 1,
                rotate: 0,
                duration: 0.5,
                ease: 'power2.out'
            });
        });
    });
}

// 初始化使用场景卡片交互
function initUseCaseCards() {
    const useCaseCards = document.querySelectorAll('.use-case-card');
    
    useCaseCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            // 添加悬浮效果
            gsap.to(card, {
                y: -10,
                boxShadow: '0 20px 30px rgba(0, 0, 0, 0.1)',
                duration: 0.3,
                ease: 'power2.out'
            });
        });

        card.addEventListener('mouseleave', () => {
            // 移除悬浮效果
            gsap.to(card, {
                y: 0,
                boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });
}

// 页面滚动处理
window.addEventListener('scroll', () => {
    // 获取滚动位置
    const scrolled = window.scrollY;

    // 导航栏样式更新
    const nav = document.querySelector('.main-nav');
    if (scrolled > 100) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// 免费试用按钮点击事件
const tryButton = document.querySelector('.get-started-section .primary-btn');
if (tryButton) {
    tryButton.addEventListener('click', () => {
        // 添加点击动画效果
        gsap.to(tryButton, {
            scale: 0.95,
            duration: 0.1,
            yoyo: true,
            repeat: 1
        });

        // 这里可以添加试用注册逻辑
        alert('感谢您的关注！试用功能即将开放，请保持关注。');
    });
}