Инструкция:
Запуск back-end
   1. Перейдите в папку back-end
   2. В файле setting.ts введите порт (back-end\src\setting.ts)
   3. После запуска в терминале вы получите ссылку на АПИ. Скопируйте её
   4. Введите в терминале npm run dev для запуска back-end

Запуск front-end
   5. Откройте новый терминал
   6. Перейдите в папку front-end
   7. В файле setting.js вставьте ранее скопированную ссылку (front-end\src\setting.js)
   8. Введите в терминале npm run dev для запуска front-end

Использование
   9. В строке поиска обязательно введите email, номер телефона по желанию
   10. Поиск напишет не найдено если: 
       * Почта неверная
       * Почта и номер неверные
       * Почта верная, номер не верный
   11. Остальные ошибки будут выводится небольшим текстом под кнопкой

Валидация выполнена как со стороны сервера, так и со стороны пользователя.
    1. Со стороны пользователя:
        * Email. Пользователь не может ввести что угодно в строку input, кроме email
            Для этого используется input типа email
        * Number. Пользователь не может ввести какие то посторонние символы в 6-ти цифр
            Для этого используется функция handleInputMask(), которая проверяет вводит только цифры и разбивает из чёрточками (88-88-88)
    2. Со стороны сервера:
        * Сервер вернёт ошибку 400, в случаи если на сервере отправлено стройнее сообщение не соответствующий требованием.

Я считаю, что использовать валидацию с обеих сторон максимально безопасно. Со стороны пользователя валидация упрощает работу сервера и отправляет правильно структурированный запрос. Со стороны сервера валидация защищает его, от сторонних запросов, которые можно сделать через сторонние приложения (Например: Insomnia, Postman)

