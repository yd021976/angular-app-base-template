import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationServiceModel, LoginCredentialsModel } from '../../models/authentication.model';

@Component({
  selector: 'authentication-credentials-form',
  templateUrl: './credentials-form.component.html',
  styleUrls: ['./credentials-form.component.scss']
})
export class CredentialsFormComponent implements OnInit {
  @Input() authInfos$!: Observable<AuthenticationServiceModel>
  @Input() submitLabel:string = 'Login'
  @Output() submit: EventEmitter<LoginCredentialsModel> = new EventEmitter()
  public credentials: LoginCredentialsModel = { email: '', password: '' }

  constructor() { }

  ngOnInit(): void {
  }

  public submitForm() {
    this.submit.emit(this.credentials);
  }

}
