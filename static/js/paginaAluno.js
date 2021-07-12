// Import/Export
import { Aluno } from "./alunos.js";
import {pegaAlunos, mudaAluno, pegaTurma} from "./funcoes.js";
import { Turma } from "./turma.js";
export {acao, fechar, acao2}
// Eventos
window.onload = () => {
    let matricula = sessionStorage.getItem("aluno"),
    turma = sessionStorage.getItem("turma"),
    aluno = pegaAlunos(turma, matricula),
    editar = document.querySelector(".botaoEditarInformacoes"),
    cadastrar = document.querySelector(".botaoCadastrarNotas"),
    calcular = document.querySelector(".botaoMedia"),
    fecha = document.querySelectorAll(".closeButtonModal"),
    titulo = document.querySelector(".headerTitle"),
    subt = document.querySelector(".headerSubtitle")

    aluno = new Aluno(aluno.matricula, aluno.nome, aluno.telefone, aluno.email, aluno.notas)
    
    let turmaAtual = pegaTurma(turma) 
    

    //header
    titulo.innerHTML = aluno.nome
    subt.innerHTML = aluno.matricula

    //botões
    editar.addEventListener("click", () => {
        acao2()
    })
    cadastrar.addEventListener("click", () => {
        acao()
    })
    calcular.addEventListener("click", () => {

    })
    for (let i of fecha){
        i.addEventListener("click", () => {
            fechar()
        })
    }
    //informações
    let pnome = document.querySelector(".paragrafoName"),
    pmatri = document.querySelector(".paragrafoRegistration"),
    pfone = document.querySelector(".paragrafoPhone"),
    pemail = document.querySelector(".paragrafoEmail")

    pnome.innerHTML += aluno.nome
    pmatri.innerHTML += aluno.matricula
    pfone.innerHTML += aluno.telefone
    pemail.innerHTML += aluno.email

    // Submits
    let subm1 = document.querySelector(".botaoAlterarInformacoesModal")

    subm1.addEventListener("click", (event) => {
        event.preventDefault()
        let nom = document.querySelector(".nomeAluno").value,
        matr = document.querySelector(".matriculaAluno").value,
        tele = document.querySelector(".telefoneAluno").value,
        ema = document.querySelector(".emailAluno").value
        if (turmaAtual.cadastrarAluno(new Aluno(matr, nom, tele, ema))){
            mudaAluno(turma, matricula, nom, matr, tele, ema)
            location.reload()
        }
    })
}
// Modal
function acao() {
    let modal = document.querySelector(".modalBg")

    modal.style.display = 'flex';
}

function fechar() {
    let modal = [document.querySelector(".modalBg"), document.querySelector(".modalBg2")]

    for(let i of modal){
        i.style.display = 'none';
    }
}

function acao2() {
    let modal = document.querySelector(".modalBg2")

    modal.style.display = 'flex';
}

