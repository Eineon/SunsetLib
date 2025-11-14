# Configuration file for the Sphinx documentation builder.

import datetime

# -- General configuration
extensions = [
    "sphinx.ext.autosectionlabel",
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
    "dollarmath",  # 行内数学公式
    "amsmath",  # AMS 数学公式
    "deflist",  # 定义列表
    "colon_fence",  # 冒号的代码围栏
    "html_admonition",  # HTML 警告
    "html_image",  # HTML 图像
    # "smartquotes",  # 智能引号
    # "replacements",  # 排版文本转换
    "linkify",  # 链接
    "substitution",  # 替换
    "tasklist",  # 任务列表
]
# 全局替换
myst_substitutions = {
    # "替换对象": "替换内容",
}

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
        "color-brand-visited": "var(--color-brand-content)",
    },
    "dark_css_variables": {
        "color-brand-visited": "var(--color-brand-content)",
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

# -- Options for PDF output
latex_engine = "xelatex"
latex_use_xindy = False
latex_elements = {
    "preamble": "\\usepackage[UTF8]{ctex}\n",
}
