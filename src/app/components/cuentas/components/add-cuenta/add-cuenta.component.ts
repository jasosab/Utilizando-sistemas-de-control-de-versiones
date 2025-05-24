import { Component, OnInit } from '@angular/core';
import { CuentasService } from 'src/app/components/cuentas/services/cuentas.service';
import { Cuenta } from 'src/app/models/cuenta.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';




@Component({
  selector: 'app-add-cuenta',
  templateUrl: './add-cuenta.component.html',
  styleUrls: ['./add-cuenta.component.css']
})
export class AddCuentaComponent implements OnInit {


  
title="Cuenta";
subTitle="Cuenta Datos";
form: FormGroup = new FormGroup({})
isCheck: any;

constructor(private cuentaService: CuentasService, private fb: FormBuilder) { }
  password: string;
  estado='INACTIVO';
  nombre: string;
  genero: string;
  identificacion: string;
  direccion: string;
  telefono: string;
  email: string;
  apellido: string;

  cuenta = new Cuenta();
  submitted = false;
  
  ngOnInit(): void {
    this.password = "";
    this.form = this.fb.group({
      // clienteId: ['', [Validators.required, Validators.email]],
      clienteId: ['', [Validators.required]],
      estado: ['', [Validators.required]],
      saldoInicial: ['', [Validators.required]],
      tipoCuenta: ['', [Validators.required]], 
      numeroCuenta: ['', [Validators.required]],
    })
  }
  saveCuenta(): void {
    const result = this.form.value;
    this.cuentaService.create(result)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
        },
        error => {
          console.log(error);
        });
  }

  // updatePublished(status: any): void {
  //   const data = {
  //     title: this.currentClient.title,
  //     description: this.currentClient.description,
  //     published: status
  //   };
  //   this.cuentaService.update(this.currentClient.id, data)
  //     .subscribe(
  //       response => {
  //         this.currentClient.published = status;
  //         console.log(response);
  //       },
  //       error => {
  //         console.log(error);
  //       });
  // }


  updateEstado(status: any): void {
    if (status) {
      this.estado = 'ACTIVO';
    } else {
      this.estado = 'INACTIVO';
    }
  }


  newCuenta(): void {
    this.submitted = false;
    this.cuenta = new Cuenta();
  }

  setActiveClient(clientId2: number): void {
    this.form.controls.clienteId.setValue(clientId2);
  }

}
