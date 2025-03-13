
// 初始化背景效果
function initBackground() {
  const bg = new Color4Bg.AestheticFluidBg({
    dom: "background",
    colors: ["#C2E5F2","#D0EFF4","#E0F7FE","#C6F4E3","#BDF2D8","#ADEDBF"],
    loop: true
  });
}

// 当DOM加载完成后初始化背景
document.addEventListener('DOMContentLoaded', initBackground);
