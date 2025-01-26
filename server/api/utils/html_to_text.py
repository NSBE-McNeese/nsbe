import html2text


def textify(html_content):
    h = html2text.HTML2Text()
    h.ignore_links = False

    return h.handle(html_content)
