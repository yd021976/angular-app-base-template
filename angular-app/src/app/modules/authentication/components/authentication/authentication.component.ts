import { Component, OnInit } from '@angular/core';
import { AuthenticationController } from '../../controllers/authentication.controller';

@Component({
  selector: 'authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent implements OnInit {

  constructor(public ctrl:AuthenticationController) { }

  ngOnInit(): void {
  }

}
