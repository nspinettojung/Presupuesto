import { Component } from '@angular/core';
import { PresupuestoService } from 'src/app/services/presupuesto.service';

@Component({
  selector: 'app-ingresar-gastos',
  templateUrl: './ingresar-gastos.component.html',
  styleUrls: ['./ingresar-gastos.component.css']
})
export class IngresarGastosComponent {
  nombreGasto: string;
  cantidad: number;
  formularioIncorrecto: boolean;
  textIncorrecto: string;

  constructor(private _presupuestoServices: PresupuestoService) {
    this.nombreGasto = '';
    this.cantidad = 0;
    this.formularioIncorrecto = false;
    this.textIncorrecto = '';
  }

  ngOnInit(): void{

  }
  agregarGasto(){
if(this.cantidad > this._presupuestoServices.restante){
  this.formularioIncorrecto = true;
  this.textIncorrecto = 'Cantidad ingresada mayor al restante';
  return;
}

if(this.nombreGasto === '' || this.cantidad <= 0){
  this.formularioIncorrecto = true;
  this.textIncorrecto = 'Nombre gasto o cantidad incorrecto';
}else{
 const GASTO = {
  nombre: this.nombreGasto,
  cantidad: this.cantidad
 }

 this._presupuestoServices.agregarGasto(GASTO);

  this.formularioIncorrecto = false;
  this.cantidad = 0;
  this.nombreGasto = '';
}

  }
}
