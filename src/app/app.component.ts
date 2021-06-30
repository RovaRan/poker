import { Component } from '@angular/core';
import { User } from './User'; // interface
import { GameService } from './game.service';
import data from './data/Config.json';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  users: User[] = [];
  // console.log on screen
  logContent: any;
  login: boolean = true
  ONLINE_USER_MESSAGE:string = data.errorMessageUserOnline;
  itemName:string = "onlineUser"

  constructor(private gameService: GameService){ 
    gameService.onlineUser.subscribe(user =>{ 
      user.name === this.users[0].name ? this.users[1].message = `${this.users[0].name} folded` : this.users[0].message = `${this.users[1].name} folded`;
    })
  }

  ngOnInit() {
    this.fetchData()
    // console on browser
    this.logContent = document.querySelector("#log");
    // Check if any user logged in 
    const onlineUser = localStorage.getItem(this.itemName)
    onlineUser ? this.login = false:this.login=true
  }

  fetchData() {
    this.gameService.getUsers().subscribe((users) => (this.users = users));
  }

  switchLogin(login:boolean) { 
    this.login = login
    console.log(login)
  }

  deleteUser(user:User) { 
    this.gameService.deleteUser(user).subscribe(() => {})
    localStorage.clear()
    // To refresh users list
    this.fetchData()
    this.switchLogin(true)
  }

  foldUser(user:User) { 
    this.showMessage(`${user.name} has folded`)
    this.deleteUser(user)
  }

  async addUser(newUser: User) {
    try {
      const onlineUser = localStorage.getItem(this.itemName)
      if (onlineUser !== null) { 
        this.showMessage(this.ONLINE_USER_MESSAGE)
      }
      else {
        await this.gameService.AddUser(newUser).subscribe((newUser) => this.users.push(newUser))
        // Add user to localStorage
        await localStorage.setItem(this.itemName, JSON.stringify(newUser));
        // Switch login to remove Add-user component
        this.switchLogin(false)
      }
      // console.log(localStorage.getItem("onlineUser"))
    }
    catch(e) { 
      console.log(e)
    }
  }

  clearStorage () { 
    localStorage.clear()
    this.showMessage("Storage clear")
  }

  // Show in screen log
  showMessage (message:string) { 
    this.logContent.textContent = message;
  }
}
