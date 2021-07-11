export class Turma{
    #alunos = []
    #codigoTurma
    #nomeTurma
    constructor(codigoTurma, nomeTurma, alunos = []){
        this.#codigoTurma = codigoTurma
        this.#nomeTurma = nomeTurma
        this.#alunos = alunos
    }
    get codigoTurma(){
        return this.#codigoTurma
    }
    get nomeTurma(){
        return this.#nomeTurma
    }
    get alunos(){
        return this.#alunos
    }

    cadastrarAluno(aluno){
        for(let i in this.#alunos){
            if(this.#alunos[i].matricula == aluno.matricula){
                return false
            }
        }
        this.#alunos.push(aluno)
        return true
    }
    removerAluno(matriculaAluno){
        for (let i in this.#alunos){
            if(this.#alunos[i].matricula == matriculaAluno){
                this.#alunos.splice(i, 1)
                return true
            }
        }
        return false
    }
}

