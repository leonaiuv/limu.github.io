// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', () => {
    // 初始化所有页面功能
    initScrollAnimations();
    initTechTags();
    initFeatureCards();
    initUseCaseCards();
    initWebSpecificEffects();
    createParticleBackground();
    initTiltEffect();
    create3DHoverEffects();
    handleScrollAnimations();
    createCodeSnippets();
});

// 初始化Web页面特定效果
function initWebSpecificEffects() {
    // 检查GSAP是否可用
    if (typeof gsap !== 'undefined') {
        // 产品英雄区动画
        gsap.from('.product-hero-content h1', {
            y: 30,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        });
        
        gsap.from('.product-subtitle', {
            y: 20,
            opacity: 0,
            duration: 1,
            delay: 0.2,
            ease: 'power3.out'
        });
        
        gsap.from('.product-hero-content p:not(.product-subtitle)', {
            y: 20,
            opacity: 0,
            duration: 1,
            delay: 0.3,
            ease: 'power3.out'
        });
        
        gsap.from('.actions', {
            y: 20,
            opacity: 0,
            duration: 1,
            delay: 0.4,
            ease: 'power3.out'
        });
        
        gsap.from('.tech-tag', {
            y: 20,
            opacity: 0,
            duration: 0.8,
            delay: 0.5,
            stagger: 0.1,
            ease: 'power3.out'
        });
        
        gsap.from('.product-hero-image', {
            x: 50,
            opacity: 0,
            duration: 1.2,
            delay: 0.3,
            ease: 'power3.out'
        });

        // 添加滚动触发动画
        if (typeof ScrollTrigger !== 'undefined') {
            // 功能卡片动画
            gsap.utils.toArray('.feature-card').forEach((card, i) => {
                gsap.from(card, {
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 85%',
                        toggleActions: 'play none none none'
                    },
                    y: 50,
                    opacity: 0,
                    duration: 0.8,
                    delay: i * 0.1,
                    ease: 'power3.out'
                });
            });

            // 技术详情动画
            gsap.utils.toArray('.tech-detail-item').forEach((item, i) => {
                gsap.from(item, {
                    scrollTrigger: {
                        trigger: item,
                        start: 'top 85%',
                        toggleActions: 'play none none none'
                    },
                    y: 30,
                    opacity: 0,
                    duration: 0.8,
                    delay: i * 0.1,
                    ease: 'power3.out'
                });
            });

            // 使用场景卡片动画
            gsap.utils.toArray('.use-case-card').forEach((card, i) => {
                gsap.from(card, {
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 85%',
                        toggleActions: 'play none none none'
                    },
                    y: 40,
                    opacity: 0,
                    duration: 0.8,
                    delay: i * 0.1,
                    ease: 'power3.out'
                });
            });

            // 开始使用区域动画
            gsap.from('.get-started-content', {
                scrollTrigger: {
                    trigger: '.get-started-section',
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                },
                y: 40,
                opacity: 0,
                duration: 1,
                ease: 'power3.out'
            });
        }
    }

    // 确保所有内容在动画失败时也是可见的
    setTimeout(() => {
        document.querySelectorAll('.product-hero-content h1, .product-subtitle, .product-hero-content p, .actions, .tech-tag, .product-hero-image, .feature-card, .tech-detail-item, .use-case-card, .get-started-content')
        .forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'none';
        });
    }, 1000);
}

// 创建随机代码片段
function createCodeSnippets() {
    // 代码片段列表
    const snippets = [
        "const app = createApp(Main);",
        "function useTheme() { ... }",
        "export default class WebComponent {...}",
        "<div className='container'>...</div>",
        "npm install @deepsynth/web",
        "import { useState, useEffect } from 'react';",
        "const data = await fetchAPI('/endpoint');",
        "gsap.to(element, { opacity: 1 });",
        "@media (max-width: 768px) {...}",
        ".then(res => res.json())"
    ];
    
    // 创建随机定位的代码片段
    const container = document.querySelector('.page-container');
    
    if (!container) return;
    
    const snippetCount = 5; // 创建5个代码片段
    
    for (let i = 0; i < snippetCount; i++) {
        // 随机选择一个代码片段
        const snippetText = snippets[Math.floor(Math.random() * snippets.length)];
        
        // 创建代码片段元素
        const snippet = document.createElement('div');
        snippet.className = 'code-snippet';
        snippet.textContent = snippetText;
        
        // 随机定位
        snippet.style.top = `${Math.random() * 100}%`;
        snippet.style.left = `${Math.random() * 80}%`;
        snippet.style.transform = `rotate(${Math.random() * 20 - 10}deg)`;
        
        // 添加到容器
        container.appendChild(snippet);
    }
}

