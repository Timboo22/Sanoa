import { Component, signal } from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {Home} from './home/home';
import {NgOptimizedImage} from '@angular/common';
import {Navbar} from './navbar/navbar';
import {Card} from 'primeng/card';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Home, NgOptimizedImage, RouterLink, Navbar, Card],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Sanoa');
}
