document.addEventListener('DOMContentLoaded', function () {
  const 显隐元素 = document.querySelectorAll('.显隐');

  显隐元素.forEach(function (显隐内容) {
    // 创建 <br> 元素
    const br = document.createElement('br');

    // 将 <br> 元素插入到 .显隐内容 元素之前
    显隐内容.parentNode.insertBefore(br, 显隐内容);

    // 创建按钮元素
    const 显隐按钮 = document.createElement('button');
    显隐按钮.classList.add('显隐按钮');
    显隐按钮.textContent = '查看详情';

    // 将按钮插入到 <br> 元素之后
    显隐内容.parentNode.insertBefore(显隐按钮, 显隐内容);

    // 添加点击事件处理函数
    显隐按钮.addEventListener('click', () => {
      显隐按钮.textContent = 显隐内容.style.display === 'none' ? '隐藏详情' : '查看详情';
      显隐内容.style.display = 显隐内容.style.display === 'none' ? 'block' : 'none';
    });
  });
});