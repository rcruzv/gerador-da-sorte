import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import {
  NavigationEnd,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { AuthGateway } from './auth/auth.gateway';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('gerador-da-sorte');
  private readonly document = inject(DOCUMENT);
  private readonly router = inject(Router);
  private readonly auth = inject(AuthGateway);
  private readonly currentPath = signal(this.document.location.pathname);
  protected readonly isSidebarCollapsed = signal(false);
  protected readonly isUserMenuOpen = signal(false);
  protected readonly currentUser = this.auth.currentUser;
  protected readonly isPublicRoute = computed(() => {
    const path = this.currentPath().split('?')[0].split('#')[0];
    return path === '' || path === '/' || path.startsWith('/auth');
  });

  constructor() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentPath.set(event.urlAfterRedirects.split('?')[0].split('#')[0]);
      }
    });
  }

  protected toggleSidebar(): void {
    this.isSidebarCollapsed.update((collapsed) => !collapsed);
  }

  protected toggleUserMenu(): void {
    this.isUserMenuOpen.update((open) => !open);
  }

  protected toggleFullscreen(): void {
    if (this.document.fullscreenElement) {
      void this.document.exitFullscreen();
      return;
    }

    void this.document.documentElement.requestFullscreen();
  }

  protected logout(): void {
    this.auth.logout();
    this.isUserMenuOpen.set(false);
    void this.router.navigate(['/auth/login']);
  }
}
