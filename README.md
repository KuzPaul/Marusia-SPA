<div align="center">

# Marusia

### Кинотеатр в браузере — SPA-каталог фильмов

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)

*Удобный интерфейс для просмотра каталога, поиска по названию, изучения жанров и ведения личного списка избранного.*

</div>

---

## О проекте

**Marusia** — одностраничное приложение для любителей кино. На главной — случайный фильм в баннере и топ-10 по рейтингу. Можно пройти по жанрам, открыть карточку с описанием, рейтингом и трейлером, найти фильм через поиск и сохранить понравившееся в избранное после входа в аккаунт.

## Возможности

| Раздел | Что умеет |
|--------|-----------|
| **Главная** | Случайный фильм в баннере, блок «Топ-10», обработка ошибок загрузки |
| **Жанры** | Сетка жанров с переходом к списку фильмов и пагинацией «Показать ещё» |
| **Фильм** | Постер, метаданные, рейтинг, трейлер в модальном окне |
| **Поиск** | Живой поиск по названию в шапке |
| **Аккаунт** | Регистрация, вход, выход (cookie-сессия) |
| **Профиль** | Личный кабинет только для авторизованных пользователей |

## Стек

| Слой | Технологии |
|------|------------|
| UI | React 19, SCSS |
| Сборка | Vite 8, TypeScript 5.9 |
| Маршруты | React Router 7 |
| Данные | TanStack Query 5, Fetch (`credentials: include`) |
| Формы | React Hook Form, Zod |
| Тесты | Vitest, Testing Library |

## Быстрый старт

**Требования:** Node.js 20+, npm 10+

```bash
git clone https://github.com/KuzPaul/Marusia-SPA.git
cd Marusia-SPA
npm install
cp .env.example .env
npm run dev
```

Приложение откроется по адресу из вывода Vite (обычно [http://localhost:5173](http://localhost:5173)).

### Скрипты

```bash
npm run dev       # режим разработки
npm run build     # production-сборка → dist/
npm run preview   # проверка dist/
npm run lint      # ESLint
npm run test      # unit-тесты (Vitest)
npm run test:watch
```

## Конфигурация

| Переменная | Описание |
|------------|----------|
| `VITE_API_URL` | Корень REST API (см. `.env.example`) |

## Архитектура (кратко)

- **`src/api/`** — HTTP-запросы и `queryKeys` для TanStack Query
- **`src/routing/ProtectedRoute`** — доступ к `/profile` только после авторизации
- **`src/utils/queryClient.ts`** — общие настройки кэша и retry
- **`src/ErrorBoundary.tsx`** — перехват падений UI

## Структура

```
src/
├── api/              # запросы к API, queryKeys
├── routing/          # ProtectedRoute
├── Components/       # UI, layout, формы
├── constants/
├── hooks/
├── pages/
├── types/
├── utils/
├── widgets/
├── test/             # setup для Vitest
├── App.tsx
└── main.tsx
```

## Маршруты

| Путь | Страница | Доступ |
|------|----------|--------|
| `/` | Главная | все |
| `/genres` | Каталог жанров | все |
| `/genre/:genreName` | Фильмы жанра | все |
| `/movie/:id` | Карточка фильма | все |
| `/profile` | Личный кабинет | только авторизованные |

## Тесты

Покрыты утилиты (`getYouTubeId`, `colorRating`, `validate`), справочник жанров, хук `useQueryMedia` и базовый компонент `Button`.

```bash
npm run test
```

## Контакты

| | |
|---|---|
| **Автор** | Павел Кузнецов |
| **GitHub** | [KuzPaul](https://github.com/KuzPaul) |
| **Email** | [kuzn-25@mail.ru](mailto:kuzn-25@mail.ru) |
| **Telegram** | [@kuzy39](https://t.me/kuzy39) |
