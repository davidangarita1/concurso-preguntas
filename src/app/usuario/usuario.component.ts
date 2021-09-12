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
	logueado: boolean = false;

	constructor(
		private dataService: DataService,
		private router: Router
	) { }

	ngOnInit() {
	}

	onSave() {
		let newData = {
			nombre: this.nickname,
			correctas: 0,
			erroneas: 0,
			puntos: 0
		}
		this.dataService.setData(newData);
		window.location.reload();
	}
}
