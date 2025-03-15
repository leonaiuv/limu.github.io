// 导航栏组件的JavaScript功能
class Navbar {
    constructor() {
        this.navbar = document.getElementById('mainNav');
        this.toggle = document.getElementById('navbarToggle');
        this.menu = document.getElementById('navbarMenu');
        this.navItems = document.querySelectorAll('.nav-item');
        
        this.initialize();
    }

    initialize() {
        // 设置汉堡菜单点击事件
        this.toggle.addEventListener('click', () => this.toggleMenu());
        
        // 设置导航项点击事件
        this.navItems.forEach(item => {
            item.addEventListener('click', (e) => this.handleNavItemClick(e));
        });

        // 设置窗口大小改变事件
        window.addEventListener('resize', () => this.handleResize());

        // 设置滚动事件
        window.addEventListener('scroll', () => this.handleScroll());
    }

    toggleMenu() {
        this.toggle.classList.toggle('active');
        this.menu.classList.toggle('active');
    }

    handleNavItemClick(e) {
        // 移除所有导航项的active类
        this.navItems.forEach(item => item.classList.remove('active'));
        
        // 为点击的导航项添加active类
        e.currentTarget.classList.add('active');
        
        // 如果是移动端视图，点击后关闭菜单
        if (window.innerWidth <= 768) {
            this.toggleMenu();
        }
    }

    handleResize() {
        // 当屏幕宽度大于768px时，确保菜单可见
        if (window.innerWidth > 768) {
            this.menu.classList.remove('active');
            this.toggle.classList.remove('active');
        }
    }

    handleScroll() {
        // 添加滚动效果
        if (window.scrollY > 50) {
            this.navbar.style.boxShadow = 'var(--shadow-md)';
        } else {
            this.navbar.style.boxShadow = 'var(--shadow-sm)';
        }
    }
}

// 当DOM加载完成后初始化导航栏
document.addEventListener('DOMContentLoaded', () => {
    const navbar = new Navbar();
});
