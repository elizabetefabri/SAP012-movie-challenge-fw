import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-btn-clear',
  templateUrl: './btn-clear.component.html',
  styleUrls: ['./btn-clear.component.css'],
})

export class BtnClearComponent implements OnInit {
  @Output() clearEvent: EventEmitter<void> = new EventEmitter();
  isMobile: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.checkIsMobile();
  }

  private checkIsMobile(): void {
    const screenWidth = window.innerWidth;
    this.isMobile = screenWidth < 768;
  }

  clearFilters(): void {
    this.clearEvent.emit();
    // this.router.navigate(['/home']);
  }
}
