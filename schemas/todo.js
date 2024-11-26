import zod from "zod";
const todoSchema = zod.object({
    titulo: zod.string({
        required_error:"El titulo es necesario",
        invalid_type_error:"El titulo no es del tipo esperado"
    }).trim().min(5,{
        message:"El titulo debe tener al menos 5 caracteres"
    }).max(50,{
        message:"El titulo puede tener un maximo de 50 caracteres"
    }),
    descripcion: zod.string({
        required_error:"La descripcion es necesaria"
    }).trim().min(5,{
        message:"La descripcion debe tener al menos 5 caracteres"
    })
})

export function validateTodo(todo){
    return todoSchema.safeParse(todo);
}

export function validatePartialTodo(todo){
    return todoSchema.partial().safeParse(todo);
}