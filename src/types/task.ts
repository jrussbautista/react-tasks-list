export type Task = {
  id: string;
  title: string;
  isCompleted: boolean;
};

export type AddTaskFields = {
  title: string;
};

export type UpdateTaskFields = {
  title?: string;
  isCompleted?: boolean;
};
