import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from "aws-lambda";

export interface IHandler {
  handle(event: APIGatewayProxyEvent, context?: Context): Promise<APIGatewayProxyResult>;
}