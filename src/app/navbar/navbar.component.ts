import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  items: MenuItem[] = [];
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.initializeMenuItems();
  }

  initializeMenuItems() {
    this.items = [
      {
        icon: 'pi pi-user',
        label: 'Profile',
        routerLink: ['/profile'],
      },
      {
        icon: 'pi pi-sign-out',
        label: 'Log Out',
        command: (e) => {
          this.authService.logOut();
        },
      },
    ];
  }
}
