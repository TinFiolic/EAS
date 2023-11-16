import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  private apiUrl = 'http://localhost:8080';
  posts: any[] = [];
  image1: SafeUrl;
  image2: SafeUrl;
  image3: SafeUrl;
  image4: SafeUrl;
  image5: SafeUrl;
  image6: SafeUrl;
  image7: SafeUrl;
  image8: SafeUrl;
  image9: SafeUrl;
  authLevel: string;

  constructor(private router: Router, private http: HttpClient, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    if(!localStorage.getItem('loggedUser')) {
      this.router.navigate(['/login'], {});
    }

    this.authLevel = localStorage.getItem("authLevel");

    this.getData().subscribe(
      (response) => {
        this.posts = response.posts;
        this.posts.forEach((post) => {
          if(post.squareId === 1)
          this.image1 = this.sanitizer.bypassSecurityTrustUrl('data:image/png;base64,' + post.image)
          if(post.squareId === 2)
          this.image2 = this.sanitizer.bypassSecurityTrustUrl('data:image/png;base64,' + post.image)
          if(post.squareId === 3)
          this.image3 = this.sanitizer.bypassSecurityTrustUrl('data:image/png;base64,' + post.image)
          if(post.squareId === 4)
          this.image4 = this.sanitizer.bypassSecurityTrustUrl('data:image/png;base64,' + post.image)
          if(post.squareId === 5)
          this.image5 = this.sanitizer.bypassSecurityTrustUrl('data:image/png;base64,' + post.image)
          if(post.squareId === 6)
          this.image6 = this.sanitizer.bypassSecurityTrustUrl('data:image/png;base64,' + post.image)
          if(post.squareId === 7)
          this.image7 = this.sanitizer.bypassSecurityTrustUrl('data:image/png;base64,' + post.image)
          if(post.squareId === 8)
          this.image8 = this.sanitizer.bypassSecurityTrustUrl('data:image/png;base64,' + post.image)
          if(post.squareId === 9)
          this.image9 = this.sanitizer.bypassSecurityTrustUrl('data:image/png;base64,' + post.image)
        });
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
    return this.http.get<any>(`${this.apiUrl}/all-posts`);
  }

  del(id: number) {
    var fd = new FormData();
    fd.append('id', id.toString());
  
    this.http.post<any>(this.apiUrl + '/delete', fd).subscribe(
      response => {
        location.reload();
      },
      error => {

      }
    );
  }
}
