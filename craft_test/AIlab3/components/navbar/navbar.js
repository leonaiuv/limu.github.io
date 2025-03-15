/**
 * 导航栏组件类
 * 处理导航栏的所有交互和功能
 */
class Navbar {
    constructor() {
        // 初始化导航栏元素
        this.navbar = document.getElementById('main-nav');
        this.navLinks = this.navbar.querySelector('.nav-links');
        this.createMobileMenuButton();
        this.init();
    }

    /**
     * 初始化导航栏功能
     */
    init() {
        this.setupMobileMenu();
        this.setupScrollEffect();
        this.setupNavLinks();
        this.setupResizeHandler();
    }

    /**
     * 创建移动端菜单按钮
     */
    createMobileMenuButton() {
        if (!this.navbar.querySelector('.menu-toggle')) {
            const button = document.createElement('button');
            button.className = 'menu-toggle';
            button.setAttribute('aria-label', '切换菜单');
            button.innerHTML = `
                <svg viewBox="0 0 100 100" width="24" height="24">
                    <rect y="20" width="100" height="10"></rect>
                    <rect y="45" width="100" height="10"></rect>
                    <rect y="70" width="100" height="10"></rect>
                </svg>
            `;
            this.navbar.appendChild(button);
            this.menuToggle = button;
        }
    }

    /**
     * 设置移动端菜单功能
     */
    setupMobileMenu() {
        if (this.menuToggle) {
            this.menuToggle.addEventListener('click', () => {
                this.toggleMobileMenu();
            });

            // 点击导航栏外部时关闭菜单
            document.addEventListener('click', (e) => {
                if (!this.navbar.contains(e.target) && this.navLinks.classList.contains('active')) {
                    this.closeMobileMenu();
                }
            });
        }
    }

    /**
     * 切换移动端菜单显示状态
     */
    toggleMobileMenu() {
        this.navLinks.classList.toggle('active');
        this.menuToggle.classList.toggle('active');
        
        // 设置aria属性
        const isExpanded = this.navLinks.classList.contains('active');
        this.menuToggle.setAttribute('aria-expanded', isExpanded);
    }

    /**
     * 关闭移动端菜单
     */
    closeMobileMenu() {
        this.navLinks.classList.remove('active');
        this.menuToggle.classList.remove('active');
        this.menuToggle.setAttribute('aria-expanded', 'false');
    }

    /**
     * 设置滚动效果
     */
    setupScrollEffect() {
        let lastScroll = 0;
        const scrollThreshold = 50;

        // 使用节流函数来优化滚动事件处理
        window.addEventListener('scroll', this.throttle(() => {
            const currentScroll = window.pageYOffset;

            // 添加滚动样式
            if (currentScroll > scrollThreshold) {
                this.navbar.classList.add('scrolled');
            } else {
                this.navbar.classList.remove('scrolled');
            }

            // 自动隐藏/显示导航栏
            if (currentScroll > lastScroll && currentScroll > this.navbar.offsetHeight) {
                // 向下滚动
                this.navbar.style.transform = 'translateY(-100%)';
            } else {
                // 向上滚动
                this.navbar.style.transform = 'translateY(0)';
            }

            lastScroll = currentScroll;
        }, 100));
    }

    /**
     * 设置导航链接功能
     */
    setupNavLinks() {
        const links = this.navbar.querySelectorAll('.nav-link');
        
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                // 阻止默认行为以实现平滑滚动
                e.preventDefault();

                // 移除所有链接的活动状态
                links.forEach(l => l.classList.remove('active'));
                
                // 添加活动状态到当前点击的链接
                link.classList.add('active');

                // 获取目标元素并滚动
                const targetId = link.getAttribute('href');
                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    // 平滑滚动到目标位置
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });

                    // 更新 URL，但不触发滚动
                    history.pushState(null, '', targetId);
                }

                // 在移动端点击后关闭菜单
                if (window.innerWidth <= 768) {
                    this.closeMobileMenu();
                }
            });
        });

        // 根据滚动位置更新活动链接
        window.addEventListener('scroll', this.debounce(() => {
            this.updateActiveLink();
        }, 100));
    }

    /**
     * 更新当前活动链接
     */
    updateActiveLink() {
        const scrollPosition = window.scrollY + this.navbar.offsetHeight + 50;

        // 获取所有section并检查当前位置
        const sections = document.querySelectorAll('section[id]');
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                // 移除所有链接的活动状态
                this.navbar.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                });

                // 添加活动状态到对应的链接
                const correspondingLink = this.navbar.querySelector(
                    `.nav-link[href="#${section.id}"]`
                );
                if (correspondingLink) {
                    correspondingLink.classList.add('active');
                }
            }
        });
    }

    /**
     * 设置窗口调整大小的处理程序
     */
    setupResizeHandler() {
        window.addEventListener('resize', this.debounce(() => {
            if (window.innerWidth > 768) {
                // 在桌面视图中确保导航链接可见
                this.navLinks.classList.remove('active');
                this.menuToggle.classList.remove('active');
            }
        }, 250));
    }

    /**
     * 工具函数：防抖
     */
    debounce(func, wait) {
        let timeout;
        return (...args) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    }

    /**
     * 工具函数：节流
     */
    throttle(func, limit) {
        let inThrottle;
        return (...args) => {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
}

// 当DOM加载完成后初始化导航栏
document.addEventListener('DOMContentLoaded', () => {
    // 创建导航栏实例
    const navbar = new Navbar();
});

// 导出Navbar类（如果需要在其他模块中使用）
export default Navbar;
