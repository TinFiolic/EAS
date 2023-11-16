import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  private apiUrl = 'http://localhost:8080';

  username: String = '';
  password: String = '';
  authLevel: boolean = false;

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
  }

  register() {
    const data = { username: this.username, password: this.password, authLevel: (this.authLevel ? 1 : 0) };

    console.log(data);
  
    this.http.post<any>(this.apiUrl + '/register', data).subscribe(
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
          title: 'Error while registering a new user!',
          showConfirmButton: false,
          timer: 3000
        })
      }
    );
  }
}
