// 加载导航栏
async function loadNavbar() {
    try {
        const response = await fetch('./components/navbar.html');
        const html = await response.text();
        
        // 创建一个容器来放置导航栏
        const navContainer = document.createElement('div');
        navContainer.id = 'navbar-container';
        
        // 将导航栏插入到页面的最前面
        document.body.insertBefore(navContainer, document.body.firstChild);
        navContainer.innerHTML = html;
        
        // 初始化导航栏功能
        initializeNavbar();
        
        // 高亮当前页面对应的导航项
        highlightCurrentPage();
    } catch (error) {
        console.error('Error loading navbar:', error);
    }
}

// 初始化导航栏功能
function initializeNavbar() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    // 汉堡菜单点击事件
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            const mainNav = document.querySelector('.main-nav');
            mainNav.classList.toggle('active');
            
            // 更新汉堡菜单图标
            const hamburger = navToggle.querySelector('.hamburger');
            if (hamburger) {
                hamburger.classList.toggle('active');
            }
        });
    }
    
    // 点击导航链接时关闭菜单（在移动设备上）
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                const mainNav = document.querySelector('.main-nav');
                mainNav.classList.remove('active');
            }
        });
    });
    
    // 点击页面其他地方时关闭菜单（在移动设备上）
    document.addEventListener('click', (event) => {
        if (window.innerWidth <= 768 && 
            !event.target.closest('.main-nav') && 
            !event.target.closest('.nav-toggle')) {
            const mainNav = document.querySelector('.main-nav');
            mainNav.classList.remove('active');
        }
    });
}

// 高亮当前页面对应的导航项
function highlightCurrentPage() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// 页面加载完成后初始化导航栏
document.addEventListener('DOMContentLoaded', loadNavbar);
