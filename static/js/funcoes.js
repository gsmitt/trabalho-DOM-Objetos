// Import/Export
import {Turma} from "./turma.js"
export {turmas, mudaAluno, pegaAlunos, pegaTurma, salvarTurma, mudaTurma, salvaAluno}

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
    let turma = pegaTurma(codigoTurma)
    for(let aluno of turma.alunos){
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

    if(turmas.length < 6){
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
        alert("Limite de turmas atingido!")
        prompt("Para liberar mais turmas, assine a versão premium!\nInsira o número do cartão:")
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

function salvaAluno(aluno, turma){
    let turmas = JSON.parse(localStorage.getItem("turmas"))
    for (let i of turmas){
        let novoAluno
        if(i.codigoTurma == turma){
            novoAluno = {
            matricula: aluno.matricula,
            nome: aluno.nome,
            telefone: aluno.telefone,
            email: aluno.email
            }
        }
        i.alunos.push(novoAluno)
        localStorage.setItem("turmas",JSON.stringify(turmas))
    }
}

function mudaAluno(codigoTurma, matricula, nNome, nMat, nTel, nEmail){
    let turmas = JSON.parse(localStorage.getItem("turmas"))
    for (let i of turmas){
        if (i.codigoTurma == codigoTurma){
            for(let j of i.alunos){
                if(j.matricula == matricula){
                    if (nMat != ""){j.matricula = nMat}
                    if (nNome != ""){j.nome = nNome}
                    if (nTel != ""){j.telefone = nTel}
                    if (nEmail != ""){j.email = nEmail}
                    
                    sessionStorage.setItem("aluno", j.matricula)
                    localStorage.setItem("turmas",JSON.stringify(turmas))
                }
            }
        }
    }
}