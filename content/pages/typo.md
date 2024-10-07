---
draft: true
title: "📝 Typo"
# url: ""
description: "Как правильно писать"
summary: "Как правильно писать"
# date: 2001-01-29
# lastmod: 2001-01-29
categories: [""] # ["cat 1", "cat 2"]
tags: [""] # ['tag 1', 'tag 2']
author: ["nozsh"] # ['Me', 'You'] multiple authors
authorURL: [""] # ['link author 1', 'link author 2'], ex. ['', 'https://example.com']
# canonicalURL: "yourself"
# weight: 1
robotsNoIndex: true

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
# ShowBreadCrumbs: false
# ShowPostNavLinks: fales
# ShowRssButtonInSectionTermList: false
# ShowCanonicalLink: true
# CanonicalLinkText: "Источник:"
# UseHugoToc: false
# hideAuthor: true
# byai: true
cover:
  image: "@img/typo-cover.jpg" # image path/url
  alt: "Typo Cover" # alt text
  caption: "Photo by [camilo jimenez](https://unsplash.com/@camstejim?nt) / [Unsplash](https://unsplash.com/?nt)" # display caption under cover
  relative: true # when using page bundles set this to true
  # hidden: true # only hide on current single page
---

## Каллауты

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

## Ахтунг

{{< ahtung/1 >}}

```md
{{</* ahtung/1 */>}}
```

## Спойлер

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

## Встраивание YouTube видео

{{< iframes/yt jfKfPfyJRdk "lofi hip hop radio 📚 - beats to relax/study to" >}}

```md
{{</* iframes/yt jfKfPfyJRdk "title" "params" */>}}
```

## Ссылка на пост

{{< embedPost "typo" >}}

```md
{{</* embedPost "typo"*/>}}
```

## Заголовки

Следующие элементы HTML `h2` - `h6` представляют пять уровней заголовков разделов. `h2` это самый высокий уровень, а `h6` самый низкий.

Заголовок `h1` это заголовок (название) записи, поэтому он не используется.

```md
## H2 <-- Учитывается в содержании

### H3 <-- Учитывается в содержании

#### H4 <-- Учитывается в содержании

##### H5 <-- Учитывается в содержании

###### H6 <-- Учитывается в содержании
```

## Разметка

