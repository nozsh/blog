---
draft: true
title: "Пиратим Nintendo Switch"
description: "У вас Denuvo - у нас эмулятор."
summary: "У вас Denuvo - у нас эмулятор."
date: 2024-01-26
tags: ["Nintendo"] # ['tag 1', 'tag 2']
categories: ["Черный флаг", "📄 Статьи"] # ["cat 1", "cat 2"]
author: ["nozsh"] # ['Me', 'You'] multiple authors
# canonicalURL: "yourself"

showToc: true
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
  image: "piratim-nintendo-switch-cover.jpg" # image path/url
  alt: "Пиратим Nintendo Switch (Prince of Persia: The Lost Crown) - Cover" # alt text
  caption: "Prince of Persia: The Lost Crown" # display caption under cover
  relative: false # when using page bundles set this to true
  hidden: false # only hide on current single page
---

{{< ahtung/1 >}}

{{< callout/note >}}
**Не обращайте внимание на название статьи, речь пойдет о эмуляции игр для Switch. Чтобы их эмулировать, у вас должна быть консоль и купленная игра ;)**
{{< /callout/note >}}

Покажу как эмулировать игры свичта на примере Prince of Persia: The Lost Crown. Речь идет о **Switch**, а не о **Wii U**, для второго лучше использовать эмулятор [Cemu](https://cemu.info/?nt).

То есть, когда вы покупаете игру (со 100% скидкой разумеется) обращайте внимание для чего она, Switch или Wii U - это две разные консоли.

{{< callout/note >}}
Нет необходимости писать статью на тему эмуляции Wii U, там все просто. Скачать эмулятор, установить игру, готово.
{{< /callout/note >}}

Эта статья для тех кто хочет сделать все своими руками, а не скачать уже готовый репак с эмулятором и прочим от жирной девочки.

Мы скачаем эмулятор, настроим эмулятор, скачаем/установим прошивку для свитча, скачаем prod.keys, конвертируем дамп игры в формат для эмулятора, установим DLC для игры и наконец запустим.

Для начала качаем эмулятор Yuzu ([1](https://4pda.to/2024/03/05/425100/?nt), [2](https://4pda.to/forum/index.php?showtopic=1070467?nt)) или [Ryujinx](https://ryujinx.org/?nt) ([GitHub](https://github.com/Ryujinx/Ryujinx?nt)), какой значения не имеет. Попробуйте оба если хотите, какой больше понравится тот и используйте. Я буду использовать Ryujinx.


## Первый запуск Ryujinx

Вы уже скачали эмулятор и распаковали его в нужную директорию.

Открываем ryujinx, видим это:

{{< imgs/imgc width="" caption="Ryujinx ошибка prod.keys" alt="Ryujinx ошибка prod.keys - RYU-0001 Keys not found" src="001-ryujinx-oshibka-zapuska.jpg" >}}

Не обращаем внимания, так и должно быть. Нажимаем **ОК**.

{{< imgs/imgc width="" caption="Интерфейс Ryujinx" alt="Интерфейс эмулятора Ryujinx" src="002-interfeys-emulyatora-ryujinx.jpg" >}}

Переходим в директорию где хранятся конфиг файлы Ryujinx:

{{< imgs/imgc width="" caption="File > Open Ryujinx Folder >> System" alt="Ryujinx - Предустановка ключей" src="003-ryujinx-predustanovka-klyuchey.jpg" >}}


