import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  authLevel: string;

  constructor(private router: Router) { }

  ngOnInit(): void {
    if(!localStorage.getItem('loggedUser')) {
      this.router.navigate(['/login'], {});
    }

    this.authLevel = localStorage.getItem("authLevel");
  }

  logout() {
    localStorage.removeItem('loggedUser');
    this.router.navigate(['/login'], {});
  }

  redirect(path: String) {
    this.router.navigate(['/' + path], {})
  }
}
