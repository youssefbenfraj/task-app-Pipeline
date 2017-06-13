import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestMethod, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';

import { Task } from './task';

@Injectable()
export class TaskService {
    //URLs for CRUD operations
    taskUrl = "http://localhost:8080/api/task";
    //Create constructor to get Http instance
    constructor(private http:Http) { 
    }
    //Fetch all tasks
    getAllTasks(): Observable<Task[]> {
        return this.http.get(this.taskUrl)
                .map(this.extractData)
                .catch(this.handleError);

    }
    //Create task
    createTask(task: Task):Observable<number> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({
              headers: headers
          });
        return this.http.post(this.taskUrl, task, options)
               .map(success => success.status)
               .catch(this.handleError);
    }
    //Fetch task by id
    getTaskById(id: string): Observable<Task> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({
              headers: headers
          });
        return this.http.get(this.taskUrl + '/' + id, options)
               .map(this.extractData)
               .catch(this.handleError);
    }   
    //Update task
    updateTask(id: string, task: Task):Observable<number> {
        let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: cpHeaders });
        return this.http.put(this.taskUrl + '/' + id, task, options)
               .map(success => success.status)
               .catch(this.handleError);
    }
    //Delete task    
    deleteTaskById(id: string): Observable<number> {
        let cpHeaders = new Headers({ 'Content-Type': 'application/json' });         
        let options = new RequestOptions({ headers: cpHeaders });
        return this.http.delete(this.taskUrl + '/' + id, options)
               .map(success => success.status)
               .catch(this.handleError);
    }       
    private extractData(res: Response) {
        let body = res.json();
        return body;
    }
    private handleError (error: Response | any) {
        console.error(error.message || error);
        return Observable.throw(error.status);
    }
}