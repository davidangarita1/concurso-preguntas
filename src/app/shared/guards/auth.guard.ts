import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { DataService } from '../../services/data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  canActivate(): Observable<boolean> | boolean {
		if (localStorage.getItem('Concursante')) {
			this.router.navigate(['/concurso']);
			return true;
		} else{
			this.router.navigate(['/login']);

		}
		return false;
  }
  constructor(
	  private dataService: DataService,
	  private router: Router
	  ) { }
}
