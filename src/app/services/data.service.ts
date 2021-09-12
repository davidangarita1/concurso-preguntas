import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { usuario } from '../models/usuario';

@Injectable({
	providedIn: 'root'
})
export class DataService {

	constructor(
		private router: Router,
	) { }

	private data: usuario = {
		nombre: 'Antonio',
		correctas: 0,
		erroneas: 0,
		puntos: 0
	};

	setData(data) {
		this.data = data;
	}

	addValue(param) {
		switch (param) {
			case 'correctas':
				this.data.correctas++;
				break;
			case 'erroneas':
				this.data.erroneas++;
				break;
			case 'puntos':
				this.data.puntos++;
				break;
		}
	}

	getData() {
		let temp = this.data;
		//this.clearData();
		return temp;
	}

	clearData() {
		this.data = undefined;
	}
}
