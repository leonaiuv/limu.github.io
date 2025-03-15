// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    initializeNavigation();
    initializeConvolutionDemo();
    initializePoolingDemo();
    initializeFullyConnectedDemo();
    initializeCompleteDemo();
});

// 导航功能
function initializeNavigation() {
    const navButtons = document.querySelectorAll('.nav-btn');
    const sections = document.querySelectorAll('.section');

    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetSection = button.dataset.section;
            
            // 更新按钮状态
            navButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // 更新section显示
            sections.forEach(section => {
                section.classList.remove('active');
                if (section.id === targetSection) {
                    section.classList.add('active');
                }
            });
        });
    });
}

// 卷积层演示初始化
function initializeConvolutionDemo() {
    const inputGrid = document.getElementById('input-grid');
    const kernelGrid = document.getElementById('kernel-grid');
    const outputGrid = document.getElementById('output-grid');
    
    // 创建输入网格
    createPixelGrid(inputGrid, 8, 8);
    
    // 创建卷积核网格
    createPixelGrid(kernelGrid, 3, 3);
    
    // 创建输出网格
    createPixelGrid(outputGrid, 6, 6);
    
    // 初始化卷积核选择按钮
    initializeKernelButtons();
    
    // 初始化动画控制
    initializeConvolutionAnimation();
}

// 创建像素网格
function createPixelGrid(container, rows, cols) {
    container.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
    
    for (let i = 0; i < rows * cols; i++) {
        const pixel = document.createElement('div');
        pixel.className = 'pixel';
        pixel.dataset.value = '0';
        pixel.style.backgroundColor = '#fff';
        
        pixel.addEventListener('click', () => {
            const currentValue = parseInt(pixel.dataset.value);
            const newValue = currentValue === 0 ? 1 : 0;
            pixel.dataset.value = newValue;
            pixel.style.backgroundColor = newValue === 1 ? '#3498db' : '#fff';
            
            if (container.id === 'input-grid') {
                updateConvolutionOutput();
            }
        });
        
        container.appendChild(pixel);
    }
}

// 初始化卷积核按钮
function initializeKernelButtons() {
    const kernels = {
        'edge': [
            [-1, -1, -1],
            [-1,  8, -1],
            [-1, -1, -1]
        ],
        'sharpen': [
            [ 0, -1,  0],
            [-1,  5, -1],
            [ 0, -1,  0]
        ],
        'blur': [
            [1/9, 1/9, 1/9],
            [1/9, 1/9, 1/9],
            [1/9, 1/9, 1/9]
        ]
    };

    const kernelButtons = document.querySelectorAll('.kernel-selection button');
    kernelButtons.forEach(button => {
        button.addEventListener('click', () => {
            const kernelType = button.dataset.kernel;
            setKernelValues(kernels[kernelType]);
            updateConvolutionOutput();
        });
    });
}

// 设置卷积核值
function setKernelValues(values) {
    const kernelPixels = document.querySelectorAll('#kernel-grid .pixel');
    kernelPixels.forEach((pixel, index) => {
        const row = Math.floor(index / 3);
        const col = index % 3;
        const value = values[row][col];
        pixel.dataset.value = value;
        pixel.textContent = value.toFixed(2);
        pixel.style.backgroundColor = value > 0 ? '#3498db' : value < 0 ? '#e74c3c' : '#fff';
    });
}

// 更新卷积输出
function updateConvolutionOutput() {
    const inputValues = getGridValues('input-grid', 8, 8);
    const kernelValues = getGridValues('kernel-grid', 3, 3);
    const outputPixels = document.querySelectorAll('#output-grid .pixel');
    
    // 执行卷积操作
    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 6; j++) {
            let sum = 0;
            
            // 对每个3x3的区域进行卷积
            for (let k = 0; k < 3; k++) {
                for (let l = 0; l < 3; l++) {
                    sum += inputValues[i + k][j + l] * kernelValues[k][l];
                }
            }
            
            // 更新输出像素
            const outputIndex = i * 6 + j;
            const normalizedValue = Math.max(0, Math.min(1, (sum + 1) / 2));
            outputPixels[outputIndex].style.backgroundColor = `rgba(52, 152, 219, ${normalizedValue})`;
            outputPixels[outputIndex].dataset.value = sum.toFixed(2);
        }
    }
}

