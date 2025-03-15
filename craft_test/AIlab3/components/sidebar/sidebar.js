/**
 * 侧边栏组件类
 * 处理侧边栏的所有交互和功能
 */
class Sidebar {
    constructor() {
        this.sidebar = document.querySelector('.sidebar');
        this.sidebarContent = this.sidebar.querySelector('.sidebar-content');
        this.sidebarMenu = this.sidebar.querySelector('.sidebar-menu');
        this.init();
    }

    /**
     * 初始化侧边栏功能
     */
    init() {
        this.setupMenuItems();
        this.setupScrollSpy();
        this.setupResizeHandler();
        this.setupCollapsible();
        this.setupSearchFilter();
    }

    /**
     * 设置菜单项的交互
     */
    setupMenuItems() {
        const menuItems = this.sidebarMenu.querySelectorAll('a');

        menuItems.forEach(item => {
            // 添加点击事件处理
            item.addEventListener('click', (e) => {
                e.preventDefault();

                // 更新活动状态
                menuItems.forEach(i => i.classList.remove('active'));
                item.classList.add('active');

                // 获取目标元素
                const targetId = item.getAttribute('href');
                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    // 平滑滚动到目标位置
                    const navbarHeight = document.querySelector('.navbar').offsetHeight;
                    const targetPosition = targetElement.offsetTop - navbarHeight - 20;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });

                    // 更新URL，但不触发滚动
                    history.pushState(null, '', targetId);
                }

                // 在移动端自动关闭侧边栏（如果需要）
                if (window.innerWidth <= 768) {
                    this.sidebar.classList.remove('mobile-active');
                }
            });
        });
    }

    /**
     * 设置滚动监听
     */
    setupScrollSpy() {
        // 使用Intersection Observer API监听部分可见性
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        // 获取当前可见部分的ID
                        const id = entry.target.getAttribute('id');
                        // 更新侧边栏活动状态
                        this.updateActiveMenuItem(`#${id}`);
                    }
                });
            },
            {
                // 配置选项
                rootMargin: '-20% 0px -70% 0px'
            }
        );

        // 观察所有部分
        document.querySelectorAll('section[id]').forEach(section => {
            observer.observe(section);
        });
    }

    /**
     * 更新活动菜单项
     * @param {string} targetId - 目标元素的ID
     */
    updateActiveMenuItem(targetId) {
        const menuItems = this.sidebarMenu.querySelectorAll('a');
        menuItems.forEach(item => {
            if (item.getAttribute('href') === targetId) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }

    /**
     * 设置响应式处理
     */
    setupResizeHandler() {
        window.addEventListener('resize', this.debounce(() => {
            this.handleResize();
        }, 250));
    }

    /**
     * 处理窗口大小变化
     */
    handleResize() {
        if (window.innerWidth <= 768) {
            this.sidebar.classList.remove('expanded');
        }
    }

    /**
     * 设置可折叠功能
     */
    setupCollapsible() {
        // 为有子菜单的项目添加展开/折叠功能
        const itemsWithSubmenu = this.sidebarMenu.querySelectorAll('.has-submenu');

        itemsWithSubmenu.forEach(item => {
            const trigger = item.querySelector('a');
            const submenu = item.querySelector('.sidebar-submenu');

            if (trigger && submenu) {
                // 添加展开指示器
                const indicator = document.createElement('span');
                indicator.className = 'submenu-indicator';
                trigger.appendChild(indicator);

                trigger.addEventListener('click', (e) => {
                    e.preventDefault();
                    item.classList.toggle('expanded');
                    
                    // 动画展开/折叠子菜单
                    if (item.classList.contains('expanded')) {
                        submenu.style.maxHeight = submenu.scrollHeight + 'px';
                    } else {
                        submenu.style.maxHeight = '0';
                    }
                });
            }
        });
    }

    /**
     * 设置搜索过滤功能
     */
    setupSearchFilter() {
        // 创建搜索输入框
        const searchInput = document.createElement('input');
        searchInput.type = 'text';
        searchInput.className = 'sidebar-search';
        searchInput.placeholder = '搜索内容...';

        // 将搜索框插入到侧边栏顶部
        this.sidebarContent.insertBefore(searchInput, this.sidebarMenu);

        // 添加搜索功能
        searchInput.addEventListener('input', this.debounce((e) => {
            const searchTerm = e.target.value.toLowerCase();
            const menuItems = this.sidebarMenu.querySelectorAll('a');

            menuItems.forEach(item => {
                const text = item.textContent.toLowerCase();
                const parent = item.parentElement;

                if (text.includes(searchTerm)) {
                    parent.style.display = '';
                    // 如果在子菜单中找到匹配项，展开父菜单
                    const parentSubmenu = parent.closest('.has-submenu');
                    if (parentSubmenu) {
                        parentSubmenu.classList.add('expanded');
                    }
                } else {
                    parent.style.display = 'none';
                }
            });
        }, 300));
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
}

// 当DOM加载完成后初始化侧边栏
document.addEventListener('DOMContentLoaded', () => {
    // 创建侧边栏实例
    const sidebar = new Sidebar();
});

// 导出Sidebar类（如果需要在其他模块中使用）
export default Sidebar;
