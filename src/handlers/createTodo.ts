import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { CreateTodoDto } from "@dtos/CreateTodoDto";
import { created, internalServerError } from "@helpers/http";
import { Todo } from "@models/Todo";
import { IHandler } from "@protocols/IHandler";
import { IUseCase } from "@protocols/IUseCase";
import { CreateTodoUseCase } from "@useCases/createTodo/CreateTodoUseCase";
import { TodosRepository } from "@repositories/TodosRepository";

class CreateTodoHandler implements IHandler {
  constructor(private readonly createTodoUseCase: IUseCase<CreateTodoDto, Todo>) {}

  async handle(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
    try {
      const data = JSON.parse(event.body);

      const todo = await this.createTodoUseCase.execute(data);

      return created(todo);
    } catch(error) {
      return internalServerError();
    }
  }
}

const todosRepository = new TodosRepository();

const createTodoUseCase = new CreateTodoUseCase(todosRepository);

const handler = new CreateTodoHandler(createTodoUseCase);

export const handle = handler.handle.bind(handler);