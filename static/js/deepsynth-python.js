
// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', () => {
    // 初始化所有页面功能
    initScrollAnimations();
    initTechTags();
    initFeatureCards();
    initUseCaseCards();
    initPythonSpecificEffects();
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

    // 技术标签动画 - Python风格的依次弹出效果
    gsap.from('.tech-tag', {
        opacity: 0,
        scale: 0.5,
        y: 20,
        duration: 0.5,
        stagger: 0.1,
        delay: 1,
        ease: "back.out(1.7)"
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

        // 为每个列表项添加渐入效果
        const listItems = item.querySelectorAll('li');
        listItems.forEach((li, i) => {
            gsap.from(li, {
                scrollTrigger: {
                    trigger: item,
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                },
                opacity: 0,
                x: -20,
                duration: 0.5,
                delay: index * 0.2 + i * 0.1
            });
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
        // 添加悬浮效果
        tag.addEventListener('mouseenter', () => {
            gsap.to(tag, {
                scale: 1.1,
                duration: 0.3,
                ease: 'power2.out',
                backgroundColor: '#3776AB',
                color: 'white'
            });
        });

        tag.addEventListener('mouseleave', () => {
            gsap.to(tag, {
                scale: 1,
                duration: 0.3,
                ease: 'power2.out',
                backgroundColor: 'rgba(55, 118, 171, 0.2)',
                color: 'var(--light-color)'
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

            // 卡片边框动画
            gsap.to(card, {
                borderColor: '#3776AB',
                duration: 0.3
            });
        });

        card.addEventListener('mouseleave', () => {
            const icon = card.querySelector('.feature-icon svg');
            gsap.to(icon, {
                scale: 1,
                rotate: 0,
                duration: 0.5,
                ease: 'power2.out'
            });

            gsap.to(card, {
                borderColor: 'rgba(55, 118, 171, 0.1)',
                duration: 0.3
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
                boxShadow: '0 20px 30px rgba(0, 0, 0, 0.1)',
                borderColor: '#3776AB',
                duration: 0.3,
                ease: 'power2.out'
            });
        });

        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                y: 0,
                boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
                borderColor: 'rgba(55, 118, 171, 0.1)',
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });
}

// Python特定效果初始化
function initPythonSpecificEffects() {
    // 为英雄区添加Python风格的粒子效果
    const heroSection = document.querySelector('.product-hero');
    if (heroSection) {
        createPythonParticles(heroSection);
    }

    // 为"开始使用"按钮添加特殊效果
    const startButton = document.querySelector('.get-started-section .primary-btn');
    if (startButton) {
        startButton.addEventListener('click', () => {
            // 添加点击动画效果
            gsap.to(startButton, {
                scale: 0.95,
                duration: 0.1,
                yoyo: true,
                repeat: 1,
                onComplete: () => {
                    // 这里可以添加试用注册逻辑
                    alert('感谢您的关注！Python版本试用功能即将开放，请保持关注。');
                }
            });
        });
    }
}

// 创建Python风格的粒子效果
function createPythonParticles(container) {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'python-particles';
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
    container.appendChild(particlesContainer);

    // 创建粒子
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: 8px;
            height: 8px;
            background: rgba(55, 118, 171, 0.2);
            border-radius: 50%;
        `;
        particlesContainer.appendChild(particle);

        // 随机位置和动画
        gsap.set(particle, {
            x: Math.random() * container.offsetWidth,
            y: Math.random() * container.offsetHeight
        });

        // 创建浮动动画
        gsap.to(particle, {
            duration: 'random(3, 5)',
            x: `+=${Math.random() * 100 - 50}`,
            y: `+=${Math.random() * 100 - 50}`,
            opacity: 'random(0.2, 0.5)',
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