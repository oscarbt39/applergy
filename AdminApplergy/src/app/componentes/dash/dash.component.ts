import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FirestoreService } from '../../services/productservice';
import { User } from '../../model/User';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Dialog } from '@angular/cdk/dialog';
import { BehaviorSubject, combineLatest, map, Observable, scan } from 'rxjs';
import { Product } from '../../model/Product';
import {MatTabsModule} from '@angular/material/tabs'; 
import { UserService } from '../../services/user.service.';
import { AllergyService } from '../../services/allergyservice';
import { Allergy } from '../../model/Allergy';

@Component({
  selector: 'app-dash',
  standalone: true,
  imports: [RouterModule, CommonModule, ReactiveFormsModule, FormsModule, MatTabsModule],
  templateUrl: './dash.component.html',
  styleUrl: './dash.component.css'
})
export class DashComponent {


  stocks$: Observable<any[]>;
  sortedColumn$ = new BehaviorSubject<string>('');

  sortDirection$ = this.sortedColumn$.pipe(
    scan<string, { col: string, dir: string }>((sort, val) => {
      return sort.col === val
        ? { col: val, dir: sort.dir === 'desc' ? 'asc' : 'desc' }
        : { col: val, dir: 'desc' }
    }, { dir: 'desc', col: '' })
  )
  constructor(private dialog: Dialog, private router: Router, private fireProd: FirestoreService, private fireUser: UserService, private fireAler: AllergyService) {
    this.stocks$ = combineLatest(this.fireProd.getAll(), this.sortDirection$).pipe(
      map(([list, sort]) => !sort.col ? list : this.sortByColumn(list, sort.col, sort.dir))
    );
  }



  prods: Product[] = []
  users: User[] = []
  alergies: Allergy[] = []

  infoProd = new FormGroup({
    fullNom: new FormControl(''),
    imagen: new FormControl(''),
    descripcion: new FormControl(''),
    stock: new FormControl(''),
    precio: new FormControl(''),
    ingredientes: new FormControl('')
  });

  infoAler = new FormGroup({
    nom: new FormControl(''),
    descripcion: new FormControl(''),
    detonantes: new FormControl('')
  });


  ngOnInit() {
    this.cargarProds()
    this.cargarUsers()
    this.cargarAlergias()
  }

  async cargarProds() {
    this.prods = await this.fireProd.getAll() 
  }

  async cargarUsers() {
    this.users = await this.fireUser.getAll() 
  }

  async cargarAlergias() {
    this.alergies = await this.fireAler.getAll() 
  }



  editarProd(id: number) {
    let newId: string = id+"-"+2
    this.router.navigate(['/editar', newId])
  }

  editarUser(id: number) {
    let newId: string = id+"-"+1
    this.router.navigate(['/editar', newId])
  }

  editarAler(id: number) {
    let newId: string = id+"-"+3
    this.router.navigate(['/editar', newId])
  }

  /**
   * Pide confirmación y de darsela, elimina la cuenta seleccionada
   * @param email, el email de la cuenta a eliminar
   */
  eliminarProd(id: number) {
    Swal.fire({
      title: "Eliminando producto",
      text: "Confirma para eliminar permanentemente el producto",
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      confirmButtonText: "Confirmar",
      background: "#94ef94",
      confirmButtonColor: "#0a7a19",
      cancelButtonColor: "#ff0000",
    }).then((resultado) => {
      if (resultado.isConfirmed) {
        this.fireProd.delete(id)
      }
    })
  }

  eliminarUser(id: number) {
    Swal.fire({
      title: "Eliminando usuario",
      text: "Confirma para eliminar permanentemente el usuario",
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      confirmButtonText: "Confirmar",
      background: "#94ef94",
      confirmButtonColor: "#0a7a19",
      cancelButtonColor: "#ff0000",
    }).then((resultado) => {
      if (resultado.isConfirmed) {
        this.fireUser.delete(id)
      }
    })
  }

  eliminarAler(id: number) {
    Swal.fire({
      title: "Eliminando alergia",
      text: "Confirma para eliminar permanentemente la alergia",
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      confirmButtonText: "Confirmar",
      background: "#94ef94",
      confirmButtonColor: "#0a7a19",
      cancelButtonColor: "#ff0000",
    }).then((resultado) => {
      if (resultado.isConfirmed) {
        this.fireAler.delete(id)
      }
    })
  }

