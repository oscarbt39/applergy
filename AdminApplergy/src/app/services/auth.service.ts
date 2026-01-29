import { Injectable } from "@angular/core";
import { Auth, createUserWithEmailAndPassword } from "@angular/fire/auth";
import { Router } from "@angular/router";
import { signInWithEmailAndPassword, sendPasswordResetEmail, signInWithPopup, GoogleAuthProvider, getAuth  } from "firebase/auth";
import Swal from "sweetalert2";
import { InicioComponent } from "../componentes/inicio/inicio.component";

@Injectable({
    providedIn: "root"
})

export class AuthService {
    
    constructor(private auth: Auth, private router: Router) {
        
      }

    registrar(userData: { email: string, passwd: string }){
        return createUserWithEmailAndPassword(this.auth, userData.email, userData.passwd).then((placeholder) => {
         Swal.fire({
          title: "Usuario registrado",
          text: "El usuario ha sido registrado con éxito",
          icon: 'success',
          confirmButtonText: "Vale",
          background: "#94ef94",
      confirmButtonColor: "#0a7a19"
                       })
          this.router.navigateByUrl("/");
      })
    }
 
    login(userData: { email: string, passwd: string}) {
        return signInWithEmailAndPassword(this.auth,  userData.email, userData.passwd).then((placeholder) => {
          if (getAuth().currentUser?.uid == "DLr7qVu8XYXWnDFFj6cXtmEaksh2") {
            this.router.navigateByUrl("/dash");
          } else {
            Swal.fire({
              title: "Usuario no permitido",
              text: "El usuario no es administrador",
              icon: 'error',
              confirmButtonText: "Vale",
              background: "#94ef94",
          confirmButtonColor: "#0a7a19" })
          }
        })
      }

    cerrarSesion(): any {
        return this.auth.signOut().then((placeholder) => {
          this.router.navigateByUrl("/acceso")
        })
      }

      eliminar() {
        let user = this.auth.currentUser

        user?.delete()
      }

      recuperar(email: string) {
         sendPasswordResetEmail (this.auth, email)
      }

      isLogged(): boolean {
        let user = this.auth.currentUser
        return (user == null) ? false : true
      }

      loginWithGoogle() {
        const provider = new GoogleAuthProvider();

        signInWithPopup(this.auth, provider)
        .then((result) => {
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential!.accessToken;
          const user = result.user;
          this.router.navigateByUrl("/dashboard");
        }).catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          const email = error.customData.email;
          const credential = GoogleAuthProvider.credentialFromError(error);
        });
      }

}


