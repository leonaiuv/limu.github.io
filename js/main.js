// 等待DOM内容加载完成
document.addEventListener('DOMContentLoaded', function() {
    // 只在作品展示页面执行过滤功能
    if (document.querySelector('.works-filter')) {
        setupWorkFilters();
    }
    
    // 添加滚动淡入效果
    addScrollAnimations();
    
    // 平滑滚动所有锚点链接
    setupSmoothScrolling();
});

/**
 * 设置作品过滤功能
 */
function setupWorkFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const workItems = document.querySelectorAll('.work-item');
    const worksContainer = document.querySelector('.works-container');
    
    // 初始化一个对象来存储每个分类的作品数量
    let categoryCounts = {};
    
    // 为每个过滤按钮添加点击事件
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // 移除所有按钮的active类
            filterButtons.forEach(btn => {
                btn.classList.remove('active');
            });
            
            // 为当前点击的按钮添加active类
            this.classList.add('active');
            
            // 获取过滤类别
            const filterValue = this.getAttribute('data-filter');
            
            // 修复：防止容器跳动，先设置最小高度
            const containerHeight = worksContainer.offsetHeight;
            worksContainer.style.minHeight = `${containerHeight}px`;
            
            // 获取即将显示的项目数量
            let visibleCount = 0;
            if (filterValue === 'all') {
                visibleCount = workItems.length;
            } else {
                visibleCount = Array.from(workItems).filter(item => 
                    item.getAttribute('data-category') === filterValue
                ).length;
            }
            
            // 先隐藏所有项目
            workItems.forEach(item => {
                item.style.animation = 'fadeOut 0.3s ease forwards';
                item.style.position = 'absolute';
                item.style.opacity = '0';
            });
            
            // 等待淡出动画完成
            setTimeout(() => {
                // 应用网格布局修复
                if(visibleCount === 1) {
                    worksContainer.style.gridTemplateColumns = 'minmax(320px, 1fr)';
                } else if(visibleCount === 2) {
                    worksContainer.style.gridTemplateColumns = 'repeat(2, minmax(320px, 1fr))';
                } else {
                    worksContainer.style.gridTemplateColumns = 'repeat(auto-fill, minmax(320px, 1fr))';
                }
                
                // 显示符合条件的项目
                let visibleIndex = 0;
                workItems.forEach(item => {
                    if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                        // 设置回正常位置
                        item.style.position = 'relative';
                        item.style.display = 'block';
                        
                        // 添加渐入动画，带延迟
                        const delay = visibleIndex * 0.08;
                        item.style.animation = `fadeIn 0.5s ease ${delay}s forwards`;
                        visibleIndex++;
                    } else {
                        item.style.display = 'none';
                    }
                });
                
                // 动画完成后重置容器高度
                setTimeout(() => {
                    worksContainer.style.minHeight = 'auto';
                }, 500); // 比最长的动画时间稍长一点
                
            }, 300); // 等待淡出动画完成
        });
    });
}

/**
 * 设置平滑滚动
 */
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                scrollToElement(target.id);
            }
        });
    });
}

/**
 * 添加滚动动画效果
 */
function addScrollAnimations() {
    // 监听滚动，为进入视口的元素添加动画效果
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // 监视所有段落和标题
    document.querySelectorAll('section > div > p, section > div > h2, .about-text > ul').forEach(el => {
        el.classList.add('fade-up');
        observer.observe(el);
    });
}

/**
 * 平滑滚动到页面指定位置
 * @param {string} elementId - 目标元素的ID
 */
function scrollToElement(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        window.scrollTo({
            top: element.offsetTop - 70, // 70px是导航栏的高度
            behavior: 'smooth'
        });
    }
} 