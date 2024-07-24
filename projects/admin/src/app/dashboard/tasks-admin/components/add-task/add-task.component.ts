import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TasksService } from '../../services/tasks.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import * as moment from 'moment';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {

  constructor(private fb:FormBuilder ,
     public dialog: MatDialogRef<AddTaskComponent> ,
     public matDialog:MatDialog,
     private service:TasksService,
     private toaster:ToastrService,
     private spinner:NgxSpinnerService
    ) { }

  users:any = [
    {name:"nouhaila" , id:'66a0457ebc0a25ed00fb7d7c'},
    {name:"testadmin" , id:'6696ff271c3177c042db276a'},
    
  ]
  fileName=""
  newTaskForm!:FormGroup
  ngOnInit(): void {
    this.createForm()
  }
  createForm() {
    this.newTaskForm = this.fb.group({
      title: ['', [Validators.required,Validators.minLength(3)]], // Le titre est requis et doit avoir au moins 3 caractères
      userId: ['', [Validators.required, ]], // L'ID utilisateur est requis et doit être un nombre
      image: ['', [Validators.required]], // Image is required
      description: ['', [Validators.required, Validators.minLength(3)]], // Description is required and must be at least 10 characters long
      deadline: ['', [Validators.required]] // Deadline is required
    });

  }
  selectImage(event:any)
  {
    this.fileName=event.target.value
    this.newTaskForm.get('image')?.setValue(event.target.files[0])
    console.log(event)
  }
  createTask(){
    this.spinner.show()
    let model=this.prepereFormData()
    
    this.service.createTask(model).subscribe(res => {
      this.toaster.success("Task Created Succesfully!!!")
      this.spinner.hide()
      this.dialog.close()
    },
    error => { 
      this.spinner.hide()
      this.toaster.error(error.error.message)
      
    })
    
  }
  prepereFormData(){
    let newData = moment(this.newTaskForm.value['deadline']).format('DD-MM-YYYY')
    let formData =new FormData()
    Object.entries(this.newTaskForm.value).forEach(([key,value]: any )=> { 
      if(key=='deadline'){
        formData.append(key, newData)
      }
      else
      {
        formData.append(key ,value)
        
      }
    })
    return formData
    }
}
