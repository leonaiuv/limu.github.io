// 模拟动态加载文章
document.addEventListener("DOMContentLoaded", function () {
    const posts = [
        { title: "如何学习JavaScript", content: "掌握基础语法，多写代码实践。" },
        { title: "前端性能优化技巧", content: "减少HTTP请求，压缩资源文件。" },
        { title: "后端开发入门指南", content: "选择合适的框架，理解RESTful API。" }
    ];

    const postList = document.getElementById("post-list");

    posts.forEach(post => {
        const postItem = document.createElement("div");
        postItem.classList.add("post-item");
        postItem.innerHTML = `
            <h3>${post.title}</h3>
            <p>${post.content}</p>
        `;
        postList.appendChild(postItem);
    });
});