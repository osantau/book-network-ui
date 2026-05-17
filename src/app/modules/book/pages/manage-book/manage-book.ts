import { Component, Input } from '@angular/core';
import { BookRequest } from '../../../../services/models';
import { FormsModule } from '@angular/forms';
import { BookRoutingModule } from "../../book-routing-module";
import { saveBook, SaveBook$Params, uploadBookCoverPicture, UploadBookCoverPicture$Params } from '../../../../services/functions';
import { HttpClient } from '@angular/common/http';
import { ApiConfiguration } from '../../../../services/api-configuration';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-book',
  imports: [FormsModule, BookRoutingModule],
  templateUrl: './manage-book.html',
  styleUrl: './manage-book.scss',
})
export class ManageBook {
  errorMsg: Array<string> = [];
  selectedPicture: string = '';
  selectedBookCover: string = '';
  @Input()
  bookRequest: BookRequest = {
    authorName: '',
    isbn: '',
    synopsis: '',
    title: '',
  };
  constructor(private http: HttpClient, private apiConfig: ApiConfiguration, private router: Router) { }
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedPicture = file.name;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.selectedPicture = reader.result as string;
      };
      reader.readAsDataURL(file);
    }

  }
  saveBook() {
    this.errorMsg = [];
    const saveBookParams: SaveBook$Params = { body: this.bookRequest };
    saveBook(this.http, this.apiConfig.rootUrl, saveBookParams).subscribe({
      next: (savedBookId) => {
        const uploadBookCoverPictureParams: UploadBookCoverPicture$Params = {
          'book-id': savedBookId.body as number,
          body: {
            'file': new File([this.selectedPicture], 'book-cover.jpg',{ type: 'image/jpeg', lastModified: Date.now() })
          }
        };
        uploadBookCoverPicture(this.http, this.apiConfig.rootUrl, uploadBookCoverPictureParams).subscribe({
          next: () => {
            this.router.navigate(['/books/my-books']);
          }
        });
      }, error: (err) => {
        this.errorMsg = err.error.validationErrors;
      }
    });
  }
}
