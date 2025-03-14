
document.addEventListener('DOMContentLoaded', function() {
    // 获取所有控制元素
    const colorControl = document.getElementById('colorControl');
    const bgColorControl = document.getElementById('bgColorControl');
    const fontSizeControl = document.getElementById('fontSizeControl');
    const fontWeightControl = document.getElementById('fontWeightControl');
    const demoSpan = document.getElementById('demoSpan');
    const fontSizeDisplay = fontSizeControl.nextElementSibling;

    // 颜色控制
    colorControl.addEventListener('input', function(e) {
        demoSpan.style.color = e.target.value;
    });

    // 背景色控制
    bgColorControl.addEventListener('input', function(e) {
        demoSpan.style.backgroundColor = e.target.value;
    });

    // 字体大小控制
    fontSizeControl.addEventListener('input', function(e) {
        const size = e.target.value;
        demoSpan.style.fontSize = `${size}px`;
        fontSizeDisplay.textContent = `${size}px`;
    });

    // 字体粗细控制
    fontWeightControl.addEventListener('change', function(e) {
        demoSpan.style.fontWeight = e.target.value;
    });

    // 代码复制功能
    const copyBtn = document.querySelector('.copy-btn');
    const codeBlock = document.querySelector('.code-block code');

    copyBtn.addEventListener('click', async function() {
        try {
            await navigator.clipboard.writeText(codeBlock.textContent.trim());
            
            // 显示复制成功的临时提示
            const originalText = copyBtn.textContent;
            copyBtn.textContent = '已复制！';
            copyBtn.style.backgroundColor = '#28a745';
            
            setTimeout(() => {
                copyBtn.textContent = originalText;
                copyBtn.style.backgroundColor = '#007bff';
            }, 2000);
        } catch (err) {
            console.error('复制失败:', err);
            copyBtn.textContent = '复制失败';
            copyBtn.style.backgroundColor = '#dc3545';
            
            setTimeout(() => {
                copyBtn.textContent = '复制代码';
                copyBtn.style.backgroundColor = '#007bff';
            }, 2000);
        }
    });
});
