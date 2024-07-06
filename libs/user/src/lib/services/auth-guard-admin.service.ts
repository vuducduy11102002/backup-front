import { Injectable, inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { LocalstorageService } from './localstorage.service';

@Injectable({
  providedIn: 'root',
})
class PermissionsService {
  constructor(
    private router: Router,
    private localStorageToken: LocalstorageService
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    //logic
    //   const token = this.localStorageToken.getTokenAndRole();

    //   if (token && token.token && token.role) {
    //     // Kiểm tra xem vai trò có phải là 'admin' không
    //     if (token.role === 'admin') {
    //       return true;
    //     }
    //   }

    //   this.router.navigate(['/login']);
    //   return false;
    // }
    const requiredRole = next.data['requiredRole']; // Lấy role yêu cầu từ route data

    const token = this.localStorageToken.getTokenAndRole();

    if (token && token.role === 'admin') {
      const decodedToken = this.decodeToken(token.token);

      // Kiểm tra xem vai trò trong token có phù hợp với yêu cầu không
      if (
        this.checkRole(decodedToken.role, requiredRole) &&
        !this._tokenExpired(decodedToken.exp)
      ) {
        console.log(decodedToken);
        return true;
      } else {
        // Vai trò không phù hợp, xử lý tùy thuộc vào yêu cầu của bạn
        this.router.navigate(['/login']);
        return false;
      }
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }

  private _tokenExpired(expiration: number): boolean {
    return Math.floor(new Date().getTime() / 1000) >= expiration;
  }

  private checkRole(userRole: string, requiredRole: string): boolean {
    // Kiểm tra xem vai trò người dùng có phù hợp với yêu cầu không
    return userRole === requiredRole;
  }

  private decodeToken(token: string): any {
    // Split the token into header, payload, and signature
    const [header, payload, signature] = token.split('.');

    // Decode each part using base64 decoding
    const decodedHeader = this.decodeBase64(header);
    const decodedPayload = this.decodeBase64(payload);

    // Parse the decoded payload as JSON
    return JSON.parse(decodedPayload);
  }

  private decodeBase64(str: string): string {
    // Use atob to decode base64
    return decodeURIComponent(
      atob(str)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );
  }
}

export const AuthGuardAdmin: CanActivateFn = (
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): boolean => {
  return inject(PermissionsService).canActivate(next, state);
};
