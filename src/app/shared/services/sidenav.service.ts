import { Injectable } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Injectable()
export class SidenavService {
  private sidenav: MatSidenav;

  public setSidenav(sidenav: MatSidenav) {
    this.sidenav = sidenav;
  }

  public openSidenav() {
    return this.sidenav.open();
  }

  public closeSidenav() {
    return this.sidenav.close();
  }

  public toggleSidenav(): void {
    this.sidenav.toggle();
  }
}
