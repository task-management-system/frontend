# Frontend

## Используемые технологии

- React и React DOM
- React Router DOM
- Create React App
- Redux
- Redux Persist
- Formik
- Yup
- Local Forage
- Material UI
- Nivo
- FontSource Roboto
- TypeScript
- HTML
- CSS
- Husky
- Lint Staged
- ESLint
- Docker
- Nginx

## Необходимое окружение

- Node v15+
- Npm v7+

## Docker

Для сборки контейнера используется `setup-docker.bat` из директории `scripts`. Предварительно необходимо собрать проект командой `npm run build`.

## Доступные скрипты

- `npm start` - запускает приложение в режиме разработки, доступное по [http://localhost:3000](http://localhost:3000).
- `npm test` - запускает тесты. Подробнее о тестах можно узнать [здесь](https://facebook.github.io/create-react-app/docs/running-tests).
- `npm run build` - запускает сборку приложения. Собранное приложение находится в директории `build`. Можете посетить страницу о [разворачивании](https://facebook.github.io/create-react-app/docs/deployment) приложения для получения дополнительной информации.
- `npm run eject` - производит экспорт всех конфигурационных файлов. **Внимание: данную операцию нельзя будет отменить!**
- `npm run analyze` - анализирует собранный бандл.
- `npm run format` - форматирует файлы при помощи Prettier.
