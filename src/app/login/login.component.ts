import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private apiUrl = 'http://localhost:8080';

  username: String = '';
  password: String = '';

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
  }

  login() {
    const data = { username: this.username, password: this.password };
  
    this.http.post<any>(this.apiUrl + '/login', data).subscribe(
      response => {
        if(!response) {
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Error while trying to log in!',
            showConfirmButton: false,
            timer: 3000
          });

          return;
        }

        localStorage.setItem('loggedUser', response.username);
        localStorage.setItem('authLevel', response.authLevel);
        this.router.navigate(['/'], {});
      },
      error => {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Error while trying to log in!',
          showConfirmButton: false,
          timer: 3000
        })
      }
    );
  }
}
