import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'hospital-notfound',
  templateUrl: './notfound.component.html',
  styleUrls: ['./notfound.component.scss'],
})
export class notFoundComponent {
  constructor(private router: Router) {}

  Back() {
    this.router.navigateByUrl('/dashboard', { replaceUrl: true });
  }
}
