import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GameService } from '../../game.service';
import { User } from '../../User'
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  @Output() onDeleteUser : EventEmitter<User> = new EventEmitter()
  @Output() onUserFold : EventEmitter<User> = new EventEmitter()
  @Input() user: User = { 
    name:'default',
    cash:1000
  };  

  users: User[] = [];

  // Console
  logContent: any = document.querySelector("#log");

  constructor(private gameService: GameService) {
    
    this.logContent = document.querySelector("#log")
  }

  ngOnInit(): void {
    var fiveMinutes = 3;
    var display = document.querySelector('#time');
    this.logContent = document.querySelector("#log");
    this.startTimer(fiveMinutes, display);
  }

  sendUserToDelete(user) { 
    this.onDeleteUser.emit(user)
  }

  fold(user:User) {
    this.onUserFold.emit(user)    
  }

  check = () => {
    const { name, cash } = this.user; 
    this.logContent.innerHTML = `${name} checked`
  }

  startTimer(duration, display) {
    var timer:any = duration, minutes, seconds;
    setInterval(function () {
      var _timer = parseInt(timer)
      var timer1 = _timer / 60;
      var timer2 = _timer % 60;
      minutes = parseInt(timer1.toString(), 10);
      seconds = parseInt(timer2.toString(), 10);

      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      display.textContent = minutes + ":" + seconds;

      if (--timer < 0) {
        timer = duration;
        return;
      }
    }, 1000);
  }

}
