import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpservicesService } from '../Services/httpservices.service';
import { Tasks } from '../Model/tasks';


@Component({
  selector: 'app-fetch-details',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './fetch-details.component.html',
  styleUrl: './fetch-details.component.scss'
})
export class FetchDetailsComponent{

  taskDetails: Tasks[] = []
  allDetails: Tasks[] = []
  userInputId! : number;

  constructor(private httpService: HttpservicesService){}

  showTasks(){
    this.httpService.getTaskDetails().subscribe((res: any)=>{
      this.taskDetails = res;
    })
  }

  search(){
    this.httpService.getTaskDetails().subscribe((res: any)=>{
      this.allDetails = res;
      this.taskDetails = this.allDetails.filter(task => task.userId ===  Number(this.userInputId));
    })
  }

}
