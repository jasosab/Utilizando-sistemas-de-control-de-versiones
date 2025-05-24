import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/components/clients/services/client.service';
import { RequestClient } from 'src/app/models/RequestClient';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {
  // client = {
  //   title: '',
  //   description: '',
  //   published: false
  // };
  password: string;
  estado='INACTIVO';
  nombre: string;
  genero: string;
  identificacion: string;
  direccion: string;
  telefono: string;
  email: string;
  apellido: string;

  client = new RequestClient();
  submitted = false;
  constructor(private clientService: ClientService) { }
  ngOnInit(): void {
    this.password = "";

  }
  saveClient(): void {



    console.log(this.nombre);

    if (this.nombre === undefined) {
      alert("Ingrese nombre");
      return;
    }


    if (this.identificacion === undefined) {
      alert("Ingrese identificacion");
      return;
    }


    if (this.identificacion === undefined) {
      alert("Ingrese identificacion");
      return;
    }

    const data = {
      edad: 20,
      password: this.password,
      estado: this.estado,
      nombre: this.nombre,
      apellido: this.apellido,
      genero: this.genero,
      identificacion: this.identificacion,
      direccion: this.direccion,
      telefono: this.telefono,
      email: this.email
    };

    this.clientService.create(data)
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
  //   this.clientService.update(this.currentClient.id, data)
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


  newClient(): void {
    this.submitted = false;
    this.client = new RequestClient();
  }
}
