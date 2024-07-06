import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'hospital-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  title = 'admin';

  isSideNavCollapsed = false;
  screenWidth = 0;

  onToggleSideNav(data: SideNavToggle): void {
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;
  }
  constructor(private activatedRoute: ActivatedRoute, private router: Router) {}
  shouldShowComponents = true;

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const isLoginRoute =
          this.activatedRoute.snapshot.firstChild?.routeConfig?.path ===
            'login' ||
          this.activatedRoute.snapshot.firstChild?.routeConfig?.path ===
            'authentication';
        const isNotFoundRoute =
          this.activatedRoute.snapshot.firstChild?.routeConfig?.path === '**';
        this.shouldShowComponents = !isLoginRoute && !isNotFoundRoute;
      }
    });
  }
}