// 获取网格值
function getGridValues(gridId, rows, cols) {
    const pixels = document.querySelectorAll(`#${gridId} .pixel`);
    const values = [];
    
    for (let i = 0; i < rows; i++) {
        values[i] = [];
        for (let j = 0; j < cols; j++) {
            values[i][j] = parseFloat(pixels[i * cols + j].dataset.value);
        }
    }
    
    return values;
}

// 初始化卷积动画
function initializeConvolutionAnimation() {
    let animationInterval;
    let currentPosition = { row: 0, col: 0 };
    
    document.getElementById('start-conv').addEventListener('click', () => {
        if (!animationInterval) {
            startConvolutionAnimation();
        }
    });
    
    document.getElementById('pause-conv').addEventListener('click', () => {
        clearInterval(animationInterval);
        animationInterval = null;
    });
    
    document.getElementById('step-conv').addEventListener('click', () => {
        clearInterval(animationInterval);
        animationInterval = null;
        performConvolutionStep();
    });
    
    function startConvolutionAnimation() {
        currentPosition = { row: 0, col: 0 };
        animationInterval = setInterval(performConvolutionStep, 500);
    }
    
    function performConvolutionStep() {
        // 移除之前的高亮
        document.querySelectorAll('.highlight').forEach(el => {
            el.classList.remove('highlight');
        });
        
        // 高亮当前卷积区域
        highlightConvolutionArea(currentPosition.row, currentPosition.col);
        
        // 更新位置
        currentPosition.col++;
        if (currentPosition.col > 5) {
            currentPosition.col = 0;
            currentPosition.row++;
            if (currentPosition.row > 5) {
                clearInterval(animationInterval);
                animationInterval = null;
                return;
            }
        }
    }
    
    function highlightConvolutionArea(row, col) {
        // 高亮输入区域
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                const inputPixel = document.querySelector(
                    `#input-grid .pixel:nth-child(${(row + i) * 8 + col + j + 1})`
                );
                inputPixel.classList.add('highlight');
            }
        }
        
        // 高亮输出像素
        const outputPixel = document.querySelector(
            `#output-grid .pixel:nth-child(${row * 6 + col + 1})`
        );
        outputPixel.classList.add('highlight');
    }
}

// 池化层演示初始化
function initializePoolingDemo() {
    const inputGrid = document.getElementById('pooling-input');
    const outputGrid = document.getElementById('pooling-output');
    
    // 创建输入网格
    createPixelGrid(inputGrid, 6, 6);
    
    // 创建输出网格
    createPixelGrid(outputGrid, 3, 3);
    
    // 初始化池化控制
    initializePoolingControls();
}

// 初始化池化控制
function initializePoolingControls() {
    const poolingButtons = document.querySelectorAll('.pooling-options button');
    const poolSizeSelect = document.getElementById('pool-size');
    
    poolingButtons.forEach(button => {
        button.addEventListener('click', () => {
            poolingButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            updatePoolingOutput();
        });
    });
    
    poolSizeSelect.addEventListener('change', updatePoolingOutput);
}

// 更新池化输出
function updatePoolingOutput() {
    const inputValues = getGridValues('pooling-input', 6, 6);
    const poolingType = document.querySelector('.pooling-options button.active').dataset.pooling;
    const poolSize = parseInt(document.getElementById('pool-size').value);
    const outputPixels = document.querySelectorAll('#pooling-output .pixel');
    
    const outputSize = Math.floor(6 / poolSize);
    
    for (let i = 0; i < outputSize; i++) {
        for (let j = 0; j < outputSize; j++) {
            let poolValue;
            
            if (poolingType === 'max') {
                poolValue = getMaxPoolValue(inputValues, i * poolSize, j * poolSize, poolSize);
            } else {
                poolValue = getAvgPoolValue(inputValues, i * poolSize, j * poolSize, poolSize);
            }
            
            const outputIndex = i * outputSize + j;
            outputPixels[outputIndex].style.backgroundColor = `rgba(52, 152, 219, ${poolValue})`;
            outputPixels[outputIndex].dataset.value = poolValue.toFixed(2);
        }
    }
}

