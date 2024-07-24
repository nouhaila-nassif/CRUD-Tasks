import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from '../context/DTO';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }
login(model:Login){
  return this.http.post('https://crud-1-c52z.onrender.com/auth/login', model);
}
}

