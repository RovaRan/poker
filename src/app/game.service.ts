import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { WebsocketService } from './websocket.service';
import { environment } from '../environments/environment';
import { map } from 'rxjs/operators';
import { User } from './User';
import { HttpClient, HttpHeaders } from '@angular/common/http';

export interface Message {
  author: string,
  message: string
}
@Injectable({
  providedIn: 'root'
})
export class GameService {

  public messages: Subject<Message>;
  public onlineUser: Subject<User>;
  private apiUrl = 'http://localhost:5000/data'

  /**
   * Contructor
   * @param http HttpClient => Get json from local server
   * @param wsService WebSocketService => Connexion to WebSocket
   */
  constructor(private http: HttpClient, private wsService: WebsocketService) {
    this.onlineUser = <Subject<User>>wsService
      .connect(environment.GAME_URL).pipe(map((response: MessageEvent): User => {
        let data = JSON.parse(response.data);
        return {
          name: data.name,
          cash: data.cash,
          message: data.message
        }
      }))
  }

  /**
   * To get Data value on json-server local
   * @returns Observable<User[]>
   */
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl)
  }

  deleteUser(user:User): Observable<User> { 
    console.log(user.id)
    const url = `${this.apiUrl}/${user.id}`;
    return this.http.delete<User>(url)
  }

  AddUser(newUser: User) : Observable<User> { 
    return this.http.post<User>(this.apiUrl, newUser);
  }
}