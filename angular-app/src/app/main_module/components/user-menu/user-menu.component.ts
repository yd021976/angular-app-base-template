import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { UserMenuController } from './user-menu.controller';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss']
})
export class UserMenuComponent implements OnInit {
  public menuItems: MenuItem[] = []
  constructor(public ctrl: UserMenuController) { }

  ngOnInit(): void {
    this.menuItems = [
      {
        "label": "Logout"
      }
    ]
  }

}
