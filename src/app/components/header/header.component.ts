import { Component, OnInit } from '@angular/core';
import { SidenavService } from 'src/app/shared/sidenav.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(public sidenav: SidenavService) {}

  ngOnInit(): void {}
}