| Стиль                                                         |                Markdown |
| :------------------------------------------------------------ | ----------------------: |
| **Жирный**                                                    | `**text**` / `__text__` |
| _Курсив_                                                      |     `*text*` / `_text_` |
| ~~Перечеркнутый~~                                             |              `~~text~~` |
| <u>Подчеркнутый</u>                                           |           `<u>text</u>` |
| Sub<sub>Текст</sub>                                           |       `<sub>text</sub>` |
| Sup<sup>Текст</sup>                                           |       `<sup>text</sup>` |
| [Ссылка](typo)                                                |             `[text](#)` |
| [Анонимная ссылка в новой вкладке](https://example.com/?nt)   |          `[text](#?nt)` |
| [Анонимная ссылка в текущей вкладке](https://example.com/?sl) |          `[text](#?sl)` |
| `inline code`                                                 |            `` `text` `` |
| <mark>Выделение</mark>                                        |     `<mark>text</mark>` |

## Списки

### Обычный список

- Раз
- Два
- Три
- Это
  - Обычный
    - Список

```md
- Раз
- Два
- Три
- Это
  - Обычный
    - Список

* Раз
* Два
* Три
* Это
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
- [x] Не пустой
  - [x] Не пустой и вложенный

```md
- [ ] Пустой
- [ ] Еще пустой
  - [ ] Пустой, но вложенный
- [x] Не пустой
  - [x] Не пустой и вложенный

* [ ] Пустой
* [ ] Еще пустой
  - [ ] Пустой, но вложенный
* [x] Не пустой
  - [x] Не пустой и вложенный
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

![Type - Cover](typo-cover.jpg)

```md
![alt](typo-cover.jpg)
```

### Другой размер

{{< imgs/img "Type - Cover" "50%" "typo-cover.jpg" >}}

```md
{{</* imgs/img "alt" "50%" "typo-cover.jpg" */>}}
```

### С подписью

{{< imgs/imgc width="" caption="Это подпись" alt="Type - Cover" src="typo-cover.jpg" >}}

```md
{{</* imgs/imgc width="" caption="Текст" alt="alt" src="typo-cover.jpg" */>}}
```

### Галерея

{{< imgs/gallery "https://images.unsplash.com/photo-1721332149267-ef9b10eaacd9?q=80&w=1936" "tall" "https://images.unsplash.com/photo-1719937206158-cad5e6775044?q=80&w=1740" "wide" "https://images.unsplash.com/photo-1721333091029-c66bbb278a54?q=80&w=1935" "tall" "https://images.unsplash.com/photo-1721333089517-7cab0cfa07b7?q=80&w=1674" "big" "https://images.unsplash.com/photo-1720048169586-6750c7863d8c?q=80&w=1740" "" "https://images.unsplash.com/photo-1720048170016-751876b1dba0?q=80&w=1740" "" >}}

<sup>**Photo by [Samsung Memory](https://unsplash.com/@samsungmemory?nt) / [Unsplash](https://unsplash.com/?nt)**</sup>

```md
{{</* imgs/gallery "#" "tall" "#" "wide" "#" "big" "#" "" */>}}
```

## Таблицы

| Заголовок #1 | Заголовок #2 | Заголовок #3 | Заголовок #4 | etc. |
| ------------ | ------------ | ------------ | ------------ | ---- |
| Текст        | Текст        | Текст        | Текст        | etc. |
| Текст        | Текст        | Текст        | Текст        | etc. |
| Текст        | Текст        | Текст        | Текст        | etc. |

```md
| Заголовок #1 | Заголовок #2 | Заголовок #3 | Заголовок #4 | etc. |
| ------------ | ------------ | ------------ | ------------ | ---- |
| Текст        | Текст        | Текст        | Текст        | etc. |
| Текст        | Текст        | Текст        | Текст        | etc. |
| Текст        | Текст        | Текст        | Текст        | etc. |
```

Отступы соблюдать не обязательно, это:

```md
| Заголовок #1 | Заголовок #2 | Заголовок #3 | Заголовок #4 | etc. |
| ------------ | ------------ | ------------ | ------------ | ---- |
| Текст        | Текст        | Текст        | Текст        | etc. |
| Текст        | Текст        | Текст        | Текст        | etc. |
| Текст        | Текст        | Текст        | Текст        | etc. |
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

## Блоки кода

```js
llinks_safe = document
  .querySelectorAll("a[href*='?sl']")
  .forEach((llinks_safe) => {
    llinks_safe.setAttribute("rel", "noreferrer nofollow noopener");

    let llinks_safe_href = llinks_safe.href.toString().slice(0, -3);
    llinks_safe.setAttribute("href", "https://href.li/?" + llinks_safe_href);
  });
```

Для блоков кода используются три обратные кавычки `` ` ``, в начале и в конце.

Подсветка синтаксиса указывается после первых трех обратных кавычек:

````
```js
llinks_safe = document
  .querySelectorAll("a[href*='?sl']")
  .forEach((llinks_safe) => {
    llinks_safe.setAttribute("rel", "noreferrer nofollow noopener");

    let llinks_safe_href = llinks_safe.href.toString().slice(0, -3);
    llinks_safe.setAttribute("href", "https://href.li/?" + llinks_safe_href);
  });
```
````

Убрать нумерацию строк `{linenos=false}`.

````{linenos=false}
```js {linenos=false}
llinks_safe = document
  .querySelectorAll("a[href*='?sl']")
  .forEach((llinks_safe) => {
    llinks_safe.setAttribute("rel", "noreferrer nofollow noopener");

    let llinks_safe_href = llinks_safe.href.toString().slice(0, -3);
    llinks_safe.setAttribute("href", "https://href.li/?" + llinks_safe_href);
  });
```
````
