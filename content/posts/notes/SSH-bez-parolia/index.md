---
draft: true
title: "SSH без пароля"
description: "Как подключаться по ssh без пароля."
summary: "Как подключаться по ssh без пароля."
date: 2022-11-27
categories: ["Система"] # ["cat 1", "cat 2"]
tags: ["Linux", "Заметки"] # ['tag 1', 'tag 2']
author: ["nozsh"] # ['Me', 'You'] multiple authors
# canonicalURL: "yourself"
# weight: 1
# robotsNoIndex: true

# showToc: true
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
# CanonicalLinkText: ""
# UseHugoToc: false
# hideAuthor: true
# byai: true
cover:
  image: "" # image path/url
  alt: "Cover" # alt text
  # caption: "Photo by [Sajad Nori](#) / [Unsplash](https://unsplash.com/?nt)" # display caption under cover
  relative: true # when using page bundles set this to true
  hidden: true # only hide on current single page
---

Что бы подключится к удаленной машине по ssh без пароля, нужно создать ключ, командой на локальной машине:

```bash
ssh-keygen
```

Вас попросит ввести имя ключа.

Желательно генерировать ключ со стандартным именем, то есть не давать ему названия (обычно это **id_rsa.pub**).

Далее кодовую фразу, не имея которой вы не сможете подключится, она может отличатся пароля. Если ее не вводить, вход будет полностью без пароля (не рекомендую).

Вывод:

```bash {linenos=false}
Generating public/private rsa key pair.
Enter file in which to save the key (...):  # Имя ключа
Enter passphrase (empty for no passphrase): # Кодовая фраза
The key fingerprint is:
SHA256:2S0gWCog/is1SrNP185HTsv2Pz name\name@NAME
The key's randomart image is:
+---[RSA 3072]----+
| ............... |
+----[SHA256]-----+
```

Далее нужно скопировать ключ из .pub в authorized_keys.

```bash
# На локальной машине
scp ~/.ssh/id_rsa.pub root@ip:/dir/to/.ssh      # Скопировать ключ на сервер через SCP

# На хосте
cat ~/.ssh/id_rsa_pub >> ~/.ssh/authorized_keys # Записать ключ в authorized_keys
```

Либо можете просто открыть .pub скопировать ключ, и вставить его в authorized_keys, через nano/vim и др., или просто через sftp.

## Что получается?

Локальная машина:

```bash
$ ls .ssh
id_rsa
id_rsa.pub
```

Удаленная машина:

```
$ ls .ssh
authorized_keys
$ cat .ssh/authorized_keys
ssh-rsa # много много букв
```

Если вы все сделали правильно, то при следующем подключение у вас либо спросит фразу-пароль, либо произойдет подключение, если вы не указывали фразу-пароль.

Так же этот ключ можно использовать и на другой машине, для этого его так же нужно будет скопировать в authorized_keys.