import { Injectable }   from '@angular/core';
import { HttpClient }   from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  users$: Observable<User[]>;
  
  private serviceUrl = 'https://jsonplaceholder.typicode.com/users';
  constructor(private http: HttpClient ) {}

  getUsers():Observable<any>{
    return this.http.get<User[]>(this.serviceUrl);
  }

}
