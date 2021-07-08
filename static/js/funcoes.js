
localStorage.setItem("turmas", "[]")
turmas = JSON.parse(localStorage.getItem("turmas"))
export {turmas}

function pegaTurma(codigoTurma){
    turmas = JSON.parse(localStorage.getItem("turmas"))
    for(let turma in turmas){
        if(turma.codigoTurma == codigoTurma){
            return turma
        }
    }
    return false
}
function pegaAlunos(codigoTurma, matricula){
    turmas = pegaTurma(codigoTurma)
    for(let aluno in turma){
        if (aluno.matricula == matricula){
            return aluno
        }
    }
    return false
}
function salvarStorage(turmas){
    localStorage.setItem("turmas", JSON.stringify(turmas))
}
