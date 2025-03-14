document.addEventListener('DOMContentLoaded', function() {
    // 初始化3D可视化
    initTable3DVisualization();
    
    // 初始化结构高亮功能
    initStructureHighlighting();
    
    // 初始化样式调整面板
    initStyleControls();
    
    // 初始化表格构建器
    initTableBuilder();
    
    // 初始化AI聊天功能
    initAIChat();
});

// 3D可视化功能
function initTable3DVisualization() {
    const container = document.getElementById('table3DContainer');
    if (!container) return;
    
    // 创建场景
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf5f5f5);
    
    // 创建相机
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.z = 5;
    camera.position.y = 2;
    
    // 创建渲染器
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);
    
    // 添加轨道控制
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    
    // 创建灯光
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);
    
    // 创建表格3D模型
    const tableGroup = createTable3DModel();
    scene.add(tableGroup);
    
    // 动画循环
    function animate() {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
    }
    animate();
    
    // 窗口大小调整
    window.addEventListener('resize', function() {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    });
    
    // 按钮事件
    document.getElementById('rotateModel').addEventListener('click', function() {
        const timeline = gsap.timeline();
        timeline.to(tableGroup.rotation, { y: tableGroup.rotation.y + Math.PI * 2, duration: 2, ease: 'power1.inOut' });
    });
    
    document.getElementById('explodeModel').addEventListener('click', function() {
        explodeTableModel(tableGroup);
    });
    
    document.getElementById('resetModel').addEventListener('click', function() {
        resetTableModel(tableGroup);
        tableGroup.rotation.set(0, 0, 0);
    });
}

// 创建表格3D模型
function createTable3DModel() {
    const group = new THREE.Group();
    
    // 表格容器
    const tableGeometry = new THREE.BoxGeometry(4, 0.2, 3);
    const tableMaterial = new THREE.MeshPhongMaterial({ color: 0x4285f4, transparent: true, opacity: 0.7 });
    const table = new THREE.Mesh(tableGeometry, tableMaterial);
    table.userData.originalPosition = { x: 0, y: 0, z: 0 };
    table.userData.type = 'table';
    group.add(table);
    
    // 表头
    const theadGeometry = new THREE.BoxGeometry(4, 0.2, 0.8);
    const theadMaterial = new THREE.MeshPhongMaterial({ color: 0x34a853, transparent: true, opacity: 0.7 });
    const thead = new THREE.Mesh(theadGeometry, theadMaterial);
    thead.position.z = -1.1;
    thead.userData.originalPosition = { x: 0, y: 0, z: -1.1 };
    thead.userData.type = 'thead';
    group.add(thead);
    
    // 表体
    const tbodyGeometry = new THREE.BoxGeometry(4, 0.2, 1.4);
    const tbodyMaterial = new THREE.MeshPhongMaterial({ color: 0xfbbc05, transparent: true, opacity: 0.7 });
    const tbody = new THREE.Mesh(tbodyGeometry, tbodyMaterial);
    tbody.position.z = 0;
    tbody.userData.originalPosition = { x: 0, y: 0, z: 0 };
    tbody.userData.type = 'tbody';
    group.add(tbody);
    
    // 表尾
    const tfootGeometry = new THREE.BoxGeometry(4, 0.2, 0.8);
    const tfootMaterial = new THREE.MeshPhongMaterial({ color: 0xea4335, transparent: true, opacity: 0.7 });
    const tfoot = new THREE.Mesh(tfootGeometry, tfootMaterial);
    tfoot.position.z = 1.1;
    tfoot.userData.originalPosition = { x: 0, y: 0, z: 1.1 };
    tfoot.userData.type = 'tfoot';
    group.add(tfoot);
    
    // 添加行和单元格
    addRowsAndCells(group);
    
    return group;
}

