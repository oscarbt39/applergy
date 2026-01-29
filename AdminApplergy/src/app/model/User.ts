export class User {

    private id: number;
    private fullNom: string;
    private edad: number;
    private email: string;
    private alergias: string;

    constructor(id: number, fullN: string, edad: number, email: string, aler: string) {
        this.id = id;
        this.fullNom = fullN;
        this.edad = edad;
        this.email = email;
        this.alergias = aler;
    }

    getId(): number {
        return this.id;
    }

    setId(id: number) {
        this.id = id;
    }

    getFullNom(): string {
        return this.fullNom;
    }

    setFullNom(fullN: string) {
        this.fullNom = fullN;
    }

    getEmail(): string {
        return this.email;
    }

    setEmail(email: string) {
        this.email = email;
    }

    getAlergias(): string {
        return this.alergias;
    }

    setAlergias(aler: string) {
        this.alergias = aler;
    }

    getEdad(): number {
        return this.edad;
    }

    setEdad(edad: number) {
        this.edad = edad;
    }
}