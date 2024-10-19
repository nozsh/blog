---
draft: true
# url: "" # slug
# title: "Локальная установка генерации пикч. StabilityMatrix"
title: "Локальная AI генерация изображений. Stability Matrix"
description: "Простой способ запустить локальную установку AI для генерации изображений."
summary: "Простой способ запустить локальную установку AI для генерации изображений."
date: 2024-10-14
# lastmod: 2001-01-29
categories: ["AI"] # ["cat 1", "cat 2"]
tags: ["Windows", "Linux", "macOS", "Статьи"] # ['tag 1', 'tag 2']
author: ["nozsh"] # ['Me', 'You'] multiple authors
# authorURL: [""] # ['link author 1', 'link author 2'], ex. ['', 'https://example.com']
# canonicalURL: "yourself"
# CanonicalLinkText: "Источник:"
# weight: 1
# robotsNoIndex: true

showToc: true
# TocOpen: false
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
# hideAuthor: true
# ShowBreadCrumbs: false
# ShowPostNavLinks: fales
# ShowRssButtonInSectionTermList: false
# ShowCanonicalLink: true
# UseHugoToc: false
# byai: true
cover:
  image: "local-ai-image-generation-stability-matrix-cover.avif" # image path/url
  width: "1920" # only for img from url; EX: 1920
  height: "1080" # only for img from url; EX: 1080
  alt: "article - Cover" # alt text
  # caption: "Photo by [Sajad Nori](#) / [Unsplash](https://unsplash.com/?sl)" # display caption under cover
  relative: true # when using page bundles set this to true
  hidden: false # only hide on current single page
---

{{< callout/custom "🚀" "#000" "#FBAB7E" "linear-gradient(62deg, #FBAB7E 0%, #F7CE68 100%);" >}}
**Это будет короткая статья, потому что это слишком просто сделать! :)**
{{< /callout/custom >}}

## Введение: О Stability Matrix

В этой статье я расскажу, как легко запустить локальную установку для генерации изображений на вашем компьютере - без каких-либо технических знаний.

Для этого мы будем использовать **[Stability Matrix](https://github.com/LykosAI/StabilityMatrix?sl)**. Это многоплатформенный менеджер пакетов для Stable Diffusion, который работает на Windows, Linux и macOS. Кроме того, Stability Matrix поддерживает установку различных панелей для управления генерацией изображений, включая те, которые работают с Flux моделями.

{{< embedPost "start-flux-model-local">}}

Stability Matrix делает все за вас, и вам не нужно устанавливать множество зависимостей отдельно и вручную. Это удобно, потому что все необходимые зависимости будут в одном месте и не повлияют на вашу операционную систему.

Например, если у вас уже установлен Python определенной версии, Stability Matrix все равно установит нужную версию и будет использовать только ее, не меняя вашу. Если Python у вас нет, после установки Stability Matrix он также не появится в системе - версия, которую установит Stability Matrix, будет использоваться Stability Matrix.

## Установка Stability Matrix и первой панели

Переходим на страницу GitHub [репозитория Stability Matrix](https://github.com/LykosAI/StabilityMatrix?sl), качаем либо со страницы [релизов](https://github.com/LykosAI/StabilityMatrix/releases?sl):

![Скачивание Stability Matrix с GitHub - releases](001-local-ai-image-generation-stability-matrix-skachivaniye-s-github-releases.avif)

Либо с кнопок в readme:

![Скачивание Stability Matrix с GitHub - readme](002-local-ai-image-generation-stability-matrix-skachivaniye-s-github-readme.avif)

## Пикчи

{{< imgs/gallery
"pic-001-flux1-dev-bnb-nf4-v2.avif" "big"
"pic-002-flux1-dev-bnb-nf4-v2.avif" "big"
"pic-003-flux1-dev-bnb-nf4-v2.avif" "big"
"pic-004-flux1-dev-bnb-nf4-v2.avif" "big"
"pic-005-flux1-dev-bnb-nf4-v2.avif" "big"
"pic-006-flux1-dev-bnb-nf4-v2.avif" "big"
"pic-007-flux1-dev-bnb-nf4-v2.avif" "big"
"pic-008-flux1-dev-bnb-nf4-v2.avif" "big" >}}

Изображения были сгенерированы моделью [flux1-dev-bnb-nf4-v2](https://huggingface.co/lllyasviel/flux1-dev-bnb-nf4?sl).