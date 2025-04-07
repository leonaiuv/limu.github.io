# 个人博客网站

这是一个简洁的静态个人博客网站，部署在GitHub Pages上。

## 功能特点

- 响应式设计，在各种设备上都能良好显示
- 首页：个人简介和联系信息
- 作品展示页：以模块化方式展示个人作品
- 作品过滤功能：可以按类别查看不同类型的作品

## 目录结构

```
.
├── index.html          # 首页
├── works.html          # 作品展示页面
├── css/                # 样式文件
│   └── style.css       # 主样式文件
├── js/                 # JavaScript文件
│   └── main.js         # 主脚本文件
└── images/             # 图片资源
    └── placeholder.jpg # 占位图片
```

## 如何维护

### 更新个人信息

编辑 `index.html` 文件中的相应部分：

- 修改"关于我"部分的文本内容
- 更新联系方式
- 根据需要调整页面结构

### 添加或修改作品

1. 打开 `works.html` 文件
2. 在作品卡片容器（`<div class="works-container">`）中添加新的作品项目
3. 每个作品项目使用以下结构：

```html
<div class="work-item" data-category="类别">
    <div class="work-image">
        <img src="images/作品图片.jpg" alt="项目名称">
    </div>
    <div class="work-info">
        <h3>项目名称</h3>
        <p>项目描述</p>
        <div class="work-links">
            <a href="#" target="_blank" class="work-link">查看项目</a>
            <a href="#" target="_blank" class="work-link">源代码</a>
        </div>
    </div>
</div>
```

4. 修改 `data-category` 属性为对应的作品类别（web、design或other）
5. 如果需要添加新的类别，也需要在过滤按钮中添加相应的选项

### 添加新的过滤类别

1. 打开 `works.html` 文件
2. 在过滤按钮区域添加新的按钮：

```html
<button class="filter-btn" data-filter="新类别名">新类别显示名</button>
```

### 自定义样式

样式文件位于 `css/style.css`，可以根据需要进行修改：

- 修改颜色方案
- 调整字体大小和字体类型
- 更改布局和间距

## 部署

网站已配置为在GitHub Pages上部署。将所有更改推送到主分支后，GitHub会自动更新网站。 