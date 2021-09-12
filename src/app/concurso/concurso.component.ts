
import { Component, OnInit } from '@angular/core';
import { PREGUNTAS } from './preguntas';
import { DataService } from '../services/data.service';
import { usuario } from '../models/usuario';
import { pregunta } from '../models/pregunta';

@Component({
	selector: 'app-concurso',
	templateUrl: './concurso.component.html',
	styleUrls: ['./concurso.component.scss']
})
export class ConcursoComponent implements OnInit {
	logueado: boolean = false;
	usuario: usuario = null;
	pregObj: pregunta = {
		id: 0,
		pregunta: "",
		respuesta: "",
		opciones: [],
		categoria: "",
		nivel: "",
		imagen: ""
	};
	segundo: number = 60;
	porcentaje: number = 0;
	perdida: boolean = false;
	terminado: boolean = false;
	imagen: string = "";
	categoria: string = "";
	opciones: string[] = [];
	juego: boolean = true;
	gemas: number = 0;
	corr: string = "";
	dificultad: string[] = ["Facil", "Normal", "Dificil", "Dios", "Titán"];
	preguntas: any;
	cont: number = 0;
	historico: usuario = null;

	constructor(
		private dataService: DataService
	) {
	}

	empezarJuego() {
		this.juego = false;
		this.porcentaje = 100;
		let preg = Math.trunc(Math.random() * 5);
		this.filtro(this.dificultad[this.cont]);
		this.preguntaRandom(this.filtradas[preg]);
		this.barraTiempo();
	}

	preguntaRandom(item) {
		this.pregObj = item;
		this.corr = item.opciones.indexOf(this.pregObj.respuesta);
	}

	barraTiempo() {
		setInterval(() => {
			if (this.segundo == 0) {
				clearInterval(this.segundo);
				this.cont = 0;
				this.clean();
				this.perdida = true;
				this.terminado = true;
				this.cont = 0;
				this.juego = true;
				this.historico = this.dataService.getData();
			} else if (this.terminado == true) {
				clearInterval(this.segundo);
			} else {
				this.segundo--;
				this.porcentaje = (100 * this.segundo) / 60;
			}
		}, 1000);
	}

	filtradas: any[] = []
	filtro(niv: string): any {
		this.preguntas = PREGUNTAS;
		this.filtradas = this.preguntas.filter((els) => {
			return els.nivel.indexOf(niv) !== -1;
		});
	}

	clean() {
		this.imagen = "";
		this.pregObj = null;
		this.opciones = [];
		this.categoria = "";
	}

	reiniciar() {
		this.terminado = false;
		this.cont = 0;
		this.gemas = 0;
		this.perdida = false;
		window.location.reload();
	}

	siguiente(index) {
		this.cont++;
		this.clean();
		if (this.corr === index) {
			this.gemas++;
			this.dataService.addValue("correctas");
			this.dataService.addValue("puntos");
		} else {
			this.dataService.addValue("erroneas");
		}
		if (this.cont == 5) {
			this.cont = 0;
			this.juego = true;
			this.terminado = true;
			this.historico = this.dataService.getData();
		}
		let preg = Math.trunc(Math.random() * 5);
		this.filtro(this.dificultad[this.cont]);
		this.preguntaRandom(this.filtradas[preg]);
	}

	ngOnInit() {
		if (this.dataService.getData() !== null) {
			this.logueado = true;
		} else {
			this.logueado = false;
		}
	}

}
