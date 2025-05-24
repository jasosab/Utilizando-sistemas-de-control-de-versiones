import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Movimiento } from 'src/app/models/movimiento.model';
import { MovimientosService } from '../../../movimientos/services/movimientos.service';

@Component({
  selector: 'app-movimientos-details',
  templateUrl: './movimientos-details.component.html',
  styleUrls: ['./movimientos-details.component.css']
})
export class MovimientosDetailsComponent implements OnInit {

  currentMovimiento= new Movimiento();
  message = '';
  movimientoId='';
  form: FormGroup = new FormGroup({})
  constructor(
    private movimientoService: MovimientosService,
    private route: ActivatedRoute,
    private router: Router, private fb: FormBuilder) { }
  ngOnInit(): void {

    this.form = this.fb.group({
      fecha: ['', [Validators.required]],
      valor: ['', [Validators.required]],
      saldo: ['', [Validators.required]],
      tipo: ['', [Validators.required]]
    })
    this.message = '';
    this.getMovimiento(this.route.snapshot.paramMap.get('id'));
  }

  getMovimiento(id: string | null): void {
    this.movimientoService.get(id)
      .subscribe(
        data => {
            this.currentMovimiento = data;
            console.log(data);
            this.movimientoId=data.movimientoId;
            this.form.controls.fecha.setValue(data.fecha);
            this.form.controls.saldo.setValue(data.saldo);
            this.form.controls.valor.setValue(data.valor);
            this.form.controls.tipo.setValue(data.tipo);
        },
        error => {
          console.log(error);
        });
  }

  updateMovimiento(): void {
   this.currentMovimiento= this.form.value;
   this.currentMovimiento.movimientoId= this.movimientoId;
    console.log(this.currentMovimiento);
    this.movimientoService.update(this.currentMovimiento.movimientoId, this.currentMovimiento)
      .subscribe(
        response => {
          console.log("CONSOLA RESPONSE");
          console.log(response);
          
          this.message = 'The movimiento was updated successfully!';
        },
        error => {
          console.log(error);
        });
  }

  
  deleteMovimiento(): void {
    this.movimientoService.delete(this.currentMovimiento.movimientoId)
      .subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/movimientos']);
        },
        error => {
          console.log(error);
        });
  }
}
