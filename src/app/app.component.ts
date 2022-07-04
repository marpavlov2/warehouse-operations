import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { AuthService } from './auth/services/auth.service';
import { SidenavService } from './shared/services/sidenav.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @ViewChild('drawer') public sidenav: MatSidenav;

  constructor(
    public sidenavService: SidenavService,
    public auth: AuthService
  ) {}

  ngAfterViewInit(): void {
    this.sidenavService.setSidenav(this.sidenav);
  }

  logout() {
    this.auth.logout();
  }
}
