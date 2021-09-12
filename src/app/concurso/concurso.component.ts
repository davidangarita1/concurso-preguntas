import { Router } from '@angular/router';
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
	terminado: boolean = false;
	imagen: string = "";
	categoria: string = "";
	opciones:string[] = [];
	juego:boolean = true;
	gemas: number = 0;
	corr: string = "";
	dificultad: string[] = ["Facil", "Normal", "Dificil", "Dios", "Titán"];
	preguntas: any;
	cont: number = 0;

	constructor(
		private dataService:DataService
	) {
	}

	empezarJuego(){
		this.juego = false;
		let preg = Math.trunc(Math.random() * 5);
		this.filtro(this.dificultad[this.cont]);
		this.preguntaRandom(this.filtradas[preg]);
	}

	preguntaRandom(item) {
		this.pregObj = item;
		this.corr = item.opciones.indexOf(this.pregObj.respuesta);
	}

	filtradas: any[] = []
	filtro(niv: string): any {
		this.preguntas = PREGUNTAS;
		this.filtradas = this.preguntas.filter((els) => {
			return els.nivel.indexOf(niv) !== -1;
		});
	}

	clean(){
		this.imagen = "";
		this.pregObj = null;
		this.opciones = [];
		this.categoria = "";
	}

	reiniciar(){
		this.terminado = false;
		this.cont = 0;
		this.gemas = 0;
	}

	siguiente(index){
		this.cont++;
		this.clean();
		if(this.corr === index){
			this.gemas++;
			this.dataService.addValue("correctas");
			this.dataService.addValue("puntos");
		} else {
			this.dataService.addValue("erroneas");
		}
		if(this.cont == 5) {
			this.cont = 0;
			this.juego = true;
			this.terminado = true;
		}
		let preg = Math.trunc(Math.random() * 5);
		this.filtro(this.dificultad[this.cont]);
		this.preguntaRandom(this.filtradas[preg]);
	}

	ngOnInit() {
	}

}