// 初始化Tilt效果
function initTiltEffect() {
    const tiltElements = document.querySelectorAll('.product-hero-image, .use-case-card, .tech-detail-item');
    
    tiltElements.forEach(element => {
        element.addEventListener('mousemove', e => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const moveX = (x - centerX) / (rect.width / 2);
            const moveY = (y - centerY) / (rect.height / 2);
            
            // 计算倾斜角度
            const tiltX = moveY * -10;
            const tiltY = moveX * 10;
            
            gsap.to(element, {
                rotationX: tiltX,
                rotationY: tiltY,
                duration: 0.5,
                ease: 'power1.out',
                transformPerspective: 1000,
                transformOrigin: 'center center'
            });
        });
        
        element.addEventListener('mouseleave', () => {
            gsap.to(element, {
                rotationX: 0,
                rotationY: 0,
                duration: 0.5,
                ease: 'power3.out'
            });
        });
    });
}

// 创建粒子背景
function createParticleBackground() {
    const getStartedSection = document.querySelector('.get-started-section');
    
    if (!getStartedSection) return;
    
    // 创建粒子容器
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particle-container';
    particleContainer.style.position = 'absolute';
    particleContainer.style.top = '0';
    particleContainer.style.left = '0';
    particleContainer.style.width = '100%';
    particleContainer.style.height = '100%';
    particleContainer.style.overflow = 'hidden';
    particleContainer.style.zIndex = '0';
    
    // 添加粒子
    const particleCount = 20;
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.position = 'absolute';
        particle.style.width = `${Math.random() * 5 + 3}px`;
        particle.style.height = particle.style.width;
        particle.style.backgroundColor = 'rgba(var(--primary-rgb), 0.2)';
        particle.style.borderRadius = '50%';
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.left = `${Math.random() * 100}%`;
        
        // 添加动画
        particle.style.animation = `float ${Math.random() * 10 + 10}s linear infinite`;
        particle.style.opacity = '0';
        
        // 添加@keyframes规则（如果尚未添加）
        if (!document.querySelector('#particle-keyframes')) {
            const styleSheet = document.createElement('style');
            styleSheet.id = 'particle-keyframes';
            styleSheet.textContent = `
                @keyframes float {
                    0% {
                        transform: translateY(0) translateX(0);
                        opacity: 0;
                    }
                    20% {
                        opacity: 0.5;
                    }
                    80% {
                        opacity: 0.5;
                    }
                    100% {
                        transform: translateY(-100px) translateX(${Math.random() * 100 - 50}px);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(styleSheet);
        }
        
        particleContainer.appendChild(particle);
    }
    
    getStartedSection.insertBefore(particleContainer, getStartedSection.firstChild);
}

// 创建3D悬停效果
function create3DHoverEffects() {
    const cards = document.querySelectorAll('.feature-card, .tech-detail-item, .use-case-card');
    
    cards.forEach(card => {
        card.classList.add('tilt-effect');
        
        // 鼠标移入事件
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left; // 鼠标在卡片上的X位置
            const y = e.clientY - rect.top;  // 鼠标在卡片上的Y位置
            
            // 将位置转换为从中心点算起的坐标
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            // 计算旋转角度，角度范围控制在±10度
            const rotateX = ((y - centerY) / centerY) * -5; // 负号使效果更自然
            const rotateY = ((x - centerX) / centerX) * 5;
            
            // 应用变换
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`;
            this.style.transition = 'transform 0.1s ease';
            
            // 添加阴影效果，根据鼠标位置变化
            const shadowX = (x - centerX) / 10;
            const shadowY = (y - centerY) / 10;
            this.style.boxShadow = `${shadowX}px ${shadowY}px 20px rgba(0,0,0,0.1)`;
        });
        
        // 鼠标移出事件
        card.addEventListener('mouseleave', function() {
            // 重置变换和阴影
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
            this.style.transition = 'transform 0.5s ease, box-shadow 0.5s ease';
            this.style.boxShadow = '0 10px 30px rgba(0,0,0,0.05)';
        });
    });
}

// 处理滚动动画和效果
function handleScrollAnimations() {
    // 动态背景偏移效果
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        const heroSection = document.querySelector('.product-hero');
        
        if (heroSection) {
            // 视差滚动效果
            heroSection.style.backgroundPosition = `0px ${scrollPosition * 0.1}px`;
        }
        
        // 添加其他基于滚动的视觉效果
    });
}

