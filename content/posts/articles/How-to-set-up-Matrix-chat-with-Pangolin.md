---
draft: false
# url: "" # slug
title: "Разворачиваем Matrix-чат дома и выбрасываем в интернет. Self-hosted мессенджер"
description: "Расскажу как развернуть Matrix на домашнем сервере за NAT и сделать его доступным в интернете."
summary: "Расскажу как развернуть Matrix на домашнем сервере за NAT и сделать его доступным в интернете."
date: 2025-08-10
lastmod: 2026-01-30
categories: ["Long read", "Self-hosted"] # ["cat 1", "cat 2"]
tags: ["Linux", "By AI"] # ['tag 1', 'tag 2']
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
byai: true
cover:
  image: "@img/how-to-set-up-matrix-chat-with-pangolin-cover.webp" # image path/url
  width: "1863" # only for img from url; EX: 1920
  height: "1111" # only for img from url; EX: 1080
  alt: "Разворачиваем Matrix-чат дома и выбрасываем в интернет. Self-hosted мессенджер - Cover" # alt text
  # caption: "Photo by [Sajad Nori](#?sl) / [Unsplash](https://unsplash.com/?sl)" # display caption under cover
  relative: true # when using page bundles set this to true
  hidden: false # only hide on current single page
---

{{% details/1 "Изменения" %}}
- 30 янв. 2026
  - Добавлено: <a href="#-настройка-и-интеграция-sso">Настройка и интеграция SSO</a>
- 27 янв. 2026
  - Добавлено: <a href="#-красивые-юзернеймы">Как сделать красивые юзернеймы</a>
  - Добавлено: <a href="#-включениенастройка-федерации">Настройка и включение федерации</a>
  - Дополнение: Исправление для PostgreSQL v18+
- 13 авг. 2025
  - Добавлено: <a href="#-установка-turn-сервера-coturn">Установка TURN сервера (Coturn)</a>
{{% /details/1 %}}


## Введение

