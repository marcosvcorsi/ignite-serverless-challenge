import { CreateTodoDto } from "@dtos/CreateTodoDto";
import { Todo } from "@models/Todo";

export interface ITodosRepository {
  create(data: CreateTodoDto): Promise<Todo>
}