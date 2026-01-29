import { Injectable, numberAttribute } from "@angular/core";
import { User } from "../model/User";
import { addDoc, collection, deleteDoc, doc, getDocs, getFirestore, query, QueryDocumentSnapshot, updateDoc, where } from "firebase/firestore";
import { Firestore } from "@angular/fire/firestore";
import Swal, {  } from "sweetalert2";
import { Product } from "../model/Product";

@Injectable ({
    providedIn: 'root'
})

export class FirestoreService {
    constructor(private db: Firestore) {

    }

    async insert(prod: Product) {
        const docRef = await addDoc(collection(this.db, "productos"), {
            product_id: await this.getLastId()+1,
            imagen: prod.getImagen(),
            fullNom: prod.getNom(),
            descripcion: prod.getDesc(),
            stock: prod.getStock(),
            precio: prod.getPrecio(),
            ingredientes: prod.getIngredientes()
        })
    }

    async update(prod: Product, pid: number) {
        const queryId = await getDocs(query(collection(this.db, "productos"), where("product_id", "==", prod.getId())));

        let id: string = queryId.docs[0].id

        await updateDoc(doc(this.db, "productos", id), {
            imagen: prod.getImagen(),
            fullNom: prod.getNom(),
            descripcion: prod.getDesc(),
            stock: prod.getStock(),
            precio: prod.getPrecio(),
            ingredientes: prod.getIngredientes()
        });
    }
    

    async delete(id: number) {

        const queryId = await getDocs(query(collection(this.db, "productos"), where("product_id", "==", id)));

        
        try {
        const result = await deleteDoc(doc(this.db, "productos", queryId.docs[0].id))
           Swal.fire({
                  title: "Eliminado con éxito",
                  text: "El producto ha sido retirado de la base de datos exitosamente",
                  icon: 'success',
                  confirmButtonText: "Vale",
                  background: "#94ef94",
      confirmButtonColor: "#0a7a19"
              })
        } catch (error) {
                  Swal.fire({
                    title: "Error",
                    text: "Ha ocurrido un error eliminando el producto",
                    icon: 'error',
                    confirmButtonText: "Vale",
                    background: "#94ef94",
      confirmButtonColor: "#0a7a19"
                })
        }

    
    }

    async getById(id: number): Promise<Product> {
        let prod: Product = new Product(0, "", "", "", 0, 0, "")
        const queryId = await getDocs(query(collection(this.db, "productos")));
        if (!queryId.empty) {
            queryId.docs.forEach(doc => {
                if (doc.data()['product_id'] == id) {
                    prod = new Product(doc.data()['product_id'],
                    doc.data()['imagen'],
                    doc.data()['fullNom'], 
                    doc.data()['descripcion'], 
                    doc.data()['stock'], 
                    doc.data()['precio'], 
                    doc.data()['ingredientes'])
                }   
            });
        }

        return prod 
    }

    async getAll(): Promise<Product[]> {
        let prods: Product[] = []
        const queryAll = await getDocs(collection(this.db, "productos"));
        queryAll.forEach((doc) => {
            let prod = new Product(doc.data()['product_id'], doc.data()['imagen'], doc.data()['fullNom'], doc.data()['descripcion'], doc.data()['stock'], doc.data()['precio'], doc.data()['ingredientes'])
             prods.push(prod)
      } );
 
      return prods;
        }

    async getLastId(): Promise<number> {
       const queryAll = await getDocs(collection(this.db, "productos"));
       let maxId: number = 0
       queryAll.forEach((doc) => {
            if (doc.data()['product_id'] > maxId) {
                maxId = doc.data()['product_id'];
            }
     } );

            return maxId;
       }
    }