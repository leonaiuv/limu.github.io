// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', () => {
    // 初始化加载动画
    initLoader();
    
    // 初始化导航栏
    initNavbar();
    
    // 初始化滚动动画
    initScrollAnimations();
    
    // 初始化鼠标跟随效果
    initCursorEffect();
    
    // 初始化技术球体
    initTechSphere();
    
    // 初始化表单验证
    initFormValidation();
});

// 加载动画
function initLoader() {
    const loader = document.querySelector('.loader');
    
    // 模拟加载过程
    setTimeout(() => {
        loader.classList.add('hidden');
        // 加载完成后移除loader元素
        setTimeout(() => {
            loader.remove();
        }, 500);
    }, 2000);
}

// 导航栏功能
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-link');
    
    // 滚动时改变导航栏样式
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // 移动端菜单切换
    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        navToggle.classList.toggle('active');
    });
    
    // 点击导航链接
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            // 移除所有active类
            navItems.forEach(link => link.classList.remove('active'));
            // 添加active类到当前点击的链接
            item.classList.add('active');
            // 关闭移动端菜单
            navLinks.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });
    
    // 滚动监听，高亮当前部分的导航链接
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    });
}

// 滚动动画
function initScrollAnimations() {
    // 检测元素是否在视口中
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
            rect.bottom >= 0
        );
    }
    
    // 需要动画的元素
    const animatedElements = document.querySelectorAll('.section-header, .project-card, .about-content, .contact-form-container, .contact-info');
    
    // 初始设置
    animatedElements.forEach(element => {
        element.classList.add('fade-in');
        if (!isInViewport(element)) {
            element.style.opacity = '0';
        }
    });
    
    // 滚动时检查并添加动画
    function checkAnimations() {
        animatedElements.forEach(element => {
            if (isInViewport(element) && element.style.opacity === '0') {
                element.style.opacity = '1';
            }
        });
    }
    
    // 初始检查
    checkAnimations();
    
    // 滚动时检查
    window.addEventListener('scroll', checkAnimations);
}

// 鼠标跟随效果
function initCursorEffect() {
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    
    if (!cursorDot || !cursorOutline) return;
    
    window.addEventListener('mousemove', (e) => {
        // 更新光标位置
        const posX = e.clientX;
        const posY = e.clientY;
        
        // 使用requestAnimationFrame优化性能
        window.requestAnimationFrame(() => {
            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;
            cursorOutline.style.left = `${posX}px`;
            cursorOutline.style.top = `${posY}px`;
        });
    });
    
    // 鼠标悬停在可点击元素上时的效果
    const clickables = document.querySelectorAll('a, button, .project-card, .nav-toggle');
    
    clickables.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursorDot.style.width = '12px';
            cursorDot.style.height = '12px';
            cursorOutline.style.width = '30px';
            cursorOutline.style.height = '30px';
            cursorOutline.style.borderColor = 'var(--accent-color)';
        });
        
        element.addEventListener('mouseleave', () => {
            cursorDot.style.width = '8px';
            cursorDot.style.height = '8px';
            cursorOutline.style.width = '40px';
            cursorOutline.style.height = '40px';
            cursorOutline.style.borderColor = 'var(--primary-color)';
        });
    });
    
    // 鼠标点击效果
    document.addEventListener('mousedown', () => {
        cursorDot.style.transform = 'translate(-50%, -50%) scale(0.7)';
        cursorOutline.style.transform = 'translate(-50%, -50%) scale(0.7)';
    });
    
    document.addEventListener('mouseup', () => {
        cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
        cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
    });
}

// 技术球体动画
function initTechSphere() {
    const techSphere = document.querySelector('.tech-sphere');
    const techItems = document.querySelectorAll('.tech-item');
    
    if (!techSphere) return;
    
    // 设置初始位置
    techItems.forEach((item, index) => {
        const angle = (index / techItems.length) * Math.PI * 2;
        const x = Math.cos(angle) * 100;
        const z = Math.sin(angle) * 100;
        item.style.transform = `rotateY(${angle * 180 / Math.PI}deg) translateZ(100px)`;
    });
    
    // 旋转动画
    let rotation = 0;
    let autoRotate = true;
    
    function rotateSphere() {
        if (autoRotate) {
            rotation += 0.5;
            techSphere.style.transform = `rotateY(${rotation}deg)`;
        }
        requestAnimationFrame(rotateSphere);
    }
    
    rotateSphere();
    
    // 鼠标悬停时暂停旋转
    techSphere.addEventListener('mouseenter', () => {
        autoRotate = false;
    });
    
    techSphere.addEventListener('mouseleave', () => {
        autoRotate = true;
    });
    
    // 鼠标拖动旋转
    let isDragging = false;
    let previousMousePosition;
    
    techSphere.addEventListener('mousedown', (e) => {
        isDragging = true;
        previousMousePosition = e.clientX;
    });
    
    window.addEventListener('mouseup', () => {
        isDragging = false;
    });
    
    window.addEventListener('mousemove', (e) => {
        if (isDragging) {
            const deltaX = e.clientX - previousMousePosition;
            rotation += deltaX * 0.5;
            techSphere.style.transform = `rotateY(${rotation}deg)`;
            previousMousePosition = e.clientX;
        }
    });
}

// 表单验证
function initFormValidation() {
    const contactForm = document.querySelector('.contact-form');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // 获取表单字段
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');
        
        // 简单验证
        let isValid = true;
        
        if (nameInput.value.trim() === '') {
            highlightError(nameInput);
            isValid = false;
        }
        
        if (emailInput.value.trim() === '' || !isValidEmail(emailInput.value)) {
            highlightError(emailInput);
            isValid = false;
        }
        
        if (messageInput.value.trim() === '') {
            highlightError(messageInput);
            isValid = false;
        }
        
        // 如果验证通过，模拟表单提交
        if (isValid) {
            // 这里可以添加实际的表单提交逻辑
            // 例如使用fetch API发送数据到服务器
            
            // 模拟成功提交
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = '发送中...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                submitBtn.textContent = '发送成功!';
                submitBtn.style.backgroundColor = '#4CAF50';
                
                // 重置表单
                setTimeout(() => {
                    contactForm.reset();
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.backgroundColor = '';
                }, 2000);
            }, 1500);
        }
    });
    
    // 输入时移除错误高亮
    const formInputs = contactForm.querySelectorAll('input, textarea');
    formInputs.forEach(input => {
        input.addEventListener('input', () => {
            input.style.borderColor = '';
        });
    });
    
    // 辅助函数：高亮错误字段
    function highlightError(input) {
        input.style.borderColor = 'var(--secondary-color)';
    }
    
    // 辅助函数：验证邮箱格式
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
}