// 爆炸视图
function explodeTableModel(group) {
    group.children.forEach(child => {
        const originalPos = child.userData.originalPosition;
        const type = child.userData.type;
        let targetY = originalPos.y;
        
        switch(type) {
            case 'table':
                targetY = -1;
                break;
            case 'thead':
                targetY = 1.5;
                break;
            case 'tbody':
                targetY = 1;
                break;
            case 'tfoot':
                targetY = 0.5;
                break;
            case 'tr':
                targetY = 2;
                break;
            case 'th':
            case 'td':
                targetY = 2.5;
                break;
        }
        
        gsap.to(child.position, {
            y: targetY,
            duration: 1,
            ease: 'power1.out'
        });
    });
}

// 重置模型
function resetTableModel(group) {
    group.children.forEach(child => {
        const originalPos = child.userData.originalPosition;
        gsap.to(child.position, {
            x: originalPos.x,
            y: originalPos.y,
            z: originalPos.z,
            duration: 1,
            ease: 'power1.out'
        });
    });
}

// 添加行和单元格
function addRowsAndCells(group) {
    // 表头行
    const thRowGeometry = new THREE.BoxGeometry(3.8, 0.1, 0.7);
    const thRowMaterial = new THREE.MeshPhongMaterial({ color: 0x34a853, transparent: true, opacity: 0.9 });
    const thRow = new THREE.Mesh(thRowGeometry, thRowMaterial);
    thRow.position.set(0, 0.15, -1.1);
    thRow.userData.originalPosition = { x: 0, y: 0.15, z: -1.1 };
    thRow.userData.type = 'tr';
    group.add(thRow);
    
    // 表头单元格
    const thCell1Geometry = new THREE.BoxGeometry(1.8, 0.1, 0.6);
    const thCellMaterial = new THREE.MeshPhongMaterial({ color: 0x34a853, transparent: true, opacity: 1 });
    const thCell1 = new THREE.Mesh(thCell1Geometry, thCellMaterial);
    thCell1.position.set(-0.95, 0.25, -1.1);
    thCell1.userData.originalPosition = { x: -0.95, y: 0.25, z: -1.1 };
    thCell1.userData.type = 'th';
    group.add(thCell1);
    
    const thCell2Geometry = new THREE.BoxGeometry(1.8, 0.1, 0.6);
    const thCell2 = new THREE.Mesh(thCell2Geometry, thCellMaterial);
    thCell2.position.set(0.95, 0.25, -1.1);
    thCell2.userData.originalPosition = { x: 0.95, y: 0.25, z: -1.1 };
    thCell2.userData.type = 'th';
    group.add(thCell2);
    
    // 表体行1
    const tdRowGeometry = new THREE.BoxGeometry(3.8, 0.1, 0.6);
    const tdRowMaterial = new THREE.MeshPhongMaterial({ color: 0xfbbc05, transparent: true, opacity: 0.9 });
    const tdRow1 = new THREE.Mesh(tdRowGeometry, tdRowMaterial);
    tdRow1.position.set(0, 0.15, -0.35);
    tdRow1.userData.originalPosition = { x: 0, y: 0.15, z: -0.35 };
    tdRow1.userData.type = 'tr';
    group.add(tdRow1);
    
    // 表体单元格1
    const tdCellGeometry = new THREE.BoxGeometry(1.8, 0.1, 0.5);
    const tdCellMaterial = new THREE.MeshPhongMaterial({ color: 0xfbbc05, transparent: true, opacity: 1 });
    const tdCell1 = new THREE.Mesh(tdCellGeometry, tdCellMaterial);
    tdCell1.position.set(-0.95, 0.25, -0.35);
    tdCell1.userData.originalPosition = { x: -0.95, y: 0.25, z: -0.35 };
    tdCell1.userData.type = 'td';
    group.add(tdCell1);
    
    const tdCell2 = new THREE.Mesh(tdCellGeometry, tdCellMaterial);
    tdCell2.position.set(0.95, 0.25, -0.35);
    tdCell2.userData.originalPosition = { x: 0.95, y: 0.25, z: -0.35 };
    tdCell2.userData.type = 'td';
    group.add(tdCell2);
    
    // 表体行2
    const tdRow2 = new THREE.Mesh(tdRowGeometry, tdRowMaterial);
    tdRow2.position.set(0, 0.15, 0.35);
    tdRow2.userData.originalPosition = { x: 0, y: 0.15, z: 0.35 };
    tdRow2.userData.type = 'tr';
    group.add(tdRow2);
    
    // 表体单元格2
    const tdCell3 = new THREE.Mesh(tdCellGeometry, tdCellMaterial);
    tdCell3.position.set(-0.95, 0.25, 0.35);
    tdCell3.userData.originalPosition = { x: -0.95, y: 0.25, z: 0.35 };
    tdCell3.userData.type = 'td';
    group.add(tdCell3);
    
    const tdCell4 = new THREE.Mesh(tdCellGeometry, tdCellMaterial);
    tdCell4.position.set(0.95, 0.25, 0.35);
    tdCell4.userData.originalPosition = { x: 0.95, y: 0.25, z: 0.35 };
    tdCell4.userData.type = 'td';
    group.add(tdCell4);
    
    // 表尾行
    const tfRowGeometry = new THREE.BoxGeometry(3.8, 0.1, 0.7);
    const tfRowMaterial = new THREE.MeshPhongMaterial({ color: 0xea4335, transparent: true, opacity: 0.9 });
    const tfRow = new THREE.Mesh(tfRowGeometry, tfRowMaterial);
    tfRow.position.set(0, 0.15, 1.1);
    tfRow.userData.originalPosition = { x: 0, y: 0.15, z: 1.1 };
    tfRow.userData.type = 'tr';
    group.add(tfRow);
    
    // 表尾单元格
    const tfCellGeometry = new THREE.BoxGeometry(1.8, 0.1, 0.6);
    const tfCellMaterial = new THREE.MeshPhongMaterial({ color: 0xea4335, transparent: true, opacity: 1 });
    const tfCell1 = new THREE.Mesh(tfCellGeometry, tfCellMaterial);
    tfCell1.position.set(-0.95, 0.25, 1.1);
    tfCell1.userData.originalPosition = { x: -0.95, y: 0.25, z: 1.1 };
    tfCell1.userData.type = 'td';
    group.add(tfCell1);
    
    const tfCell2 = new THREE.Mesh(tfCellGeometry, tfCellMaterial);
    tfCell2.position.set(0.95, 0.25, 1.1);
    tfCell2.userData.originalPosition = { x: 0.95, y: 0.25, z: 1.1 };
    tfCell2.userData.type = 'td';
    group.add(tfCell2);
}

