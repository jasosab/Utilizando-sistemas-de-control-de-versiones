import { Component, OnInit } from '@angular/core';
import { MovimientosService } from '../../../movimientos/services/movimientos.service';
import { Cuenta } from  'src/app/models/cuenta.model';
import { Movimiento } from 'src/app/models/movimiento.model';

@Component({
  selector: 'app-movimientos-list',
  templateUrl: './movimientos-list.component.html',
  styleUrls: ['./movimientos-list.component.css']
})
export class MovimientosListComponent implements OnInit {

title="Movimientos";

movimientos: Movimiento[] = [];
currentMovimiento;
currentIndex = -1;
numeroCuenta = '';
issuer: '$JAVA_HOME';


constructor(private movimientoService: MovimientosService) {
  
  this.retrieveMovimientos();
 }
ngOnInit(): void {
  this.retrieveMovimientos();
}
retrieveMovimientos(): void {
  this.movimientoService.getAll()
    .subscribe(
      data => {
        this.movimientos = data;
        console.log(data);
      },
      error => {
        console.log(error);
      });
}
refreshList(): void {
  this.retrieveMovimientos();
  this.currentMovimiento= new Movimiento();
  this.currentIndex = -1;
}
setActiveMovimiento(movimiento: Movimiento, index: number): void {
  this.currentMovimiento = movimiento;
  this.currentIndex = index;
  // console.log(movimiento);
  // console.log(index);
  // console.log(movimiento.movimientoeId);
}
removeAllMovimientos(): void {
  this.movimientoService.deleteAll()
    .subscribe(
      response => {
        console.log(response);
        this.retrieveMovimientos();
      },
      error => {
        console.log(error);
      });
}

buscarPorNumeroCuenta(): void {
  if(this.numeroCuenta==null){  
    this.numeroCuenta='';
  }
  this.movimientoService.findByNumeroCuenta(this.numeroCuenta)
    .subscribe(
      data => {
        this.movimientos = data;
        console.log(data);
      },
      error => {
        console.log(error);
      });
}

}