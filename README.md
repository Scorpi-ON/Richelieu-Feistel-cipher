# Richelieu-Feistel-cipher

[![license](https://img.shields.io/github/license/Scorpi-ON/Richelieu-Feistel-cipher)](https://opensource.org/licenses/MIT)
[![release](https://img.shields.io/github/v/release/Scorpi-ON/Richelieu-Feistel-cipher?include_prereleases)](https://github.com/Scorpi-ON/Richelieu-Feistel-cipher/releases)
[![downloads](https://img.shields.io/github/downloads/Scorpi-ON/Richelieu-Feistel-cipher/total)](https://github.com/Scorpi-ON/Richelieu-Feistel-cipher/releases)
[![code size](https://img.shields.io/github/languages/code-size/Scorpi-ON/Richelieu-Feistel-cipher.svg)](https://github.com/Scorpi-ON/Richelieu-Feistel-cipher)

[![Linters and tests](https://github.com/Scorpi-ON/Richelieu-Feistel-cipher/actions/workflows/lint_and_test.yml/badge.svg)](https://github.com/Scorpi-ON/Richelieu-Feistel-cipher/actions/workflows/lint_and_test.yml)
[![CodeQL](https://github.com/Scorpi-ON/Richelieu-Feistel-cipher/actions/workflows/codeql.yml/badge.svg)](https://github.com/Scorpi-ON/Richelieu-Feistel-cipher/actions/workflows/codeql.yml)
[![Build and deploy](https://github.com/Scorpi-ON/Richelieu-Feistel-cipher/actions/workflows/build_and_deploy.yml/badge.svg)](https://github.com/Scorpi-ON/Richelieu-Feistel-cipher/actions/workflows/build_and_deploy.yml)

Лабораторная работа по безопасности программ и данных, продуктом которой является веб-приложение, реализующее шифр
Ришелье и сеть Фейстеля для шифрования текстовых данных. По совместительству является проектом для изучения
фронтенд-разработки с использованием готового набора компонентов.

## Основные требования

- графический интерфейс
- шифрование данных шифром Ришелье и сетью Фейстеля
- поддержка ввода текста в интерфейсе и загрузку его из файла

## Особенности реализации

- [x] форма реализации — веб-приложение
- [x] адаптивая вёрстка
- [x] фронтенд основан на готовых компонентах
- [x] интегрированы инструменты сборки, тестирования, анализа кода
- [x] покрытие тестами функций шифрования
- [x] запуск линтера, тестов и деплоя с помощью GitHub Actions

## Стек

- **Bun** — быстрая среда исполнения JavaScript
- **TypeScript** — статически типизированный JavaScript
- **Vite** — инструмент сборки фронтенда
- **Tailwind CSS** — CSS-фреймворк
- **DaisyUI** — библиотека компонентов для Tailwind CSS
- **Jest** — фреймворк для тестирования
- **ESLint** — статический анализатор кода
- **Prettier** — форматировщик кода
- **Husky + Lint-staged** — хуки Git

## Установка и запуск

0. Клонируйте репозиторий и перейдите в его папку.
1. Установите Bun одним из способов. Например, для Windows:

```shell
powershell -c "irm bun.sh/install.ps1 | iex"
```

2. Установите зависимости:

```shell
bun install --omit dev
```

3. Соберите проект:

```shell
bun run build
```

4. Теперь запускать проект можно командой:

```shell
bun run preview
```

## Модификация

Перед началом модификации нужно установить зависимости, включая те, которые нужны только для разработки:

```shell
bun install
```

Запуск сервера в режиме отладки осуществляется командой:

```shell
bun run dev
```

Прочие скрипты, необходимые для запуска линтеров, форматировщика и т. д. находятся в
файле [package.json](./package.json).
