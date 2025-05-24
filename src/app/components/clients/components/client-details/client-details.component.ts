import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/components/clients/services/client.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestClient } from  'src/app/models/RequestClient';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent implements OnInit {

  currentClient= {
    id:0,
    persona: {
      edad: 0,
      email: "",
      direccion: "",
      genero: "",
      identificacion: "",
      nombre: "",
      telefono: "",
      apellido: "",
    },
    estado: "",
    password: "",
  };

  message = '';

  constructor(
    private clientService: ClientService,
    private route: ActivatedRoute,
    private router: Router) { }
  ngOnInit(): void {
    this.message = '';
    this.getClient(this.route.snapshot.paramMap.get('id'));
  }

  getClient(id: string | null): void {
    this.clientService.get(id)
      .subscribe(
        data => {
          this.currentClient = data;
          console.log("editar lo siguiente");
          console.log(data);

        },
        error => {
          console.log(error);
        });
  }

  updateClient(): void {
    console.log(this.currentClient);
    this.clientService.update(this.currentClient.id, this.currentClient)
      .subscribe(
        response => {
          console.log("CONSOLA RESPONSE");
          console.log(response);

          this.message = 'The client was updated successfully!';
        },
        error => {
          console.log(error);
        });
  }


  deleteClient(): void {
    this.clientService.delete(this.currentClient.id)
      .subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/clients']);
        },
        error => {
          console.log(error);
        });
  }

  updateEstado(status: any): void {
    if (status) {
      this.currentClient.estado = 'ACTIVO';
    } else {
      this.currentClient.estado = 'INACTIVO';
    }


  }
}
