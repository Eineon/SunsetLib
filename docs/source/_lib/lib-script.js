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

document.addEventListener('DOMContentLoaded', function() {
  const data = {
    '#专注': '此效果要求使用者的精神在一定程度上保持集中和自制。',
    '#操作': '角色必须物理上操作一件物品或比划手势来使用此效果。没有合适肢体的角色无法执行这类动作。',
    '#攻击': '此效果要求角色发起一次攻击。',
    '#心灵': '此效果可以干涉目标的心智。这对［无意识］角色无效。',
    '#绝技': '每一刻最多只能宣言1次［绝技］动作。',
    '#起手': '只能在尚未宣言过［攻击］或［起手］动作的回合中使用。',
    '#暗骰': 'GM需要暗中投掷该效果的检定。',
    '#治愈': '此效果能够修复角色物理上的损伤或精神上的疲劳。',
    '#附赠': '只要角色满足「前置」条件和等级要求，她就会自动习得此类特技，并且不计入她所能习得的特技总数中。',
    '#探索': '此效果无法在冲突场景中使用。',
    '#休整': '执行不具［休整］标签的动作会打断此类动作。',
  };

  Object.entries(data).forEach(([key, value]) => {
    document.querySelectorAll(key).forEach(el => {
      const description = `<div class="mouse-event"><a href="##"><code>${key.slice(1)}</code></a><div class="show">${value}</div></div>`;
      el.insertAdjacentHTML('afterend', description);
    });
  });
});