import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description, finishedBy } = createTaskDto;

    const task: Task = {
      id: Math.floor(Math.random() * 1000).toString(),
      title,
      description,
      status: TaskStatus.OPEN,
      finishedBy,
    };

    this.tasks.push(task);
    return task;
  }
}
