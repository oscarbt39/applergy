import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../model/User';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Dialog } from '@angular/cdk/dialog';
import { FirestoreService } from '../../services/productservice';
import { UserService } from '../../services/user.service.';
import { AllergyService } from '../../services/allergyservice';
import { Product } from '../../model/Product';
import { Allergy } from '../../model/Allergy';

@Component({
  selector: 'app-editar',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './editar.component.html',
  styleUrl: './editar.component.css'
})
export class EditarComponent {

  usuario: User | undefined
  producto: Product | undefined
  alergia: Allergy | undefined

  constructor(private router: Router, private route: ActivatedRoute, private dialog: Dialog, private fireProd: FirestoreService, private fireUser: UserService, private fireLer: AllergyService) {
    
  }


  param: string = ""
  id: number = 0
  tipo: number = 0
   ngOnInit() {
    this.route.params.subscribe(params => {
      this.param = params['id'];
    });

    this.id = this.param.split("-")[0] as unknown as number
    this.tipo = this.param.split("-")[1] as unknown as number

    
this.gestionarInicio()


    if (this.tipo == 3) {
    alert((this.alergia as Allergy).getNom())
    this.alerForm.setValue({
      fullNom: (this.alergia as Allergy).getNom() as string,
      desc: (this.alergia as Allergy).getDesc() as unknown as string,
      detonantes: (this.alergia as Allergy).getDetonantes() as string
    })
   }
  }

  async gestionarInicio() {
    if (this.tipo == 1) {
    this.usuario = await this.fireUser.getById(this.id as number)
    this.editar()
    } else if (this.tipo == 2) {
      this.producto = await this.fireProd.getById(this.id as number)
      this.editar()
    } else if (this.tipo == 3) {
      this.alergia = await this.fireLer.getById(this.id as number)
      this.editar()
    }
  }
  
  
  userForm = new FormGroup({
    fullNom: new FormControl('', Validators.required),
    edad: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    alergias: new FormControl('', Validators.required)
  })

  prodForm = new FormGroup({
    fullNom: new FormControl('', Validators.required),
    imagen: new FormControl('', Validators.required),
    desc: new FormControl('', Validators.required),
    ingredientes: new FormControl('', Validators.required),
    precio: new FormControl('', Validators.required),
    stock: new FormControl('', Validators.required)
  })
  
  alerForm = new FormGroup({
    fullNom: new FormControl('', Validators.required),
    desc: new FormControl('', Validators.required),
    detonantes: new FormControl('', Validators.required)
  })

  

  async editar() {
  if (this.tipo == 1) {
    this.userForm.setValue({
      fullNom: (this.usuario as User).getFullNom() as string,
      edad: (this.usuario as User).getEdad() as unknown as string,
      email: (this.usuario as User).getEmail() as string,
      alergias: (this.usuario as User).getAlergias() as string
    })
   } else if (this.tipo == 2) {
    this.prodForm.setValue({
      imagen: (this.producto as Product).getImagen() as unknown as string,
      fullNom: (this.producto as Product).getNom() as string,
      desc: (this.producto as Product).getDesc() as string,
      ingredientes: (this.producto as Product).getIngredientes() as string,
      precio: (this.producto as Product).getPrecio() as unknown as string,
      stock: (this.producto as Product).getStock() as unknown as string
    })
   } else if (this.tipo == 3) {
    alert((this.alergia as Allergy).getNom())
    this.alerForm.setValue({
      fullNom: (this.alergia as Allergy).getNom() as string,
      desc: (this.alergia as Allergy).getDesc() as unknown as string,
      detonantes: (this.alergia as Allergy).getDetonantes() as string
    })
   }
    } 

 nuevoDialog(template: any) {
  let dialog = this.dialog.open(template, {
    width: "250px",
    disableClose: true,
    closeOnDestroy: false
  })
}

 enviar() {
  if (this.tipo == 1) {
    let user: User = new User((this.usuario as unknown as User).getId(),
    this.userForm.getRawValue().fullNom as string,
    this.userForm.getRawValue().edad as unknown as number,
  this.userForm.getRawValue().email as string,
  this.userForm.getRawValue().alergias as string )

  this.fireUser.update(user, this.id)
  this.router.navigateByUrl("dash")
  } else if (this.tipo == 2) {
    let prod: Product = new Product((this.producto as unknown as Product).getId(),
    this.prodForm.getRawValue().imagen as unknown as string,
    this.prodForm.getRawValue().fullNom as string,
    this.prodForm.getRawValue().desc as string,
  this.prodForm.getRawValue().stock as unknown as number,
  this.prodForm.getRawValue().precio as unknown as number,
  this.prodForm.getRawValue().ingredientes as string
)

  this.fireProd.update(prod, this.id)
  this.router.navigateByUrl("dash")
  } else if (this.tipo == 3) {
    let aler: Allergy = new Allergy((this.producto as unknown as Allergy).getId(),
    this.alerForm.getRawValue().fullNom as unknown as string,
    this.alerForm.getRawValue().desc as string,
    this.alerForm.getRawValue().detonantes as string
)

  this.fireLer.update(aler, this.id)
  this.router.navigateByUrl("dash")
  }

  
 }

 
}
