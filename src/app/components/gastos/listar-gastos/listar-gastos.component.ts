import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PresupuestoService } from 'src/app/services/presupuesto.service';

@Component({
  selector: 'app-listar-gastos',
  templateUrl: './listar-gastos.component.html',
  styleUrls: ['./listar-gastos.component.css']
})
export class ListarGastosComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  presupuesto: number;
  restante: number;
  listGastos: any[] = [];

  constructor(private _presupuestoServices: PresupuestoService) {
    this.presupuesto = 0;
    this.restante = 0;
    this.subscription = this._presupuestoServices.getGastos().subscribe(data => { this.restante = this.restante - data.cantidad; this.listGastos.push(data); });
  }

  ngOnInit(): void {
    this.presupuesto = this._presupuestoServices.presupuesto;
    this.restante = this._presupuestoServices.restante;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  aplicarColorRestante(){

    if(this.presupuesto / 4 > this.restante){
      return 'alert alert-danger';

    }else if(this.presupuesto / 2 > this.restante){
      return 'alert alert-warning';
    }else{
      return 'alert alert-secondary';
    }
      
    
  }
}
