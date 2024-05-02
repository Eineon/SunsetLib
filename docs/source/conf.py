# Configuration file for the Sphinx documentation builder.

# -- Project information

project = '日落图书馆'
copyright = '2024, ネオン様'
author = 'Eineon'

release = '1.0'

html_last_updated_fmt = "%Y/%m/%d"

# -- General configuration

extensions = [
    'sphinx.ext.duration',
    'sphinx.ext.doctest',
    'sphinx.ext.autodoc',
    'sphinx.ext.autosummary',
    'sphinx.ext.intersphinx',
    'sphinx_markdown_tables',
    'recommonmark',
]

intersphinx_mapping = {
    'python': ('https://docs.python.org/3/', None),
    'sphinx': ('https://www.sphinx-doc.org/en/master/', None),
}
intersphinx_disabled_domains = ['std']

templates_path = ['_templates']

# -- Options for HTML output
import sphinx_pdj_theme
html_theme = 'sphinx_pdj_theme'
html_theme_path = [sphinx_pdj_theme.get_html_theme_path()]

html_static_path = ["_lib"]
html_css_files = ["lib-style.css"]
html_js_files = ["lib-script.js"]

# -- Options for HTMLHelp output
htmlhelp_basename = '日落图书馆'

# -- Options for EPUB output
epub_show_urls = 'footnote'

# -- Options for PDF output
latex_engine = 'xelatex'
latex_use_xindy = False
latex_elements = {
    'preamble': '\\usepackage[UTF8]{ctex}\n',
}

source_parsers = {
    '.md': 'recommonmark.parser.CommonMarkParser',
}

source_suffix = ['.rst', '.md']