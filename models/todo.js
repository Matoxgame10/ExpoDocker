import connection from "../utils/mysql-connection.js";
class TodoModel{

    static async getTodos({limit , page}={}){
        try{
            let offset = page !== 1 ?  limit * (page -1) : 0;
            const [result] = await connection.query("SELECT * FROM to_dos LIMIT ? OFFSET ?",[limit, offset]);
            return result;
        }catch(err){
            throw new Error(err)
        }
    }

    static async createTodo({titulo, descripcion}){
        try{
            const [result] = await connection.query("CALL addTodo(?,?)",[titulo,descripcion]);
            return result;
        }catch(err){
            throw new Error("Hubo un error al intentar agregar una tarea")
        }
    }

    static async updateTodo({id, titulo, descripcion}){
        try {
            const [result] = await connection.query("CALL updateTodo(?,?,?)",[id, titulo, descripcion]);
            return result;
        } catch (error) {
            throw new Error("Hubo un error al intentar actualizar una tarea")
        }
    }

    static async deleteTodo({id}){
        try{
            const [result] = await connection.query("CALL deleteTodo(?)",[id]);
            return result;
        }catch(error){
            throw new Error("Hubo un error al intentar eliminar una tarea")
        }
    }

    static async getById({id}){
        try{
            const [result] = await connection.query("SELECT * FROM to_dos WHERE id = (?)",[id]);
            return result;
        }catch(err){
            throw new Error("Hubo un error al intentar buscar la tarea")
        }
    }

    static async countTodos(){
        try {
            const [[result]] = await connection.query("SELECT count(*) as total FROM to_dos");
            return result.total;
        } catch (error) {
            throw new Error("Hubo un error")
        }
    }
}

export default TodoModel;

