export interface IUseCase<Request, Response> {
  execute(data: Request): Promise<Response>
}