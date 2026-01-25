---
draft: true
# url: "" # slug
title: "Дом. VPS. Хранилище. ZeroTier. NFS. SSHFS"
description: "О том как подключить сетевое хранилище и не забыть про Docker."
summary: "О том как подключить сетевое хранилище и не забыть про Docker."
date: 2026-01-25
# lastmod: 2026-01-24
categories: ["Short Read", "System"] # ["cat 1", "cat 2"]
tags: ["Linux"] # ['tag 1', 'tag 2']
author: ["nozsh"] # ['Me', 'You'] multiple authors
# authorURL: [""] # ['link author 1', 'link author 2'], ex. ['', 'https://example.com']
# canonicalURL: "yourself"
# CanonicalLinkText: "Источник:"
# weight: 1
# robotsNoIndex: true

# sha1: "" # for giscus

showToc: true
# TocOpen: false
# hidemeta: true
# comments: false
# disableHLJS: true
# disableShare: true
# hideSummary: true
# hideFooter: true
# searchHidden: true
# ShowCodeCopyButtons: false
# ShowReadingTime: false
# ShowWordCount: false
# hideAuthor: true
# ShowBreadCrumbs: true
# ShowPostNavLinks: false
# ShowRssButtonInSectionTermList: false
# ShowCanonicalLink: true
# UseHugoToc: false
# math: true
# byai: true
cover:
  image: "https://images.unsplash.com/photo-1567446154463-f6bf5ed4ad72" # image url
  # width: "1920" # only for img from url; EX: 1920
  # height: "1080" # only for img from url; EX: 1080
  alt: "Article - Cover" # alt text
  caption: "Photo by [gentina danurendra](https://unsplash.com/@gentinadanurendra#?sl) / [Unsplash](https://unsplash.com/?sl)" # display caption under cover
  relative: true # when using page bundles set this to true
  hidden: false # only hide on current single page
---

- https://unsplash.com/photos/a-close-up-of-a-cd-disc-with-a-rainbow-tint-YYiGaIqvMv8

---

## Первая схема

```
    Домашний сервер -->
--> NFS over ZeroTier --> VPS
--> SSHFS --> Хранилище
```

Закономерный вопрос, а зачем делать такой круг? А почему бы и нет? Но если без приколов, смысл есть, правда очень редко.

На словах что это такое кто не понял схему.

У вас есть домашний сервер и сетевой диск (хранилище, какое-то пространство и тп.) и вы хотите подключить его к домашнему серверу. Как это можно сделать?

1. [NFS](https://ru.wikipedia.org/wiki/Network_File_System)
2. [SSHFS](https://ru.wikipedia.org/wiki/SSHFS)
3. [VPN](https://ru.wikipedia.org/wiki/VPN)

NFS по умолчанию **не** шифрует передаваемые данные, но хорош для использования, например в том же Docker.

SSHFS шифрует передаваемые данные, но не очень хорош в том же Docker.

VPN лучший и универсальный вариант, но что если нельзя?

Подключаем хранилище к VPS через SSHFS -- передаваемые данные шифруются. Далее на том же VPS подымаем контроллер ZeroTier и объединяем домашний домашний сервер и VPS в одну сеть.

{{< embedPost url="tunnel-between-home-server-and-vps-via-zerotier" >}}

На домашнем сервере подключаем диск через NFS используя ZeroTier IP VPS, получая тот же NFS, но с шифрованием. Добавляем диск в Docker.

Если параметры подключения "правильные", то при зависание, отключение и тд. софт не упадет. Например качается файл с selfhosted файлообменника как вдруг упало хранилище -- софт не зависнет, но файл качатся перестанет и продолжит когда хранилище воскреснет.

Смысл в этой схеме как и написано в начале есть, но в очень редких случаях. Например если вы не можете или не хотите подключать хранилище к домашнему серверу напрямую, а с VPS можете. Или можно только через VPN (например WireGuard), но дома WG не работает -- поэтому между VPS и хранилищем VPN, а там уже домой.

**VPS:**

**Дом:**

...

## Вторая схема

Эта схема без кругов, подключая хранилище напрямую к домашнему серверу по SSHFS, а затем по NFS с localhost :D

