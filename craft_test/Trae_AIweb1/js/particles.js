// 粒子动画系统
document.addEventListener('DOMContentLoaded', () => {
    initParticleSystem();
});

function initParticleSystem() {
    // 创建画布
    const canvas = document.createElement('canvas');
    canvas.classList.add('particle-canvas');
    document.getElementById('background').appendChild(canvas);
    
    // 设置画布大小
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // 获取绘图上下文
    const ctx = canvas.getContext('2d');
    
    // 粒子数组
    let particles = [];
    
    // 鼠标位置
    let mouse = {
        x: null,
        y: null,
        radius: 150
    };
    
    // 监听鼠标移动
    window.addEventListener('mousemove', function(event) {
        mouse.x = event.x;
        mouse.y = event.y;
    });
    
    // 监听窗口大小变化
    window.addEventListener('resize', function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        init();
    });
    
    // 监听鼠标离开窗口
    window.addEventListener('mouseout', function() {
        mouse.x = undefined;
        mouse.y = undefined;
    });
    
    // 粒子类
    class Particle {
        constructor(x, y, size, color, weight) {
            this.x = x;
            this.y = y;
            this.size = size;
            this.color = color;
            this.weight = weight;
            this.originalSize = size;
            this.originalX = x;
            this.originalY = y;
            this.density = (Math.random() * 30) + 1;
            this.connectDistance = 150;
        }
        
        // 绘制粒子
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.closePath();
            ctx.fill();
        }
        
        // 更新粒子位置和大小
        update() {
            // 检查鼠标位置
            let dx = mouse.x - this.x;
            let dy = mouse.y - this.y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            let forceDirectionX = dx / distance;
            let forceDirectionY = dy / distance;
            
            // 最大距离，超过此距离的粒子不受鼠标影响
            const maxDistance = 100;
            let force = (maxDistance - distance) / maxDistance;
            
            // 如果力小于0，设置为0
            if (force < 0) force = 0;
            
            // 随机运动
            let directionX = (Math.random() * 0.4) - 0.2;
            let directionY = (Math.random() * 0.4) - 0.2;
            
            // 如果鼠标在画布内且粒子在鼠标影响范围内
            if (distance < mouse.radius && mouse.x !== undefined) {
                this.size = this.originalSize + 3;
                this.x += forceDirectionX * force * this.density;
                this.y += forceDirectionY * force * this.density;
            } else {
                // 如果粒子不在原位，逐渐回到原位
                if (this.x !== this.originalX) {
                    let dx = this.x - this.originalX;
                    this.x -= dx / 10;
                }
                if (this.y !== this.originalY) {
                    let dy = this.y - this.originalY;
                    this.y -= dy / 10;
                }
                
                // 添加一些随机运动
                this.x += directionX;
                this.y += directionY;
                
                // 边界检查
                if (this.x < 0 || this.x > canvas.width) {
                    this.x = this.originalX;
                }
                if (this.y < 0 || this.y > canvas.height) {
                    this.y = this.originalY;
                }
                
                // 恢复原始大小
                if (this.size > this.originalSize) {
                    this.size -= 0.1;
                }
            }
            
            this.draw();
        }
        
        // 连接附近的粒子
        connect() {
            for (let i = 0; i < particles.length; i++) {
                let dx = this.x - particles[i].x;
                let dy = this.y - particles[i].y;
                let distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < this.connectDistance) {
                    // 根据距离计算线条透明度
                    let opacity = 1 - (distance / this.connectDistance);
                    
                    // 设置线条样式
                    ctx.strokeStyle = `rgba(${this.color}, ${opacity * 0.8})`;
                    ctx.lineWidth = 0.5;
                    
                    // 绘制线条
                    ctx.beginPath();
                    ctx.moveTo(this.x, this.y);
                    ctx.lineTo(particles[i].x, particles[i].y);
                    ctx.stroke();
                }
            }
        }
    }
    
    // 初始化粒子
    function init() {
        particles = [];
        
        // 粒子数量根据屏幕大小调整
        let numberOfParticles = (canvas.width * canvas.height) / 9000;
        if (numberOfParticles > 150) numberOfParticles = 150;
        if (window.innerWidth < 768) numberOfParticles = 80;
        
        // 创建粒子
        for (let i = 0; i < numberOfParticles; i++) {
            let size = (Math.random() * 2) + 1;
            let x = (Math.random() * ((canvas.width - size * 2) - (size * 2)) + size * 2);
            let y = (Math.random() * ((canvas.height - size * 2) - (size * 2)) + size * 2);
            
            // 随机选择颜色
            let colorChoice = Math.random();
            let color;
            
            if (colorChoice < 0.33) {
                // 主色调 - 紫色
                color = "108, 99, 255";
            } else if (colorChoice < 0.66) {
                // 次色调 - 粉色
                color = "255, 101, 132";
            } else {
                // 强调色 - 青色
                color = "0, 217, 255";
            }
            
            let weight = (Math.random() * 2) + 0.1;
            
            particles.push(new Particle(x, y, size, color, weight));
        }
    }
    
    // 动画循环
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].connect();
        }
        
        requestAnimationFrame(animate);
    }
    
    // 初始化并开始动画
    init();
    animate();
}