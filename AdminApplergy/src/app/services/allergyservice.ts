import { Injectable, numberAttribute } from "@angular/core";
import { User } from "../model/User";
import { addDoc, collection, deleteDoc, doc, getDocs, getFirestore, query, QueryDocumentSnapshot, updateDoc, where } from "firebase/firestore";
import { Firestore } from "@angular/fire/firestore";
import Swal, {  } from "sweetalert2";
import { Product } from "../model/Product";
import { Allergy } from "../model/Allergy";

@Injectable ({
    providedIn: 'root'
})

export class AllergyService {
    constructor(private db: Firestore) {

    }

    async insert(aler: Allergy) {
        const docRef = await addDoc(collection(this.db, "alergias"), {
            allergy_id: await this.getLastId()+1,
            nom: aler.getNom(),
            descripcion: aler.getDesc(),
            detonantes: aler.getDetonantes()
        })
    }

    async update(aler: Allergy, pid: number) {
        const queryId = await getDocs(query(collection(this.db, "alergias"), where("allergy_id", "==", aler.getId())));

        let id: string = queryId.docs[0].id

        await updateDoc(doc(this.db, "alergias", id), {
            nom: aler.getNom(),
            descripcion: aler.getDesc(),
            detonantes: aler.getDetonantes()
        });
    }
    

    async delete(id: number) {

        const queryId = await getDocs(query(collection(this.db, "alergias"), where("allergy_id", "==", id)));

        
        try {
        const result = await deleteDoc(doc(this.db, "alergias", queryId.docs[0].id))
           Swal.fire({
                  title: "Eliminado con éxito",
                  text: "La alergia ha sido retirada de la base de datos exitosamente",
                  icon: 'success',
                  confirmButtonText: "Vale",
                  background: "#94ef94",
      confirmButtonColor: "#0a7a19"
              })
        } catch (error) {
                  Swal.fire({
                    title: "Error",
                    text: "Ha ocurrido un error eliminando la alergia",
                    icon: 'error',
                    confirmButtonText: "Vale",
                    background: "#94ef94",
      confirmButtonColor: "#0a7a19"
                })
        }

    
    }

    async getById(id: number): Promise<Allergy> {
        let aler: Allergy = new Allergy(0, "", "", "")
        const queryId = await getDocs(query(collection(this.db, "alergias")));

        if (!queryId.empty) {
            queryId.docs.forEach(doc => {
                if (doc.data()['allergy_id'] == id) {
                    aler = new Allergy(doc.data()['allergy_id'],
                    doc.data()['nom'],
                    doc.data()['desc'], 
                    doc.data()['detonantes'])
                } else {
                 Swal.fire({
                     title: "Error",
                     text: "Alergia no encontrado",
                     icon: 'error',
                     confirmButtonText: "Vale",
                     background: "#94ef94",
           confirmButtonColor: "#0a7a19",
                 })
                }
            });
        }
        return aler
    }

    async getAll(): Promise<Allergy[]> {
        let alers: Allergy[] = []
        const queryAll = await getDocs(collection(this.db, "alergias"));
        queryAll.forEach((doc) => {
            let aler = new Allergy(doc.data()['allergy_id'], doc.data()['nom'], doc.data()['descripcion'], doc.data()['detonantes'])
             alers.push(aler)
      } );
 
      return alers
        }

    async getLastId(): Promise<number> {
       const queryAll = await getDocs(collection(this.db, "alergias"));
       let maxId: number = 0
       queryAll.forEach((doc) => {
            if (doc.data()['allergy_id'] > maxId) {
                maxId = doc.data()['allergy_id'];
            }
     } );

            return maxId;
       }
    }