/**
 * 打字效果
 */
const typingElement = document.getElementById('typing');
const titles = ['AI探索者', '直播运营', 'Web开发者', "李 沐"];
let titleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeEffect() {
    const currentTitle = titles[titleIndex];
    
    if (isDeleting) {
        // 删除文字
        typingElement.textContent = currentTitle.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
    } else {
        // 添加文字
        typingElement.textContent = currentTitle.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 150;
    }
    
    // 是否完成当前标题的输入
    if (!isDeleting && charIndex === currentTitle.length) {
        isDeleting = true;
        typingSpeed = 1500; // 暂停一段时间再删除
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        titleIndex = (titleIndex + 1) % titles.length;
        typingSpeed = 800; // 暂停一段时间再输入新标题
    }
    
    setTimeout(typeEffect, typingSpeed);
}

/**
 * 滚动平滑效果
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
}

/**
 * 表单提交事件
 */
function initContactForm() {
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 这里可以添加表单验证和提交逻辑
            // 在实际应用中，您需要将表单数据发送到服务器
            
            alert('感谢您的留言！我会尽快回复您。');
            contactForm.reset();
        });
    }
}

/**
 * 动画效果 - 当元素进入视口时添加动画
 */
function animateOnScroll() {
    const elements = document.querySelectorAll('.project-card, .about-content, .contact-content');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
            element.style.opacity = 1;
            element.style.transform = 'translateY(0)';
        }
    });
}

/**
 * 初始化网站
 */
function initWebsite() {
    // 启动打字效果
    setTimeout(typeEffect, 1000);
    
    // 初始化平滑滚动
    initSmoothScroll();
    
    // 初始化联系表单
    initContactForm();
    
    // 监听滚动事件
    window.addEventListener('scroll', animateOnScroll);
    
    // 页面加载时也执行一次动画
    window.addEventListener('load', animateOnScroll);
}

// 当DOM内容加载完成后初始化网站
document.addEventListener('DOMContentLoaded', initWebsite); 