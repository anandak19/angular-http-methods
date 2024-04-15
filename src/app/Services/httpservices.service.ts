import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpservicesService {

  private apiUrl = 'https://jsonplaceholder.typicode.com/todos';

  constructor(private _http: HttpClient) { }

  getTaskDetails(){
    return this._http.get(`${this.apiUrl}`)
  }

  AddTaskDetails(tasksDetails: { userId: number; taskTitle: string; completed: boolean; }): Observable<any> {
    return this._http.post(`${this.apiUrl}`, tasksDetails);
  }

  updateTaskDetails(id: number, tasksDetails: { userId: number; taskTitle: string; completed: boolean; }): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this._http.put<any>(url, tasksDetails);
  }

  deleteTaskDetails(id: number): Observable<any>{
    const url = `${this.apiUrl}/${id}`;
    return this._http.delete<any>(url);
  }

  markCompleted(id: number, tasksDetails: { completed: boolean; }): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this._http.patch<any>(url, tasksDetails);
  }

}
