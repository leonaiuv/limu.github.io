/**
 * 飞书风格动态背景效果
 * 使用Canvas创建流体动态背景，参考飞书官网风格
 */

document.addEventListener('DOMContentLoaded', function() {
    // 创建背景Canvas
    const bgContainer = document.querySelector('.feishu-bg');
    if (!bgContainer) return;

    const canvas = document.createElement('canvas');
    bgContainer.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    
    // 颜色配置 - 飞书风格的渐变蓝色和橙色
    const colors = {
        primary: [51, 112, 255],    // 飞书蓝色 #3370ff
        secondary: [255, 146, 20],  // 飞书橙色 #ff9214
        tertiary: [11, 189, 135]    // 飞书绿色 #0bbd87
    };
    
    // 粒子配置
    const particles = [];
    const particleCount = 8;
    const maxRadius = Math.max(width, height) * 0.3;
    const minRadius = Math.max(width, height) * 0.1;
    
    // 鼠标交互
    let mouseX = 0;
    let mouseY = 0;
    let interactionStrength = 0;
    
    // 粒子类
    class Particle {
        constructor(x, y, radius, color) {
            this.x = x;
            this.y = y;
            this.radius = radius;
            this.originalRadius = radius;
            this.color = color;
            this.vx = Math.random() * 0.08 - 0.04;
            this.vy = Math.random() * 0.08 - 0.04;
            this.alpha = 0.3 + Math.random() * 0.2;
        }
        
        update() {
            // 基础移动
            this.x += this.vx;
            this.y += this.vy;
            
            // 边界处理
            if (this.x < -this.radius) this.x = width + this.radius;
            if (this.x > width + this.radius) this.x = -this.radius;
            if (this.y < -this.radius) this.y = height + this.radius;
            if (this.y > height + this.radius) this.y = -this.radius;
            
            // 鼠标交互
            const dx = this.x - mouseX;
            const dy = this.y - mouseY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const maxDistance = 300;
            
            if (distance < maxDistance && interactionStrength > 0) {
                const force = (1 - distance / maxDistance) * interactionStrength;
                this.x += dx * force * 0.02;
                this.y += dy * force * 0.02;
            }
        }
        
        draw(ctx) {
            // 创建渐变
            const gradient = ctx.createRadialGradient(
                this.x, this.y, 0,
                this.x, this.y, this.radius
            );
            
            gradient.addColorStop(0, `rgba(${this.color[0]}, ${this.color[1]}, ${this.color[2]}, ${this.alpha})`);
            gradient.addColorStop(1, `rgba(${this.color[0]}, ${this.color[1]}, ${this.color[2]}, 0)`);
            
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    // 初始化粒子
    function initParticles() {
        particles.length = 0;
        
        // 创建主要颜色粒子
        for (let i = 0; i < particleCount; i++) {
            const colorChoice = i % 3;
            let color;
            
            switch(colorChoice) {
                case 0: color = colors.primary; break;
                case 1: color = colors.secondary; break;
                case 2: color = colors.tertiary; break;
            }
            
            const radius = minRadius + Math.random() * (maxRadius - minRadius);
            const x = Math.random() * width;
            const y = Math.random() * height;
            
            particles.push(new Particle(x, y, radius, color));
        }
    }
    
    // 动画循环
    function animate() {
        // 清除画布，设置半透明背景，形成轨迹效果
        ctx.fillStyle = 'rgba(247, 249, 252, 0.9)';
        ctx.fillRect(0, 0, width, height);
        
        // 更新并绘制粒子
        particles.forEach(particle => {
            particle.update();
            particle.draw(ctx);
        });
        
        // 逐渐减弱交互强度
        if (interactionStrength > 0) {
            interactionStrength *= 0.95;
        }
        
        requestAnimationFrame(animate);
    }
    
    // 窗口大小调整
    function handleResize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        initParticles();
    }
    
    // 鼠标移动
    function handleMouseMove(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        interactionStrength = 1;
    }
    
    // 初始化
    window.addEventListener('resize', handleResize);
    document.addEventListener('mousemove', handleMouseMove);
    
    initParticles();
    animate();
    
    // 样式设置
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '-1';
    canvas.style.pointerEvents = 'none';
    
    // 设置背景容器样式
    bgContainer.style.position = 'fixed';
    bgContainer.style.top = '0';
    bgContainer.style.left = '0';
    bgContainer.style.width = '100%';
    bgContainer.style.height = '100%';
    bgContainer.style.zIndex = '-1';
    bgContainer.style.overflow = 'hidden';
}); 