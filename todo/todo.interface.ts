export interface TodoDto {
  /** ID of the todo */
  id: number;
  /** Content of the todo */
  text: string;
  /** The status indicate the todo is done or not*/
  isDone: boolean;
  /** The status indicate the todo should be show or not*/
  isShow: boolean;
  /** The due date of the todo */
  dueAt: Date;
  /** The date and time when the todo is created */
  createdAt: Date;
}

export interface CreateTodoDto {
  /** Content of the todo */
  text: string;
  /** The due date of the todo */
  dueAt: Date;
}

export interface UpdateTodoDto {
  /** Content of the todo */
  text?: string;
  /** The due date of the todo */
  dueAt?: Date;
  /** Indicates if the todo is done or not*/
  isDone?: boolean;
  /** Indicates if the todo should be show or not*/
  isShow?: boolean;
}

export interface TodoResponse {
  /** Indicates if the the request was successful */
  success: boolean;
  /** Error message if the request was not successful */
  message?: string;
  /** Todo data */
  result?: TodoDto | TodoDto[];
}
