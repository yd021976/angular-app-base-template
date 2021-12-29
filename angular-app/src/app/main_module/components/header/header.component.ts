import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public items: MenuItem[] = []
  constructor() { }

  ngOnInit(): void {
    this.items = [
      {
        label: 'Home', icon: "pi pi-fw pi-home"
      },
      {
        label: 'Login', icon: "pi pi-fw pi-user"
      },
      {
        label: 'About', icon: "pi pi-fw pi-info"
      },
    ]
  }

}
