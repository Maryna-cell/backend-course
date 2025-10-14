import * as uuid from 'uuid'; // Библиотека для генерации уникальных ID
import path from 'path'; // Встроенный модуль Node.js для работы с путями

class FileService {
    /**
     * Сохраняет переданный файл на диске в папке static.
     * @param {object} file - Объект файла, полученный от express-fileupload.
     * @returns {string} - Уникальное имя файла, которое будет сохранено в БД.
     */
    saveFile(file) {
        try {
            // 1. Получаем расширение файла (например, .jpg или .png)
            const fileExtension = file.name.split('.').pop();
            
            // 2. Генерируем уникальное имя файла с помощью uuid (уникальный ID)
            // Это предотвратит конфликты имен, если два пользователя загрузят файл с одинаковым именем.
            const fileName = uuid.v4() + '.' + fileExtension;
            
            // 3. Создаем путь к файлу: текущая директория + 'static' + уникальное имя
            // path.resolve() обеспечивает, что путь будет корректен в любой ОС (Windows/Linux)
            const filePath = path.resolve('static', fileName);
            
            // 4. Перемещаем файл из временной папки в нашу папку 'static'
            file.mv(filePath);
            
            // 5. Возвращаем имя файла (его мы и будем хранить в MongoDB)
            return fileName;

        } catch (e) {
            console.error('Ошибка при сохранении файла:', e);
            // Если возникла ошибка при сохранении, возвращаем null
            return null;
        }
    }
}

export default new FileService();
