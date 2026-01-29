import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { getAuth } from 'firebase/auth';
import { AuthService } from '../../services/auth.service';
import { FirestoreService } from '../../services/productservice';
import Swal from "sweetalert2";


@Component({
  selector: 'app-acceso',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './acceso.component.html',
  styleUrl: './acceso.component.css'
})
export class AccesoComponent {

  constructor(private auth: AuthService, private fire: FirestoreService) {
    
  }
  
  infoUsuario = new FormGroup({
    email: new FormControl(''),
    passwd: new FormControl(''),
  });

  oculta: boolean = true
  


  // Envia los datos
  enviar(): void {
    const emailValidador = /\S+@\S+\.\S+/
    const passValidador = /^(?=.*[a-zA-Z])(?=.*\d)\S{6,}$/
    const userData = this.infoUsuario.getRawValue()
    if (!emailValidador.test(userData.email as string) || !passValidador.test(userData.passwd as string)) {
      Swal.fire({
        title: "Email o contraseña inválidos",
        text: "Por favor, introduce un email y contraseña válidos, (al menos 6 caracteres, letras y numeros, sin espacios en blanco)",
        icon: 'error',
        confirmButtonText: "Vale",
        background: "#d2fccd",
        confirmButtonColor: "#49903e"
    })
    } else {
      const valoresNoNulos = {
        email: userData.email as string,
        passwd: userData.passwd as string
      }
     this.auth.login(valoresNoNulos).then(() => {
      
     });
    }
    
  }


  showHidePasswd(): void {
    if (this.oculta) {
      this.oculta = false
    } else {
      this.oculta = true
    }
   
  }

  recuperar() {
    let email = this.infoUsuario.getRawValue().email

    if (email == null) {
      Swal.fire({
          title: "Email inválido",
          text: "Por favor, introduce un email válido",
          icon: 'error',
          confirmButtonText: "Vale",
          background: "8a7f76",
          confirmButtonColor: "dc7f32"
      })
    } else {
      this.auth.recuperar(email)
    }
  }

  google() {
    this.auth.loginWithGoogle()
  }
  
}
