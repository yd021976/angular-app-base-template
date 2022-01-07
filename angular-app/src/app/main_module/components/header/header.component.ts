import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public items: MenuItem[] = []
  constructor() {
   }

  ngOnInit(): void {
    this.items = [
      {
        label: 'Home', icon: "pi pi-fw pi-home", routerLink: ['/home']
      },
      {
        label: 'Login', icon: "pi pi-fw pi-user", routerLink: ['/authentication']
      },
      {
        label: 'About', icon: "pi pi-fw pi-info", routerLink: ['/infos'],routerLinkActiveOptions:{class:'p-highlight'}
      },
    ]
  }

}
