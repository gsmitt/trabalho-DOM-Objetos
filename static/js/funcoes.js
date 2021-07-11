// Import/Export
import {Turma} from "./turma.js"
export {turmas, pegaAlunos, pegaTurma, salvarTurma, mudaTurma}

// Preopara os dados/storage
if (!localStorage.getItem("turmas")){
    localStorage.setItem("turmas", "[]")
}

let pseudoTurmas = JSON.parse(localStorage.getItem("turmas")),
turmas = []

for(let i of pseudoTurmas){
    turmas.push(new Turma(i.codigoTurma, i.nomeTurma, i.alunos))
}

// Encontra turma pelo codigo

function pegaTurma(codigoTurma){
    for(let turma of turmas){
        if(turma.codigoTurma == codigoTurma){
            return turma
        }
    }
    return false
}

// Encontra aluno pela matrícula
function pegaAlunos(codigoTurma, matricula){
    turmas = pegaTurma(codigoTurma)
    for(let aluno of turma){
        if (aluno.matricula == matricula){
            return aluno
        }
    }
    return false
}

// Salva a turma no local storage
function salvarTurma(turma){
    let novaTurma = {
        codigoTurma: turma.codigoTurma,
        nomeTurma: turma.nomeTurma,
        alunos: turma.alunos
    }
    turmas = JSON.parse(localStorage.getItem("turmas"))

    if(turmas.length < 10){
        for(let i of turmas){
            if (i.codigoTurma == novaTurma.codigoTurma){
                return false
            }
        }
        turmas.push(novaTurma)
        localStorage.setItem("turmas",JSON.stringify(turmas))
        return true
    }
    else{
        alert("Limite de turmas atingido")
    }
}

function mudaTurma(codigoTurma, novoNome, novoCodigo){
    let turmas = JSON.parse(localStorage.getItem("turmas"))
    for (let i of turmas){
        if (i.codigoTurma == codigoTurma){
            i.codigoTurma = novoCodigo
            i.nomeTurma = novoNome
            sessionStorage.setItem("turma", novoCodigo)
            localStorage.setItem("turmas",JSON.stringify(turmas))
        }
    }
}

function salvaAluno(){
        let novaTurma = {
        codigoTurma: turma.codigoTurma,
        nomeTurma: turma.nomeTurma,
        alunos: turma.alunos
    }
}