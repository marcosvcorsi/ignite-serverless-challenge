import { Todo } from "@/models/Todo";
import { IUseCase } from "@/protocols/IUseCase";
import { ITodosRepository } from "@/repositories/ITodosRepository";

export class ListTodosUseCase implements IUseCase<string, Todo[]> {
  constructor(private readonly todosRepository: ITodosRepository) {}
  
  async execute(user_id: string): Promise<Todo[]> {
    const todos = await this.todosRepository.findByUser(user_id);

    return todos;
  }
}