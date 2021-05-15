import { v4 } from 'uuid';

export class Todo {
  id: string;
  user_id: string;
  title: string;
  done: boolean;
  deadline: string;

  constructor() {
    if (!this.id) {
      this.id = v4();
    }
  }
}