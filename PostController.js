import PostService from "./PostService.js";
 

class PostController {
    // CREATE: POST /api/posts - Создание поста с возможностью загрузки файла
    async create(req, res) {
        try {
            // Передаем в сервис тело поста (req.body) и сам файл (req.files.picture)
            const post = await PostService.create(req.body, req.files?.picture);
            
            return res.status(201).json(post);
        } catch (e) {
            // В случае ошибки возвращаем 500 и сообщение об ошибке
            res.status(500).json(e.message);
        }
    }

    // READ: GET /api/posts/:id - Получение одного поста по ID
    async getOne(req, res) {
        try {
            const post = await PostService.getOne(req.params.id);
            return res.json(post);
        } catch (e) {
            // Если пост не найден, возвращаем 404
            if (e.message === 'Пост не найден') {
                return res.status(404).json(e.message);
            }
            res.status(500).json(e.message);
        }
    }

    // READ: GET /api/posts - Получение всех постов
    async getAll(req, res) {
        try {
            const posts = await PostService.getAll();
            return res.json(posts);
        } catch (e) {
            res.status(500).json(e.message);
        }
    }

    // UPDATE: PUT /api/posts - Обновление поста с возможностью замены файла
    async update(req, res) {
        try {
            // Передаем в сервис тело поста (с _id) И файл (если есть)
            const updatedPost = await PostService.update(req.body, req.files?.picture);
            return res.json(updatedPost);
        } catch (e) {
            res.status(500).json(e.message);
        }
    }
    
    // DELETE: DELETE /api/posts/:id - Удаление поста
    async delete(req, res) {
        try {
            const post = await PostService.delete(req.params.id);
            return res.status(200).json({ message: "Пост успешно удален", deletedPost: post });
        } catch (e) {
            if (e.message.includes('Пост не найден')) {
                return res.status(404).json(e.message);
            }
            res.status(500).json(e.message);
        }
    }
}

export default new PostController();
