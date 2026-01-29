export class Product {
    private id: number;
    private imagen: string;
    private fullNom: string;
    private descripcion: string;
    private stock: number;
    private precio: number;
    private ingredientes: string;

    constructor(id: number, imagen: string, nom: string, desc: string, stock: number, precio: number, ing: string) {
        this.id = id
        this.imagen = imagen
        this.fullNom = nom
        this.descripcion = desc
        this.stock = stock
        this.precio = precio
        this.ingredientes = ing
    }

    getId(): number {
        return this.id
    }

    setId(id: number) {
        this.id = id
    }

    getImagen(): string {
        return this.imagen
    }

    setImagen(img: string) {
        this.imagen = img
    }

    getNom(): string {
        return this.fullNom
    }

    setNom(nom: string) {
        this.fullNom = nom
    }
    

    getDesc(): string {
        return this.descripcion
    }

    setDesc(desc: string) {
        this.descripcion = desc
    }

    getStock(): number {
        return this.stock
    }

    setStock(stock: number) {
        this.stock = stock
    }

    getPrecio(): number {
        return this.precio
    }

    setPrecio(precio: number) {
        this.precio = precio
    }

    getIngredientes(): string {
        return this.ingredientes
    }
    
    setIngredientes(ing: string) {
        this.ingredientes = ing
    }

}