// 结构高亮功能
function initStructureHighlighting() {
    const highlightButtons = document.querySelectorAll('.structure-controls button');
    const demoTable = document.querySelector('#structurePreview table');
    const codeElement = document.getElementById('structureCode');
    
    if (!highlightButtons || !demoTable || !codeElement) return;
    
    // 高亮表格元素
    function highlightElement(elementType) {
        // 重置所有高亮
        demoTable.querySelectorAll('*').forEach(el => {
            el.classList.remove('highlight');
        });
        
        // 高亮代码
        const codeText = codeElement.textContent;
        const highlightedCode = codeText.replace(/(<\/?[^>]+>)/g, match => {
            if (match.includes(elementType)) {
                return `<span class="highlight">${match}</span>`;
            }
            return match;
        });
        codeElement.innerHTML = highlightedCode;
        
        // 高亮预览
        if (elementType === 'table') {
            demoTable.classList.add('highlight');
        } else {
            demoTable.querySelectorAll(elementType).forEach(el => {
                el.classList.add('highlight');
            });
        }
    }
    
    // 添加按钮事件
    highlightButtons.forEach(button => {
        button.addEventListener('click', function() {
            const elementType = this.textContent.split(' ')[1];
            highlightElement(elementType);
            
            // 更新按钮状态
            highlightButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

// 样式调整面板
function initStyleControls() {
    const styleControls = {
        borderWidth: document.getElementById('borderWidthControl'),
        borderStyle: document.getElementById('borderStyleControl'),
        borderColor: document.getElementById('borderColorControl'),
        borderCollapse: document.getElementById('borderCollapseControl'),
        cellPadding: document.getElementById('cellPaddingControl'),
        cellSpacing: document.getElementById('cellSpacingControl'),
        tableWidth: document.getElementById('tableWidthControl'),
        zebraStriping: document.getElementById('zebraStripingControl'),
        hoverEffect: document.getElementById('hoverEffectControl')
    };
    
    const previewTable = document.getElementById('stylePreviewTable');
    const cssCodeElement = document.getElementById('generatedCssCode');
    const copyButton = document.getElementById('copyCssCode');
    
    if (!previewTable || !cssCodeElement) return;
    
    // 更新CSS代码显示
    function updateCssCode() {
        const tableStyles = [];
        const thTdStyles = [];
        const theadStyles = [];
        const tbodyTrStyles = [];
        const hoverStyles = [];
        
        // 表格样式
        if (styleControls.borderWidth) {
            const borderWidth = styleControls.borderWidth.value + 'px';
            tableStyles.push(`border-width: ${borderWidth}`);
            thTdStyles.push(`border-width: ${borderWidth}`);
        }
        
        if (styleControls.borderStyle) {
            const borderStyle = styleControls.borderStyle.value;
            tableStyles.push(`border-style: ${borderStyle}`);
            thTdStyles.push(`border-style: ${borderStyle}`);
        }
        
        if (styleControls.borderColor) {
            const borderColor = styleControls.borderColor.value;
            tableStyles.push(`border-color: ${borderColor}`);
            thTdStyles.push(`border-color: ${borderColor}`);
        }
        
        if (styleControls.borderCollapse) {
            const borderCollapse = styleControls.borderCollapse.value;
            tableStyles.push(`border-collapse: ${borderCollapse}`);
        }
        
        if (styleControls.tableWidth) {
            const tableWidth = styleControls.tableWidth.value;
            tableStyles.push(`width: ${tableWidth}`);
        }
        
        // 单元格样式
        if (styleControls.cellPadding) {
            const cellPadding = styleControls.cellPadding.value + 'px';
            thTdStyles.push(`padding: ${cellPadding}`);
        }
        
        // 表头样式
        theadStyles.push('background-color: #f2f2f2');
        
        // 斑马线样式
        if (styleControls.zebraStriping && styleControls.zebraStriping.checked) {
            tbodyTrStyles.push('tbody tr:nth-child(even) { background-color: #f9f9f9; }');
        }
        
        // 悬停效果
        if (styleControls.hoverEffect && styleControls.hoverEffect.checked) {
            hoverStyles.push('tbody tr:hover { background-color: #f0f0f0; }');
        }
        
        // 生成完整CSS代码
        let cssCode = '/* 表格样式 */\n';
        cssCode += `table {\n  ${tableStyles.join(';\n  ')};\n}\n\n`;
        cssCode += `th, td {\n  ${thTdStyles.join(';\n  ')};\n}\n\n`;
        cssCode += `thead {\n  background-color: #f2f2f2;\n}\n\n`;
        
        if (tbodyTrStyles.length > 0) {
            cssCode += `${tbodyTrStyles.join('\n')}\n\n`;
        }
        
        if (hoverStyles.length > 0) {
            cssCode += `${hoverStyles.join('\n')}\n`;
        }
        
        cssCodeElement.textContent = cssCode;
    }
    
    // 应用样式到预览表格
    function applyStylesToPreview() {
        if (styleControls.borderWidth) {
            const value = styleControls.borderWidth.value + 'px';
            const display = styleControls.borderWidth.nextElementSibling;
            if (display) display.textContent = value;
            previewTable.style.borderWidth = value;
            previewTable.querySelectorAll('th, td').forEach(cell => {
                cell.style.borderWidth = value;
            });
        }
        
        if (styleControls.borderStyle) {
            const value = styleControls.borderStyle.value;
            previewTable.style.borderStyle = value;
            previewTable.querySelectorAll('th, td').forEach(cell => {
                cell.style.borderStyle = value;
            });
        }
        
        if (styleControls.borderColor) {
            const value = styleControls.borderColor.value;
            previewTable.style.borderColor = value;
            previewTable.querySelectorAll('th, td').forEach(cell => {
                cell.style.borderColor = value;
            });
        }
        
        if (styleControls.borderCollapse) {
            const value = styleControls.borderCollapse.value;
            previewTable.style.borderCollapse = value;
        }
        
        if (styleControls.cellPadding) {
            const value = styleControls.cellPadding.value + 'px';
            const display = styleControls.cellPadding.nextElementSibling;
            if (display) display.textContent = value;
            previewTable.querySelectorAll('th, td').forEach(cell => {
                cell.style.padding = value;
            });
        }
        
        if (styleControls.cellSpacing) {
            const value = styleControls.cellSpacing.value + 'px';
            const display = styleControls.cellSpacing.nextElementSibling;
            if (display) display.textContent = value;
            if (styleControls.borderCollapse.value === 'separate') {
                previewTable.style.borderSpacing = value;
            }
        }
        
        if (styleControls.tableWidth) {
            const value = styleControls.tableWidth.value;
            previewTable.style.width = value;
        }
        
        // 斑马线样式
        if (styleControls.zebraStriping) {
            const tableRows = previewTable.querySelectorAll('tbody tr');
            if (styleControls.zebraStriping.checked) {
                tableRows.forEach((row, index) => {
                    if (index % 2 === 1) { // 偶数行
                        row.style.backgroundColor = '#f9f9f9';
                    } else {
                        row.style.backgroundColor = '';
                    }
                });
            } else {
                tableRows.forEach(row => {
                    row.style.backgroundColor = '';
                });
            }
        }
        
        // 更新CSS代码
        updateCssCode();
    }
    
    // 添加事件监听
    Object.values(styleControls).forEach(control => {
        if (!control) return;
        
        if (control.type === 'range' || control.type === 'color') {
            control.addEventListener('input', applyStylesToPreview);
        } else {
            control.addEventListener('change', applyStylesToPreview);
        }
    });
    
    // 复制CSS代码
    if (copyButton) {
        copyButton.addEventListener('click', function() {
            const textArea = document.createElement('textarea');
            textArea.value = cssCodeElement.textContent;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            
            this.textContent = '复制成功！';
            setTimeout(() => {
                this.textContent = '复制代码';
            }, 2000);
        });
    }
    
    // 初始化应用样式
    applyStylesToPreview();
}

// 表格构建器
function initTableBuilder() {
    const rowsControl = document.getElementById('rowsControl');
    const colsControl = document.getElementById('colsControl');
    const headerCheckbox = document.getElementById('headerCheckbox');
    const footerCheckbox = document.getElementById('footerCheckbox');
    const generateBtn = document.getElementById('generateTableBtn');
    const previewContainer = document.getElementById('tableBuilderPreview');
    const codeContainer = document.getElementById('generatedHtmlCode');
    const copyHtmlBtn = document.getElementById('copyHtmlCode');
    
    if (!rowsControl || !colsControl || !generateBtn || !previewContainer || !codeContainer) return;
    
    // 生成表格
    function generateTable() {
        const rows = parseInt(rowsControl.value) || 3;
        const cols = parseInt(colsControl.value) || 3;
        const includeHeader = headerCheckbox.checked;
        const includeFooter = footerCheckbox.checked;
        
        let tableHtml = '<table border="1">';
        
        // 添加表头
        if (includeHeader) {
            tableHtml += '\n  <thead>\n    <tr>';
            for (let j = 0; j < cols; j++) {
                tableHtml += `\n      <th>表头 ${j+1}</th>`;
            }
            tableHtml += '\n    </tr>\n  </thead>';
        }
        
        // 添加表体
        tableHtml += '\n  <tbody>';
        for (let i = 0; i < rows; i++) {
            tableHtml += '\n    <tr>';
            for (let j = 0; j < cols; j++) {
                tableHtml += `\n      <td>单元格 ${i+1}-${j+1}</td>`;
            }
            tableHtml += '\n    </tr>';
        }
        tableHtml += '\n  </tbody>';
        
        // 添加表尾
        if (includeFooter) {
            tableHtml += '\n  <tfoot>\n    <tr>';
            for (let j = 0; j < cols; j++) {
                tableHtml += `\n      <td>表尾 ${j+1}</td>`;
            }
            tableHtml += '\n    </tr>\n  </tfoot>';
        }
        
        tableHtml += '\n</table>';
        
        // 更新预览
        previewContainer.innerHTML = tableHtml;
        
        // 更新代码
        codeContainer.textContent = tableHtml;
    }
    
    // 添加事件监听
    generateBtn.addEventListener('click', generateTable);
    
    // 复制HTML代码
    if (copyHtmlBtn) {
        copyHtmlBtn.addEventListener('click', function() {
            const textArea = document.createElement('textarea');
            textArea.value = codeContainer.textContent;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            
            this.textContent = '复制成功！';
            setTimeout(() => {
                this.textContent = '复制代码';
            }, 2000);
        });
    }
    
    // 初始化生成表格
    generateTable();
}

// AI聊天功能
function initAIChat() {
    const chatInput = document.getElementById('aiChatInput');
    const chatSendBtn = document.getElementById('aiChatSend');
    const chatMessages = document.getElementById('aiChatMessages');
    
    if (!chatInput || !chatSendBtn || !chatMessages) return;
    
    // 预设问答对
    const qaDatabase = [
        {
            keywords: ['什么', '是', '表格'],
            answer: '表格（Table）是HTML中用于展示结构化数据的元素，通过行和列的形式组织信息，使数据更易于理解和比较。'
        },
        {
            keywords: ['表格', '结构', '组成'],
            answer: 'HTML表格由以下主要元素组成：<br>- &lt;table&gt;：表格容器<br>- &lt;thead&gt;：表头部分<br>- &lt;tbody&gt;：表格主体<br>- &lt;tfoot&gt;：表格底部<br>- &lt;tr&gt;：表格行<br>- &lt;th&gt;：表头单元格<br>- &lt;td&gt;：数据单元格'
        },
        {
            keywords: ['合并', '单元格'],
            answer: '合并单元格可以使用两个属性：<br>- colspan：水平合并单元格，例如 &lt;td colspan="2"&gt;<br>- rowspan：垂直合并单元格，例如 &lt;td rowspan="3"&gt;'
        },
        {
            keywords: ['响应式', '表格'],
            answer: '创建响应式表格的关键是在小屏幕上改变表格的显示方式。常用技术包括：<br>1. 使用媒体查询<br>2. 在小屏幕上将表格单元格转为块级元素<br>3. 使用data-label属性显示列标题<br>4. 考虑使用表格替代方案，如列表或卡片布局'
        },
        {
            keywords: ['样式', 'CSS'],
            answer: '表格样式可以通过CSS控制，常用属性包括：<br>- border-collapse：控制边框合并方式<br>- border：设置边框<br>- width：设置宽度<br>- text-align：文本对齐<br>- padding：单元格内边距<br>- background-color：背景色<br>- nth-child选择器：实现斑马线样式'
        }
    ];
    
    // 发送消息
    function sendMessage() {
        const message = chatInput.value.trim();
        if (!message) return;
        
        // 添加用户消息
        chatMessages.innerHTML += `<div class="user-message">${message}</div>`;
        chatInput.value = '';
        
        // 滚动到底部
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        // 生成回复
        setTimeout(() => {
            const answer = generateAnswer(message);
            chatMessages.innerHTML += `<div class="ai-message">${answer}</div>`;
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }, 500);
    }
    
    // 生成回复
    function generateAnswer(question) {
        // 将问题转为小写并分词
        const words = question.toLowerCase().split(/\s+|[,.?!;:()\[\]{}'"]/);
        
        // 查找最匹配的预设问答
        let bestMatch = null;
        let highestScore = 0;
        
        qaDatabase.forEach(qa => {
            let score = 0;
            qa.keywords.forEach(keyword => {
                if (words.includes(keyword.toLowerCase())) {
                    score++;
                }
            });
            
            if (score > highestScore) {
                highestScore = score;
                bestMatch = qa;
            }
        });
        
        // 如果找到匹配，返回答案，否则返回默认回复
        if (bestMatch && highestScore >= 2) {
            return bestMatch.answer;
        } else {
            return '抱歉，我不太理解您的问题。您可以尝试询问关于表格结构、单元格合并、响应式表格或表格样式的问题。';
        }
    }
    
    // 添加事件监听
    chatSendBtn.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
}