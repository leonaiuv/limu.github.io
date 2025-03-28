
// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', () => {
    // 初始化所有页面功能
    initScrollAnimations();
    initTechTags();
    initFeatureCards();
    initUseCaseCards();
    initEveSpecificEffects();
});

// 初始化滚动动画
function initScrollAnimations() {
    // 注册GSAP的ScrollTrigger插件
    gsap.registerPlugin(ScrollTrigger);

    // 产品英雄区动画 - 更高级的入场效果
    const heroTimeline = gsap.timeline({
        defaults: { ease: "power3.out" }
    });

    heroTimeline
        .from('.product-hero-content h1', {
            y: 100,
            opacity: 0,
            duration: 1
        })
        .from('.product-subtitle', {
            y: 50,
            opacity: 0,
            duration: 0.8
        }, "-=0.5")
        .from('.tech-stack', {
            y: 30,
            opacity: 0,
            duration: 0.8
        }, "-=0.3")
        .from('.product-hero-image', {
            x: 100,
            opacity: 0,
            duration: 1
        }, "-=0.5");

    // 技术标签动画 - 高级弹出效果
    const techTags = document.querySelectorAll('.tech-tag');
    techTags.forEach((tag, index) => {
        gsap.from(tag, {
            scale: 0,
            opacity: 0,
            rotation: -180,
            duration: 0.6,
            delay: 1 + index * 0.1,
            ease: "back.out(1.7)"
        });
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
            rotation: 5,
            duration: 0.8,
            delay: index * 0.2,
            ease: "power3.out"
        });
    });

    // 技术细节项动画
    const techDetailItems = document.querySelectorAll('.tech-detail-item');
    techDetailItems.forEach((item, index) => {
        // 容器动画
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

        // 列表项动画
        const listItems = item.querySelectorAll('li');
        listItems.forEach((li, i) => {
            gsap.from(li, {
                scrollTrigger: {
                    trigger: item,
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                },
                opacity: 0,
                x: -30,
                duration: 0.5,
                delay: index * 0.2 + i * 0.1,
                ease: "power2.out"
            });
        });
    });

    // 使用场景卡片高级动画
    const useCaseCards = document.querySelectorAll('.use-case-card');
    useCaseCards.forEach((card, index) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            opacity: 0,
            y: 100,
            rotation: 5,
            duration: 1,
            delay: index * 0.2,
            ease: "power3.out"
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
        scale: 0.9,
        duration: 1,
        ease: "power3.out"
    });
}

// 初始化技术标签交互
function initTechTags() {
    const techTags = document.querySelectorAll('.tech-tag');
    
    techTags.forEach(tag => {
        tag.addEventListener('mouseenter', () => {
            gsap.to(tag, {
                scale: 1.1,
                duration: 0.3,
                ease: 'power2.out',
                boxShadow: '0 5px 15px rgba(125, 69, 255, 0.3)'
            });
        });

        tag.addEventListener('mouseleave', () => {
            gsap.to(tag, {
                scale: 1,
                duration: 0.3,
                ease: 'power2.out',
                boxShadow: 'none'
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
            const icon = card.querySelector('.feature-icon');
            gsap.to(icon, {
                scale: 1.2,
                rotate: 360,
                duration: 0.5,
                ease: 'power2.out',
                background: 'linear-gradient(135deg, rgba(125, 69, 255, 0.2), rgba(200, 109, 215, 0.2))'
            });

            // 卡片动画
            gsap.to(card, {
                y: -10,
                duration: 0.3,
                ease: 'power2.out',
                boxShadow: '0 15px 30px rgba(125, 69, 255, 0.1)'
            });
        });

        card.addEventListener('mouseleave', () => {
            const icon = card.querySelector('.feature-icon');
            gsap.to(icon, {
                scale: 1,
                rotate: 0,
                duration: 0.5,
                ease: 'power2.out',
                background: 'linear-gradient(135deg, rgba(125, 69, 255, 0.1), rgba(200, 109, 215, 0.1))'
            });

            gsap.to(card, {
                y: 0,
                duration: 0.3,
                ease: 'power2.out',
                boxShadow: 'none'
            });
        });
    });
}

// 初始化使用场景卡片交互
function initUseCaseCards() {
    const useCaseCards = document.querySelectorAll('.use-case-card');
    
    useCaseCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                y: -10,
                duration: 0.3,
                ease: 'power2.out',
                boxShadow: '0 15px 30px rgba(125, 69, 255, 0.1)'
            });
        });

        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                y: 0,
                duration: 0.3,
                ease: 'power2.out',
                boxShadow: 'none'
            });
        });
    });
}

// EVE特定效果初始化
function initEveSpecificEffects() {
    // 创建高级粒子效果
    createEveParticles();

    // 为"开始使用"按钮添加特殊效果
    const startButton = document.querySelector('.get-started-section .primary-btn');
    if (startButton) {
        startButton.addEventListener('mouseenter', () => {
            gsap.to(startButton, {
                scale: 1.05,
                duration: 0.3,
                ease: 'power2.out',
                boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)'
            });
        });

        startButton.addEventListener('mouseleave', () => {
            gsap.to(startButton, {
                scale: 1,
                duration: 0.3,
                ease: 'power2.out',
                boxShadow: 'none'
            });
        });

        startButton.addEventListener('click', () => {
            gsap.to(startButton, {
                scale: 0.95,
                duration: 0.1,
                yoyo: true,
                repeat: 1,
                onComplete: () => {
                    alert('感谢您的关注！EVE版本试用功能即将开放，请保持关注。');
                }
            });
        });
    }
}

// 创建EVE特色粒子效果
function createEveParticles() {
    const heroSection = document.querySelector('.product-hero');
    if (!heroSection) return;

    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'eve-particles';
    particlesContainer.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        pointer-events: none;
        z-index: 1;
    `;
    heroSection.appendChild(particlesContainer);

    // 创建高级粒子
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 5 + 3}px;
            height: ${Math.random() * 5 + 3}px;
            background: linear-gradient(135deg, rgba(125, 69, 255, 0.5), rgba(200, 109, 215, 0.5));
            border-radius: 50%;
            filter: blur(1px);
        `;
        particlesContainer.appendChild(particle);

        // 随机位置和动画
        gsap.set(particle, {
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight
        });

        // 创建浮动动画
        gsap.to(particle, {
            duration: 'random(3, 7)',
            x: `+=${Math.random() * 200 - 100}`,
            y: `+=${Math.random() * 200 - 100}`,
            opacity: 'random(0.3, 0.7)',
            scale: 'random(0.5, 1.5)',
            repeat: -1,
            yoyo: true,
            ease: 'none'
        });
    }
}

// 页面滚动处理
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const nav = document.querySelector('.main-nav');
    
    if (scrolled > 100) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});