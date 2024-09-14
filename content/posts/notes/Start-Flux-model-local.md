---
draft: false
title: "Запуск Flux моделей локально"
# url: ""
description: "You do not have CLIP state dict!"
summary: "You do not have CLIP state dict!"
date: 2024-09-14
# lastmod: 2001-01-29
categories: ["AI"] # ["cat 1", "cat 2"]
tags: ["Заметки"] # ['tag 1', 'tag 2']
author: ["nozsh"] # ['Me', 'You'] multiple authors
# canonicalURL: "yourself"
# weight: 1
# robotsNoIndex: true

showToc: true
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
# CanonicalLinkText: "Источник:"
# UseHugoToc: false
# hideAuthor: true
# byai: true
cover:
  image: "start-flux-model-local/@img/Start-Flux-model-local-cover.v1.jpg" # image path/url
  alt: "Cover" # alt text
  # caption: "Photo by [Sajad Nori](#) / [Unsplash](https://unsplash.com/?nt)" # display caption under cover
  relative: true # when using page bundles set this to true
  hidden: false # only hide on current single page
---

Вероятней всего вы получаете ошибку **You do not have CLIP state dict!**, при попытки запуска Flux модели на том же Stable Diffusion web UI by AUTOMATIC1111. И видимо именно поэтому вы это читаете.

{{< callout/warn >}}
Это заметка о том как запустить **Flux** модель.<br> **А не как запустить локальную установку для генерации пикч.**
{{< /callout/warn >}}

На момент написания этой статьи Flux работает в [WebUI Forge](https://github.com/lllyasviel/stable-diffusion-webui-forge?nt) и [ComfyUI](https://github.com/comfyanonymous/ComfyUI?nt), которые так же имеются в [Stability Matrix](https://github.com/LykosAI/StabilityMatrix?nt). И еще, на текущий момент с Flux идеально работают только видеокартами NVIDIA.

Стоковая модель Flux [отсюда](https://huggingface.co/black-forest-labs/FLUX.1-dev?nt) или [отсюда](https://huggingface.co/black-forest-labs/FLUX.1-schnell?nt) может работать без текстовых энкодеров, лично у меня так.

Но при запуске других моделей на основе Flux, возникает ошибка. Она возникает из-за отсутствия **text encoder**, так же это называют **CLIP**, хотя это немного разные вещи.

Чтобы, все таки запустить Flux модель, нужно скачать энкодеры и VAE. Качаем **clip-l\*** и **t5\*** [здесь](https://huggingface.co/comfyanonymous/flux_text_encoders/tree/main?nt).

{{< callout/note >}}
Что использовать **fp8** или **fp16** зависит от вашего железа.

Если у вас мало VRAM 4-8Gb и немного оперативной памяти 8-16Gb, используйте **fp8**.

Если у вас средне VRAM 11-12Gb, и много оперативной памяти 32Gb+, можно использовать **fp16**.

Если у вас всего много, особенно VRAM 20Gb+, то смело используйте **fp16**.
{{< /callout/note >}}

{{< callout/hint >}}
Если в будущем появятся другие версии, думаю примерно прикинете что вам нужно.
{{< /callout/hint >}}

Качаем VAE, `diffusion_pytorch_model.safetensors` и `ae.safetensors` [здесь](https://huggingface.co/black-forest-labs/FLUX.1-dev?nt) или [здесь](https://huggingface.co/black-forest-labs/FLUX.1-schnell?nt).

VAE помещаем в `models\VAE`, энкодеры в `models\text_encoder` или `models\CLIP` (если вы используете Stability Matrix).

Осталось только загрузить VAE и энкодеры в соответствующем списке.

![](@img/001-start-flux-model-local-load-vae-text-encoder-clip.png)

Загружать их можно в любом порядке.

---

Подробнее так же можно [почитать](https://github.com/lllyasviel/stable-diffusion-webui-forge/discussions/1050?nt) от разработчика WebUI Forge.
