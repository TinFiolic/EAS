import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SafeUrl, DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  private apiUrl = 'http://localhost:8080';
  users: any[] = [];

  authLevel: string;
  username: string;
  id: number;

  constructor(private router: Router, private http: HttpClient, private sanitizer: DomSanitizer, private route: ActivatedRoute) { }

  ngOnInit(): void {
    if(!localStorage.getItem('loggedUser')) {
      this.router.navigate(['/login'], {});
    }

    this.getData().subscribe(
      (response) => {
        this.users = response.users;
        console.log(this.users);
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }

  logout() {
    localStorage.removeItem('loggedUser');
    this.router.navigate(['/login'], {});
  }

  getData(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/all-users`);
  }

  del(id: string) {
    console.log(id);
    var fd = new FormData();
    fd.append('id', id.toString());
  
    this.http.post<any>(this.apiUrl + '/user-delete', fd).subscribe(
      response => {
        location.reload();
      },
      error => {

      }
    );
  }
}