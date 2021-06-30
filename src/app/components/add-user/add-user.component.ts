import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { User } from '../../User';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  @Output() onAddUser : EventEmitter<User> = new EventEmitter();
  name: string; 
  montant: number;
  constructor() { }

  ngOnInit(): void {
  }

  onSubmit = () => { 
    this.name ? console.log(this.name) : console.log("please insert name")
    this.montant ? console.log(this.montant) : console.log("please insert montant")

    // create @user 
    const newUser: User = { 
      id: (Math.floor(Math.random() * 500) + 6000) / 100,
      name:this.name, 
      cash:  this.montant
    }

    // add User 
    this.onAddUser.emit(newUser)

    // set form to vide
    this.name = ''
    this.montant = 0
  }

}
