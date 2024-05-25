---
draft: false
title: "Typo"
description: "Как правильно писать"
# date: 2001-01-29
tags: [""] # ['tag 1', 'tag 2']
categories: [""] # ["cat 1", "cat 2"]
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
ShowReadingTime: false
ShowWordCount: false
ShowBreadCrumbs: false
ShowPostNavLinks: false
ShowRssButtonInSectionTermList: true
UseHugoToc: true
cover:
  image: "typo-cover.jpg" # image path/url
  alt: "Typo Cover" # alt text
  caption: "" # display caption under cover
  relative: false # when using page bundles set this to true
  hidden: false # only hide on current single page
---

## Кастом

### Каллауты

{{< callout/note >}}
Это **заметка**.
{{< /callout/note >}}

```bash
{{</* callout/note */>}}
Это **заметка**.
{{</* /callout/note */>}}
```

---

{{< callout/hint >}}
Это **подсказка**.
{{< /callout/hint >}}

```bash
{{</* callout/hint */>}}
Это **подсказка**.
{{</* /callout/hint */>}}
```

---

{{< callout/warn >}}
Это **предупреждение**.
{{< /callout/warn >}}

```bash
{{</* callout/warn */>}}
Это **предупреждение**.
{{</* /callout/warn */>}}
```

### Ахтунг

{{< ahtung/1 >}}

```md
{{</* ahtung/1 */>}}
```

### Спойлер/Аккордион

{{< details/1 "Заголовок" open >}}
Контент
{{< /details/1 >}}

{{< details/1 "Заголовок" >}}
Контент
{{< /details/1 >}}

```md
{{</* details/1 "Заголовок" open */>}}
Контент
{{</* /details/1 */>}}
```

### Встраивание YouTube

{{< iframes/yt jfKfPfyJRdk "lofi hip hop radio 📚 - beats to relax/study to" >}}

```md
{{</* iframes/yt jfKfPfyJRdk */>}}
```

```md
{{</* iframes/yt jfKfPfyJRdk "title" */>}}
```

## Заголовки

Следующие элементы HTML `h2` - `h6` представляют шесть уровней заголовков разделов. `h2` это самый высокий уровень, а `h6` самый низкий.

```md
## H2       <-- Учитывается в содержании

### H3      <-- Учитывается в содержании

#### H4     <-- Учитывается в содержании

##### H5    <-- Учитывается в содержании

###### H6   <-- Не учитывается в содержании
```

## Разметка

| Стиль | Markdown |
| :---- | -------: |
| **Жирный** | `**text**` / `__text__` | 
| *Курсив* | `*text*` / `_text_` |
| ~~Перечеркнутый~~ | `~~text~~` |
| <u>Подчеркнутый</u> | `<u>text</u>` |
| Sub<sub>Текст</sub> | `<sub>text</sub>` |
| Sup<sup>Текст</sup> | `<sup>text</sup>` |
| [Ссылка](typo) | `[text](#)` |
| [Ссылка в новой вкладке](typo?nt) <sup>Кастом</sup> | `[text](#?nt)` |
| `inline code` | `` `text` `` |
| <mark>Выделение</mark> | `<mark>text</mark>` |

## Списки

### Обычный список

* Раз
* Два
* Три
* Это
  * Обычный
    * Список

```md
* Раз
* Два
* Три
* Это
  * Обычный
    * Список

- Раз
- Два
- Три
- Это
  - Обычный
    - Список
```

### Нумерованный список

1. Раз
2. Два
3. Три
4. Это
    1. Нумерованный
        1. Список

```md
1. Раз
2. Два
3. Три
4. Это
    1. Нумерованный
        1. Список
```

### Чекбоксы

- [ ] Пустой
- [ ] Еще пустой
  - [ ] Пустой, но вложенный
- [X] Не пустой
  - [X] Не пустой и вложенный

```md
* [ ] Пустой
* [ ] Еще пустой
  * [ ] Пустой, но вложенный
* [X] Не пустой
  * [X] Не пустой и вложенный

- [ ] Пустой
- [ ] Еще пустой
  - [ ] Пустой, но вложенный
- [X] Не пустой
  - [X] Не пустой и вложенный
```

## Цитаты

> Цитата

> «Когда у тебя ничего нет, нечего и терять.»
>
> -- Джек Доусон

```md
> Цитата

> «Когда у тебя ничего нет, нечего и терять.»
>
> -- Джек Доусон
```

## Изображения

![alt text](typo-cover.jpg)

```md
![alt text](typo-cover.jpg)
```

### Другой размер (Кастом)

{{< imgs/img "alt text" "50%" "typo-cover.jpg" >}}

```md
{{</* imgs/img "alt text" "50%" "typo-cover.jpg" */>}}
```

### С подписью (Кастом)

{{< imgs/imgc width="" caption="Это подпись" alt="alt text" src="typo-cover.jpg" >}}

```md
{{</* imgs/imgc width="" caption="" alt="" src="" */>}}
```

## Таблицы

| Заголовок #1  | Заголовок #2 | Заголовок #3 | Заголовок #4 | etc. |
| ------------- | ------------ | ------------ | ------------ | ---- |
| Текст         | Текст        | Текст        | Текст        | etc. |
| Текст         | Текст        | Текст        | Текст        | etc. |
| Текст         | Текст        | Текст        | Текст        | etc. |

```md
| Заголовок #1  | Заголовок #2 | Заголовок #3 | Заголовок #4 | etc. |
| ------------- | ------------ | ------------ | ------------ | ---- |
| Текст         | Текст        | Текст        | Текст        | etc. |
| Текст         | Текст        | Текст        | Текст        | etc. |
| Текст         | Текст        | Текст        | Текст        | etc. |
```

Отступы соблюдать не обязательно, это:

```md
| Заголовок #1  | Заголовок #2 |Заголовок #3| Заголовок #4| etc. |
|-------------|------------|------------|------------ |---- |
|Текст | Текст | Текст | Текст | etc. |
|Текст |Текст | Текст | Текст | etc. |
|Текст| Текст | Текст | Текст | etc. |
```

Будет выглядеть так же.

Выравнивание текста работает через: `:--`, `:-:`, `--:`.

| Лево  | Центр | Право |
| :---- | :---: | ----: |
| Текст | Текст | Текст |

```md
| Лево  | Центр | Право |
| :---- | :---: | ----: |
| Текст | Текст | Текст |
```