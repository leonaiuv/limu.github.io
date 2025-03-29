// ===== 等待DOM加载完成 =====
document.addEventListener('DOMContentLoaded', () => {
    // 页面加载完成后隐藏加载动画
    setTimeout(() => {
        const loaderWrapper = document.querySelector('.loader-wrapper');
        loaderWrapper.classList.add('hidden');
        setTimeout(() => {
            loaderWrapper.style.display = 'none';
        }, 800);
    }, 1500);

    // 初始化所有网站功能模块
    initThreeJsBackground();  // 初始化3D背景
    initScrollAnimation();    // 初始化滚动动画
    initNavigation();         // 初始化导航功能
    initSideMenu();           // 初始化侧边菜单
    initCursorEffect();       // 初始化鼠标跟随效果
    initFloatingElements();   // 初始化悬浮元素
    
    // 立即显示所有内容，不使用动画，防止元素消失
    document.querySelectorAll('.animate, .feature-card, .project-card').forEach(element => {
        element.classList.add('fade-in');
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
        element.style.transition = 'none'; // 禁用过渡效果防止元素移动
    });
});

// ===== 导航功能初始化 =====
function initNavigation() {
    const nav = document.querySelector('.main-nav');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-link');

    // 监听滚动事件，向下滚动时改变导航栏样式
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // 移动端汉堡菜单点击事件处理
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // 导航链接点击后关闭移动端菜单
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
}

// ===== 滚动动画初始化 =====
function initScrollAnimation() {
    // 注册GSAP的ScrollTrigger插件
    if (typeof gsap !== 'undefined' && gsap.registerPlugin && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        // 为页面各部分添加一次性淡入效果，不添加持续动画效果
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            // 只为每个section的标题添加淡入效果，显示后不再变化
            const header = section.querySelector('.section-header');
            if (header) {
                gsap.fromTo(header, 
                    { y: 50, opacity: 0 },
                    { y: 0, opacity: 1, duration: 1, scrollTrigger: {
                        trigger: header,
                        start: 'top 90%',
                        toggleActions: 'play none none none',
                        once: true // 确保动画只执行一次
                    }}
                );
            }
        });
    }
    
    // 主动应用可见性，确保内容始终可见
    setTimeout(() => {
        document.querySelectorAll('.feature-card, .project-card').forEach(card => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        });
    }, 100);
}

// ===== 侧边菜单功能初始化 =====
function initSideMenu() {
    const sideMenuItems = document.querySelectorAll('.side-menu-item');
    const sections = document.querySelectorAll('section');

    // 滚动时更新侧边菜单活动状态，高亮当前所在区域
    window.addEventListener('scroll', () => {
        let current = '';
        
        // 确定当前滚动位置所在的区域
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        // 更新侧边菜单的活跃状态
        sideMenuItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('data-section') === current) {
                item.classList.add('active');
            }
        });
    });

    // 侧边菜单项点击事件，平滑滚动到对应区域
    sideMenuItems.forEach(item => {
        item.addEventListener('click', () => {
            const section = document.getElementById(item.getAttribute('data-section'));
            window.scrollTo({
                top: section.offsetTop,
                behavior: 'smooth'  // 平滑滚动
            });
        });
    });
}

// ===== 自定义鼠标跟随效果初始化 =====
function initCursorEffect() {
    const cursorFollower = document.querySelector('.cursor-follower');
    const cursorDot = document.querySelector('.cursor-dot');
    
    if (!cursorFollower || !cursorDot) return;

    document.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;

        // 使用GSAP使动画更加流畅
        gsap.to(cursorFollower, {
            x: clientX,
            y: clientY,
            duration: 0.3
        });

        gsap.to(cursorDot, {
            x: clientX,
            y: clientY,
            duration: 0.1
        });
    });

    // 悬停效果增强
    const interactiveElements = document.querySelectorAll('a, button, .feature-card, .project-card, input, textarea');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorFollower.classList.add('active');
            cursorDot.style.transform = 'translate(-50%, -50%) scale(1.5)';
        });
        el.addEventListener('mouseleave', () => {
            cursorFollower.classList.remove('active');
            cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
        });
    });
}

