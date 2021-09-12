import { Component, OnInit } from '@angular/core';
import { PREGUNTAS } from './preguntas';

@Component({
	selector: 'app-concurso',
	templateUrl: './concurso.component.html',
	styleUrls: ['./concurso.component.scss']
})
export class ConcursoComponent implements OnInit {
	pregunta: string = "";
	imagen: string = "";
	categoria: string = "";
	opciones:string[] = [];
	juego:boolean = true;
	corr: string = "";
	nivel: string = "";
	dificultad: string[] = ["Facil", "Normal", "Dificil", "Dios", "Titán"];
	preguntas: any;
	correctas: number = 0;
	erroneas: number = 0;
	cont: number = 0;;

	constructor() {
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

	siguiente(index){
		this.cont++;
		if(this.corr === index){
			this.correctas++
		} else {
			this.erroneas++
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
