import { DynamoDB } from 'aws-sdk';

import { CreateTodoDto } from "src/dtos/CreateTodoDto";
import { Todo } from "src/models/Todo";
import { ITodosRepository } from "./ITodosRepository";

export class TodosRepository implements ITodosRepository {
  private readonly dynamoDb: DynamoDB.DocumentClient;
  private readonly tableName = process.env.TODOS_TABLE_NAME;
  
  constructor() {
    this.dynamoDb = new DynamoDB.DocumentClient();
  }

  async create(data: CreateTodoDto): Promise<Todo> {
    const todo = new Todo();
    
    Object.assign(todo, data)

    await this.dynamoDb.put({
      TableName: this.tableName,
      Item: todo,
    }).promise();

    return todo;
  }
}