// ===== 悬浮装饰元素动画初始化 =====
function initFloatingElements() {
    const floatElements = document.querySelectorAll('.float-element');
    
    if (floatElements.length === 0) return;

    gsap.to('.float-element:nth-child(1)', {
        y: -20,
        x: 10,
        rotation: 5,
        repeat: -1,
        yoyo: true,
        duration: 3,
        ease: "sine.inOut"
    });

    gsap.to('.float-element:nth-child(2)', {
        y: 20,
        x: -10,
        rotation: -5,
        repeat: -1,
        yoyo: true,
        duration: 3.5,
        ease: "sine.inOut",
        delay: 0.2
    });

    gsap.to('.float-element:nth-child(3)', {
        y: -15,
        x: -15,
        rotation: 3,
        repeat: -1,
        yoyo: true,
        duration: 4,
        ease: "sine.inOut",
        delay: 0.4
    });

    gsap.to('.float-element:nth-child(4)', {
        y: 15,
        x: 15,
        rotation: -3,
        repeat: -1,
        yoyo: true,
        duration: 4.5,
        ease: "sine.inOut",
        delay: 0.6
    });

    gsap.to('.float-element:nth-child(5)', {
        y: -10,
        x: 5,
        rotation: 2,
        repeat: -1,
        yoyo: true,
        duration: 5,
        ease: "sine.inOut",
        delay: 0.8
    });
}

// ===== Three.js 3D背景初始化 =====
function initThreeJsBackground() {
    const canvas = document.getElementById('hero-canvas');
    if (!canvas) return;

    // 创建Three.js的基础组件：场景、相机和渲染器
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
        canvas: canvas,
        alpha: true,         // 支持透明背景
        antialias: true      // 开启抗锯齿
    });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    // 创建粒子系统
    const particlesCount = 3000;
    const particles = new THREE.BufferGeometry();
    const positions = new Float32Array(particlesCount * 3);
    const colors = new Float32Array(particlesCount * 3);
    
    const colorOptions = [
        new THREE.Color(0x6c63ff), // 主色
        new THREE.Color(0xff6584), // 次色
        new THREE.Color(0x2cdaba)  // 强调色
    ];

    // 设置每个粒子的位置和颜色
    for (let i = 0; i < particlesCount; i++) {
        // 随机位置
        positions[i * 3] = (Math.random() - 0.5) * 10;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
        
        // 随机颜色
        const color = colorOptions[Math.floor(Math.random() * colorOptions.length)];
        colors[i * 3] = color.r;
        colors[i * 3 + 1] = color.g;
        colors[i * 3 + 2] = color.b;
    }
    
    particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particles.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    
    // 创建粒子材质
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.02,
        vertexColors: true,
        transparent: true,
        opacity: 0.8
    });

    // 创建粒子系统
    const particleSystem = new THREE.Points(particles, particlesMaterial);
    scene.add(particleSystem);

    // 设置相机位置
    camera.position.z = 5;

    // 窗口大小改变时调整
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // 添加鼠标交互
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;

    document.addEventListener('mousemove', event => {
        mouseX = (event.clientX - windowHalfX);
        mouseY = (event.clientY - windowHalfY);
    });

    // 渲染循环
    function animate() {
        requestAnimationFrame(animate);
        
        targetX = mouseX * 0.001;
        targetY = mouseY * 0.001;
        
        particleSystem.rotation.x += 0.002;
        particleSystem.rotation.y += 0.002;
        
        particleSystem.rotation.x += (targetY - particleSystem.rotation.x) * 0.05;
        particleSystem.rotation.y += (targetX - particleSystem.rotation.y) * 0.05;
        
        renderer.render(scene, camera);
    }
    
    animate();
}

// ===== 表单提交 =====
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', e => {
        e.preventDefault();
        
        // 模拟表单提交
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = '发送中...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            alert('消息已发送成功！我们会尽快回复您。');
            contactForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 1500);
    });
}

// 移动端菜单功能
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (mobileMenuToggle && mainNav) {
        mobileMenuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            this.classList.toggle('active');
        });
    }
    
    // 点击导航链接时关闭移动菜单
    const navLinks = document.querySelectorAll('.main-nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
            }
        });
    });
}); 