---
draft: true
title: "Обход пароля на машине"
description: "Забыли пароль? Украли ноутбук? Не проблема."
summary: "Забыли пароль? Украли ноутбук? Не проблема."
date: 2024-05-15
tags: ["Windows", "Linux", "Статьи"] # ['tag 1', 'tag 2']
categories: ["Хакинг"] # ["cat 1", "cat 2"]
author: ["nozsh"] # ['Me', 'You'] multiple authors
# canonicalURL: "yourself"

showToc: true
TocOpen: true
hidemeta: false
comments: false
disableHLJS: false
disableShare: false
hideSummary: false
searchHidden: false
ShowReadingTime: true
ShowWordCount: true
ShowBreadCrumbs: true
ShowPostNavLinks: true
ShowRssButtonInSectionTermList: true
UseHugoToc: true
cover:
  image: "Obkhod-parolia-Windows-cover.jpg" # image path/url
  alt: "Cover" # alt text
  caption: "Photo by [rc.xyz NFT gallery](https://unsplash.com/@moneyphotos?nt) / [Unsplash](https://unsplash.com/?nt)" # display caption under cover
  relative: true # when using page bundles set this to true
  hidden: false # only hide on current single page
---

Вы слышали что в Windows нет дыр безопасности? Windows и есть дыра в безопасности. Поэтому если безопасная загрузка отключена, а диски не зашифрованы, это будет слишком просто.

{{< ahtung/1 >}}

## Используя образ Windows

Берем флешку, заливаем на нее образ Windows. Подойдет любой образ, но если машина выглядит новой то лучше образ по новей и в формате GPT. Лично я советую образ Windows 10.

{{< callout/note >}}
Но возможно целесообразней будет использовать таблицу разделов в формате MBR.

Большинство новых материнских плат могут читать как GPT так и MBR. Но иногда это требует включения нужной настройки.

В идеале иметь две флешки, одна в GPT, другая в MBR - это в том случае если вам важна отказоустойчивость.

Так сказать, готовы ко всему.
{{< /callout/note >}}

Сделали загрузочную флешку, вставили, загрузились с нее. Нажимаем сочетание клавиш `Shift + F10`. Открылась командная строка:

![Командная строка Windows](001-ekran-ustanovki-windows-komandnaia-stroka.jpg)

Далее нужно узнать букву системного диска, проблема в том что она может быть не `C`.

```bash
diskpart # Запустить утилиту Diskpart

lis dis # list disk # Вывести список дисков

sel dis $ # select disk # Выбрать диск, где $ номер диска

det dis # detail disk # Информация о диске
```

Нас интересует **Сведения**, диск должен быть **загрузочным**. Если это так, вероятней всего это системный диск. Несмотря на то, что в информации о другом диске, может быть написано **Системный**.
