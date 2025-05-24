import { Component, OnInit } from '@angular/core';
import { MovimientosService } from '../../../movimientos/services/movimientos.service';
import { Cuenta } from 'src/app/models/cuenta.model';
import { Movimiento } from 'src/app/models/movimiento.model';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-movimientos-report',
  templateUrl: './movimientos-report.component.html',
  styleUrls: ['./movimientos-report.component.css'],
})
export class MovimientosReportComponent implements OnInit {
  title = 'Reporte Movimientos';

  movimientos: Movimiento[] = [];
  numeroCuenta = '';
  idCliente = 58;
  issuer: '$JAVA_HOME';
  form: FormGroup = new FormGroup({});

  constructor(
    private movimientoService: MovimientosService,
    private fb: FormBuilder
  ) {}
  ngOnInit(): void {}

  retrieveMovimientos(): void {
    this.movimientoService.getAll().subscribe(
      (data) => {
        this.movimientos = data;
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  refreshList(): void {
    this.retrieveMovimientos();
  }

  buscarPorNumeroCuenta(): void {
    if (this.numeroCuenta == null) {
      this.numeroCuenta = '';
    }
    this.movimientoService.findByNumeroCuenta(this.numeroCuenta).subscribe(
      (data) => {
        this.movimientos = data;
        if (!this.movimientos || this.movimientos.length === 0) {
          console.log(
            'No se encontraron movimientos para el número de cuenta ingresado.'
          );
        } else {
          console.log(data);
        }
      },
      (error) => {
        this.movimientos = [];
        console.log(error);
      }
    );
  }
}
