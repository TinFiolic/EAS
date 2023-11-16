import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

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

  image: SafeUrl;
  authLevel: string;

  title: string;
  description: string;
  id: number;

  constructor(private router: Router, private http: HttpClient, private sanitizer: DomSanitizer, private route: ActivatedRoute) { }

  ngOnInit(): void {
    if(!localStorage.getItem('loggedUser')) {
      this.router.navigate(['/login'], {});
    }

    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = +params.get('id')
    })

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

          if(post.squareId === this.id) {
            this.title = post.title;
            this.description = post.description;
          }
        });

        if(this.id === 1)
        this.image = this.image1;
        if(this.id === 2)
        this.image = this.image2;
        if(this.id === 3)
        this.image = this.image3;
        if(this.id === 4)
        this.image = this.image4;
        if(this.id === 5)
        this.image = this.image5;
        if(this.id === 6)
        this.image = this.image6;
        if(this.id === 7)
        this.image = this.image7;
        if(this.id === 8)
        this.image = this.image8;
        if(this.id === 9)
        this.image = this.image9;
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