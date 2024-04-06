import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-movie-pagination',
  templateUrl: './movie-pagination.component.html',
  styleUrls: ['./movie-pagination.component.css']
})
export class MoviePaginationComponent implements OnInit {
  @Input() currentPage: number = 1;
  @Input() totalPages: number = 1;
  @Output() onSelectPage: EventEmitter<number> = new EventEmitter<number>();

  pages: number[] = [];

  constructor() {}

  ngOnInit(): void {
    this.generatePages();
  }

  generatePages(): void {
    this.pages = [];
    for (let i = this.currentPage; i <= Math.min(this.currentPage + 5, this.totalPages); i++) {
      this.pages.push(i);
    }
  }

  selectPage(page: number): void {
    if (this.totalPages) {
      this.onSelectPage.emit(page);
    }
}
}