// 初始化滚动动画
function initScrollAnimations() {
    // 注册GSAP的ScrollTrigger插件
    gsap.registerPlugin(ScrollTrigger);

    // 产品英雄区动画
    gsap.from('.product-hero-content', {
        opacity: 0,
        y: 50,
        duration: 1,
        delay: 0.5,
        ease: 'power3.out'
    });

    gsap.from('.product-hero-image', {
        opacity: 0,
        x: 50,
        duration: 1,
        delay: 0.8,
        ease: 'power3.out'
    });

    // 技术标签动画
    gsap.from('.tech-tag', {
        opacity: 0,
        y: 20,
        duration: 0.5,
        stagger: 0.1,
        delay: 1,
        ease: 'back.out(1.7)'
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
            delay: index * 0.2,
            ease: 'power2.out'
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
            delay: index * 0.2,
            ease: 'power2.out'
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
            delay: index * 0.2,
            ease: 'back.out(1.7)'
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
        duration: 1,
        ease: 'power3.out'
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
                ease: 'power2.out',
                boxShadow: '0 10px 20px rgba(var(--primary-rgb), 0.3)'
            });
            
            // 添加微光效果
            const glow = document.createElement('div');
            glow.className = 'tag-glow';
            tag.appendChild(glow);
            
            gsap.to(glow, {
                opacity: 1,
                duration: 0.3
            });
        });

        tag.addEventListener('mouseleave', () => {
            // 移除悬浮效果
            gsap.to(tag, {
                scale: 1,
                duration: 0.3,
                ease: 'power2.out',
                boxShadow: '0 4px 6px rgba(var(--primary-rgb), 0.1)'
            });
            
            // 移除微光效果
            const glow = tag.querySelector('.tag-glow');
            if (glow) {
                gsap.to(glow, {
                    opacity: 0,
                    duration: 0.3,
                    onComplete: () => glow.remove()
                });
            }
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
            
            // 添加光晕效果
            const iconContainer = card.querySelector('.feature-icon');
            gsap.to(iconContainer, {
                boxShadow: '0 0 15px 5px rgba(var(--primary-rgb), 0.3)',
                duration: 0.5
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
            
            // 移除光晕效果
            const iconContainer = card.querySelector('.feature-icon');
            gsap.to(iconContainer, {
                boxShadow: 'none',
                duration: 0.5
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
                y: -15,
                boxShadow: '0 20px 40px rgba(var(--primary-rgb), 0.15)',
                duration: 0.5,
                ease: 'power3.out'
            });
            
            // 标题动画
            const title = card.querySelector('h3');
            gsap.to(title, {
                color: 'var(--accent-color)',
                duration: 0.3
            });
            
            // 边框动画
            const border = document.createElement('div');
            border.className = 'card-border';
            card.appendChild(border);
            
            gsap.fromTo(border, 
                { width: '0%', opacity: 0 },
                { width: '100%', opacity: 1, duration: 0.5 }
            );
        });
        
        card.addEventListener('mouseleave', () => {
            // 移除悬浮效果
            gsap.to(card, {
                y: 0,
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.07)',
                duration: 0.5,
                ease: 'power3.out'
            });
            
            // 还原标题颜色
            const title = card.querySelector('h3');
            gsap.to(title, {
                color: 'var(--primary-color)',
                duration: 0.3
            });
            
            // 移除边框
            const border = card.querySelector('.card-border');
            if (border) {
                gsap.to(border, {
                    opacity: 0,
                    duration: 0.3,
                    onComplete: () => border.remove()
                });
            }
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
    
    // 视差滚动效果
    const heroImage = document.querySelector('.product-hero-image');
    if (heroImage) {
        gsap.to(heroImage, {
            y: scrolled * 0.1,
            duration: 0.3,
            ease: 'power1.out'
        });
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

// 初始化 - 确保在重构后所有元素都完全可见
document.addEventListener('DOMContentLoaded', function() {
    // 确保所有内容在页面加载时可见
    document.querySelectorAll('.product-hero-content *, .product-hero-image, .feature-card, .tech-detail-item, .use-case-card, .get-started-content *')
    .forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'none';
    });
    
    // 添加一个类到页面容器，确保没有布局问题
    const pageContainer = document.querySelector('.page-container');
    if (pageContainer) {
        pageContainer.classList.add('loaded');
    }
});