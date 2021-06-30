import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-value',
  templateUrl: './add-value.component.html',
  styleUrls: ['./add-value.component.css']
})
export class AddValueComponent implements OnInit {
  logContent: any; 
  amount: number;
  constructor() { }

  ngOnInit(): void {
    this.logContent = document.querySelector("#log")
  }

  bet = () => { 
    this.logContent.textContent = `Bet`
    console.log(`Bet ${this.amount}`)
  }

  onSubmit = () => { 
    if (!this.amount) { 
      alert("You need to add an amount to bet!") 
      return;
    }
    else{ 
      this.logContent.textContent = `User bet ${this.amount}`
    }
    
  }

}
