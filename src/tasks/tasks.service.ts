import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { v4 as uuidv4 } from 'uuid';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
    const { status, search } = filterDto;

    let tasks = this.getAllTasks();

    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }

    if (search) {
      tasks = tasks.filter((task) => {
        if (task.title.includes(search) || task.description.includes(search)) {
          return true;
        } else {
          false;
        }
      });
    }

    return tasks;
  }

  getTaskById(id: string): Task {
    const foundTask = this.tasks.find((task) => task.id === id);

    if (!foundTask) {
      throw new NotFoundException(`Task with this id : "${id}" not found`);
    } else {
      return foundTask;
    }
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description, finishedBy, status } = createTaskDto;

    const task: Task = {
      id: uuidv4(),
      title,
      description,
      status,
      finishedBy,
    };

    this.tasks.push(task);
    return task;
  }

  deleteTaskById(id: string): void {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }

  updateTaskStatus(id: string, status: TaskStatus) {
    const task = this.getTaskById(id);
    task.status = status;
    return task;
  }
}
