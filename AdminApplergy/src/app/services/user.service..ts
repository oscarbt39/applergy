import { Injectable } from "@angular/core";
import { User } from "../model/User";
import { collection, deleteDoc, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { Firestore } from "@angular/fire/firestore";
import Swal from "sweetalert2";

@Injectable ({
    providedIn: 'root'
})

export class UserService {
    constructor(private db: Firestore) {

    }

    async update(user: User, pid: number) {
        const queryId = await getDocs(query(collection(this.db, "usuarios"), where("user_id", "==", user.getId())));

        let id: string = queryId.docs[0].id

        await updateDoc(doc(this.db, "usuarios", id), {
            fullNom: user.getFullNom(),
            email: user.getEmail(),
            edad: user.getEdad(),
            alergias: user.getAlergias()
        });
    }
    

    async delete(id: number) {

        const queryId = await getDocs(query(collection(this.db, "usuarios"), where("user_id", "==", id)));

        
        try {
        const result = await deleteDoc(doc(this.db, "usuarios", queryId.docs[0].id))
           Swal.fire({
                  title: "Eliminado con éxito",
                  text: "El usuario ha sido retirado de la base de datos exitosamente",
                  icon: 'success',
                  confirmButtonText: "Vale",
                  background: "#94ef94",
      confirmButtonColor: "#0a7a19"
              })
        } catch (error) {
                  Swal.fire({
                    title: "Error",
                    text: "Ha ocurrido un error eliminando el usuario",
                    icon: 'error',
                    confirmButtonText: "Vale",
                    background: "#94ef94",
      confirmButtonColor: "#0a7a19"
                })
        }

    
    }

    async getById(id: number): Promise<User> {
        let user: User = new User(0, "", 0, "", "")
        const queryId = await getDocs(query(collection(this.db, "usuarios")));

        if (!queryId.empty) {
            queryId.docs.forEach(doc => {
                if (doc.data()['user_id'] == id) {
                    user = new User(doc.data()['user_id'],
                    doc.data()['fullNom'], 
                    doc.data()['email'], 
                    doc.data()['edad'], 
                    doc.data()['alergias'])
                } else {
                    Swal.fire({
                        title: "Error",
                        text: "Usuario no encontrado",
                        icon: 'error',
                        confirmButtonText: "Vale",
                        background: "#94ef94",
              confirmButtonColor: "#0a7a19"
                    })
                }
            });
            
        }
        return user
    }

    async getAll(): Promise<User[]> {
        let users: User[] = []
        const queryAll = await getDocs(collection(this.db, "usuarios"));
        queryAll.forEach((doc) => {
            let user = new User(doc.data()['user_id'], doc.data()['fullNom'], doc.data()['email'], doc.data()['edad'], doc.data()['alergias'])
             users.push(user)
      } );
 
      return users;
        }

    async getLastId(): Promise<number> {
       const queryAll = await getDocs(collection(this.db, "usuarios"));
       let maxId: number = 0
       queryAll.forEach((doc) => {
            if (doc.data()['user_id'] > maxId) {
                maxId = doc.data()['user_id'];
            }
     } );

            return maxId;
       }
    }