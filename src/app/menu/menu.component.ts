import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
	selector: 'app-menu',
	templateUrl: './menu.component.html',
	styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
	usuario = null;

	constructor(
		private dataService: DataService
	) { }

	ngOnInit() {
		this.usuario = this.dataService.getData();
	}
}