// 获取最大池化值
function getMaxPoolValue(values, startRow, startCol, size) {
    let max = -Infinity;
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            max = Math.max(max, values[startRow + i][startCol + j]);
        }
    }
    return max;
}

// 获取平均池化值
function getAvgPoolValue(values, startRow, startCol, size) {
    let sum = 0;
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            sum += values[startRow + i][startCol + j];
        }
    }
    return sum / (size * size);
}

// 全连接层演示初始化
function initializeFullyConnectedDemo() {
    createNeurons();
    initializeWeights();
    setupNeuronInteraction();
}

// 创建神经元
function createNeurons() {
    const layers = {
        'input-layer': 4,
        'hidden-layer': 6,
        'output-layer': 3
    };
    
    Object.entries(layers).forEach(([layerId, count]) => {
        const container = document.querySelector(`#${layerId} .neurons`);
        container.innerHTML = '';
        
        for (let i = 0; i < count; i++) {
            const neuron = document.createElement('div');
            neuron.className = 'neuron';
            neuron.dataset.layerId = layerId;
            neuron.dataset.index = i;
            container.appendChild(neuron);
        }
    });
}

// 初始化权重
function initializeWeights() {
    window.networkWeights = {
        'input-hidden': Array(4).fill().map(() => Array(6).fill().map(() => Math.random() * 2 - 1)),
        'hidden-output': Array(6).fill().map(() => Array(3).fill().map(() => Math.random() * 2 - 1))
    };
}

// 设置神经元交互
function setupNeuronInteraction() {
    const neurons = document.querySelectorAll('.neuron');
    const computationDisplay = document.querySelector('.computation-display');
    
    neurons.forEach(neuron => {
        neuron.addEventListener('click', () => {
            // 移除其他神经元的高亮
            neurons.forEach(n => n.classList.remove('active'));
            neuron.classList.add('active');
            
            // 显示权重和计算过程
            showNeuronComputation(neuron, computationDisplay);
        });
    });
    
    // 随机初始化权重按钮
    document.getElementById('randomize-weights').addEventListener('click', () => {
        initializeWeights();
        const activeNeuron = document.querySelector('.neuron.active');
        if (activeNeuron) {
            showNeuronComputation(activeNeuron, computationDisplay);
        }
    });
}

// 显示神经元计算过程
function showNeuronComputation(neuron, display) {
    const layerId = neuron.dataset.layerId;
    const index = parseInt(neuron.dataset.index);
    
    let html = '<h4>神经元计算过程</h4>';
    
    if (layerId === 'input-layer') {
        html += '<p>输入层神经元，直接接收输入值</p>';
    } else if (layerId === 'hidden-layer') {
        html += `<p>隐藏层神经元 ${index + 1}:</p>`;
        html += '<p>输入权重:</p><ul>';
        window.networkWeights['input-hidden'].forEach((weights, i) => {
            html += `<li>从输入 ${i + 1}: ${weights[index].toFixed(3)}</li>`;
        });
        html += '</ul>';
    } else {
        html += `<p>输出层神经元 ${index + 1}:</p>`;
        html += '<p>输入权重:</p><ul>';
        window.networkWeights['hidden-output'].forEach((weights, i) => {
            html += `<li>从隐藏层 ${i + 1}: ${weights[index].toFixed(3)}</li>`;
        });
        html += '</ul>';
    }
    
    display.innerHTML = html;
}

// 初始化完整网络演示
function initializeCompleteDemo() {
    // 加载示例图片按钮
    document.getElementById('load-sample').addEventListener('click', loadSampleImage);
    
    // 开始演示按钮
    document.getElementById('start-demo').addEventListener('click', startNetworkDemo);
    
    // 单步执行按钮
    document.getElementById('step-demo').addEventListener('click', stepNetworkDemo);
    
    // 重置按钮
    document.getElementById('reset-demo').addEventListener('click', resetNetworkDemo);
}

