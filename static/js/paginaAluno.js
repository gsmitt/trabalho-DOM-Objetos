// Import/Export
// @ts-check
import { Aluno } from "./alunos.js";
import {pegaAlunos, mudaAluno, pegaTurma} from "./funcoes.js";
export {acao, fechar, acao2}
// Eventos
window.onload = () => {
    let matricula = sessionStorage.getItem("aluno"),
    turma = sessionStorage.getItem("turma"),
    aluno = pegaAlunos(turma, matricula),
    editar = document.querySelector(".botaoEditarInformacoes"),
    cadastrar = document.querySelector(".botaoCadastrarNotas"),
    fecha = document.querySelectorAll(".closeButtonModal"),
    titulo = document.querySelector(".headerTitle"),
    subt = document.querySelector(".headerSubtitle"),
    lixeirinha = document.querySelector("#lixeirinha"),
    setinha = document.querySelector("#setinhaBack")

    aluno = new Aluno(aluno.matricula, aluno.nome, aluno.telefone, aluno.email, aluno.notas)
    aluno.calculaMedia()
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

    for (let i of fecha){
        i.addEventListener("click", (event) => {
            event.preventDefault()
            fechar()
        })
    }
    lixeirinha.addEventListener("click", () => {
        deleteAluno(turma, matricula)
    })

    setinha.addEventListener("click", () => {
        window.location.href= "./turma.html"
    })

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
    let subm1 = document.querySelector(".botaoAlterarInformacoesModal"),
    subm2 = document.querySelector(".botaoCadastrarNotasModal")

    subm1.addEventListener("click", (event) => {
        event.preventDefault()
        //@ts-ignore
        let nom = document.querySelector(".nomeAluno").value,
        //@ts-ignore
        matr = document.querySelector(".matriculaAluno").value,
        //@ts-ignore
        tele = document.querySelector(".telefoneAluno").value,
        //@ts-ignore
        ema = document.querySelector(".emailAluno").value
        if (turmaAtual.cadastrarAluno(new Aluno(matr, nom, tele, ema))){
            //@ts-ignore
            mudaAluno(turma, matricula, nom, matr, tele, ema, "")
            location.reload()
        }
    })
    subm2.addEventListener("click", (event) => {
        event.preventDefault()
        //@ts-ignore
        let n1 = document.querySelector(".nota1").value,
        //@ts-ignore
        n2 = document.querySelector(".nota2").value,
        //@ts-ignore
        n3 = document.querySelector(".nota3").value,
        notas = [n1,n2,n3]

        mudaAluno(turma, matricula, "", "", "", "", notas)
        location.reload()
    })

    //Notas
    verificaNotas(aluno)
}
// Modal
/**
 * @returns {void}
 */
function acao() {
    let modal = document.querySelector(".modalBg")
    //@ts-ignore
    modal.style.display = 'flex';
}
/**
 * @returns {void}
 */
function fechar() {
    let modal = [document.querySelector(".modalBg"), document.querySelector(".modalBg2")]

    for(let i of modal){
        //@ts-ignore
        i.style.display = 'none';
    }
}
/**
 * @returns {void}
 */
function acao2() {
    let modal = document.querySelector(".modalBg2")
    //@ts-ignore
    modal.style.display = 'flex';
}

//Preparando
/**
 * 
 * @param {object} aluno 
 * @returns {void}
 */
function verificaNotas(aluno){
    
    let n1,n2,n3
    if(aluno.notas[0]){
        n1 = true
    }
    if(aluno.notas[1]){
        n2 = true
    }
    if(aluno.notas[2]){
        n3 = true
    }
    if (n1 == true || n2 == true || n3 == true){
        let nada = document.querySelector(".semNotaCadastrada")
        //@ts-ignore
        nada.style.display = "none"
        imprimeNotas(aluno, n1, n2, n3)
    }
}
/**
 * 
 * @param {object} aluno 
 * @param {boolean} n1 
 * @param {boolean} n2 
 * @param {boolean} n3 
 * @returns {void}
 */
function imprimeNotas(aluno, n1, n2, n3){
    let container = document.querySelector(".notasAluno"),
    div = document.createElement("div"),
    nt1 = document.createElement("p"),
    nt2 = document.createElement("p"),
    nt3 = document.createElement("p"),
    medi = document.createElement("p")

    div.classList.add("listaGrades")


    if(n1){nt1.textContent = "Nota 1: " + aluno.notas[0]}
    if(n2){nt2.textContent = "Nota 2: " + aluno.notas[1]}
    if(n3){nt3.textContent = "Nota 3: " + aluno.notas[2]}
    if(n1 && n2 && n3){medi.textContent = "Media: " + aluno.media.toFixed(2)}
    div.appendChild(nt1)
    div.appendChild(nt2)
    div.appendChild(nt3)
    div.appendChild(medi)
    container.appendChild(div)
}


/**
 * 
 * @param {string} codigoTurma 
 * @param {string} matricula 
 * @returns {void}
 */
function deleteAluno(codigoTurma,matricula){
    let turmas = JSON.parse(localStorage.getItem("turmas"))
    for (let i of turmas){
        if (i.codigoTurma == codigoTurma){
            for (let j of i.alunos)
                if (j.matricula == matricula){
                    i.alunos.splice(j,1)
                }
            localStorage.setItem("turmas",JSON.stringify(turmas))
            window.location.href = "./turma.html"
        }
    }
}