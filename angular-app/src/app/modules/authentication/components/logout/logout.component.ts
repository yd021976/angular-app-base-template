import { Component, OnInit } from '@angular/core';
import { AuthenticationComponentController } from '../../controllers/authentication-component-controller.service';

@Component({
  selector: 'authentication-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(public ctrl:AuthenticationComponentController) { }

  ngOnInit(): void {
  }

}
