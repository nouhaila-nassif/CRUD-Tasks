import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AddTaskComponent } from '../add-task/add-task.component';
import { TasksService } from '../../services/tasks.service';
import { Title } from '@angular/platform-browser';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
export interface PeriodicElement {
  title: string;
  id: string;
  deadline: string;
  status: string;
  position: string;
}

@Component({
  selector: 'app-list-tasks',
  templateUrl: './list-tasks.component.html',
  styleUrls: ['./list-tasks.component.scss']
})
export class ListTasksComponent implements OnInit {
  displayedColumns: string[] = ['position', 'title', 'user' ,'deadline','status', 'actions'];
  dataSource:any = [];
  tasksFilter!:FormGroup
  users:any = [
    {name:"Moahmed" , id:1},
    {name:"Ali" , id:2},
    {name:"Ahmed" , id:3},
    {name:"Zain" , id:4},
  ]

  status:any = [
    {name:"Complete" , id:1},
    {name:"In-Prossing" , id:2},
  ]
  constructor(
    private service:TasksService, 
    public dialog :MatDialog ,
    private spinner:NgxSpinnerService,
    private toaser:ToastrService
   ) { }

  ngOnInit(): void {
    this.getAllTasks()

  }


  getAllTasks() {
    this.spinner.show()
    this.service.getAllTasks().subscribe((res:any) =>{
      this.dataSource  = this.mappingTasks(res.tasks)
      this.spinner.hide()


    },error =>{
       this.toaser.error(error.error.message)
       this.spinner.hide()
    })

  }
  mappingTasks(data:any[]){
    let newTasks = data.map(item=>{
      return {
        ...item,
        user:item.userId.username,
        position: `https://crud-1-c52z.onrender.com/${item.image}` 

      }
    })
    console.log(newTasks)
    return newTasks
  }
  addTask(){
    const dialogRef = this.dialog.open(AddTaskComponent, {
      width: '600px', // largeur du dialog
      height: '600px',
      data:"data"
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result == true ){
        this.getAllTasks()
      }
      
    });
  }

  }
  

