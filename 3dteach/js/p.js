document.addEventListener('DOMContentLoaded', function() {
    // 获取所有控制元素
    const lineHeightControl = document.getElementById('lineHeightControl');
    const letterSpacingControl = document.getElementById('letterSpacingControl');
    const marginControl = document.getElementById('marginControl');
    const textAlignControl = document.getElementById('textAlignControl');
    
    // 获取显示值的元素
    const lineHeightDisplay = lineHeightControl.nextElementSibling;
    const letterSpacingDisplay = letterSpacingControl.nextElementSibling;
    const marginDisplay = marginControl.nextElementSibling;
    
    // 获取预览区域的段落元素
    const demoP = document.getElementById('demoP');
    const demoP2 = document.getElementById('demoP2');
    
    // 行高控制
    lineHeightControl.addEventListener('input', function() {
        const value = this.value;
        lineHeightDisplay.textContent = value;
        demoP.style.lineHeight = value;
    });
    
    // 字间距控制
    letterSpacingControl.addEventListener('input', function() {
        const value = this.value + 'px';
        letterSpacingDisplay.textContent = value;
        demoP.style.letterSpacing = value;
    });
    
    // 段落间距控制
    marginControl.addEventListener('input', function() {
        const value = this.value + 'px';
        marginDisplay.textContent = value;
        demoP.style.marginBottom = value;
    });
    
    // 文本对齐控制
    textAlignControl.addEventListener('change', function() {
        demoP.style.textAlign = this.value;
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
    lineHeightControl.dispatchEvent(new Event('input'));
    letterSpacingControl.dispatchEvent(new Event('input'));
    marginControl.dispatchEvent(new Event('input'));
    textAlignControl.dispatchEvent(new Event('change'));
});