//Export/Import
import {turmas, pegaTurma, salvarTurma, mudaTurma} from "./funcoes.js";
export {acao,fechar,acao2,acao3}

//Prepara a página
window.onload = () =>{ 
    let turma = sessionStorage.getItem("turma"),
    editaT = document.querySelector(".editarNomeTurma"),
    editaC = document.querySelector(".editarNomeEscola"),
    cadastra = document.querySelector(".cadastrarAluno"),
    fecha = document.querySelectorAll(".closeButtonModal"),
    titulo = document.querySelector(".titleTurma"),
    subt = document.querySelector(".subtitleEscola")

    editaT.addEventListener("click", () => {
        acao()
    })

    editaC.addEventListener("click", () => {
        acao2()
    })

    cadastra.addEventListener("click", () => {
        acao3()
    })

    for (let i of fecha){
        i.addEventListener("click", () => {
            fechar()
        })
    }

    let atual = pegaTurma(turma)
    titulo.innerHTML = atual.nomeTurma
    subt.innerHTML = atual.codigoTurma

    //Submit Modal's
    let subm1 = document.querySelector(".modalBg .botaoCadastrarTurma"),
    subm2 = document.querySelector(".modalBg2 .botaoCadastrarTurma"),
    subm3 = document.querySelector(".botaoCadastrarAlunoModal")

    subm1.addEventListener("click",() => {
        let nome = document.querySelector(".modalInputTurma").value,
        campo = document.querySelector(".campo1")
        if(!nome){
            campo.innerHTML = "Campo não preenchido"
        }
        mudaTurma(atual.codigoTurma, nome ,atual.codigoTurma)
    })

}

//Modal's de alterar nome

function acao() {
    let modal = document.querySelector(".modalBg")

    modal.style.display = 'flex';
}

function fechar() {
    let modal = [document.querySelector(".modalBg"), document.querySelector(".modalBg2"), document.querySelector(".modalBg3")]
    for (let i of modal){
        i.style.display = 'none';
        }
    
}

function acao2() {
    let modal = document.querySelector(".modalBg2")

    modal.style.display = 'flex';
}


function acao3() {
    let modal = document.querySelector(".modalBg3")

    modal.style.display = 'flex';
}

