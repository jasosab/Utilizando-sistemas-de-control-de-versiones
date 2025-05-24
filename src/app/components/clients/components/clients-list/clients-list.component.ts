import { Component, OnInit, Input , Output, EventEmitter  } from '@angular/core';
import { ClientService } from 'src/app/components/clients/services/client.service';
import { RequestClient } from  'src/app/models/RequestClient';
import { Client } from  'src/app/models/client.model';


@Component({
  selector: 'app-clients-list',
  templateUrl: './clients-list.component.html',
  styleUrls: ['./clients-list.component.css']
})
export class ClientsListComponent implements OnInit {

  @Input() showTitle: boolean= true;
  @Input() showEditButton: boolean= true;
  @Output() selectClientEvent = new EventEmitter<number>();

  title="Clientes"
  clients: Client[] = [];
  currentClient;
  currentIndex = -1;
  identification = '';
  constructor(private clienteService: ClientService) {

    this.retrieveClients();
   }
  ngOnInit(): void {
    this.retrieveClients();
  }
  retrieveClients(): void {
    this.clienteService.getAll()
      .subscribe(
        data => {
          this.clients = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }
  refreshList(): void {
    this.retrieveClients();
    this.currentClient= new RequestClient();
    this.currentIndex = -1;
  }
  setActiveClient(client: Client, index: number): void {
    this.currentClient = client;
    this.currentIndex = index;
    // console.log(client);
    // console.log(index);
    // console.log(client.clienteId);
    this.selectClientEvent.emit(client.clienteId);
  }
  removeAllClients(): void {
    this.clienteService.deleteAll()
      .subscribe(
        response => {
          console.log(response);
          this.retrieveClients();
        },
        error => {
          console.log(error);
        });
  }
  searchIdentification(): void {
    if(this.identification==null){
      this.identification='';
    }
    this.clienteService.findByIdentification(this.identification)
      .subscribe(
        data => {
          this.clients = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }
}
