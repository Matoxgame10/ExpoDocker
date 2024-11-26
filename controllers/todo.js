import TodoModel from "../models/todo.js";
import { validatePartialTodo, validateTodo } from "../schemas/todo.js";

class TodoController{
    static async getTodos(req, res){
        try{
            let {limit = 5, page = 1} = req.query;
            limit = +limit;
            page = +page;

            const count = await TodoModel.countTodos();
            const result = await TodoModel.getTodos({limit, page});

            const baseUrl = `${req.protocol}://${req.get('host')}/api`;
            const baseUrlWithQueries = `${baseUrl}?limit=${limit}`

            const totalPages = Math.ceil(count/limit);
            const nextPage = page + 1 > totalPages ? null: `${baseUrlWithQueries}&page=${page+1}`
            const prevPage = page - 1 < 1 ? null: `${baseUrlWithQueries}&page=${page-1}`

            return res.json({
                pagination:{
                    limit,
                    count,
                    currentPage:page,
                    totalPages,
                    nextPage,
                    prevPage
                },
                result
            })
        }catch(error){
            return res.status(400).json({error:error.message})
        }

    }

    static async createTodo(req, res){
        const {titulo, descripcion} = req.body;
        const result = validateTodo({titulo,descripcion});
        if(result.error){
            return res.status(400).send({error:result.error.issues.map(error => error.message)})
        }
        try{
            await TodoModel.createTodo({titulo:titulo.trim(),descripcion:descripcion.trim()});
            return res.status(201).send({message:"Se ha creado un tarea"})
        }catch(error){
            return res.status(400).json({error:error.message})
        }
    }

    static async updateTodo(req , res){
        const {id} = req.params;
        const {titulo, descripcion} = req.body;
        const result = validatePartialTodo({titulo,descripcion});
        if(result.error){
            return res.status(400).send({error:result.error.issues.map(error => error.message)})
        }
        try{
            await TodoModel.updateTodo({id,titulo:titulo.trim(),descripcion:descripcion.trim()});
            return res.status(202).send({message:"Se ha actualizado la tarea"})
        }catch(error){
            return res.status(400).json({error:error.message})
        }
    }

    static async deleteTodo(req, res){
        const {id} = req.params;
        try {
            await TodoModel.deleteTodo({id});
            return res.send({message:"Se ha eliminado una tarea"})
        } catch (error) {
            return res.status(400).json({error:error.message})
        }
    }

    static async getTodoById(req, res){
        const {idTarea} = req.query;
        console.log(idTarea)
        try{
            const result = await TodoModel.getById({id:idTarea});
            return res.send(result);
        }catch(error){
            return res.status(400).json({error:error.message})
        }
    }
}

export default TodoController;