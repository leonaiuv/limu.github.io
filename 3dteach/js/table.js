document.addEventListener('DOMContentLoaded', function() {
    // 获取所有控制元素
    const borderWidthControl = document.getElementById('borderWidthControl');
    const paddingControl = document.getElementById('paddingControl');
    const borderStyleControl = document.getElementById('borderStyleControl');
    const zebraControl = document.getElementById('zebraControl');
    
    // 获取显示值的元素
    const borderWidthDisplay = borderWidthControl.nextElementSibling;
    const paddingDisplay = paddingControl.nextElementSibling;
    
    // 获取预览区域的表格元素
    const demoTable = document.getElementById('demoTable');
    const tableCells = demoTable.querySelectorAll('th, td');
    
    // 边框宽度控制
    borderWidthControl.addEventListener('input', function() {
        const value = this.value + 'px';
        borderWidthDisplay.textContent = value;
        demoTable.style.borderWidth = value;
        tableCells.forEach(cell => {
            cell.style.borderWidth = value;
        });
    });
    
    // 单元格内边距控制
    paddingControl.addEventListener('input', function() {
        const value = this.value + 'px';
        paddingDisplay.textContent = value;
        tableCells.forEach(cell => {
            cell.style.padding = value;
        });
    });
    
    // 边框样式控制
    borderStyleControl.addEventListener('change', function() {
        const value = this.value;
        demoTable.style.borderStyle = value;
        tableCells.forEach(cell => {
            cell.style.borderStyle = value;
        });
    });
    
    // 斑马线样式控制
    zebraControl.addEventListener('change', function() {
        const tableRows = demoTable.querySelectorAll('tbody tr');
        if (this.checked) {
            tableRows.forEach((row, index) => {
                if (index % 2 === 1) { // 奇数行
                    row.style.backgroundColor = '#f2f2f2';
                } else {
                    row.style.backgroundColor = 'transparent';
                }
            });
        } else {
            tableRows.forEach(row => {
                row.style.backgroundColor = 'transparent';
            });
        }
    });
    
    // 添加表格内容编辑功能
    const editableCells = demoTable.querySelectorAll('tbody td');
    editableCells.forEach(cell => {
        cell.setAttribute('contenteditable', 'true');
        cell.addEventListener('focus', function() {
            this.dataset.originalContent = this.textContent;
            this.classList.add('editing');
        });
        cell.addEventListener('blur', function() {
            this.classList.remove('editing');
        });
        cell.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                this.textContent = this.dataset.originalContent;
                this.blur();
            } else if (e.key === 'Enter') {
                e.preventDefault();
                this.blur();
            }
        });
    });
    
    // 复制代码按钮功能
    const copyBtn = document.querySelector('.copy-btn');
    const codeBlock = document.querySelector('code');
    
    if (copyBtn && codeBlock) {
        copyBtn.addEventListener('click', function() {
            const textArea = document.createElement('textarea');
            textArea.value = codeBlock.textContent;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            
            // 显示复制成功提示
            copyBtn.textContent = '复制成功！';
            setTimeout(function() {
                copyBtn.textContent = '复制代码';
            }, 2000);
        });
    }
    
    // 初始化应用样式
    borderWidthControl.dispatchEvent(new Event('input'));
    paddingControl.dispatchEvent(new Event('input'));
    borderStyleControl.dispatchEvent(new Event('change'));
    zebraControl.dispatchEvent(new Event('change'));
});