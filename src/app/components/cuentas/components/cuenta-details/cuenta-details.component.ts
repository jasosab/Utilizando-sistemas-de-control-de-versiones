import { Component, OnInit } from '@angular/core';
import { Cuenta } from 'src/app/models/cuenta.model';
import { CuentasService } from 'src/app/components/cuentas/services/cuentas.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cuenta-details',
  templateUrl: './cuenta-details.component.html',
  styleUrls: ['./cuenta-details.component.css']
})
export class CuentaDetailsComponent implements OnInit {

  currentCuenta= new Cuenta();
  message = '';
  cuentaId=0;
  form: FormGroup = new FormGroup({})
  constructor(
    private cuentaService: CuentasService,
    private route: ActivatedRoute,
    private router: Router, private fb: FormBuilder) { }
  ngOnInit(): void {

    this.form = this.fb.group({
      // clienteId: ['', [Validators.required, Validators.email]],
      cliente: ['', [Validators.required]],
      estado: ['', [Validators.required]],
      saldoInicial: ['', [Validators.required]],
      tipoCuenta: ['', [Validators.required]],
      numeroCuenta: ['', [Validators.required]],
    })
    this.message = '';
    this.getCuenta(this.route.snapshot.paramMap.get('id'));

  }

  getCuenta(id: string | null): void {
    this.cuentaService.get(id)
      .subscribe(
        data => {
            this.currentCuenta = data;
            console.log(data);
            this.cuentaId=data.cuentaId;
            this.form.controls.cliente.setValue(data.cliente);
            this.form.controls.estado.setValue(data.estado);
            this.form.controls.saldoInicial.setValue(data.saldoInicial);
            this.form.controls.tipoCuenta.setValue(data.tipoCuenta);
            this.form.controls.numeroCuenta.setValue(data.numeroCuenta);
        },
        error => {
          console.log(error);
        });
  }

  updateCuenta(): void {
   this.currentCuenta= this.form.value;
   this.currentCuenta.cuentaId= this.cuentaId;
    console.log(this.currentCuenta);
    this.cuentaService.update(this.currentCuenta.cuentaId, this.currentCuenta)
      .subscribe(
        response => {
          console.log("CONSOLA RESPONSE");
          console.log(response);
          
          this.message = 'The cuenta was updated successfully!';
        },
        error => {
          console.log(error);
        });
  }

  
  deleteCuenta(): void {
    this.cuentaService.delete(this.currentCuenta.cuentaId)
      .subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/cuentas']);
        },
        error => {
          console.log(error);
        });
  }
}
