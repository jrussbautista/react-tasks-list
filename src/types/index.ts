export interface Todo {
  id: string;
  title: string;
  isCompleted: boolean;
}

export interface AddTodoFields {
  title: string;
}

export type Status = 'loading' | 'succeed' | 'failed';
