import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationServiceModel, credentialsModel } from '../../models/authentication.model';

@Component({
  selector: 'authentication-credentials-form',
  templateUrl: './credentials-form.component.html',
  styleUrls: ['./credentials-form.component.scss']
})
export class CredentialsFormComponent implements OnInit {
  @Input() authInfos$!: Observable<AuthenticationServiceModel>
  @Input() submitLabel: string = 'Login'
  @Input() credentialsType:'login' | 'signup' = 'login'
  @Output() submit: EventEmitter<credentialsModel> = new EventEmitter()
  public credentials: credentialsModel = { email: '', password: '', nickname: '' }

  constructor() { }

  ngOnInit(): void {
  }

  public submitForm() {
    this.submit.emit(this.credentials);
  }

}
