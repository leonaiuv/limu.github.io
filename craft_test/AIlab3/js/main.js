// 等待DOM完全加载后执行
document.addEventListener('DOMContentLoaded', () => {
    // 初始化所有组件
    initNavbar();
    initSidebar();
    initScrollEffects();
    initContentInteractions();
});

/**
 * 导航栏功能初始化
 */
function initNavbar() {
    const navbar = document.getElementById('main-nav');
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    // 处理移动端菜单切换
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // 滚动时导航栏效果
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 导航链接点击处理
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            // 移除所有活动状态
            document.querySelectorAll('.nav-link').forEach(l => 
                l.classList.remove('active')
            );
            // 添加活动状态到当前点击的链接
            e.target.classList.add('active');

            // 如果在移动端，点击后关闭菜单
            if (window.innerWidth <= 768) {
                navLinks.classList.remove('active');
            }
        });
    });
}

/**
 * 侧边栏功能初始化
 */
function initSidebar() {
    const sidebarLinks = document.querySelectorAll('.sidebar-menu a');
    
    // 侧边栏链接点击处理
    sidebarLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // 更新活动状态
            sidebarLinks.forEach(l => l.classList.remove('active'));
            e.target.classList.add('active');

            // 如果有子菜单，切换其显示状态
            const parent = e.target.parentElement;
            if (parent.classList.contains('has-submenu')) {
                parent.classList.toggle('expanded');
            }
        });
    });

    // 根据滚动位置更新侧边栏活动状态
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;

        // 找到当前滚动位置对应的部分
        document.querySelectorAll('section[id]').forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionBottom = sectionTop + section.offsetHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                // 更新侧边栏活动状态
                const correspondingLink = document.querySelector(
                    `.sidebar-menu a[href="#${section.id}"]`
                );
                if (correspondingLink) {
                    sidebarLinks.forEach(l => l.classList.remove('active'));
                    correspondingLink.classList.add('active');
                }
            }
        });
    });
}

/**
 * 滚动效果初始化
 */
function initScrollEffects() {
    // 平滑滚动到锚点
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = anchor.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // 添加滚动时的渐入效果
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // 观察所有内容卡片
    document.querySelectorAll('.content-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });
}

/**
 * 内容交互功能初始化
 */
function initContentInteractions() {
    // 为内容卡片添加点击展开/收起功能
    document.querySelectorAll('.content-card').forEach(card => {
        const heading = card.querySelector('h3');
        const content = card.querySelector('p, ul');

        if (heading && content) {
            heading.style.cursor = 'pointer';
            heading.addEventListener('click', () => {
                content.style.display = 
                    content.style.display === 'none' ? 'block' : 'none';
                
                // 添加展开/收起指示器
                heading.classList.toggle('expanded');
            });
        }
    });

    // 添加代码示例的复制功能
    document.querySelectorAll('pre code').forEach(block => {
        const copyButton = document.createElement('button');
        copyButton.className = 'copy-button';
        copyButton.textContent = '复制';
        
        copyButton.addEventListener('click', () => {
            navigator.clipboard.writeText(block.textContent)
                .then(() => {
                    copyButton.textContent = '已复制!';
                    setTimeout(() => {
                        copyButton.textContent = '复制';
                    }, 2000);
                })
                .catch(err => {
                    console.error('复制失败:', err);
                });
        });

        block.parentNode.insertBefore(copyButton, block);
    });
}

/**
 * 工具函数：防抖
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * 工具函数：节流
 */
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// 导出模块（如果需要）
export {
    initNavbar,
    initSidebar,
    initScrollEffects,
    initContentInteractions
};
