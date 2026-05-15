import { Component, input, output, computed } from '@angular/core';

@Component({
  selector: 'app-pagination',
  imports: [],
  templateUrl: './pagination.html',
  styleUrl: './pagination.scss',
})
export class Pagination {
  totalItems = input.required<number>();
  pageSize = input<number>(10);
  currentPage = input<number>(1);
  currentPageChange = output<number>();
  // Output for page changes
  pageChange = output<number>();
  // Computed state
  totalPages = computed(() => Math.ceil(this.totalItems() / this.pageSize()));
  pages = computed(() => {
    const pagesArray = [];
    for (let i = 1; i <= this.totalPages(); i++) {
      pagesArray.push(i);
    }
    return pagesArray;
  });

  selectPage(page: number) {
    if (page >= 1 && page <= this.totalPages()) {
      this.pageChange.emit(page);
    }
  }
}
