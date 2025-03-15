// 3D模型展示系统
document.addEventListener('DOMContentLoaded', () => {
    init3DModels();
});

function init3DModels() {
    // 创建3D场景
    const scene = new THREE.Scene();
    
    // 创建透视相机
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;
    
    // 创建渲染器
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth / 2, window.innerHeight / 2);
    renderer.setPixelRatio(window.devicePixelRatio);
    
    // 创建3D模型容器
    const modelContainer = document.createElement('div');
    modelContainer.classList.add('model-container');
    modelContainer.style.position = 'absolute';
    modelContainer.style.top = '50%';
    modelContainer.style.right = '10%';
    modelContainer.style.transform = 'translateY(-50%)';
    modelContainer.style.zIndex = '1';
    modelContainer.style.pointerEvents = 'none';
    document.querySelector('.hero-section').appendChild(modelContainer);
    
    // 将渲染器的DOM元素添加到容器中
    modelContainer.appendChild(renderer.domElement);
    
    // 创建立方体网格
    const cubeGroup = new THREE.Group();
    scene.add(cubeGroup);
    
    // 创建多个立方体
    const cubeSize = 0.3;
    const gap = 0.2;
    const gridSize = 3;
    
    // 材质数组 - 使用主题色
    const materials = [
        new THREE.MeshPhongMaterial({ color: 0x6c63ff, transparent: true, opacity: 0.8 }),
        new THREE.MeshPhongMaterial({ color: 0xff6584, transparent: true, opacity: 0.8 }),
        new THREE.MeshPhongMaterial({ color: 0x00d9ff, transparent: true, opacity: 0.8 })
    ];
    
    // 创建立方体网格
    for (let x = -gridSize; x <= gridSize; x++) {
        for (let y = -gridSize; y <= gridSize; y++) {
            for (let z = -gridSize; z <= gridSize; z++) {
                // 只创建外层立方体，跳过内部的
                if (
                    Math.abs(x) < gridSize && 
                    Math.abs(y) < gridSize && 
                    Math.abs(z) < gridSize
                ) {
                    continue;
                }
                
                // 随机选择材质
                const material = materials[Math.floor(Math.random() * materials.length)];
                
                // 创建几何体和网格
                const geometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
                const cube = new THREE.Mesh(geometry, material);
                
                // 设置位置
                cube.position.set(
                    x * (cubeSize + gap),
                    y * (cubeSize + gap),
                    z * (cubeSize + gap)
                );
                
                // 添加到组中
                cubeGroup.add(cube);
            }
        }
    }
    
    // 添加环境光
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    // 添加方向光
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);
    
    // 鼠标交互
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;
    
    // 监听鼠标移动
    document.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX - windowHalfX) / 100;
        mouseY = (event.clientY - windowHalfY) / 100;
    });
    
    // 监听滚动事件
    let scrollY = 0;
    window.addEventListener('scroll', () => {
        scrollY = window.scrollY;
    });
    
    // 窗口大小调整
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth / 2, window.innerHeight / 2);
    });
    
    // 动画循环
    function animate() {
        requestAnimationFrame(animate);
        
        // 平滑过渡到目标旋转
        targetX = mouseX * 0.5;
        targetY = mouseY * 0.5;
        
        // 应用旋转
        cubeGroup.rotation.y += 0.05 * (targetX - cubeGroup.rotation.y);
        cubeGroup.rotation.x += 0.05 * (targetY - cubeGroup.rotation.x);
        
        // 添加一些自动旋转
        cubeGroup.rotation.y += 0.003;
        cubeGroup.rotation.z += 0.001;
        
        // 根据滚动位置调整缩放
        const scrollFactor = 1 + (scrollY * 0.0005);
        cubeGroup.scale.set(scrollFactor, scrollFactor, scrollFactor);
        
        // 渲染场景
        renderer.render(scene, camera);
    }
    
    // 开始动画
    animate();
    
    // 添加视差效果
    function parallaxEffect() {
        // 获取所有立方体
        cubeGroup.children.forEach((cube, index) => {
            // 为每个立方体设置不同的动画
            gsap.to(cube.position, {
                x: cube.position.x + (Math.random() * 0.1 - 0.05),
                y: cube.position.y + (Math.random() * 0.1 - 0.05),
                z: cube.position.z + (Math.random() * 0.1 - 0.05),
                duration: 2,
                ease: 'power1.inOut',
                repeat: -1,
                yoyo: true,
                delay: index * 0.01
            });
        });
    }
    
    // 启动视差效果
    parallaxEffect();
}