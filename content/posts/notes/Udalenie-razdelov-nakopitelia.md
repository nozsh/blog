---
draft: false
title: "Удаление разделов накопителя"
description: "Как удалить разделы флешки, диска, etc."
summary: "Как удалить разделы флешки, диска, etc."
date: 2021-11-20
tags: ["Windows", "Заметки"] # ['tag 1', 'tag 2']
categories: ["Система"] # ["cat 1", "cat 2"]
author: ["nozsh"] # ['Me', 'You'] multiple authors
# canonicalURL: "yourself"

showToc: false
TocOpen: false
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
  image: "@img/udalenie-razdelov-nakopitelia-cover.avif" # image path/url
  alt: "Удаление разделов накопителя - Cover" # alt text
  caption: "Photo by [Drew DeArcos](https://href.li/?https://unsplash.com/@starvox?nt) / [Unsplash](https://unsplash.com/?nt)" # display caption under cover
  relative: false # when using page bundles set this to true
  hidden: false # only hide on current single page
---

```batch
diskpart          # Запустить diskpart
lis dis           # list disk # Список дисков
sel dis $         # select disk # Выбираем накопитель ($ = цифра, счет начинается с 0)
det dis           # detail disk # Информация о диске. Убедиться что это тот самый диск.
clean             # Очищаем
cre par pri       # create partition primary # Создаём раздел
sel par 1         # select partition # Выбираем раздел (счет начинается с 1)
active            # Делаем раздел активным. Если выдаст ошибку, пропускаем и идем дальше.
format fs=$ quick # Форматируем в файловую систему например: fat32, ntfs, опционально label=«name» - имя накопителя. Quick - быстрое форматирование.
assign            # Назначаем букву, чтобы накопитель появился в проводнике.
exit              # Выход из diskpart
```

Подробнее об [активных](https://compfixer.info/partition-active/?nt) разделах.
