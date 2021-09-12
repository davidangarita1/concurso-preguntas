import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { PREGUNTAS } from './preguntas';
import { DataService } from '../services/data.service';
import { usuario } from '../models/usuario';

@Component({
	selector: 'app-concurso',
	templateUrl: './concurso.component.html',
	styleUrls: ['./concurso.component.scss']
})
export class ConcursoComponent implements OnInit {
	usuario: usuario = null;
	pregunta: string = "";
	imagen: string = "";
	categoria: string = "";
	opciones:string[] = [];
	juego:boolean = true;
	corr: string = "";
	nivel: string = "";
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
		this.corr = item.opciones.indexOf(item.respuesta);
		this.pregunta = item.pregunta;
		this.imagen = item.imagen;
		this.opciones = item.opciones;
		this.categoria = item.categoria;
		this.nivel = item.nivel;
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
		this.pregunta = "";
		this.opciones = [];
		this.categoria = "";
	}

	siguiente(index){
		this.cont++;
		this.clean();
		if(this.corr === index){
			this.dataService.addValue("correctas");
			this.dataService.addValue("puntos");
		} else {
			this.dataService.addValue("erroneas");
		}
		if(this.cont == 5) {
			this.cont = 0;
			this.juego = true;
		}
		let preg = Math.trunc(Math.random() * 5);
		this.filtro(this.dificultad[this.cont]);
		this.preguntaRandom(this.filtradas[preg]);
	}

	ngOnInit() {
	}

}
