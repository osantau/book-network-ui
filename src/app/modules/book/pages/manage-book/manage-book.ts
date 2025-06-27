import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BookRequest } from '../../../../services/models';
import { FormsModule } from '@angular/forms';
import { BookService } from '../../../../services/services';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-manage-book',
  imports: [CommonModule, FormsModule, RouterLink, RouterOutlet],
  templateUrl: './manage-book.html',
  styleUrl: './manage-book.scss'
})
export class ManageBook implements OnInit {
  saveBook() {
    this.bookService.saveBook({
      body: this.bookRequest
    }).subscribe({
      next: (bookId: number): void => {
        this.bookService.uploadBookCoverPicture({
          'book-id': bookId,
          body: {
            file: this.selectedBookCover
          }
        }).subscribe({
          next:():void=>{
           this.router.navigate(['/books/my-books']); 
          }
        })
      },
      error: (err):void => {
        this.errorMsg = err.error.validationErrors;
      }
    });
  }
  bookRequest: BookRequest = {
    authorName: '',
    isbn: '',
    synopsis: '',
    title: ''
  };

  constructor(private bookService: BookService, private router: Router, private activatedRoute: ActivatedRoute) {

  }
  ngOnInit(): void {

  }

  onFileSelected(event: any) {
    this.selectedBookCover = event.target.files[0];
    if (this.selectedBookCover) {
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedPicture = reader.result as string;
      }
      reader.readAsDataURL(this.selectedBookCover);
    }
  }

  errorMsg: Array<string> = [];
  selectedPicture: string | undefined;
  selectedBookCover: any;
}
