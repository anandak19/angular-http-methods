import { CommonModule, JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpservicesService } from '../Services/httpservices.service';


@Component({
  selector: 'app-add-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, JsonPipe],
  templateUrl: './add-form.component.html',
  styleUrl: './add-form.component.scss'
})
export class AddFormComponent {
  form!: FormGroup;
  responseText! : string;
  message!: string

  constructor(private _fb: FormBuilder, private httpService: HttpservicesService) {}

  ngOnInit(): void {
    this.form = this._fb.group({
      userId: ['', Validators.required],
      taskTitle: ['', Validators.required],
      completed: ['', Validators.required],
    })
  }


  onSubmit() {
    if (this.form.valid) {
      this.httpService.AddTaskDetails(this.form.value).subscribe(
        (response) => {
          this.responseText = response;
          this.message = "New Task Added";
        },
        (error) => {
          this.responseText = error;
        }
      );
    } else {
      this.responseText = "No Task Added";
      this.message = "";
    }
  }
}
