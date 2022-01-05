import { Component, OnInit } from '@angular/core';
import { LoginController } from '../../controllers/login.controller';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(public ctrl:LoginController) { }

  ngOnInit(): void {
  }

}
