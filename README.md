This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts
### `npm run serve || yarn serve`
Для запуска нужна установленная локально база данных mongodb по адресу. По умолчанию адрес mongodb://127.0.0.1:27017.
Если адрес отличается, необходимо откорректировать .env файл. При авторизации пользователя через кнопку Facebook Login будет создана новая база fs_test_cards_test_base, а в ней коллекция users.Собственно после этого можно тестировать все локально.
