import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Movimiento } from 'src/app/models/movimiento.model';
import { MovimientosService } from '../../services/movimientos.service';
import * as moment from 'moment';


@Component({
  selector: 'app-add-movimiento',
  templateUrl: './add-movimiento.component.html',
  styleUrls: ['./add-movimiento.component.css']
})
export class AddMovimientoComponent implements OnInit {

  
fechaModelo = moment();  
title="Movimiento";
subTitle="Movimiento Datos";
form: FormGroup = new FormGroup({})
isCheck: any;

constructor(private movimientoService: MovimientosService, private fb: FormBuilder) { }
  
  movimiento = new Movimiento();
  submitted = false;

  ngOnInit(): void {
    this.form = this.fb.group({
      fecha: ['', [Validators.required]],
      valor: ['', [Validators.required]],
      cuentaId: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
    })
    this.form.controls.fecha.setValue(this.fechaModelo.format("YYYY-MM-DD HH:mm:ss"));
  }
  saveMovimiento(): void {
    const result = this.form.value;
    result.fecha=this.fechaModelo.format("YYYY-MM-DD HH:mm:ss"); 
    console.log(result);
    this.movimientoService.create(result)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
          console.log(this.submitted);
        },
        error => {
          console.log(error);
        });
  }


  nameChanged(arg) {
    console.log("modelchanged " + arg);
    this.form.controls.fecha.setValue(arg);
  }


  newMovimiento(): void {
    this.submitted = false;
    this.movimiento = new Movimiento();
  }

  setActiveCuenta(cuentaId2: number): void {
    this.form.controls.cuentaId.setValue(cuentaId2);
  }

}
