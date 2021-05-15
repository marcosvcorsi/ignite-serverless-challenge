import { CreateTodoDto } from "@/dtos/CreateTodoDto";
import { Todo } from "@/models/Todo";
import { IUseCase } from "@/protocols/IUseCase";
import { ITodosRepository } from "@/repositories/ITodosRepository";

export class CreateTodoUseCase implements IUseCase<CreateTodoDto, Todo> {
  constructor(private readonly todosRepository: ITodosRepository) {}
  
  async execute(data: CreateTodoDto): Promise<Todo> {
    const todo = await this.todosRepository.create(data);

    return todo;
  }
}