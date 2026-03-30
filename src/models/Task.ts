export type Task = {
  id: number;
  title: string;
  category: string;
  done: boolean;
  user_id: number | null;
  conclusion_date: string | null;
};