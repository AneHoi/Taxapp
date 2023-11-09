import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor() { }

  ngOnInit() {}
  register(){
    var container = document.getElementById('childDiv') as HTMLParagraphElement;
    container.textContent = "okay";
    console.log("HII");
  }
}
