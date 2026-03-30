export type Comment = {
  id: number;
  task_id: number;
  user_id: number;
  content: string;
  resolved: boolean;
  creation_date: string;
};