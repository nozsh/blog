---
draft: true
# url: "" # slug
title: "Дом. VPS. Хранилище. ZeroTier. NFS. SSHFS"
description: "О том как подключить сетевое хранилище и не забыть про проблемы с SSHFS."
summary: "О том как подключить сетевое хранилище и не забыть про проблемы с SSHFS."
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
  image: "@img/cover.home-vps-storage-zerotier-nfs-sshfs.webp" # image url
  width: "1920" # only for img from url; EX: 1920
  height: "1280" # only for img from url; EX: 1080
  alt: "Дом. VPS. Хранилище. ZeroTier. NFS. SSHFS - Cover" # alt text
  caption: "Photo by [gentina danurendra](https://unsplash.com/@gentinadanurendra#?sl) / [Unsplash](https://unsplash.com/?sl)" # display caption under cover
  relative: true # when using page bundles set this to true
  # hidden: true # only hide on current single page
---

...

Для начала разберемся:

- Дом - это ваш домашний сервер, который может быть в т.ч. за NAT
- VPS - это сервер с публичным IP, не за NAT соответственно
- NAS - это некое удаленное хранилище с публичный IP и доступно откуда угодно **ИЛИ** локальным IP внутри сети хостера (доступно только с VPS хостера)

## Схема первая

![](@img/home-server-zerotier-nfs-vps-sshfs-nas-scheme.avif)

*Схема не очень, но и я не художник.*

Закономерный вопрос, а зачем? А почему бы и нет? Но если без приколов, смысл есть, правда очень редко.

К вопросу "а зачем?"; если вы что-то хостите у себя на домашнем сервере и делаете это публичным используя тот же VPS как шлюз, и вы используете или хотите использовать хранилище для того что хостите -- получится серьезный такой круг:

```txt {linenos=false}
Client --> VPS --> Home --> VPS --> NAS --> VPS --> Home --> VPS --> Client
```

*В случае второй схемы которая описана <a href="#схема-вторая">ниже</a>:*

```txt {linenos=false}
Client --> VPS --> Home --> NAS --> Home --> VPS --> Client
```

На словах что это такое кто не понял первую схему.

У вас есть домашний сервер и сетевой диск (хранилище, какое-то пространство и тп.) и вы хотите подключить его к домашнему серверу. Как это можно сделать?

1. [NFS](https://ru.wikipedia.org/wiki/Network_File_System)
2. [SSHFS](https://ru.wikipedia.org/wiki/SSHFS)
3. [VPN](https://ru.wikipedia.org/wiki/VPN)

NFS по умолчанию **не** шифрует передаваемые данные, но хорош для использования, например в том же Docker.

SSHFS шифрует передаваемые данные, но не очень хорош в том же Docker.

VPN лучший и универсальный вариант, но что если нельзя?

Подключаем хранилище к VPS через SSHFS -- передаваемые данные шифруются. Далее на том же VPS подымаем контроллер ZeroTier и объединяем домашний сервер и VPS в одну сеть.

{{< embedPost url="tunnel-between-home-server-and-vps-via-zerotier" >}}

На домашнем сервере подключаем диск через NFS используя ZeroTier IP VPS, получая тот же NFS, но с шифрованием. Добавляем диск в Docker.

Если параметры подключения "правильные", то при зависание, отключение и тд. софт не упадет. Например качается файл с selfhosted файлообменника как вдруг упало хранилище -- софт не зависнет, но файл качатся перестанет и продолжит когда хранилище воскреснет.

Смысл в этой схеме как и написано в начале есть, но в очень редких случаях. Например если вы не можете или не хотите подключать хранилище к домашнему серверу напрямую, а с VPS можете. Или можно только через VPN (например WireGuard), но дома WG не работает -- поэтому между VPS и хранилищем VPN, а там уже домой.

Как все подключить как на схеме:

**VPS:**

**Дом:**

...

## Схема вторая

![](@img/home-server-localhost-nfs-sshfs-nas-scheme.avif)

Эта схема без кругов, подключаем хранилище напрямую к домашнему серверу по SSHFS, а затем по NFS с localhost :D

{{< 1wordfix >}}