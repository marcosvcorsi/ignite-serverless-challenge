import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import * as Joi from "joi";
import { CreateTodoDto } from "@/dtos/CreateTodoDto";
import { created, internalServerError } from "@/helpers/http";
import { Todo } from "@/models/Todo";
import { IHandler } from "@/protocols/IHandler";
import { IUseCase } from "@/protocols/IUseCase";
import { CreateTodoUseCase } from "@/useCases/createTodo/CreateTodoUseCase";
import { TodosRepository } from "@/repositories/TodosRepository";
import { validationParser } from "@/utils/decorators/validationParser";

class CreateTodoHandler implements IHandler {
  constructor(private readonly createTodoUseCase: IUseCase<CreateTodoDto, Todo>) {}

  @validationParser(Joi.object({
    title: Joi.string().required(),
    deadline: Joi.string().required(),
  }))
  async handle(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
    try {
      const { user_id } = event.pathParameters;
      const data = event.body as any;

      const todo = await this.createTodoUseCase.execute({
        user_id,
        ...data,
      });

      return created(todo);
    } catch(error) {
      console.error('error', error);

      return internalServerError();
    }
  }
}

const todosRepository = new TodosRepository();

const createTodoUseCase = new CreateTodoUseCase(todosRepository);

const handler = new CreateTodoHandler(createTodoUseCase);

export const handle = handler.handle.bind(handler);