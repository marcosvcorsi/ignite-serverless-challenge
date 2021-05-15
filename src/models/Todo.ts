import { v4 } from 'uuid';

export class Todo {
  id: string;
  user_id: string;
  title: string;
  done: boolean;
  deadline: string;
  created_at: string;

  constructor() {
    if (!this.id) {
      this.id = v4();
      this.done = false;
      this.created_at = new Date().toISOString();
    }
  }
}