  /**
   * Verifica la integridad de los datos y en caso de ser 
   * correcto los envía para su registro persistente
   */
  enviarProd(): void {
  
    const prodData = this.infoProd.getRawValue()

    if ((prodData.imagen as string == "" || prodData.imagen as string == null) || 
      (prodData.fullNom as string  == "" || prodData.fullNom as string  == null) || 
      (prodData.descripcion as string == "" || prodData.descripcion as string == null) ||
      (prodData.stock as unknown as number == null) || 
      (prodData.precio as unknown as number == null) ||
      (prodData.ingredientes as string == "" || prodData.ingredientes as string == null)) {
        Swal.fire({
          title: "Incompleto",
          text: "Todos los campos deben estar llenos",
          icon: 'error',
          confirmButtonText: "Confirmar",
          background: "#94ef94",
          confirmButtonColor: "#0a7a19",
        })
      } else {
    
      let prod = new Product(0, prodData.imagen as string, 
        prodData.fullNom as string, 
        prodData.descripcion as string, 
        prodData.stock as unknown as number, 
        prodData.precio as unknown as number,
        prodData.ingredientes as string)

      this.fireProd.insert(prod)
      this.limpiarForm()
      this.dialog.closeAll()
      }
  }

  enviarAler(): void {
  
    const prodData = this.infoAler.getRawValue()
    
      let aler = new Allergy(0, prodData.nom as string, 
        prodData.descripcion as string, 
        prodData.detonantes as string
      )

      this.fireAler.insert(aler)
      this.limpiarFormAler()
      this.dialog.closeAll()
  }

  
  limpiarForm() {
      this.infoProd.setValue({
        imagen: "", 
        fullNom: "", 
        descripcion: "", 
        stock: "", 
        precio: "",
        ingredientes: ""
      })
  }
  
  limpiarFormAler() {
    this.infoAler.setValue({
      nom: "",
      descripcion: "", 
      detonantes: ""
    })
}

  // Modal nuevo usuario
  nuevoDialog(template: any) {
    let dialog = this.dialog.open(template, {
      width: "250px",
      disableClose: true,
      closeOnDestroy: false
    })
  }


  /**
   * Crea una lista ordenada por el campo seleccionado y ka reasigna en orden a users
   */
  sortOn(column: string) {
    this.sortedColumn$.next(column);
    this.prods = []
    this.stocks$.forEach((s) => s.forEach((sj) => this.prods.push(sj)))
  }

  /**
   * Recoge el input por cada pulsacion y comparar con los valores 
   * de los usuarios registrados transformados a mayusculas,
   * si algun campo coincide los muestra
   * @param event 
   */
  async filtroProd(event: any) {
    let clave: string = event.target.value
    if (clave != null && clave.length != 0) {
      let newProds: Product[] = []
      this.prods.forEach((prod) => {
        if (prod.getNom().toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").startsWith(clave.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""))) {
         newProds.push(prod)
        }
      })
      this.prods = newProds
    } else {
      this.prods = await this.fireProd.getAll()
    }
  }

  async filtroUser(event: any) {
    let clave: string = event.target.value
    if (clave != null && clave.length != 0) {
      let newUsers: User[] = []
      this.users.forEach((user) => {
        if (user.getEmail().toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").startsWith(clave.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""))) {
          newUsers.push(user)
        }
      })
      this.users = newUsers
    } else {
      this.users = await this.fireUser.getAll()
    }
  }

  async filtroAler(event: any) {
    let clave: string = event.target.value
    if (clave != null && clave.length != 0) {
      let newAler: Allergy[] = []
      this.alergies.forEach((aler) => {
        if (aler.getNom().toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").startsWith(clave.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""))) {
          newAler.push(aler)
        }
      })
      this.alergies = newAler
    } else {
      this.alergies = await this.fireAler.getAll()
    }
  }

  /**
   * Ordena la lista de usuarios partiendo de un campo de una columna
   * @param list la estructura de datos que almacena los usuarios
   * @param column la columna por la que ordenar
   * @param direction el orden (ascendente, descendente)
   * @returns 
   */
  sortByColumn(list: any[] | undefined, column: string, direction = 'desc'): any[] {
    let sortedArray = (list || []).sort((a, b) => {
      if (a[column] > b[column]) {
        return (direction === 'desc') ? 1 : -1;
      }
      if (a[column] < b[column]) {
        return (direction === 'desc') ? -1 : 1;
      }
      return 0;
    })
    return sortedArray;
  }

  cerrar() {
    this.dialog.closeAll()
  }


}
