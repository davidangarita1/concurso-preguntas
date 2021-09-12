import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';
@Component({
	selector: 'app-usuario',
	templateUrl: './usuario.component.html',
	styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent implements OnInit {
	nickname: string;

	constructor(
		private dataService: DataService,
		private router: Router
	) { }

	ngOnInit() {
		if (localStorage.getItem('concursante')) {
			this.router.navigate(['/concurso']);
		}
	}

	onSave() {
		let newData = {
			nombre: this.nickname,
			correctas: 0,
			erroneas: 0,
			puntos: 0
		}
		localStorage.setItem('concursante',JSON.stringify(newData));
	}
}
