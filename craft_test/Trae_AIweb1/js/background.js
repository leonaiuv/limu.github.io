// 背景动画效果
document.addEventListener('DOMContentLoaded', () => {
    initBackground();
});

function initBackground() {
    const backgroundContainer = document.getElementById('background');
    
    if (!backgroundContainer) return;
    
    // 创建Three.js场景
    const scene = new THREE.Scene();
    
    // 创建相机
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 20;
    
    // 创建渲染器
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    backgroundContainer.appendChild(renderer.domElement);
    
    // 创建粒子系统
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1500;
    
    const posArray = new Float32Array(particlesCount * 3);
    const colorsArray = new Float32Array(particlesCount * 3);
    
    // 设置粒子位置和颜色
    for (let i = 0; i < particlesCount * 3; i += 3) {
        // 位置
        posArray[i] = (Math.random() - 0.5) * 50;
        posArray[i + 1] = (Math.random() - 0.5) * 50;
        posArray[i + 2] = (Math.random() - 0.5) * 50;
        
        // 颜色 - 使用主题色的渐变
        const colorIndex = Math.random();
        if (colorIndex < 0.33) {
            // 主色调
            colorsArray[i] = 108/255; // R
            colorsArray[i + 1] = 99/255; // G
            colorsArray[i + 2] = 255/255; // B
        } else if (colorIndex < 0.66) {
            // 次色调
            colorsArray[i] = 255/255; // R
            colorsArray[i + 1] = 101/255; // G
            colorsArray[i + 2] = 132/255; // B
        } else {
            // 强调色
            colorsArray[i] = 0/255; // R
            colorsArray[i + 1] = 217/255; // G
            colorsArray[i + 2] = 255/255; // B
        }
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorsArray, 3));
    
    // 粒子材质
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.1,
        transparent: true,
        opacity: 0.8,
        vertexColors: true,
        blending: THREE.AdditiveBlending
    });
    
    // 创建粒子系统
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);
    
    // 添加连接线
    const lineMaterial = new THREE.LineBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.1
    });
    
    // 创建连接线几何体
    const lineGeometry = new THREE.BufferGeometry();
    const linePositions = new Float32Array(particlesCount * 6); // 每条线有两个点，每个点有xyz坐标
    lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    
    // 创建连接线
    const lineMesh = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lineMesh);
    
    // 鼠标交互
    let mouseX = 0;
    let mouseY = 0;
    
    document.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    });
    
    // 窗口大小调整
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
    
    // 动画循环
    function animate() {
        requestAnimationFrame(animate);
        
        // 旋转粒子系统
        particlesMesh.rotation.x += 0.0005;
        particlesMesh.rotation.y += 0.0005;
        
        // 根据鼠标位置调整旋转
        particlesMesh.rotation.x += mouseY * 0.0005;
        particlesMesh.rotation.y += mouseX * 0.0005;
        
        // 更新粒子位置
        const positions = particlesMesh.geometry.attributes.position.array;
        
        // 更新连接线
        let lineIndex = 0;
        const linePositions = lineMesh.geometry.attributes.position.array;
        
        // 为一些粒子创建连接线
        for (let i = 0; i < particlesCount; i += 20) {
            const ix = positions[i * 3];
            const iy = positions[i * 3 + 1];
            const iz = positions[i * 3 + 2];
            
            for (let j = i + 1; j < i + 10 && j < particlesCount; j += 5) {
                const jx = positions[j * 3];
                const jy = positions[j * 3 + 1];
                const jz = positions[j * 3 + 2];
                
                // 计算距离
                const distance = Math.sqrt(
                    Math.pow(ix - jx, 2) +
                    Math.pow(iy - jy, 2) +
                    Math.pow(iz - jz, 2)
                );
                
                // 如果距离小于阈值，创建连接线
                if (distance < 5) {
                    // 第一个点
                    linePositions[lineIndex++] = ix;
                    linePositions[lineIndex++] = iy;
                    linePositions[lineIndex++] = iz;
                    
                    // 第二个点
                    linePositions[lineIndex++] = jx;
                    linePositions[lineIndex++] = jy;
                    linePositions[lineIndex++] = jz;
                }
            }
        }
        
        // 更新连接线几何体
        lineMesh.geometry.attributes.position.needsUpdate = true;
        
        // 渲染场景
        renderer.render(scene, camera);
    }
    
    animate();
    
    // 添加浮动立方体
    const cubeContainer = document.querySelector('.floating-cube');
    if (cubeContainer) {
        createFloatingCube(cubeContainer);
    }
}

// 创建浮动立方体
function createFloatingCube(container) {
    // 创建立方体的六个面
    const faces = ['front', 'back', 'right', 'left', 'top', 'bottom'];
    const colors = [
        'rgba(108, 99, 255, 0.7)',  // 主色
        'rgba(255, 101, 132, 0.7)',  // 次色
        'rgba(0, 217, 255, 0.7)',    // 强调色
        'rgba(108, 99, 255, 0.7)',   // 主色
        'rgba(255, 101, 132, 0.7)',  // 次色
        'rgba(0, 217, 255, 0.7)'     // 强调色
    ];
    
    // 清空容器
    container.innerHTML = '';
    
    // 创建立方体
    const cube = document.createElement('div');
    cube.className = 'cube';
    container.appendChild(cube);
    
    // 添加立方体样式
    const style = document.createElement('style');
    style.textContent = `
        .cube {
            width: 100%;
            height: 100%;
            position: relative;
            transform-style: preserve-3d;
            transform: rotateX(20deg) rotateY(45deg);
            animation: cubeSpin 20s infinite linear;
        }
        
        .cube-face {
            position: absolute;
            width: 100%;
            height: 100%;
            border: 1px solid rgba(255, 255, 255, 0.3);
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 2rem;
            color: white;
            text-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
            backdrop-filter: blur(5px);
        }
        
        .cube-face.front { transform: translateZ(150px); }
        .cube-face.back { transform: rotateY(180deg) translateZ(150px); }
        .cube-face.right { transform: rotateY(90deg) translateZ(150px); }
        .cube-face.left { transform: rotateY(-90deg) translateZ(150px); }
        .cube-face.top { transform: rotateX(90deg) translateZ(150px); }
        .cube-face.bottom { transform: rotateX(-90deg) translateZ(150px); }
        
        @keyframes cubeSpin {
            0% { transform: rotateX(20deg) rotateY(0); }
            100% { transform: rotateX(20deg) rotateY(360deg); }
        }
        
        .cube-face::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(45deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%);
            z-index: -1;
        }
    `;
    document.head.appendChild(style);
    
    // 创建立方体的六个面
    faces.forEach((face, index) => {
        const faceElement = document.createElement('div');
        faceElement.className = `cube-face ${face}`;
        faceElement.style.backgroundColor = colors[index];
        
        // 添加图标或内容
        const icon = document.createElement('i');
        
        switch(index) {
            case 0: // 前面
                icon.className = 'fas fa-code';
                break;
            case 1: // 后面
                icon.className = 'fas fa-paint-brush';
                break;
            case 2: // 右面
                icon.className = 'fas fa-mobile-alt';
                break;
            case 3: // 左面
                icon.className = 'fas fa-desktop';
                break;
            case 4: // 上面
                icon.className = 'fas fa-lightbulb';
                break;
            case 5: // 下面
                icon.className = 'fas fa-rocket';
                break;
        }
        
        faceElement.appendChild(icon);
        cube.appendChild(faceElement);
    });
}