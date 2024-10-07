---
draft: true
title: "Гайд на Git"
description: "Наконец-то гайд на Git или самое время научиться этим пользоваться."
summary: "Наконец-то гайд на Git или самое время научиться этим пользоваться."
date: 2001-01-29
# lastmod: 2001-01-29
categories: ["Dev"] # ["cat 1", "cat 2"]
tags: ["Статьи"] # ['tag 1', 'tag 2']
author: ["nozsh"] # ['Me', 'You'] multiple authors
# canonicalURL: "yourself"
# weight: 1
# robotsNoIndex: true

showToc: true
# TocOpen: true
# hidemeta: true
# comments: true
# disableHLJS: true
# disableShare: true
# hideSummary: true
# hideFooter: true
# searchHidden: true
# ShowCodeCopyButtons: false
# ShowReadingTime: false
# ShowWordCount: false
# ShowBreadCrumbs: false
# ShowPostNavLinks: fales
# ShowRssButtonInSectionTermList: false
# ShowCanonicalLink: true
# CanonicalLinkText: "Источник:"
# UseHugoToc: false
# hideAuthor: true
# byai: true
cover:
  image: "@img/git-guide-cover.avif" # image path/url
  alt: "Гайд на Git - Cover" # alt text
  caption: "Photo by [Yancy Min](https://unsplash.com/@yancymin?nt) / [Unsplash](https://unsplash.com/?nt)" # display caption under cover
  relative: true # when using page bundles set this to true
  # hidden: true # only hide on current single page
---

## Введение

{{< callout/warn >}}
**Git не следует путать с [GitHub](https://ru.wikipedia.org/wiki/GitHub?nt), [GitLab](https://ru.wikipedia.org/wiki/GitLab?nt) и [Gitea](https://ru.wikipedia.org/wiki/Gitea?nt) - веб-сайтами для размещения git-репозиториев и совместной разработки проектов.**
{{< /callout/warn >}}

**Git** - это инструмент, который помогает разработчикам отслеживать изменения в коде. Git позволяет каждому участнику проекта иметь полную копию всех изменений, что упрощает совместную работу

**Git** не ограничивается работой только с GitHub, он также работает и с другими платформами (которые поддерживаются), такими как GitLab, Hugging Face, Bitbucket, Azure DevOps и др.

## Уровень 1: Умение клонировать
