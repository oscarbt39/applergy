export class Allergy {
    private allergy_id: number;
    private nom: string;
    private desc: string;
    private detonantes: string;

    constructor(id: number, nom: string, desc: string, det: string) {
        this.allergy_id = id
        this.nom = nom
        this.desc = desc
        this.detonantes = det
    }

    getId(): number {
        return this.allergy_id
    }

    setId(id: number) {
        this.allergy_id = id
    }

    getNom(): string {
        return this.nom
    }

    setNom(nom: string) {
        this.nom = nom
    }
    
    getDesc(): string {
        return this.desc
    }

    setDesc(desc: string) {
        this.desc = desc
    }
    getDetonantes(): string {
        return this.detonantes
    }

    setDetonantes(det: string) {
        this.detonantes = det
    }
}