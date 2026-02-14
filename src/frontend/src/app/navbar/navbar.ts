import {Component, OnInit, signal, WritableSignal} from '@angular/core';
import {MenuItem} from 'primeng/api';
import {Menu} from 'primeng/menu';

@Component({
  selector: 'app-navbar',
  imports: [
    Menu
  ],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar implements OnInit {
  items: WritableSignal<MenuItem[]> = signal([]);

  ngOnInit() {
    this.items.set([
      {
        label: 'Sanoa',
        items: [
          {
            label: 'Alle Zitate',
            icon: 'pi pi-calendar-clock',
            routerLink: '/'
          },
          {
            label: 'Mitarbeiter',
            icon: 'pi pi-users',
            routerLink: '/Benutzer'
          },
        ]
      }
    ]);
  }
}
