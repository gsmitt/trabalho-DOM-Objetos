// Import/Export
import {Turma} from "./turma.js"
export {turmas, mudaAluno, pegaAlunos, pegaTurma, salvarTurma, mudaTurma, salvaAluno}

// Preopara os dados/storage
if (!localStorage.getItem("turmas")){
    localStorage.setItem("turmas", "[]")
}
/**
 * @type {Array[object]}
 */
let pseudoTurmas = JSON.parse(localStorage.getItem("turmas")),
turmas = []

for(let i of pseudoTurmas){
    turmas.push(new Turma(i.codigoTurma, i.nomeTurma, i.alunos))
}

// Encontra turma pelo codigo
/**
 * 
 * @param {string} codigoTurma - Código da Turma
 * @returns {object}
 */
function pegaTurma(codigoTurma){
    for(let turma of turmas){
        if(turma.codigoTurma == codigoTurma){
            return turma
        }
    }
    return false
}

// Encontra aluno pela matrícula
/**
 * 
 * @param {string} codigoTurma - Código da Turma
 * @param {string} matricula - Matrícula do aluno
 * @returns {object}
 */
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
/**
 * 
 * @param {object} turma - Objeto do tipo Turma
 * @returns {boolean}
 */
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
/**
 * 
 * @param {string} codigoTurma - Código da turma
 * @param {string} novoNome - Novo nome da turma
 * @param {string} novoCodigo - Novo código da turma
 * @returns {void}
 */
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
/**
 * 
 * @param {object} aluno - Objeto do tipo Aluno
 * @param {string} turma - Código da turma
 * @returns {boolean}
 */
function salvaAluno(aluno, turma){
    let turmas = JSON.parse(localStorage.getItem("turmas"))
    for (let i of turmas){
        let novoAluno
        if(i.codigoTurma == turma){
            novoAluno = {
            matricula: aluno.matricula,
            nome: aluno.nome,
            telefone: aluno.telefone,
            email: aluno.email,
            notas: []
            }
        }
        i.alunos.push(novoAluno)
        localStorage.setItem("turmas",JSON.stringify(turmas))
    }
}
/**
 * 
 * @param {string} codigoTurma - Código da turma
 * @param {string} matricula - Matricula do aluno
 * @param {string} nNome - novo nome do aluno
 * @param {string} nMat - nova matricula do aluno
 * @param {string} nTel - novo telefone do aluno
 * @param {string} nEmail - novo emaiil do aluno
 * @param {Array} nNotas - novas notas  do aluno
 * @returns {void}
 */
function mudaAluno(codigoTurma, matricula, nNome, nMat, nTel, nEmail, nNotas){
    let turmas = JSON.parse(localStorage.getItem("turmas"))
    for (let i of turmas){
        if (i.codigoTurma == codigoTurma){
            for(let j of i.alunos){
                if(j.matricula == matricula){
                    if (nMat != ""){j.matricula = nMat}
                    if (nNome != ""){j.nome = nNome}
                    if (nTel != ""){j.telefone = nTel}
                    if (nEmail != ""){j.email = nEmail}
                    if (!isNaN(nNotas[0])){j.notas[0] = +nNotas[0]}
                    if (!isNaN(nNotas[1])){j.notas[1] = +nNotas[1]}
                    if (!isNaN(nNotas[2])){j.notas[2] = +nNotas[2]}
                    
                    sessionStorage.setItem("aluno", j.matricula)
                    localStorage.setItem("turmas",JSON.stringify(turmas))
                }
            }
        }
    }
}