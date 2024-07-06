import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalstorageService {
  static TOKEN = 'jwtToken';
  static ROLE = 'role';

  setTokenAndRole(data: { token: string; role: string }) {
    localStorage.setItem(LocalstorageService.TOKEN, data.token);
    localStorage.setItem(LocalstorageService.ROLE, data.role);
  }

  getTokenAndRole(): { token: string; role: string } {
    return {
      token: localStorage.getItem(LocalstorageService.TOKEN) || '',
      role: localStorage.getItem(LocalstorageService.ROLE) || '',
    };
  }

  RemoveToken() {
    localStorage.removeItem(LocalstorageService.TOKEN);
    localStorage.removeItem(LocalstorageService.ROLE);
  }
}
