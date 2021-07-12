export class Aluno{
    #notas = []
    #matricula
    #nome
    #telefone
    #email
    #media

    get notas(){
        return this.#notas
    }
    get matricula(){
        return this.#matricula
    }
    get nome(){
        return this.#nome
    }
    get telefone(){
        return this.#telefone
    }
    get email(){
        return this.#email
    }
    get media(){
        return this.#media
    }

    constructor(matricula, nome, telefone, email, notas = []){
        this.#matricula = matricula
        this.#nome = nome
        this.#telefone = telefone
        this.#email = email
        this.#notas = notas
    }
    editarInformacoes(nome, telefone, email){
        this.#nome = nome
        this.#telefone = telefone
        this.#email = email
    }
    cadastraNotas(n1, n2, n3){
        this.#notas[0] = n1
        this.#notas[1] = n2
        this.#notas[2] = n3


    }
    calculaMedia(){
        if(this.#notas[0]){
            this.#media = (this.#notas[0] + this.#notas[1] + this.#notas[2])/3
            return true
        }
        return false
    }
}