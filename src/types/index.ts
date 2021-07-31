export interface Todo {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
}

export interface AddTodoFields {
  title: string;
  description: string;
}
