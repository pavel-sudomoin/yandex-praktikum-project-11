﻿# Проектная работа №11 для Yandex.Praktikum

## Версия

Актуальная версия проекта: **v2.0.0**

Ссылка на актуальную версию проекта: [https://pavel-sudomoin.github.io/yandex-praktikum-project-11/](https://pavel-sudomoin.github.io/yandex-praktikum-project-11/)

## Описание

Проект представляет из себя интерактивную страницу, куда можно добавлять фотографии, удалять их и ставить лайки.

Также возможно редактировать информацию о Пользователе (ФИО и место работы), менять его аватарку.

Все данные загружаются на сервер praktikum.tk. Авторизация на сервере производится посредством уникального токена, указанный токен вшит в код.

Перед отправкой данные валидируются, при непрохождении валидации показывается ошибка с пояснением.

Проект разработан в учебных целях как проектная работа №11 для **Yandex.Praktikum**.

### Инициализация страницы

При загрузке проект обращается к серверу и отображает все загруженные карточки, информацию о пользователе и его аватар.

Для карточек, созданных Пользователем, дополнительно отображается иконка *Корзина* в верхнем правом углу карточки.

Для всех карточек отображается иконка *Сердце* и количество лайков рядом с ней. Если Пользователь уже лайкнул карточку, иконка *Сердце* закрашивается чёрным, в противном случае остается пустой.

Также при загрузке страницы инициируется процесс автообновления карточек каждые 10 секунд.

### Функционал

Пользователь может совершать следующие действия:

* Добавлять новые карточки с картинкой и описанием.
  Для этого необходимо нажать на кнопку *+*, расположенную справа от имени пользователя.
  Появится попап с полями *Название* и *Ссылка на картинку*.

* Удалять созданные Пользователем карточки.
  Для этого необходимо нажать иконку *Корзина* в верхнем правом углу карточки.
  Появится запрос на подтверждение удаление карточки.
  Пользователь может удалять только те карточки, которые он создал.

* Лайкать карточки.
  Для этого необходимо нажать иконку *Сердце* рядом с описанием карточки.
  При этом увеличится количество лайков и иконка закрасится чёрным.
  При повторном нажатии на иконку лайк снимается.
  Пользователь может лайкать любые карточки.

* Редактировать информацию о Пользователе (ФИО и место работы).
  Для этого необходимо нажать на кнопку *edit*, расположенную под именем пользователя.
  Появится попап с полями *Имя* и *О себе*.

* Менять аватарку Пользователя.
  Для этого необходимо нажать на аватарку.
  Появится попап с полем *Ссылка на аватар*.

* Раскрывать картинку карточки на весь экран.
  Для этого необходимо нажать на картинку карточки.
  Появится попап с полноразмерной картинкой.

Все попапы можно закрыть двумя способами - либо по нажатию иконки *X* в правом верхнем углу попапа, либо по нажатии клавиши *Esc*.

### Валидация

Поля всех попапов являются обязательными для заполнения и проходят следующую валидацию:

* Попап добавления новой карточки
  - Поле *Название*
    - Допускается от 2 до 30 символов
  - Поле *Ссылка на картинку*
    - Допускается только ссылка (валидация происходит средствами Constraint Validation API)
* Попап редактирования профиля
  - Поле *Имя* и поле *О себе*
    - Допускается от 2 до 30 символов
* Попап обновление автара
  - Поле *Ссылка на аватар*
    - Допускается только ссылка (валидация происходит средствами Constraint Validation API)

## Используемые технологии

При разработке использован HTML / CSS / JS (ES6). Код JS разбит на модули.

При сборке использован node.js и webpack с плагинами.

## Установка

### Собранная версия проекта

Текущая собранная версия проекта (с транспилированным и минифицированным кодом) находится в ветке  gh-pages.

Для установки необходимо скопировать файлы из ветки gh-pages к себе в директорию.

### Сборка из исходных файлов

Стабильная версия исходных файлов для сборки находится в ветке master.

Конфигурационные файлы находятся в корне проекта.

Исходные файлы проекта (HTML, CSS, JS, шрифты и картинки) находятся в папке */src*.

Для сборки необходимо иметь установленный node.js.

Для сборки требуется:

* Cкопировать все файлы из ветки *master* к себе в директорию
* Запустить консоль и перейти в папку с проектом
* Командой *npm i* установить все потребные плагины и пакеты

После этого станут доступны три режима сборки:

* режим *Разработки* (команда *npm run dev*)
  - проект будет собран без минификации css и js
  - обращение к серверу будет происходить по адресу *http://praktikum.tk*
  - будет автоматически запущен сервер и загружен собранный проект
  - при изменении файлов в папке */src* страница будет перегружаться автоматически
* режим *Сборки* (команда *npm run build*)
  - проект будет собран с минификацией css и js
  - обращение к серверу будет происходить по адресу *https://praktikum.tk*
  - результат сборки будет помещён в папку */dist* в корне проекта
* режим *Публикации* (команда *npm run deploy*)
  - проект будет собран по аналогии с режимом *Сборка*
  - затем проект будет размещён на сервере github по адресу [https://pavel-sudomoin.github.io/yandex-praktikum-project-11/](https://pavel-sudomoin.github.io/yandex-praktikum-project-11/)

## Планы по развитию

* провести рефакторинг для классов JS
* доработать оптимизацию шрифтов и картинок при сборке

## Авторы

Верстка (HTML и CSS) - [Yandex.Praktikum](https://praktikum.yandex.ru/)

Разработка JS-кода и сборка - Судомоин Павел