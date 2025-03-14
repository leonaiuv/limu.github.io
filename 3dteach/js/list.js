document.addEventListener('DOMContentLoaded', function() {
    // 获取所有控制元素
    const listStyleControl = document.getElementById('listStyleControl');
    const spacingControl = document.getElementById('spacingControl');
    const indentControl = document.getElementById('indentControl');
    const colorControl = document.getElementById('colorControl');
    
    // 获取显示值的元素
    const spacingDisplay = spacingControl.nextElementSibling;
    const indentDisplay = indentControl.nextElementSibling;
    
    // 获取预览区域的列表元素
    const demoList = document.getElementById('demoList');
    const listItems = demoList.querySelectorAll('li');
    
    // 列表样式控制
    listStyleControl.addEventListener('change', function() {
        const value = this.value;
        demoList.style.listStyleType = value;
    });
    
    // 项目间距控制
    spacingControl.addEventListener('input', function() {
        const value = this.value + 'px';
        spacingDisplay.textContent = value;
        listItems.forEach(item => {
            item.style.marginBottom = value;
        });
    });
    
    // 缩进距离控制
    indentControl.addEventListener('input', function() {
        const value = this.value + 'px';
        indentDisplay.textContent = value;
        demoList.style.paddingLeft = value;
    });
    
    // 项目颜色控制
    colorControl.addEventListener('input', function() {
        const value = this.value;
        listItems.forEach(item => {
            item.style.color = value;
        });
    });
    
    // 添加列表项编辑功能
    listItems.forEach(item => {
        item.setAttribute('contenteditable', 'true');
        item.addEventListener('focus', function() {
            this.dataset.originalContent = this.textContent;
            this.classList.add('editing');
        });
        item.addEventListener('blur', function() {
            this.classList.remove('editing');
        });
        item.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                this.textContent = this.dataset.originalContent;
                this.blur();
            } else if (e.key === 'Enter') {
                e.preventDefault();
                this.blur();
            }
        });
    });
    
    // 添加列表项添加/删除功能
    const addItemBtn = document.getElementById('addItemBtn');
    const removeItemBtn = document.getElementById('removeItemBtn');
    
    if (addItemBtn) {
        addItemBtn.addEventListener('click', function() {
            const newItem = document.createElement('li');
            newItem.textContent = '新列表项 (点击编辑)';
            newItem.setAttribute('contenteditable', 'true');
            newItem.style.marginBottom = spacingControl.value + 'px';
            newItem.style.color = colorControl.value;
            
            // 添加与其他列表项相同的事件监听器
            newItem.addEventListener('focus', function() {
                this.dataset.originalContent = this.textContent;
                this.classList.add('editing');
            });
            newItem.addEventListener('blur', function() {
                this.classList.remove('editing');
            });
            newItem.addEventListener('keydown', function(e) {
                if (e.key === 'Escape') {
                    this.textContent = this.dataset.originalContent;
                    this.blur();
                } else if (e.key === 'Enter') {
                    e.preventDefault();
                    this.blur();
                }
            });
            
            demoList.appendChild(newItem);
        });
    }
    
    if (removeItemBtn) {
        removeItemBtn.addEventListener('click', function() {
            const items = demoList.querySelectorAll('li');
            if (items.length > 0) {
                demoList.removeChild(items[items.length - 1]);
            }
        });
    }
    
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
    listStyleControl.dispatchEvent(new Event('change'));
    spacingControl.dispatchEvent(new Event('input'));
    indentControl.dispatchEvent(new Event('input'));
    colorControl.dispatchEvent(new Event('input'));
});