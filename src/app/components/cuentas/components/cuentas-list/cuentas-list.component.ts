import { Component, OnInit, Input , Output, EventEmitter  } from '@angular/core';
import { Cuenta } from  'src/app/models/cuenta.model';
import { CuentasService } from '../../services/cuentas.service';

@Component({
  selector: 'app-cuentas-list',
  templateUrl: './cuentas-list.component.html',
  styleUrls: ['./cuentas-list.component.css']
})
export class CuentasListComponent implements OnInit {

  @Input() showTitle: boolean= true;
  @Input() showEditButton: boolean= true;
  @Output() selectCuentaEvent = new EventEmitter<number>();

  cuentas: Cuenta[] = [];

  currentCuenta;
  
  currentIndex = -1;
  numeroCuenta = '';
  constructor(private cuentaService: CuentasService) {

    this.retrieveElementsList();
   }

  ngOnInit(): void {
    this.retrieveElementsList();
  }
  retrieveElementsList(): void {
    this.cuentaService.getAll()
      .subscribe(
        data => {
          this.cuentas = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }


  refreshList(): void {
    this.retrieveElementsList();
    this.currentCuenta= new Cuenta();
    this.currentIndex = -1;
  }

  
  setActiveCuenta(cuenta: Cuenta, index: number): void {
    this.currentCuenta = cuenta;
    this.currentIndex = index;
    this.selectCuentaEvent.emit(cuenta.cuentaId);
    
  }
  removeAllCuentas(): void {
    this.cuentaService.deleteAll()
      .subscribe(
        response => {
          console.log(response);
          this.retrieveElementsList();
        },
        error => {
          console.log(error);
        });
  }
  searchByNumeroCuenta(): void {
    this.cuentaService.searchByNumeroCuenta(this.numeroCuenta)
      .subscribe(
        data => {
          this.cuentas = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }
}
