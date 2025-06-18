import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { LocalStorageService } from '../../../../shared/services/local-storage.service';
import { IUsersSession } from '../../../../shared/types/IUserSession';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [RouterModule, CommonModule], 
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  protected user: IUsersSession
  constructor(
    private localStorage: LocalStorageService,
    private router: Router
  ) {
    this.user = this.localStorage.getUser()
  }

  logout() {
    this.localStorage.logout()
  }
}
