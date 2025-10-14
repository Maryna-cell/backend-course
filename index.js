import express from 'express';
import mongoose from 'mongoose';
import router from './postRouter.js'; // <-- ИСПРАВЛЕНО на postRouter.js
import fileUpload from 'express-fileupload'; // <-- 1. НОВЫЙ ИМПОРТ

// Глобальные переменные
const PORT = 5000;
// Используем имя выбранного пользователя и новый пароль
const DB_URL = 'mongodb+srv://new_tester_user:cucucu123@cluster0.fadvsle.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

const app = express();

// --- MIDDLEWARE ---
// 1. Для обработки JSON данных
app.use(express.json()); 
// 2. Для обработки статических файлов (чтобы браузер мог получить картинку по URL)
app.use(express.static('static')); // <-- Добавляем, чтобы файлы из папки 'static' были доступны
// 3. Для обработки файлов (Multipart/form-data)
app.use(fileUpload({})); // <-- 2. НОВОЕ!

// Подключаем роутер
app.use('/api', router);


async function startApp() {
    try {
        // Подключение к MongoDB
        await mongoose.connect(DB_URL); 
        app.listen(PORT, () => console.log(`СЕРВЕР ЗАПУЩЕН на порте: ${PORT}`));
    } catch (e) {
        console.error('Ошибка при запуске приложения:', e.message);
    }
}

startApp();
