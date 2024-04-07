import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-btn-clear',
  templateUrl: './btn-clear.component.html',
  styleUrls: ['./btn-clear.component.css']
})
export class BtnClearComponent implements OnInit{
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
    this.router.navigate(['/home']);
  }

}
