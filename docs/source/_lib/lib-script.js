const FNData = {
  'UP': `将数值向上取整至最接近的整数`,
  'DOWN': `将数值向下取整至最接近的整数`,
  'CUT': `截去数值的小数部分`,
  'MAX': `选出最高值，跳过不存在的值`,
  'MIN': `选出最低值，跳过不存在的值`,
  'OR': `任意条件满足时，视为满足条件`,
  'AND': `所有条件满足时，视为满足条件`,
  'NOT': `条件不满足时，视为满足条件`,
}

document.addEventListener('DOMContentLoaded', () => {
  const FNRegex = /【FN:([^【】]+)】/g;
  const annotRegex = /（([^:（]+):([^）]+)）/g;
  const symbolMap = {
    '<--': '←',
    '-->': '→',
    '<->': '↔',
    '<==': '⇐',
    '==>': '⇒',
    '<=>': '⇔',
    '<=': '≤',
    '>=': '≥',
    '!=': '≠',
    '~=': '≈',
    '<>': '⋄',
    '+-': '±',
  };
  const symbolRegex = new RegExp(
    `(${Object.keys(symbolMap)
      .sort((a, b) => b.length - a.length)
      .map(key => key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
      .join('|')})`, 'g');
  document.querySelectorAll('p').forEach(el => {
    el.innerHTML = el.innerHTML
      // 处理 FNRegex
      .replace(FNRegex, (_, t1) => {
        return `<a tabindex="0" title="${FNData[t1]}" class="hint">${t1}</a>`;
      })
      // 处理 annotRegex
      .replace(annotRegex, (_, t1, t2) => {
        return `<span class="annot">${t1}<span class="up-note">${t2}</span></span>`;
      })
      // 处理 formRegex
      .replace(/［/g, '<span class="form">⦗').replace(/］/g, '⦘</span>');
    function replaceText(node) {
      // 如果是文本节点，则进行替换
      if (node.nodeType === Node.TEXT_NODE) {
        let text = node.textContent;
        text = text
          .replace(/⦗\[N(\d+)\]⦘/g, '[N$1]')
          .replace(symbolRegex, (_, t1) => symbolMap[t1]);
        node.textContent = text;
      }
      // 如果是元素节点，则递归处理其子节点
      else if (node.nodeType === Node.ELEMENT_NODE) {
        Array.from(node.childNodes).forEach(child => {
          replaceText(child);
        });
      }
    }
    replaceText(el);
  });

  // 处理 div.icons 元素
  document.querySelectorAll('div.icons a[aria-label]').forEach(el => el.title = el.ariaLabel);
  // 处理 tip
  document.querySelectorAll('a.reference.external').forEach(el => {
    if (el.innerHTML.match(/tip:/)) {
      el.outerHTML = `<a tabindex="0" title="${el.innerHTML.replace(/tip:/, '')}" class="hint note-icon footnote-reference brackets">※</a>`;
    };
  });

});