// 示例图片数据
const sampleImages = [
    {
        name: '数字识别示例',
        data: [
            [0,0,0,0,0,0,0,0],
            [0,0,1,1,1,1,0,0],
            [0,0,0,0,0,1,0,0],
            [0,0,0,1,1,0,0,0],
            [0,0,1,0,0,0,0,0],
            [0,0,1,1,1,1,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0]
        ]
    },
    {
        name: '简单边缘示例',
        data: [
            [0,0,0,0,0,0,0,0],
            [0,1,1,1,1,1,1,0],
            [0,1,0,0,0,0,1,0],
            [0,1,0,0,0,0,1,0],
            [0,1,0,0,0,0,1,0],
            [0,1,0,0,0,0,1,0],
            [0,1,1,1,1,1,1,0],
            [0,0,0,0,0,0,0,0]
        ]
    }
];

// 加载示例图片
function loadSampleImage() {
    const inputGrid = document.getElementById('input-grid');
    if (!inputGrid) return;

    // 随机选择一个示例图片
    const sample = sampleImages[Math.floor(Math.random() * sampleImages.length)];
    
    // 更新输入网格
    const pixels = inputGrid.querySelectorAll('.pixel');
    pixels.forEach((pixel, index) => {
        const row = Math.floor(index / 8);
        const col = index % 8;
        const value = sample.data[row][col];
        pixel.dataset.value = value;
        pixel.style.backgroundColor = value === 1 ? '#3498db' : '#fff';
    });

    // 触发卷积输出更新
    updateConvolutionOutput();
    
    // 显示提示信息
    alert(`已加载示例图片：${sample.name}`);
}

let demoState = {
    currentStage: 0,
    stages: ['input', 'conv1', 'pool1', 'conv2', 'pool2', 'fc', 'output'],
    isRunning: false
};

// 开始网络演示
function startNetworkDemo() {
    if (!demoState.isRunning) {
        demoState.isRunning = true;
        demoState.currentStage = 0;
        runDemoAnimation();
    }
}

// 单步执行网络演示
function stepNetworkDemo() {
    if (!demoState.isRunning) {
        performDemoStep();
    }
}

// 重置网络演示
function resetNetworkDemo() {
    demoState.isRunning = false;
    demoState.currentStage = 0;
    updateProgressBar(0);
    clearStageHighlights();
}

// 运行演示动画
function runDemoAnimation() {
    if (!demoState.isRunning) return;
    
    performDemoStep();
    
    if (demoState.currentStage < demoState.stages.length) {
        setTimeout(runDemoAnimation, 1500);
    } else {
        demoState.isRunning = false;
    }
}

// 执行演示步骤
function performDemoStep() {
    if (demoState.currentStage >= demoState.stages.length) {
        demoState.isRunning = false;
        return;
    }
    
    const progress = (demoState.currentStage + 1) / demoState.stages.length;
    updateProgressBar(progress);
    
    // 更新阶段高亮
    clearStageHighlights();
    const currentStageId = demoState.stages[demoState.currentStage];
    document.getElementById(`${currentStageId}-stage`).classList.add('active');
    
    // 更新阶段描述
    updateStageDescription(currentStageId);
    
    demoState.currentStage++;
}

// 更新进度条
function updateProgressBar(progress) {
    const progressBar = document.querySelector('.progress-bar');
    progressBar.style.width = `${progress * 100}%`;
}

// 清除阶段高亮
function clearStageHighlights() {
    document.querySelectorAll('.stage').forEach(stage => {
        stage.classList.remove('active');
    });
}

// 更新阶段描述
function updateStageDescription(stageId) {
    const descriptions = {
        'input': '处理输入图像',
        'conv1': '第一次卷积操作，提取低级特征',
        'pool1': '第一次池化操作，降维压缩',
        'conv2': '第二次卷积操作，提取高级特征',
        'pool2': '第二次池化操作，进一步压缩',
        'fc': '全连接层处理，特征组合',
        'output': '输出最终结果'
    };
    
    const descriptionElement = document.querySelector('.stage-description');
    descriptionElement.textContent = descriptions[stageId] || '';
}
