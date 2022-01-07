import { Component, OnInit } from '@angular/core';
import { AuthenticationController } from '../../controllers/authentication.controller';

@Component({
  selector: 'authentication-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(public ctrl:AuthenticationController) { }

  ngOnInit(): void {
  }

}
