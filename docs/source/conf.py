# Configuration file for the Sphinx documentation builder.

import re
import os
import datetime
from sphinx.application import Sphinx


SYMBOL_MAP = {
    "\\<--": "←",
    "\\-->": "→",
    "\\<->": "↔",
    "\\<==": "⇐",
    "\\==>": "⇒",
    "\\<=>": "⇔",
    "\\<>": "⋄",
    "\\<=": "≤",
    "\\>=": "≥",
    "\\!=": "≠",
    "\\~=": "≈",
    "\\+-": "±",
}

GRID_SIZE = {
    "L": "12",
    "M": "6",
    "S": "4",
    "A": "auto"
}

CARD_RULES = [
    {
        "key": re.compile(r"【(sign):([^】:]+):?([^】]*)】"),
        "value": [" {hyper}`", "{type=badge,color=secondary,outline=true}` "],
    },
    {
        "key": re.compile(r"【(cell):([^】:]+):?([^】]*)】"),
        "value": ["{hyper}`", "`"],
    },
    {
        "key": re.compile(r"【(word):([^】:]+):?([^】]*)】"),
        "value": ["{hyper}`", "`"],
    },
    {
        "key": re.compile(r"【(term):([^】:]+):?([^】]*)】"),
        "value": ["{term}`", "`"],
    },
]

NODE_RULES = [
    {
        "key": re.compile(r"\[\[grid-([^:]+):((?:(?!\]\])[\s\S])*)\]\]", re.MULTILINE),
        "value": lambda m: (
            f"\n:::{{grid-item}}\n:columns: {GRID_SIZE[m.group(1)]}\n{m.group(2).strip()}\n:::\n"
        ),
    },
    {
        "key": re.compile(r"（(.*?):(.*?)）"),
        "value": lambda m: (
            f'<ruby class="annot">{m.group(1)}<rt class="up-note">{m.group(2)}</rt></ruby>'
        ),
    },
    {
        "key": re.compile(r"［(.*?)］"),
        "value": lambda m: (f' <span class="form">⦗{m.group(1)}⦘</span> '),
    },
    {
        "key": re.compile(r"\*\*(.*?)\*\*"),
        "value": lambda m: (f'<span class="word">{m.group(1)}</span>'),
    },
]


def process_content(source):
    """应用所有替换规则到文本内容"""
    content = source[0]
    for symbol in sorted(SYMBOL_MAP, key=lambda k: -len(k)):
        content = content.replace(symbol, SYMBOL_MAP[symbol])

    for rule in CARD_RULES:
        def card_rep(m, r=rule):
            t0, t1, t2 = m.groups()
            part = r["value"]
            brL = "『" if t0 == "cell" else ""
            brR = "』" if t0 == "cell" else ""
            return f"{part[0]}{brL}{t2.replace('@', t1) if t2 else t1}{brR} <{t1}>{part[1]}"
        content = rule["key"].sub(card_rep, content)

    for rule in NODE_RULES:
        content = rule["key"].sub(rule["value"], content)

    source[0] = content


def handle_source_read(app: Sphinx, docname: str, source: list):
    """处理source-read事件"""
    file_path = app.env.doc2path(docname)
    if os.path.splitext(file_path)[1] == ".md":
        process_content(source)


def setup(app: Sphinx):
    """Sphinx扩展入口"""
    app.connect("source-read", handle_source_read)
    return {"version": "0.1", "parallel_read_safe": True}


# -- General configuration
extensions = [
    "sphinx.ext.todo",
    # "myst_parser",
    "myst_nb",
    "sphinx_design",
    "sphinx_design_elements",
    "sphinx_copybutton",
    "sphinx_tippy",
    "sphinx_togglebutton",
    "sphinxcontrib.mermaid",
]
myst_enable_extensions = [
    "amsmath",  # AMS 数学公式
    "attrs_block",  # 区块属性
    "attrs_inline",  # 行内属性
    "colon_fence",  # 冒号的代码围栏
    "deflist",  # 定义列表
    "dollarmath",  # 行内数学公式
    "fieldlist",  # 字段列表
    "html_admonition",  # HTML 警告
    "html_image",  # HTML 图像
    "linkify",  # 链接
    "replacements",  # 排版文本转换
    # "smartquotes",  # 智能引号
    "strikethrough",  # 删除线
    "substitution",  # 替换
    "tasklist",  # 任务列表
]
# 全局替换
myst_substitutions = {
    # "替换对象": "替换内容",
}

