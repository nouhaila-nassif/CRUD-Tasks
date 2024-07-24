import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateTask } from '../context/DTOs';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(private http:HttpClient) { }
  getAllTasks(){
    
    return this.http.get('https://crud-1-c52z.onrender.com/tasks/all-tasks' )
  }
  createTask(model:any){
    return this.http.post('https://crud-1-c52z.onrender.com/tasks/add-task',model )

  }
}
