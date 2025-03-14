document.addEventListener('DOMContentLoaded', function() {
    // 获取所有控制元素
    const borderRadiusControl = document.getElementById('borderRadiusControl');
    const borderColorControl = document.getElementById('borderColorControl');
    const heightControl = document.getElementById('heightControl');
    const paddingControl = document.getElementById('paddingControl');
    
    // 获取显示值的元素
    const borderRadiusDisplay = borderRadiusControl.nextElementSibling;
    const heightDisplay = heightControl.nextElementSibling;
    const paddingDisplay = paddingControl.nextElementSibling;
    
    // 获取预览区域的表单元素
    const demoForm = document.getElementById('demoForm');
    const formInputs = demoForm.querySelectorAll('input, select, textarea');
    
    // 边框圆角控制
    borderRadiusControl.addEventListener('input', function() {
        const value = this.value + 'px';
        borderRadiusDisplay.textContent = value;
        formInputs.forEach(input => {
            input.style.borderRadius = value;
        });
    });
    
    // 边框颜色控制
    borderColorControl.addEventListener('input', function() {
        const value = this.value;
        formInputs.forEach(input => {
            input.style.borderColor = value;
        });
    });
    
    // 输入框高度控制
    heightControl.addEventListener('input', function() {
        const value = this.value + 'px';
        heightDisplay.textContent = value;
        formInputs.forEach(input => {
            if (input.tagName.toLowerCase() !== 'textarea') {
                input.style.height = value;
            }
        });
    });
    
    // 内边距控制
    paddingControl.addEventListener('input', function() {
        const value = this.value + 'px';
        paddingDisplay.textContent = value;
        formInputs.forEach(input => {
            input.style.padding = value;
        });
    });
    
    // 添加表单验证功能
    const basicForm = document.querySelector('.basic-form');
    const textInput = document.getElementById('text-input');
    const passwordInput = document.getElementById('password-input');
    const textarea = document.getElementById('textarea');
    
    if (basicForm) {
        // 添加表单提交事件
        basicForm.addEventListener('submit', function(e) {
            e.preventDefault();
            let isValid = true;
            let message = '';
            
            // 简单验证
            if (!textInput.value.trim()) {
                isValid = false;
                message += '文本输入框不能为空\n';
                textInput.classList.add('error');
            } else {
                textInput.classList.remove('error');
            }
            
            if (passwordInput.value.length < 6) {
                isValid = false;
                message += '密码长度至少为6位\n';
                passwordInput.classList.add('error');
            } else {
                passwordInput.classList.remove('error');
            }
            
            if (!textarea.value.trim()) {
                isValid = false;
                message += '多行文本框不能为空\n';
                textarea.classList.add('error');
            } else {
                textarea.classList.remove('error');
            }
            
            // 显示验证结果
            if (isValid) {
                alert('表单验证通过！');
            } else {
                alert('表单验证失败：\n' + message);
            }
        });
        
        // 添加提交按钮（如果不存在）
        if (!basicForm.querySelector('button[type="submit"]')) {
            const submitBtn = document.createElement('button');
            submitBtn.type = 'submit';
            submitBtn.className = 'submit-btn';
            submitBtn.textContent = '提交表单';
            basicForm.appendChild(submitBtn);
            
            // 添加按钮样式
            submitBtn.style.marginTop = '15px';
            submitBtn.style.padding = '8px 15px';
            submitBtn.style.backgroundColor = '#007bff';
            submitBtn.style.color = 'white';
            submitBtn.style.border = 'none';
            submitBtn.style.borderRadius = '4px';
            submitBtn.style.cursor = 'pointer';
        }
    }
    
    // 添加输入框实时反馈
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.style.boxShadow = '0 0 5px ' + borderColorControl.value;
        });
        
        input.addEventListener('blur', function() {
            this.style.boxShadow = 'none';
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
    borderRadiusControl.dispatchEvent(new Event('input'));
    borderColorControl.dispatchEvent(new Event('input'));
    heightControl.dispatchEvent(new Event('input'));
    paddingControl.dispatchEvent(new Event('input'));
});