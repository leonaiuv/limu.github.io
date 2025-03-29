// 构建过程控制器
class BuildController {
    constructor() {
        this.currentStep = 0;
        this.progress = 0;
        this.isBuilding = false;
        this.steps = [
            { name: '需求分析', duration: 36000, code: this.getAnalysisCode() },
            { name: '界面设计', duration: 54000, code: this.getDesignCode() },
            { name: '代码生成', duration: 72000, code: this.getImplementationCode() },
            { name: '优化部署', duration: 18000, code: this.getDeploymentCode() }
        ];
        
        this.initializeElements();
        this.initializeEventListeners();
    }

    initializeElements() {
        this.inputSection = document.querySelector('.project-input-section');
        this.buildSection = document.querySelector('.build-animation-section');
        this.progressBar = document.querySelector('.progress-bar');
        this.progressText = document.querySelector('.progress-text');
        this.buildSteps = document.querySelectorAll('.step');
        this.codePreview = document.querySelector('.code-animation');
        this.startButton = document.getElementById('startBuild');
        this.projectDescription = document.getElementById('projectDescription');
    }

    initializeEventListeners() {
        this.startButton.addEventListener('click', () => this.startBuild());
    }

    startBuild() {
        if (this.isBuilding || !this.projectDescription.value.trim()) return;
        
        this.isBuilding = true;
        this.inputSection.style.display = 'none';
        this.buildSection.style.display = 'block';
        
        this.runBuildProcess();
    }

    async runBuildProcess() {
        const totalDuration = this.steps.reduce((acc, step) => acc + step.duration, 0);
        let elapsedTime = 0;

        for (let i = 0; i < this.steps.length; i++) {
            this.currentStep = i;
            this.updateStepStatus();
            
            const step = this.steps[i];
            await this.animateStep(step, elapsedTime, totalDuration);
            elapsedTime += step.duration;
        }

        this.completeBuild();
    }

    async animateStep(step, elapsedTime, totalDuration) {
        return new Promise(resolve => {
            // 更新进度条
            const startProgress = (elapsedTime / totalDuration) * 100;
            const endProgress = ((elapsedTime + step.duration) / totalDuration) * 100;
            
            gsap.to(this, {
                progress: endProgress,
                duration: step.duration / 1000,
                onUpdate: () => {
                    this.progressBar.style.width = `${this.progress}%`;
                    this.progressText.textContent = `${Math.round(this.progress)}%`;
                }
            });

            // 动画显示代码
            this.animateCode(step.code);

            setTimeout(resolve, step.duration);
        });
    }

    animateCode(code) {
        let index = 0;
        const interval = setInterval(() => {
            if (index < code.length) {
                this.codePreview.textContent = code.slice(0, index + 1);
                index++;
            } else {
                clearInterval(interval);
            }
        }, 50);
    }

    updateStepStatus() {
        this.buildSteps.forEach((step, index) => {
            if (index === this.currentStep) {
                step.classList.add('active');
            } else if (index < this.currentStep) {
                step.classList.add('active');
                step.style.opacity = '0.7';
            } else {
                step.classList.remove('active');
                step.style.opacity = '0.5';
            }
        });
    }

    completeBuild() {
        this.isBuilding = false;
        // 这里可以添加构建完成后的操作
    }

    // 模拟代码生成
    getAnalysisCode() {
        return `// 需求分析中...
analyzing requirements...
✓ Project type: Web Application
✓ Frontend framework: React
✓ Backend: Node.js
✓ Database: MongoDB
✓ Features identified: ${this.projectDescription?.value || 'Custom Web Project'}`;
    }

    getDesignCode() {
        return `// 生成界面设计...
generating UI components...
✓ Creating responsive layouts
✓ Implementing material design
✓ Optimizing user experience
✓ Generating style guidelines`;
    }

    getImplementationCode() {
        return `// 代码生成中...
implementing features...
✓ Setting up project structure
✓ Creating React components
✓ Implementing API endpoints
✓ Adding database models
✓ Testing functionality`;
    }

    getDeploymentCode() {
        return `// 优化和部署...
finalizing project...
✓ Optimizing performance
✓ Minifying assets
✓ Configuring deployment
✓ Running final tests
✓ Project ready for deployment`;
    }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    const buildController = new BuildController();
});

// 自定义鼠标效果
document.addEventListener('mousemove', (e) => {
    const cursor = document.querySelector('.cursor-dot');
    const follower = document.querySelector('.cursor-follower');
    
    if (cursor && follower) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        setTimeout(() => {
            follower.style.left = e.clientX + 'px';
            follower.style.top = e.clientY + 'px';
        }, 100);
    }
});

// 添加鼠标悬停效果
document.querySelectorAll('a, button').forEach(element => {
    element.addEventListener('mouseenter', () => {
        const follower = document.querySelector('.cursor-follower');
        if (follower) {
            follower.classList.add('active');
        }
    });
    
    element.addEventListener('mouseleave', () => {
        const follower = document.querySelector('.cursor-follower');
        if (follower) {
            follower.classList.remove('active');
        }
    });
});