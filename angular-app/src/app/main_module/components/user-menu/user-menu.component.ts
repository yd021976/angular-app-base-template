import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { UserMenuControllerService } from './user-menu-controller.service';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss']
})
export class UserMenuComponent implements OnInit {
  public menuItems: MenuItem[] = []
  constructor(public ctrl: UserMenuControllerService) { }

  ngOnInit(): void {
    this.menuItems = [
      {
        "label": "Logout",
        "icon": "pi pi-fw pi-sign-out",
        command: this.ctrl.logout.bind(this.ctrl)
      }
    ]
  }

}
