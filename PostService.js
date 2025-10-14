import Post from "./Post.js";
import FileService from "./FileService.js";

class PostService {
    // CREATE (Создание поста)
    // Принимает: body (текст поста) и file (объект файла)
    async create(post, picture) {
        // 1. Сохраняем файл на диске с помощью FileService
        // Если picture существует, сохраняем его и получаем имя файла (путь)
        const fileName = picture ? FileService.saveFile(picture) : undefined;

        // 2. Создаем и сохраняем пост в базе данных
        const createdPost = await Post.create({ ...post, picture: fileName });
        
        return createdPost;
    }

    // GET ONE (Получение одного поста)
    async getOne(id) {
        if (!id) {
            throw new Error('ID не указан');
        }
        const post = await Post.findById(id);
        
        if (!post) {
            // Возвращаем ошибку, если пост не найден
            throw new Error('Пост не найден');
        }

        return post;
    }

    // GET ALL (Получение всех постов)
    async getAll() {
        // Находит все документы в коллекции Post
        const posts = await Post.find();
        return posts;
    }

    // UPDATE (Обновление поста)
    // Принимает: post (объект с обновленными данными, должен содержать _id)
    async update(post, picture) {
        if (!post._id) {
            throw new Error('ID поста не указан для обновления');
        }

        let fileName = post.picture; // Сохраняем старое имя, если файл не меняется

        // Если пришло новое изображение, сохраняем его и обновляем имя
        if (picture) {
            // Здесь должна быть логика удаления старого файла, если он был!
            fileName = FileService.saveFile(picture);
        }

        // new: true - Mongoose вернет обновленный документ
        // useFindAndModify: false - опция, рекомендованная Mongoose
        const updatedPost = await Post.findByIdAndUpdate(
            post._id,
            { ...post, picture: fileName }, // Обновляем данные, включая новый путь к файлу
            { new: true } 
        );

        return updatedPost;
    }

    // DELETE (Удаление поста)
    async delete(id) {
        if (!id) {
            throw new Error('ID не указан для удаления');
        }
        
        // 1. Находим и удаляем пост
        const post = await Post.findByIdAndDelete(id);

        if (!post) {
            throw new Error('Пост не найден для удаления');
        }

        // 2. Здесь должна быть логика удаления связанного файла с диска
        // if (post.picture) { FileService.deleteFile(post.picture); }

        return post;
    }
}

export default new PostService();
