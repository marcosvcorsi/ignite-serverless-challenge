export type CreateTodoDto = {
  user_id: string;
  title: string;
  done: boolean;
  deadline: Date;
}