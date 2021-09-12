import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
	providedIn: 'root'
})
export class DataService {

	constructor(
		private router: Router,
	) { }

	private data;

	setData(data) {
		localStorage.setItem('concursante',JSON.stringify(data));
	}

	addValue(param) {
		this.data = JSON.parse(localStorage.getItem('concursante'));
		switch (param) {
			case 'correctas':
				this.data.correctas++;
				this.setData(this.data);
				break;
			case 'erroneas':
				this.data.erroneas++;
				this.setData(this.data);
				break;
			case 'puntos':
				this.data.puntos++;
				this.setData(this.data);
				break;
		}
	}

	getData() {
		let temp = JSON.parse(localStorage.getItem('concursante'));
		this.clearData();
		return temp;
	}

	clearData() {
		this.data = undefined;
	}
}