myst_url_schemes = {
    "en-wiki": "https://en.wikipedia.org/wiki/{{path}}#{{fragment}}",
    "zh-wiki": "https://zh.wikipedia.org/wiki/{{path}}#{{fragment}}",
    "baike": "https://baike.baidu.com/item/{{path}}#{{fragment}}",
    "gh-issue": {
        "url": "https://github.com/Eineon/SunsetLib/issues/{{path}}#{{fragment}}",
        "title": "议题#{{path}}",
        "classes": ["github"],
    },
}

# 确保目标唯一
myst_heading_anchors = 4

todo_include_todos = True

togglebutton_hint = "展示隐藏内容"

tippy_props = {
    "placement": "auto-start",
    "maxWidth": 720,
    "theme": "material",
    "interactive": True,
    "duration": [200, 400],
    "delay": [200, 0],
}
tippy_skip_anchor_classes = (
    "headerlink",
    "sd-stretched-link",
    "sd-rounded-pill",
    "tippy-skip",
)

suppress_warnings = ["myst.xref_missing"]

source_suffix = [".md"]
master_doc = "index"

# -- Project information

language = "zh_CN"
project = "日落图书馆"
version = release = "1E"
now = datetime.datetime.now()
copyright = f"2024-{now.year}, ネオン様"
author = "Eineon"

# -- Options for HTML output
html_title = "日落图书馆"
html_static_path = ["_lib"]
html_css_files = [
    "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css",
    "lib-style.css",
]
html_js_files = ["lib-script.js"]

# -- HTML theme settings
html_show_sphinx = False
html_last_updated_fmt = "%Y/%m/%d"
html_theme = "furo"
html_theme_options = {
    "sidebar_hide_name": False,
    "navigation_with_keys": True,
    "light_css_variables": {
        # 文本颜色
        "color-foreground-muted": "hsl(265, 100%, 45%)",
        # 元素颜色
        "color-brand-primary": "hsl(345, 100%, 45%)",
        "color-brand-content": "hsl(185, 100%, 45%)",
        "color-brand-visited": "var(--color-brand-content)",
        "color-highlight-on-target": "var(--color-highlight-vertical)",
        "color-brand-word": "hsl(205, 100%, 45%)",
        # 其他样式
        "admonition-title-font-size": ".9rem",
    },
    "dark_css_variables": {
        # 文本颜色
        "color-foreground-muted": "hsl(265, 100%, 65%)",
        # 元素颜色
        "color-brand-primary": "hsl(345, 100%, 60%)",
        "color-brand-content": "hsl(185, 100%, 60%)",
        "color-brand-visited": "var(--color-brand-content)",
        "color-highlight-on-target": "var(--color-highlight-vertical)",
        "color-brand-word": "hsl(205, 100%, 60%)",
        # 其他样式
        "admonition-title-font-size": ".9rem",
    },
    "footer_icons": [
        {
            "name": "GitHub",
            "url": "https://github.com/Eineon/SunsetLib",
            "html": "",
            "class": "fa-brands fa-github",
        },
        {
            "name": "更新日志",
            "url": "https://github.com/Eineon/SunsetLib/commits/main",
            "html": "",
            "class": "fa-solid fa-code-commit",
        },
        {
            "name": "项目主页",
            "url": "https://app.readthedocs.org/projects/sunsetlib",
            "html": "",
            "class": "fa-solid fa-cloud",
        },
    ],
    "source_repository": "https://github.com/Eineon/SunsetLib/",
    "source_branch": "main",
    "source_directory": "docs/source/",
}

# -- Options for HTMLHelp output
htmlhelp_basename = "日落图书馆"

# -- Options for EPUB output
epub_show_urls = "footnote"
