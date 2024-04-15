import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpservicesService } from '../Services/httpservices.service';
import { Tasks } from '../Model/tasks';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-update-details',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, JsonPipe],
  templateUrl: './update-details.component.html',
  styleUrl: './update-details.component.scss'
})
export class UpdateDetailsComponent implements OnInit{
  form!: FormGroup;
  taskDetails: Tasks[] = []
  currentId!: number;
  notUpdating!: boolean;
  message!: string
  responseText! : string;
  
  
  constructor(private _fb: FormBuilder, private httpService: HttpservicesService) {}  

  ngOnInit(): void {
      this.httpService.getTaskDetails().subscribe((res: any)=>{
        this.taskDetails = res;
      })
    
    this.form = this._fb.group({
      userId: ['', Validators.required],
      taskTitle: ['', Validators.required],
      completed: ['', Validators.required],
    })
    this.notUpdating = true
  }


  // function to select specific task with id for updating
  updateBtnClicked(id: number){
    this.currentId = id;
    this.notUpdating = false;
    
    let currentTask = this.taskDetails.find((t) => {return t.id == id})

    // populating form in view with selected task details 
    this.form = this._fb.group({
      userId: [currentTask?.userId],
      taskTitle: [currentTask?.title],
      completed: [currentTask?.completed]
    })
  }

  // function to update a task of database
  updateTask(){
    this.httpService.updateTaskDetails(this.currentId, this.form.value).subscribe(
      (response) => {
        console.log(response);
        this.message = "Updated Task :"
        this.responseText = response;
      },
      (error) => {
        console.log(error);
      }
    )
    // clearing form values 
    this.notUpdating = true;
    this.form = this._fb.group({
      userId: [''],
      taskTitle: [''],
      completed: ['']
    })
  }

  // to delete a task from the database
  deleteTodo(id: number): void {
    this.httpService.deleteTaskDetails(id).subscribe(
      () => {
        this.taskDetails = this.taskDetails.filter((t) => t.id !== id);
        this.message = ``;
        this.responseText = `Task with ID ${id} successfully deleted.`;
      },
      (error) => {
        console.error('Delete Error:', error);
      }
    );
  }

  // to mark task completed in database and this.taskDetails
  completedBtnClicked(id: number){
    this.currentId = id
    this.httpService.markCompleted(this.currentId,  {completed: true}).subscribe(
      (response) => {
        this.taskDetails[this.currentId-1].completed = true
        this.message = `The task with id: ${this.currentId} is completed`
        this.responseText = response;
      },
      (error) => {
        console.log(error);
      }
    )
  }
  
  
}
