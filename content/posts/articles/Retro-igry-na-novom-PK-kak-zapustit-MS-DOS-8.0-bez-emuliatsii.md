---
draft: false
title: "Ретро-игры на новом ПК: как запустить MS-DOS 8.0 без эмуляции"
description: "Демонстрация обратной совместимости x86 через запуск MS-DOS на современном оборудовании."
summary: "Демонстрация обратной совместимости x86 через запуск MS-DOS на современном оборудовании."
date: 2024-08-09
categories: ["Long Read", "System"] # ["cat 1", "cat 2"]
tags: [] # ['tag 1', 'tag 2']
author: ["nozsh"] # ['Me', 'You'] multiple authors
canonicalURL: "https://www.securitylab.ru/news/550839.php?sl"
# weight: 1
# robotsNoIndex: true

showToc: true
# TocOpen: true
# hidemeta: true
comments: false
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
ShowCanonicalLink: true
CanonicalLinkText: "Источник:"
# UseHugoToc: false
# hideAuthor: true
# byai: true
cover:
  # image: "@img/retro-igry-na-novom-pk-kak-zapustit-ms-dos-8.0-bez-emuliatsii-cover.avif" # image path/url
  width: "1200" # only for img from url; EX: 1920
  height: "686" # only for img from url; EX: 1080
  alt: "Ретро-игры на новом ПК: как запустить MS-DOS 8.0 без эмуляции - Cover" # alt text
  # caption: "Photo by [Sajad Nori](#) / [Unsplash](https://unsplash.com/?sl)" # display caption under cover
  relative: true # when using page bundles set this to true
  hidden: true # only hide on current single page
---

Автор [YouTube-канала Inkbox](https://www.youtube.com/watch?v=BXNHHUmVZh8?sl) показал, как запустить легендарную операционную систему [MS-DOS](https://ru.wikipedia.org/wiki/MS-DOS?sl) и классические игры на современном компьютере без всякой эмуляции.

{{< iframes/yt BXNHHUmVZh8 "45 Year Old DOS on a New Intel CPU Without Emulation" >}}

Он загрузил старую версию MS-DOS 8.0, выпущенную еще до эры Windows, и установил на компьютер с процессором [Intel](https://ru.wikipedia.org/wiki/Intel?sl) игры вроде оригинального [Doom 1993](<https://ru.wikipedia.org/wiki/Doom_(%D0%B8%D0%B3%D1%80%D0%B0,_1993)?sl>) года. Самое удивительное, что 16-битный код выполнялся напрямую.

Inkbox раскрыл причину удивительной совместимости. Оказывается, все началось в конце 1970-х годов, когда Intel разрабатывала революционный процессор [8086](https://ru.wikipedia.org/wiki/Intel_8086?sl). Инженеры компании предусмотрительно обеспечили возможность запуска программ, созданных для предыдущих моделей процессоров. Они и не подозревали, что эта обратная совместимость станет визитной карточкой [архитектуры x86](https://ru.wikipedia.org/wiki/X86?sl) на долгие десятилетия.

Решающий момент наступил в 1981 году, когда [IBM](https://ru.wikipedia.org/wiki/IBM?sl) выбрала модификацию процессора для своего знаменитого IBM PC. На протяжении следующего десятилетия большинство персональных компьютеров были совместимы с IBM и строились на основе развивающихся процессоров x86, таких как [80286](https://ru.wikipedia.org/wiki/Intel_80286?sl) и [80386](https://ru.wikipedia.org/wiki/Intel_80386?sl). Чтобы старые программы продолжали работать, каждый новый чип поддерживал исходный 16-битный режим, использовавшийся в 8086.

Сегодня даже самые современные 64-битные процессоры x86 от Intel и [AMD](https://ru.wikipedia.org/wiki/AMD?sl) при запуске все еще переходят в тот старый 16-битный режим, прежде чем переключиться на современные режимы работы.

Для своего эксперимента Inkbox использовал мини-ПК [Icewhale ZimaBlade](https://noted.lol/icewhale-announces-new-zimablade/?sl). Он установил в него модуль оперативной памяти на 16 ГБ и процессор Intel [Celeron](https://ru.wikipedia.org/wiki/Celeron?sl) N3450. Несмотря на наличие современных разъемов, компьютеру не хватало дисковода для гибких дисков.

Однако Inkbox нашел выход, использовав программу [Rufus](https://rufus.ie/ru/?sl) для создания загрузочного диска [DOS](https://ru.wikipedia.org/wiki/DOS?sl) на обычной USB-флешке. После настройки BIOS на загрузку в режиме legacy и выбора USB-накопителя, ему удалось без особых сложностей загрузить среду MS-DOS 8.0.

Этот эксперимент не только интересен, но и подчеркивает невероятную инертность, присущую вычислениям на базе x86. Intel пыталась перейти на новые процессорные архитектуры, например, [Itanium](https://ru.wikipedia.org/wiki/Itanium?sl), но безуспешно. Даже сейчас попытки производителя оптимизировать будущие чипы x86 путем удаления некоторых устаревших инструкций представляют собой непрерывный процесс.

Тем, кто хочет сам попробовать запустить MS-DOS и старые программы, понадобится ПК, способный загружаться в режиме legacy BIOS. С помощью программы Rufus можно создать загрузочный USB-накопитель с DOS, следуя инструкциям из видео.
