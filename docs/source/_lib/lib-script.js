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
    显隐按钮.text = '查看详情';

    // 将按钮插入到 <br> 元素之后
    显隐内容.parentNode.insertBefore(显隐按钮, 显隐内容);

    // 添加点击事件处理函数
    显隐按钮.addEventListener('click', () => {
      显隐按钮.text = 显隐内容.style.display === 'none' ? '隐藏详情' : '查看详情';
      显隐内容.style.display = 显隐内容.style.display === 'none' ? 'block' : 'none';
    });
  });

  const tagData = {
    '————': '——————————————————————————————————————————————————',
    'N': '这种稀有度的事物非常普遍。未标注稀有度的元素，稀有度默认为N。',
    'R': '这种稀有度的事物需要特殊的训练或特定文化的背景才有可能接触。<a href="##">分析</a>稀有度为R的事物时，AD会受到4点减值。',
    'S': '这种稀有度的事物几乎不可能被找到。<a href="##">分析</a>稀有度为R的事物时，AD会受到8点减值。',
    'U': '这种稀有度的事物是独一无二的。<a href="##">分析</a>稀有度为R的事物时，AD会受到12点减值。',
    '————': '——————————————————————————————————————————————————',
    '暗骰': 'GM需要暗中投掷这种效果的检定，并且不会将检定的结果公开给其他玩家。',
    '探索': '这种效果无法在冲突场景中使用。',
    '休整': '执行不具<a href="##">休整</a>标签的动作会打断这种效果。',
    '攻击': '这种效果能够让角色发起一次攻击。',
    '移动': '这种效果能够让角色移动到其他位置。',
    '操作': '角色必须物理上操作一件物品或比划手势才能使用这种效果。<br>没有合适肢体的角色无法使用这种效果。',
    '专注': '这种效果要求使用者的精神在一定程度上保持集中和自制。<br>使用者一旦失去意识，其造成的所有<a href="##">专注</a>效果都会立即结束。',
    '先发': '这种效果只能在使用者尚未宣言过标准动作或<a href="##">先发</a>动作的轮次中使用。',
    '绝技': '在冲突命刻的每份刻度中，一名角色最多只能宣言1次<a href="##">绝技</a>动作。',
    '起手': '这种效果只能在使用者尚未宣言过<a href="##">攻击</a>或<a href="##">起手</a>动作的刻度中使用。',
    '收尾': '执行这种动作后，直到本轮结束为止，使用者无法执行其他<a href="##">攻击</a>动作。',
    '连携': '这种效果只能在使用者承受连击减值的情况下使用。',
    '扫荡': '这种效果能令立即将角色无力化，但难以对较为强大的角色产生效果。<br>角色的LV每比扫荡效果的等级高1级，就会在应对扫荡效果的防御检定上获得1点加值。',
    '恢复': '这种效果能够修复角色物理或精神上的损伤。<br>但也可能助其脱离有害的处境。',
    '疾病': '这种效果会造成疾病。',
    '睡眠': '这种效果能让角色陷入沉睡或变得疲倦。',
    '心灵': '这种效果会干涉心智。<a href="##">心灵</a>效果对<a href="##">无意识</a>的角色无效。',
    '情绪': '这种效果会改变情绪。具有该标签的效果同时视为具有<a href="##">心灵</a>标签。',
    '恐惧': '这种效果会唤起恐惧的情绪。具有该标签的效果同时视为具有<a href="##">情绪</a>标签。',
    '理解': '这种效果需要目标能够理解使用者表达的信息才能发挥作用。',
    '————': '——————————————————————————————————————————————————',
    '密传': '密传术法的核心理论在于「支配」。',
    '契绊': '契绊术法的核心理论在于「引导」。',
    '炼成': '炼成术法的核心理论在于「转变」。',
    '歪曲': '歪曲术法能够对现实进行扭曲和变化，使其符合施术者的期望和意图。',
    '感测': '感测术法能够赋予施术者超越常规感官的知觉，增强对环境或情感的理解力。',
    '具现': '具现术法能够凭空创造现实中不存在的幻想产物，形成具象的实体或现象。',
    '破灭': '破灭术法能够毁坏或削弱目标事物的存在，将其彻底抹消。',
    '真名': '事物的真名是其独有的波动，凝聚了它在灵界的本质和属性。<br>具有超自然属性的事物会持续释放自身的真名，这种波动只能被特殊手段侦测。',
    '探知': '这种效果能够访问某一事物或真名的存在或方位，或是令角色能够通过他人的感官收集信息。',
    '预见': '这种效果能够决定在近未来可能发生的事件。',
    '揭示': '这种效果能够展现事物真实的样子。',
    '————': '——————————————————————————————————————————————————',
    '塑体': '这种效果能够细微改变角色的外形。<br>如果一名角色同时受到多个影响同一部位的塑体效果，新的效果必须成功反制现有效果才能生效。如果这些效果会影响不同的部位，则可以同时生效。',
    '变形': '这种效果能够完全改变角色的外形。如果一名角色同时受到多个变形效果，或同时受到变形与塑体效果，新的效果必须成功反制现有效果才能生效。<br>变形效果通常无法令角色变成特定的个体，只能是一类的普通一员。',
    '维度': '这种效果会改变事物所处的维度。同一事物最多只会同时受到一个维度效果影响。新的效果必须成功反制现有效果才能生效。',
    '结界': '结界会在特定时间内影响一个区域。同一区域最多只会同时受到一个结界影响。新的结界必须成功反制现有结界才能生效。',
    '诅咒': '诅咒是一种会持续造成负面影响的超自然效果。只有专门针对诅咒的效果才能解除它。',
    '即死': '在即死效果造成的伤害结算后，所有受其损伤的HG都会被立即击破。部分即死效果可以在不造成损伤的情况下直接致死。',
    '————': '——————————————————————————————————————————————————',
    '龙套': '单独的龙套级敌人难以对同等级的PC构成威胁，并且可以被轻松击败。',
    '————': '——————————————————————————————————————————————————',
    '附赠': '只要角色满足「前置」条件和等级要求，她就会自动习得<a href="##">附赠</a>特技，并且不计入她所能习得的特技总数中。',
    '原型': '这项特技属于一种<b>原型</b>。',
    '唤醒': '一旦习得某种<b>原型</b>的<a href="##">唤醒</a>特技，直到习得至少5个属于该<b>原型</b>的特技 (含<a href="##">唤醒</a>特技) 为止，无法再习得其他的<a href="##">唤醒</a>特技。',
    '————': '——————————————————————————————————————————————————',
    '物理': '这种效果通过由运动产生的力量粉碎、撕裂、贯穿目标。',
    '生理': '这种效果通过由生命体内外因素引起生理机能的异常。',
    '灼烧': '这种效果通过高温或化学物质造成烧伤。',
    '冷冻': '这种效果通过极低的温度引起冻伤。',
    '侵蚀': '这种效果通过腐蚀或解离造成伤害。',
    '困顿': '这种效果会造成肉体或精神上的疲劳。',
    '疼痛': '这种效果会造成生理和心理上的疼痛感觉。',
    '欣快': '这种效果会造成积极、愉悦和兴奋的情绪。',
    '屈服': '这种效果会造成心理上的压抑、担忧、焦虑、不安和无助感。',
    '错乱': '这种效果会造成严重的思维和认知障碍。',
    '失血': '这种效果会导致血液的缺失。没有血液的生物免疫<a href="##">失血</a>效果。',
    '————': '——————————————————————————————————————————————————',
    '搏击': '这种武器着重于近身缠斗，主要通过猛击和施加压力造成伤害。',
    '白刃': '这种武器以锋利的刀刃或尖刺作为主要攻击部件。',
    '软兵': '这种武器使用柔软材料制作，主要通过摆动和甩打进行攻击。',
    '毒剂': '这种武器利用有毒物质作为攻击手段。',
    '暗器': '这种武器小巧隐秘，方便携带和使用。',
    '弓弩': '这种武器利用弹力发射弹药。',
    '铳械': '这种武器利用推力发射弹药。',
    '爆破': '这种武器会产生剧烈的爆炸。',
    '魔导': '这种武器主要依靠超自然力量的强化造成杀伤。',
    '奇门': '每件奇门武器都视为单独的一种武器类别。',
    '近战': '这种武器只能用来发动近战攻击。',
    '远程': '这种武器只能用来发动远程攻击。',
    '投掷': '这种武器既可以用来发动近战武器，也可以用来发动远程攻击。<a href="##">投掷</a>武器同时视为<a href="##">近战</a>武器与<a href="##">远程</a>武器。',
    '轻型': '如果角色在自己的回合仅使用轻型武器发动攻击，则其本回合的延迟将获得1点减值，每次攻击产生的连击减值将获得1点减值。',
    '重型': '如果角色在自己的回合使用重型武器发动攻击，则其本回合的延迟将受到1点加值，每次攻击产生的连击减值将受到1点加值。',
    '装填': '这种武器每轮只能使用1次。',
    '————': '——————————————————————————————————————————————————',
  };

  const efctData = {
    '————': '——————————————————————————————————————————————————',
    '前进': '目标从后场移动至中场，或从中场移动至前场。<br>位于前场的目标不会因<a href="##">前进</a>改变位置。',
    '后退': '目标从前场移动至中场，或从中场移动至后场。<br>位于后场的目标不会因<a href="##">后退</a>改变位置。',
    '扰乱': '目标随机移动至任何位置，这也可能会令目标未能改变位置。',
    '————': '——————————————————————————————————————————————————',
    'BS': 'BS会令角色在特定的能力值上承受等于效果值的减值。<br>针对不同能力值的BS视为不同种类的处境。',
    '缓慢': '角色的延迟受到等于效果值的加值。<br><a href="##">缓慢</a>处境的效果值会与<a href="##">迅捷</a>处境互相抵消。',
    '破绽': '角色在进行特定防御类型的主动或被动防御检定时，会受到2点减值。',
    '禁足': '角色无法执行<a href="##">移动</a>动作。<br>尝试改变角色位置的<a href="##">移动</a>效果必须成功反制造成<a href="##">禁足</a>处境的效果才能生效。',
    '昏迷': '角色无法主动执行任何动作。',
    '发狂': '每失去1点San值，角色都会承受1项随机的疯狂效应。',
    '持续伤害': '每轮结束时，受到持续伤害的角色会根据伤害类型，在HP或SP上承受损伤，如同受到一次威力与效果值相当的伤害。场景结束时，所有持续伤害都会自动解除。',
    '————': '——————————————————————————————————————————————————',
    'GS': 'GS会令角色在特定的能力值上获得等于效果值的加值。<br>针对不同能力值的GS视为不同种类的处境。',
    '迅捷': '角色的延迟获得等于效果值的减值。<br><a href="##">迅捷</a>处境的效果值会与<a href="##">缓慢</a>处境互相抵消。',
    '飞行': '角色不会成为近战攻击的有效目标。',
    '————': '——————————————————————————————————————————————————',
  };

  function insertComments(data, classPrefix, formatFunction) {
    Object.entries(data).forEach(([key, value]) => {
      document.querySelectorAll(`[class="${classPrefix}${key}"]`).forEach(el => {
        const text = el.innerHTML; // 获取标签中的文本内容
        const commentHtml = formatFunction(key, text, value); // 调用格式化函数
        el.insertAdjacentHTML('afterend', commentHtml); // 插入新的HTML
        el.remove(); // 移除原来的标签
      });
    });
  }

  // 定义格式化函数
  function tagFormat(key, text, value) {
    return `<div class="CMT"><a href="##">${key}${text}</a><div class="show"><span>${key}</span><br>—————————————————————————————————————————————<br>${value}</div></div>`;
  }

  function efctFormat(key, text, value) {
    return `<div class="CMT"><a href="##">${text}</a><div class="show"><span>${key}</span><br>—————————————————————————————————————————————<br>${value}</div></div>`;
  }

  // 调用函数处理 tagData 和 efctData
  insertComments(tagData, '[TAG]', tagFormat);
  insertComments(efctData, '[EFCT]', efctFormat);

  // 添加鼠标事件处理
  document.querySelectorAll('.CMT').forEach(cmt => {
    let timeout;

    cmt.addEventListener('mouseenter', () => {
      clearTimeout(timeout); // 清除任何现存的超时
      const showElement = cmt.querySelector('.show');
      showElement.style.display = 'block'; // 显示提示窗
      showElement.style.opacity = '1'; // 确保透明度为1
    });

    cmt.addEventListener('mouseleave', () => {
      const showElement = cmt.querySelector('.show');
      showElement.style.opacity = '0'; // 设置透明度为0以开始渐变消失
      timeout = setTimeout(() => {
        showElement.style.display = 'none'; // 在透明度变为0后隐藏提示窗
      }, 400); // 设置延迟时间
    });
  });
});
