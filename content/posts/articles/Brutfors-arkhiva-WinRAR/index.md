---
draft: true
title: "Брутфорс архива WinRAR"
description: "Покажу как перебирать пароли от архива WinRAR, используя 7z."
summary: "Покажу как перебирать пароли от архива WinRAR, используя 7z."
date: 2024-05-15
tags: ["Брутфорс", "WinRAR", "Windows"] # ['tag 1', 'tag 2']
categories: ["Хакинг", "Статьи"] # ["cat 1", "cat 2"]
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
  image: "" # image path/url
  alt: "Cover" # alt text
  caption: "Photo by [Sajad Nori](#) / [Unsplash](https://unsplash.com/?nt)" # display caption under cover
  relative: true # when using page bundles set this to true
  hidden: true # only hide on current single page
---

{{< ahtung/1 >}}

Для начала, мы разберемся как работает распаковка через терминал и что мы будем использовать при написании скрипта.

```bash
"path\to\7-Zip\7z.exe" x -pPASSWORD "path\to\someWinRARArchive.rar" -o"path\to\output" -y
```

`path\to\7-Zip\7z.exe` - это путь до **7z.exe**

`x` - распаковать архив

`-p` - использовать пароль для распаковки

`path\to\someWinRARArchive.rar` - путь до WinRAR архива

`-o` - указать куда будет распакован архив

`path\to\output` - путь куда будет распакован архив

`-y` - _Yes/Да_ подтвердить замену файлов, если они уже существуют.

{{< callout/note >}}
Указывать параметры после флагов `-p` и `-o` нужно без пробелов.
{{< /callout/note >}}

Итак, у нас есть архив с паролем: `qwerty`.

Если мы введем данную команду в терминал с неправильным паролем:

```bash
"path\to\7-Zip\7z.exe" x -p123 "path\to\someWinRARArchive.rar" -o"path\to\output" -y
```

То мы получим ошибку:

```bash
Can not open encrypted archive. Wrong password?

Can't open as archive: 1
Files: 0
Size:       0
Compressed: 0
```

После выполнения этой команды, мы можем использовать:

```bash
echo %errorlevel%
2
```

И в ответ мы получим `2`. Это означает что команда была выполнена с ошибкой. Если мы снова введем команду, но уже с верным паролем, а потом проверим **errorlevel**, то мы получим `0`.

```bash
"path\to\7-Zip\7z.exe" x -pqwerty "path\to\someWinRARArchive.rar" -o"path\to\output" -y

Everything is Ok

Folders: 1
Files: 1
Size:       12
Compressed: 334

echo %errorlevel%
0
```

Из этого следует, что мы можем использовать **errorlevel** в скрипте, для проверки был ли пароль верен, или же нет, и подбирать пароль дальше, пока **errorlevel** не будет равен **0**.

---

Создаем файл с расширением `.bat` или `.cmd`. Начинаем скрипт с:

```bash
@echo off
```

Чтобы скрыть лишний вывод.

Просим пользователя ввести путь по каталога с 7z, и записываем это в переменную `z7dir`:

```bash
echo - Path to 7z dir:
set /p z7dir="#: "
```

Проверяем существует ли каталог 7z, если нет, то выводим ошибку:

```bash
if not exist "%z7dir%" (
  echo.
  echo ERROR!
  echo 7z dir - ^"%z7dir%^"
  echo Not be found...
  pause
  exit
)
```

Аналогично делаем с архивом:

```bash
echo - Path to archive:
set /p archive="#: "

if not exist "%archive%" (
  echo.
  echo ERROR!
  echo Archive ^"%archive%^"
  echo Not be found...
  pause
  exit
)
```

Спрашиваем пользователя куда распаковать архив:

```bash
echo - Path to output:
set /p output="#: "
```

И тоже самое со словарем, где находятся пароли:

```bash
echo - Path to wordlist.txt:
set /p wordlist="#: "

if not exist "%wordlist%" (
  echo.
  echo ERROR!
  echo Wordlist - ^"%wordlist%^"
  echo Not be found...
  pause
  exit
)
```

Далее пишем цикл для записи паролей из `wordlist.txt` в переменную:

```bash
for /f %%a in (%wordlist%) do (
  set pwd=%%a
  call :try
)
```

[_Источник_](https://youtu.be/Il2CF15F6cg?si=c4wMnPuCVvC3GGeP?nt)