Это именно то о чем вы думаете. Вам не придется покупать дорогой VPS для хостинга [Matrix](https://matrix.org/?sl). Достаточно простого VPS и средне-мощного ПК прямо у вас дома.

{{< callout/note >}}
Обратите внимание статья написана с инструкциями на примере Linux (Debian) и с использованием Docker.
{{< /callout/note >}}

### О Matrix

Matrix -- это открытый протокол для обмена сообщениями в реальном времени. Проект был запущен в 2014 году командой из компании Amdocs [^thenextweb-1] . Протокол определяет модель событий, формат данных и API для обмена сообщениями между клиентами и серверами, а также для их федерации, то есть взаимодействия между собой.

Для передачи данных Matrix использует стандартные транспорты, такие как HTTP/HTTPS, WebSockets и WebRTC. События и сообщения представлены в формате JSON и передаются через REST-подобные интерфейсы.

Главная особенность Matrix -- это его федеративная и децентрализованная архитектура [^thenextweb-1] . Множество серверов могут объединяться в единую открытую федерацию, что устраняет зависимость от одного центрального узла и обеспечивает гибкость развертывания.

Matrix поддерживает передачу текста, файлов и медиа, а также интеграции с другими системами [^medevel-1] . Это позволяет пользователям общаться, независимо от используемого клиента или провайдера.

Для защиты данных Matrix использует сквозное шифрование (E2E). При включенном шифровании содержимое сообщений хранится на серверах в зашифрованном виде, и только участники чата с соответствующими ключами могут его расшифровать. При этом серверы видят служебную информацию, такую как метаданные и состав комнат.

Matrix используется как частными лицами, так и организациями, включая корпоративный и государственный сектор. Например, решения на базе Matrix применяются в вооруженных силах [^element-1] и системе здравоохранения Германии [^matrix-1] .

[^thenextweb-1]: [What's the Matrix protocol? And how will it change modern messaging?](https://thenextweb.com/news/what-is-matrix-and-how-this-open-source-protocol-wants-to-change-messaging?nt)
[^medevel-1]: [Matrix: a decentralized open-source messaging platform for the future](https://medevel.com/matrix-a-decentralized-open-source-messaging-platform-for-the-future/?nt)
[^element-1]: [A secure messaging app for the German Armed Forces](https://element.io/matrix-in-germany/projects/bwmessenger?sl)
[^matrix-1]: [Germany's national healthcare system adopts Matrix!](https://matrix.org/blog/2021/07/21/germany-s-national-healthcare-system-adopts-matrix/?sl)

### Matrix это Synapse?

Matrix это не программа, это протокол, набор правил, экосистема. Фактически чат работает на [Synapse](https://github.com/element-hq/synapse?sl), но есть и другие, например [Dendrite](https://github.com/element-hq/dendrite?sl).

Подобно тому как электронная почта работает на основе протоколов IMAP/SMTP, Matrix определяет, как клиенты и сервера должны обмениваться данными. Это позволяет разным серверам и клиентам работать вместе.

### Что будем делать?

Захостим Matrix мессенджер на домашнем ПК с динамическим IP, который будет доступен в интернете через VPS.

Synapse довольно требователен к железу (зависит от кол-ва юзеров), особенно в контексте дискового пространства (медиа файлы), и подходящий VPS/VDS будет не дешевым. Поэтому я покажу как поднять Matrix именно на домашнем ПК/сервере с конфигурацией заточенной под Pangolin.

Что понадобится:

- Домашний сервер, >2 CPU & RAM, и побольше дискового пространства
- Дешевый VPS, >=1 CPU & RAM, желательно с каналом пошире (>=1 Gbit)
- Доменное имя

Ну и в идеале базовые знания Linux, Docker, настройки DNS и знание Pangolin.

Подразумевается что вы уже установили, настроили Pangolin и проверили что все работает, но если нет:

{{< embedPost url="installing-pangolin" >}}

В данной статье я покажу как поднять и Synapse и [Element](https://element.io/?sl). Element нужен чтобы была некая страница (frontend, клиент) где юзеры прямо в браузере могли бы зарегистрировать аккаунт и/или войти в аккаунт, а так же чтобы была совместимость с [клиентами Element](https://element.io/app?sl) и в целом Matrix можно было бы пользоваться прямо в браузере без программ.

Два отдельных сервиса, Synapse и Element. Их можно повесить на два разных домена/поддомена, но могут возникнуть проблемы, Element в некоторых сценариях будет обращаться к домену на котором он работает, но на нем НЕ работает Synapse, поэтому будет куча ошибок, *и учитывая что в этой статье рассматривается хостинг Synapse и Element на одной машине, мы не будет парится, и сделаем как проще.*

Чтобы элегантно это решить, мы будем использовать сеть внутри Docker, и использовать Nginx чтобы сделать reverse proxy на localhost, который уже будет пробрасываться через Pangolin.

Типо такого:

```yaml {linenos=false}
services:
  synapse and etc:
    networks:
      m_network:
        ipv4_address: 10.10.10.X

  reverse-proxy:
    ports:
      - "4100:80"
    networks:
      m_network:
        ipv4_address: 10.10.10.X

networks:
  m_network:
    ipam:
      driver: default
      config:
        - subnet: "10.10.10.0/24"
```

```conf {linenos=false}
# Synapse API
location ~ ^(/_matrix|/_synapse/client) {
    ...
}

# Element
location / {
    ...
}
```

Контейнеры общаются между собой в своей Docker сети, весь внешний трафик входит через nginx, который работает на 4100 порту и хост которого пробрасывается через Pangolin.

{{< callout/hint >}}
Фактически если вы немного в теме, это универсальная инструкция, которую можно использовать как для хостинга Matrix прямо на VPS, так и на домашнем сервере используя на VPS не только Pangolin, а что-нибудь другое.
{{< /callout/hint >}}

## Установка Matrix

{{< callout/note >}}
Synapse по умолчанию использует sqlite, (личное мнение) это _[совсем](https://www.google.com/search?q=why+postgresql+better+than+sqlite?sl)_ не очень хороший выбор базы данных, поэтому будем использовать PostgreSQL.
{{< /callout/note >}}

{{< callout/hint >}}
Я подготовил все конфиги необходимые для базового старта Matrix. Если вы будете что-то менять, что не описано в тексте ниже, делайте это внимательно.
{{< /callout/note >}}

Установка Docker:

```bash
sudo sh -c 'curl -fsSL https://get.docker.com -o get-docker.sh && sh ./get-docker.sh && rm -f get-docker.sh'
```

Клонирование репозитория с приготовленными конфигами:

```bash
git clone https://github.com/nozsh/matrix-element-pangolin-conf matrix && cd matrix
```

Создание конфигурации Synapse (homeserver.yaml):

```bash
sudo docker compose run --rm -e SYNAPSE_SERVER_NAME=domain.org -e SYNAPSE_REPORT_STATS=no synapse generate
```

Где `domain.org` ваш домен или поддомен, на него должно/будет указывать DNS запись на ваш VPS сервер на котором установлен Pangolin.

Редактирование конфига, например через nano [^nano] :

[^nano]: Текстовый редактор nano: <kbd>CTRL</kbd> + <kbd>X</kbd>, `y`, `Enter` -- сохранить и выйти.

```bash
nano synapse/homeserver.yaml
```

В самый конец нужно добавить:

```yaml
enable_registration: true
enable_registration_without_verification: true
```

- `enable_registration` - включает регистрацию.
- `enable_registration_without_verification` - отключает предупреждения если нету никакой защиты типа капчи.

Установить пароль для базы данных:

```bash
cp example.env .env && nano .env
```

Если строка содержит спец. символы убедитесь что все нормально:

```bash
sudo docker compose config
```

Переменная `POSTGRES_PASSWORD` должна содержать ту же строку что вы туда и положили (в ".env").

Дальше нужно поменять базу данных на PostgreSQL. Из "homeserver.yaml.example" скопируйте конфигурацию `database` и замените в вашем "homeserver.yaml":

```yaml
database:
  ...
```

Не забудьте установить "password" такой же, какой вы установили в ".env".

Редактирование конфига Element:

```bash
nano element-config.json
```

В `base_url` ваш домен с протоколом и без "/" в конце. Используйте "https", Pangolin сам работает с SSL сертификатами.

`"disable_custom_urls": true` - запрещает использовать НЕ ваш Matrix сервер, иначе можно будет использовать другой Matrix сервер через ваш Element instance.

Аналогично:

```bash
nano wellknown/matrix/client
```

И так же:

```bash
nano nginx/default.conf
```

Поменяйте `server_name domain.org` на ваш домен.

Далее нужно раскомментировать две строки в "docker-compose.yaml":

```bash
nano docker-compose.yaml
```

```yaml
#    depends_on:
#      - synapse_db
        ⇓
    depends_on:
      - synapse_db
```

{{% details/1 "**ВАЖНО:** О PostgreSQL >=18" %}}

В новой версии PostgreSQL изменены пути, поэтому если вы **не** используете версию <18 то необходимо их изменить в вашем docker-compose.yaml.

Если установка новая (данных еще нету или есть, но их не жалко), то

```bash
sudo docker compose down -v
```

Далее:

```bash
sudo docker exec matrix-1-synapse_db-1 env | grep PGDATA
```

{{< callout/note >}}
Название вашего `matrix-1-synapse_db-1` можно посмотреть через `sudo docker ps`.
{{< /callout/note >}}

Например вывело `PGDATA=/var/lib/postgresql/18/docker`, значит в docker-compose.yaml изменить:

```yaml
    volumes:
      - ...:/var/lib/postgresql/data
       ⇓
    volumes:
      - ...:/var/lib/postgresql/18/docker
```

{{% /details/1 %}}

{{< callout/hint >}}
Некоторые вещи из "Дополнительно" желательно сделать до запуска.

🚀 - лучше сделать до первого запуска<br>
🧩 - значения не имеет
{{< /callout/hint >}}

Запуск:

```bash
sudo sh -c 'docker compose down && docker compose up -d --force-recreate && docker compose logs -f'
```

Element должен открываться по ip:port (в конфиге 4100) и домену если вы уже настроили Pangolin.

## Дополнительно

{{< callout/warn >}}
**Это доп. инструкции для людей которые чего-то хотят и понимают что именно и как именно хотят. Если вы не знаете надо ли оно вам, или не понимаете о чем речь -- не делайте этого.**
{{< /callout/warn >}}

{{< callout/warn >}}
"Красивые юзернеймы" и "Включение/Настройка федерации" вероятно не получится сделать с Pangolin, потому что нужно писать/править конфиги руками. А на момент написания этой статьи в Pangolin нельзя вручную менять конфиги.
{{< /callout/warn >}}

### 🚀 Красивые юзернеймы

Если вы используете поддомен, и везде укажите поддомен "sub.domain.org" (потому что там у вас synapse/element), то юзернемы будут такими "user:sub.domain.org". Я покажу как сделать чтобы они были такими -- "user:domain.org".

Если вы уже все настроили, все запустили, и все уже давно работает -- то ничего не делайте, чтобы это сделать нужно **очистить базу данных**. Ну, а если вы еще ничего не запускали то смело делайте. А если запускали, но хотите переделать выполните:

```bash
sudo docker compose down -v
```

```bash
rm -rf /path/to/location/where/db/*
```

Это для очистки БД. *Ну или можете вручную попробовать править базу.*

**Домашний сервер**

```bash
nano synapse/homeserver.yaml
```

```yaml
server_name: "sub.domain.org" ==> "domain.org"
```

*Вот element-config.json менять чисто для общей эстетики, не обязательно.*

```bash
nano element-config.json
```

```json {hl_lines=[5]}
{
    "default_server_config": {
        "m.homeserver": {
            "base_url": "https://sub.domain.org",
            "server_name": "domain.org"
        }
    },
    "disable_custom_urls": true
}
```

```bash
nano nginx/default.conf
```

Убрать:

```conf
    location /.well-known/matrix/ {
        root /usr/share/nginx/html;
        default_type application/json;
        add_header Access-Control-Allow-Origin *;
    }
```

**VPS**

В корне сайта domain.org:

```bash
mkdir -p .well-known/matrix/ && touch .well-known/matrix/client && touch .well-known/matrix/server && ls .well-known/matrix/
```

client:

```json
{
  "m.homeserver": {
    "base_url": "https://sub.domain.org"
  }
}
```

server:

```json
{
  "m.server": "sub.domain.org:443"
}
```

NGINX для "domain.org" (**НЕ** "sub.domain.org"):

```conf {hl_lines=[4,5,6,7]}
server {
    listen 443 ssl;
...
    location /.well-known/matrix/ {
        default_type application/json;
        add_header Access-Control-Allow-Origin *;
    }

    location / {
...
```

Если вы используете федерацию, проверьте что она работает [здесь](https://federationtester.matrix.org/?sl).

У "sub.domain.org" вероятно будет ошибка "MatchingServerName", это нормально. Но у "domain.org" -- ошибок быть не должно, то есть проверять нужно то что указано в `server_name` в homeserver.yaml.

### 🧩 Включение/Настройка федерации

**Домашний сервер**

docker-compose.yaml:

```yaml
  reverse-proxy:
    ports:
      - "4100:80"
      - "4101:8448"
```

NGINX default.conf:

```conf
...
server {
    listen 80;
    listen [::]:80;
    listen 8448;
    listen [::]:8448;
...
```

**VPS**

Открыть порт 8448 в firewall и указать его в Docker если вы используете Docker, на примере ufw и ZT:

```bash
ufw allow 8448/tcp
```

```yaml {hl_lines=[6]}
  zerotier:
    ports:
      - "9993:9993/udp"
      - "80:80"
      - "443:443"
      - "8448:8448"
```

NGINX, в конце добавить еще один server блок:

```conf {hl_lines=[4,8,9,17]}
server {
    listen 8448 ssl;
    http2 on;
    server_name domain.org;

    client_max_body_size 100M;

    ssl_certificate /etc/letsencrypt/live/domain.org/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/domain.org/privkey.pem;

    ssl_session_cache shared:le_nginx_SSL:10m;
    ssl_session_timeout 1440m;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_prefer_server_ciphers on;

    location / {
        proxy_pass http://ip:4101;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto https;

        proxy_http_version 1.1;
    }
}
```

Проверить работоспособность федерации можно [здесь](https://federationtester.matrix.org/?sl).

### 🧩 Отключение федерации

homeserver.yaml:

```yaml
federation_domain_whitelist: []
```

Или отключить федерацию со всеми, кроме некоторых:

```yaml
federation_domain_whitelist:
  - server.org
  - server.com
```

*Разницы форматирования между этими двумя нету, это просто разный синтаксис, но если перечислять -- так просто удобнее, чем в строку.*

### 🧩 Подключение Google reCaptcha

Создать ключи [тут](https://www.google.com/recaptcha/admin/create?sl) (v2, "I'm not a robot").

homeserver.yaml:

```yaml
enable_registration_without_verification: false

recaptcha_public_key: "x"
recaptcha_private_key: "x"
enable_registration_captcha: true
```

Обратите внимание, капча будет работать только на домене. При доступе через ip:port капча работать не будет и вы не сможете зарегистрировать аккаунт соответственно.

### 🚀 Разделение хранилища

{{< callout/note >}}
Если у вас уже есть файлы -- их можно просто перенести после изменений (когда разметите пространство) и перед запуском контейнера.
{{< /callout/note >}}

*На примере LVM дисков.*

Есть SSD и HDD, оба LVM, нужно сделать так, чтобы был отдельный логический том SSD диска для БД Synapse и отдельный логический том HDD для медиа файлов, а сам Docker контейнер работал в home/root.

Это рабочий пример, где "vg0" ваш Volume Group, где sda1 и nvme0n1 ваши диски:

```bash
sudo lvcreate -L 10G -n synapse-1-media vg0 /dev/sda1
sudo mkfs.ext4 /dev/vg0/synapse-1-media
sudo mkdir -p /mnt/synapse-1-media
sudo mount /dev/vg0/synapse-1-media /mnt/synapse-1-media
sudo su
echo "/dev/vg0/synapse-1-media /mnt/synapse-1-media ext4 defaults 0 2" >> /etc/fstab
exit
```

```bash
sudo lvcreate -L 10G -n synapse-1-db vg0 /dev/nvme0n1p3
sudo mkfs.ext4 /dev/vg0/synapse-1-db
sudo mkdir -p /mnt/synapse-1-db
sudo mount /dev/vg0/synapse-1-db /mnt/synapse-1-db
sudo su
echo "/dev/vg0/synapse-1-db /mnt/synapse-1-db ext4 defaults 0 2" >> /etc/fstab
exit
```

```bash
sudo sh -c 'mkdir -p /mnt/synapse-1-media/data && mkdir -p /mnt/synapse-1-db/data'
```

Права:

```bash
chown -R 1000:1000 /mnt/synapse-1-media
```

Потому что docker-compose.yaml:

```yaml
synapse:
  environment:
    - UID=1000
    - GID=1000
```

На "synapse-1-db" тоже нужно будет установить владельца и группу, если:

```bash
sudo docker run --rm postgres id
```

покажет **не**:

```bash
uid=0(root) gid=0(root) groups=0(root)
```

docker-compose.yaml:

```yaml
synapse:
  volumes:
    - ./synapse:/data
    - /mnt/synapse-1-media/data:/media

synapse_db:
  volumes:
    - /mnt/synapse-1-db/data:/var/lib/postgresql/data
```

homeserver.yaml:

```yaml
media_store_path: /media/data
uploads_path: /media/data/uploads
```

Путь получится "/data/data/", в корень файлы лучше не записывать, потому что корень зачастую не пустой из-за "lost+found" (зависит от файловой системы). А программа может требовать чтобы директория была пуста, так например требует PostgreSQL, к тому же зачем смешивать файлы.

_Не красиво, но точно будет работать._

### 🧩 Максимальный размер загружаемых файлов (Max Upload Size)

homeserver.yaml:

```yaml
max_upload_size: 500M
```

nginx:

```conf
client_max_body_size 500M;
```

### 🧩 Другие размеры миниатюр

Может работать некорректно, или не работать вовсе. Лично у меня не работало и сломало аватарки.

homeserver.yaml:

```yaml
thumbnail_sizes:
  - width: 320
    height: 240
    method: scale # OR crop
```

В любом случае миниатюры обычно создаются сами.

[Подробнее](https://element-hq.github.io/synapse/latest/usage/configuration/config_documentation.html?#thumbnail_sizes?sl).

### 🧩 Мосты

#### Telegram

В существующем docker-compose.yaml:

```yaml
mautrix-telegram:
    image: dock.mau.dev/mautrix/telegram:latest
    container_name: mautrix-telegram
    restart: unless-stopped
    volumes:
      - ./mautrix-telegram:/data
    networks:
      m_network:
        ipv4_address: 10.10.10.6
    depends_on:
      - synapse
```

```bash
mkdir mautrix-telegram
```

```bash
sudo docker compose run --rm mautrix-telegram
```

```bash
sudo nano mautrix-telegram/config.yaml
```

```yaml
address: http://synapse:8008
domain: domain.org
verify_ssl: false
appservice:
    address: http://mautrix-telegram:29317
    database: postgres://synapse:password@synapse_db/mautrix_telegram
#   postgres://username:password@hostname/dbname

...

telegram:
    # Get your own API keys at https://my.telegram.org/apps
    api_id: xyz
    api_hash: xyz

bridge:
    permissions:
        '*': relaybot
        domain.org: puppeting
#        domain.org: full
        '@admin:domain.org': admin
```

```bash
sudo docker compose exec synapse_db psql -U synapse -c "CREATE DATABASE mautrix_telegram WITH ENCODING='UTF8';"
```

```bash
sudo docker compose run --rm mautrix-telegram
```

```bash
cp mautrix-telegram/registration.yaml synapse/mautrix-telegram-registration.yaml
```

```bash
nano synapse/homeserver.yaml
```

```yaml
app_service_config_files:
  - /data/mautrix-telegram-registration.yaml
```

```bash
sudo sh -c 'docker compose down && docker compose up -d --force-recreate && docker compose logs -f'
```

[Подробнее](https://docs.mau.fi/bridges/general/docker-setup.html?bridge=telegram?sl).

### 🧩 Настройка и интеграция SSO

Зачем это нужно? Помимо общих применений SSO, так же для авторизации в matrix через стороние сервисы типа Google, GitHub и др. (но об этом тут не будет), и/или для улучшения защиты аккаунтов пользователей посредством 2FA. Потому что synapse/element сами по себе не поддерживают 2FA.

То есть, чтобы войти в аккаунт matrix нужно будет не только ввести логин, пароль и ключ восстановления или подтвердить авторизацию с другого устройства, а вести логин, пароль, 2FA или использовать **аппаратный ключ** и только потом ключ восстановления  или подтвердить вход с другого устройства чтобы расшифровать сообщения.

Своего рода «[Defense in Depth](https://1275.ru/glossary/did?nt)». По факту просто круто + может пригодится если у вас будет очень много selfhosted сервисов с поддержкой SSO, чтобы был один вход на все сервисы вместо огромной кучи пар логин и пароль.

Можно поднять в том же docker-compose.yaml файле где synapse и element, или в отдельном -- разницы нет. *Что использовать в качестве сервиса SSO и как это поднять я не покажу, это вы решайте сами.* Я же покажу только как настроить на примере [Authentik](https://goauthentik.io/?sl).

{{< callout/note >}}
Последующие употребление "SSO" расценивайте не как аббревиатуру «Single Sign-On», а как некую неопределенную платформу (Authentik, Keycloak, Authelia, Zitadel, и тд).
{{< /callout/note >}}

- Applications ==> Providers ==> Create ==> "OAuth2/OpenID Provider". Provider Name - что-нибудь связанное с matrix.
- Authorization flow - на ваш вкус, но если не знаете что это, выбирайте "explicit".
- Client type - Confidential.
- Redirect URIs/Origins (RegEx) - указать ваш URL Synapse (в этой статье писалось про Synapse и Element на одном домене поэтому), например `https://element.domain.org/_synapse/client/oidc/callback`, без `/` в конце. Путь должен быть точно таким, как указано.
- Applications ==> Applications ==> Create, ввести имя и slug, в Provider выбрать созданный ранее провайдер.

В homeserver.yaml:

```yaml {hl_lines=[1,4,"7-9",13,15]}
public_baseurl: "https://element.domain.org" # url на котором synapse

oidc_providers:
  - idp_id: authentik
    idp_name: "SSO"
    discover: true
    issuer: "https://sso.domain.org/application/o/my-matrix-slug/"
    client_id: "xxx"
    client_secret: "xxx"
    scopes:
      - "openid"
      - "profile"
      # - "email"

    allow_existing_users: true # после миграции юзеров отключить
    enable_registration: true

    user_mapping_provider:
      config:
        localpart_template: "{{ user.preferred_username }}"
        display_name_template: "{{ user.name }}"
```

{{% details/1 "Моя конфигурация OIDC" %}}
```yaml
oidc_providers:
  - idp_id: authentik
    idp_name: "SSO"
    discover: true
    issuer: "https://sso.domain.org/application/o/matrix-nexus/"
    client_id: "xxx"
    client_secret: "xxx"
    scopes:
      - "openid"
      - "profile"

    allow_existing_users: false
    enable_registration: true

    backchannel_logout_enabled: true # Provider - Logout URI: https://element.domain.org/_synapse/client/oidc/backchannel_logout

    user_mapping_provider:
      config:
        localpart_template: "{{ user.preferred_username }}"
        display_name_template: "{{ user.name }}"
```
{{% /details/1 %}}

NGINX:

```conf
proxy_set_header X-Forwarded-Proto $backend_proto;
                      ⇓⇓⇓
proxy_set_header X-Forwarded-Proto $http_x_forwarded_proto;
```

`allow_existing_users: true` -- нужен для миграции текущих юзеров, если таковы есть. Для миграции нужно создать юзера с тем же username что и в matrix, если "john:domain.org" то "john", и когда Джон залогинится, к аккаунту SSO автоматически привяжется аккаунт Synapse.

{{< callout/warn >}}
`allow_existing_users: true` опция **ОЧЕНЬ НЕ** безопасная, если у вас будет включена публичная регистрация на SSO платформе любой сможет украсть аккаунт просто зарегистрировав существующий юзернейм.
{{< /callout/warn >}}

`enable_registration: true` -- если у вас приватный сервер и вы делаете аккаунты вручную, то вам нужно будет создать аккаунт в Synapse и SSO, но если `true`, то только в SSO, аккаунт Synapse будет создан и привязан к SSO автоматически при первом входе. По умолчанию "true".

Чтобы отключить вход по логину и паролю, оставив только SSO, в homeserver.yaml:

```yaml
password_config:
  enabled: false
```

#### Группы (Authentik)

Группы нужны если вы например хотите иметь 100 юзеров, но что бы лишь 20 из них могли залогинится в matrix.

Можно сделать через homeserver.yaml, искать пример `attribute_requirements` [тут](https://element-hq.github.io/synapse/latest/usage/configuration/config_documentation.html?sl).

Но есть так же как по мне лучший вариант сделать это чисто на стороне Authentik: Applications ==> Applications ==> ваше приложение ==> Policy / Group / User Bindings ==> Bind existing Policy / Group / User ==> Group ==> выбрать нужную ранее созданную группу.

#### Капча (Authentik)

Если вы не задумались "а как же капча?" -- задумайтесь. Капча есть и ее можно [настроить](https://docs.goauthentik.io/add-secure-apps/flows-stages/stages/captcha/?sl). Нужно создать "stage" в "stages" с типом "Captcha Stage", выбрать провайдера и вписать ключи, тут все просто.

Далее зайти в Flows and Stages ==> Flows, выбрать нужный Flow куда нужно добавить капчу -- "default-authentication-flow" ==> Stage Bindings ==> Bind existing stage ==> Выбрать ту капчу что вы создали ранее, order нужно установить между "identification" и "password" -- обычно это 15.

### 🧩 Установка TURN сервера (Coturn)

TURN сервер лучше установить на VPS с публичным IP, можно рядом с Pangolin, все будет работать. В Pangolin для TURN сервера ничего добавлять и настраивать не нужно.

```bash
git clone https://github.com/nozsh/matrix-element-pangolin-conf coturn && cd coturn && mv extra/coturn . && find . -maxdepth 1 -not -name 'coturn' -not -name '.' -exec rm -rf {} + && mv coturn/* . && rm -rf coturn/
```

Открыть порты UFW (на всякий случай):

```bash
sudo sh -c 'ufw allow 3478/tcp && ufw allow 3478/udp && ufw allow 5349/tcp && ufw allow 5349/udp && ufw allow 59000:60100/udp && ufw status'
```

```bash
nano coturn.conf
```

Поменять `external-ip`, `realm` и `server-name`. А также данные `user=test:test` - логин:пароль.

Сертификаты можно получить через certbot, или в другом месте, например Cloudflare:

- "cert.pem" - публичный ключ
- "private.key" - приватный ключ

```bash
touch certs/cert.pem certs/private.key
```

Если вы создали сертификаты с помощью "certbot" то нужно использовать "fullchain.pem" и "privkey.pem":

- /etc/letsencrypt/live/turn.domain.org/fullchain.pem
- /etc/letsencrypt/live/turn.domain.org/privkey.pem

```bash
docker compose up -d && docker compose logs -f --tail=200
```

Если при запуске все виснет -- уберите порты и используйте:

```yaml {hl_lines=[3]}
services:
  coturn:
    network_mode: host
```

*Более того, так лучше сделать в любом случае, потому что Docker будет открывать все эти порты с 59000 до 60100, это довольно много, и может быть плохо.*

homeserver.yaml:

```yaml
turn_uris:
  - "turns:turn.domain.org:5349?transport=tcp"
  - "turns:turn.domain.org:5349?transport=udp"
  - "turn:turn.domain.org:3478?transport=tcp"
  - "turn:turn.domain.org:3478?transport=udp"

turn_username: "test"
turn_password: "test"
turn_allow_guests: true
```

Протестировать turn сервер независимо от matrix можно [здесь](https://webrtc.github.io/samples/src/content/peerconnection/trickle-ice/?sl), но если у вас в браузере отключен WebRTC -- временно включите его.

### Удаление "старых" медиа файлов

Это может не работать:

homeserver.yaml:

```yaml
media_retention:
  local_media_lifetime: 90d   # медиа от пользователей
  remote_media_lifetime: 14d  # медиа с других серверов (федерация)
```

100% рабочий вариант через API:

Создать админ аккаунт -- см. <a href="#synapse-admin-админка">Synapse Admin</a>.

Получить токен:

```bash
URL="http://10.10.10.2:8008"; USER="@admin:domain.org"; PASS='abrakadabra'; curl -X POST "$URL/_matrix/client/v3/login" -H "Content-Type: application/json" -d "{\"type\":\"m.login.password\",\"user\":\"$USER\",\"password\":\"$PASS\"}"
```

Удалить все что старше 1 минуты (60000 в мс):

```bash
BEFORE_TS=$(($(date +%s%3N) - 60000)); URL="http://10.10.10.2:8008"; TOKEN="token"; curl -X POST -H "Authorization: Bearer $TOKEN" "$URL/_synapse/admin/v1/media/delete?before_ts=$BEFORE_TS"
```

Или в одну команду, получить токен, выполнить удаление, отозвать токен:

```bash
URL="http://10.10.10.2:8008"; USER="@admin:domain.org"; PASS='abrakadabra'; DELAFTERMS=60000; LOGIN_RESP=$(curl -s -X POST "$URL/_matrix/client/v3/login" -H "Content-Type: application/json" -d "{\"type\":\"m.login.password\",\"user\":\"$USER\",\"password\":\"$PASS\"}"); echo "Login response: $LOGIN_RESP"; TOKEN=$(echo "$LOGIN_RESP" | grep -oP '"access_token":"\K[^"]+'); BEFORE_TS=$(($(date +%s%3N) - DELAFTERMS)); curl -X POST -H "Authorization: Bearer $TOKEN" "$URL/_synapse/admin/v1/media/delete?before_ts=$BEFORE_TS"; curl -X POST "$URL/_matrix/client/v3/logout" -H "Authorization: Bearer $TOKEN"
```

Или [скриптом](https://github.com/nozsh/matrix-element-pangolin-conf/blob/main/utilities/media-cleanup.sh?sl). И сделать cron задачу, типо такого:

```bash
crontab -e
0 0 1 * * >.../matrix/utilities/media-cleanup.log; bash .../matrix/utilities/media-cleanup.sh >> .../matrix/utilities/media-cleanup.log 2>&1
```

Будет запускать скрипт каждые 30 дней в 00:00.

{{< callout/note >}}
Обратите внимание, способ через API не удаляет аватарки, только любой загруженный пользователями контент в чатах - фото, видео, архивы и прочие файлы.
{{< /callout/note >}}

### Synapse Admin (админка)

Админку можно запускать где угодно, необязательно пробрасывать в Pangolin, более того, лично я не рекомендую этого делать для безопасности (и это невозможно с конфигурацией из этой статьи (из-за конфигурации nginx)).

Админка от [Awesome-Technologies](https://github.com/Awesome-Technologies/synapse-admin?sl):

```yaml
services:
  synapse-admin:
    container_name: synapse-admin
    hostname: synapse-admin
    image: awesometechnologies/synapse-admin:latest
    ports:
      - "4200:80"
    restart: unless-stopped
```

Админка от [etkecc](https://github.com/etkecc/synapse-admin/?sl):

```yaml
image: ghcr.io/etkecc/synapse-admin:latest
```

Создать админ аккаунт:

```bash
sudo docker exec matrix-synapse-1 register_new_matrix_user -u admin -p 'abrakadabra' -a -c /data/homeserver.yaml http://localhost:8008
```

SSH туннель:

```bash
ssh -p 22 -N -L 127.0.0.1:8008:10.10.10.2:8008 user@ip
```

"10.10.10.2" ip Synapse:

```yaml
synapse:
  networks:
    m_network:
      ipv4_address: 10.10.10.2
```

Порт 8008 - это порт Synapse по умолчанию.
