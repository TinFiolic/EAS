import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  private apiUrl = 'http://localhost:8080';

  title: String = "";
  description: String = "";
  selectedFile!: File;
  selectedOption: number = 1;

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0] as File;
  }

  create() {
    const data = { title: this.title, description: this.description, squareId: this.selectedOption};

    var fd = new FormData();
    fd.append('image', this.selectedFile);
    fd.append('title', this.title.toString());
    fd.append('description', this.description.toString());
    fd.append('squareId', this.selectedOption.toString());

    console.log(data);
  
    this.http.post<any>(this.apiUrl + '/new-post', fd).subscribe(
      response => {
        if(!response) {
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Error while trying to upload a file!',
            showConfirmButton: false,
            timer: 3000
          });

          return;
        }

        this.router.navigate(['/'], {});
      },
      error => {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Error while trying to upload a file!',
          showConfirmButton: false,
          timer: 3000
        })
      }
    );
  }

}
