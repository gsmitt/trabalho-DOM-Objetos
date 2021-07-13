//Export/Import
import {Aluno} from "./alunos.js";
import {turmas, pegaTurma, salvarTurma, mudaTurma, salvaAluno} from "./funcoes.js";
export {acao,fechar,acao2,acao3}

//Prepara a página
let atual
window.onload = () =>{ 
    let turma = sessionStorage.getItem("turma"),
    editaT = document.querySelector(".editarNomeTurma"),
    editaC = document.querySelector(".editarNomeEscola"),
    cadastra = document.querySelector(".cadastrarAluno"),
    fecha = document.querySelectorAll(".closeButtonModal"),
    titulo = document.querySelector(".titleTurma"),
    subt = document.querySelector(".subtitleEscola"),
    lixeirinha = document.querySelector("#lixeirinha"),
    setinha = document.querySelector("#setinhaBack")
    

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
    lixeirinha.addEventListener("click", () => {
        deletaTurma(turma)
    })
    setinha.addEventListener("click", () => {
        window.location.href= "./index.html"
    })

    
    atual = pegaTurma(turma)
    titulo.innerHTML = atual.nomeTurma
    subt.innerHTML = atual.codigoTurma

    //Submit Modal's
    let subm1 = document.querySelector(".modalBg .botaoCadastrarTurma"),
    subm2 = document.querySelector(".modalBg2 .botaoCadastrarTurma"),
    subm3 = document.querySelector(".botaoCadastrarAlunoModal")

    subm1.addEventListener("click", (event) => {
        event.preventDefault()
        let nome = document.querySelector(".modalInputTurma").value,
        campo = document.querySelector(".campo1")
        if(!nome){
            campo.innerHTML = "Campo vazio"
        }
        else{
            campo.innerHTML = ""
            mudaTurma(atual.codigoTurma, nome ,atual.codigoTurma)
            location.reload()
        }
    })

    subm2.addEventListener("click", (event) => {
        event.preventDefault()
        let codigo = document.querySelector(".modalInputEscola").value,
        campo = document.querySelector(".campo2")
        if(!codigo){
            campo.innerHTML = "Campo vazio"
        }
        else{
            if (pegaTurma(codigo)){
                campo.innerHTML = "Código já existe"
            }
            else{
                campo.innerHTML = ""
                mudaTurma(atual.codigoTurma, atual.nomeTurma, codigo)
                location.reload()
            }
        }
    })

    subm3.addEventListener("click", (event) => {
        event.preventDefault()
        submit()
    })


    prepara()
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

function submit()  {
    let nome = document.querySelector(".nomeAluno"),
    matricula = document.querySelector(".matriculaAluno"),
    tele = document.querySelector(".telefoneAluno"),
    email = document.querySelector(".emailAluno"),
    pnome = document.querySelector(".campo4"),
    pmat = document.querySelector(".campo3"),
    ptele = document.querySelector(".campo5"),
    pemail = document.querySelector(".campo6")

    if (!nome.value || !matricula.value || !tele.value || !email.value){
        console.log("oi")
        if (!nome.value){
            pnome.textContent = "Campo não preenchido";
        }
        else{
            pnome.textContent = " ";
        }
        if (!matricula.value){
            pmat.textContent = "Campo não preenchido";
        }
        else{
            pmat.textContent = " ";
        }
        if (!tele.value){
            ptele.textContent = "Campo não preenchido";
        }
        else{
            ptele.textContent = " ";
        }
        if (!email.value){
            pemail.textContent = "Campo não preenchido";
        }
        else{
            pemail.textContent = " ";
        }
    }

    else{
        pnome.textContent = " ";
        pmat.textContent = " ";
        ptele.textContent = " ";
        ptele.textContent = " ";
        pemail.textContent = " ";
        let novoAluno = new Aluno(matricula.value, nome.value, tele.value, email.value)
        if (!novoAluno){
            pmat.textContent = "Esta matricula já existe";
        }
        else{
            if(atual.cadastrarAluno(novoAluno)){
                salvaAluno(novoAluno, atual.codigoTurma)
                location.reload()
            }
        }
    }
}
// imprimindo alunos
function prepara(){
    if (atual.alunos[0]){
        let semAlunos = document.querySelector(".semAlunosCadastrados"),
        sect = document.querySelector(".tabelaAlunos")
        if(semAlunos){
            semAlunos.style.display = "none"
        }
        imprimeAlunos(sect)
    }
}

function imprimeAlunos(sect){
    for (let aluno of atual.alunos){
        let div = document.createElement("div"),
        nome = document.createElement("h3"),
        matricula = document.createElement("p")
        div.classList.add("itemAluno")
        
        div.addEventListener("click",() => {
            sessionStorage.setItem("aluno", aluno.matricula)
            window.location.href = "../../aluno.html"
        })

        nome.textContent = aluno.nome
        matricula.textContent = aluno.matricula
        div.appendChild(nome)
        div.appendChild(matricula)
        sect.appendChild(div)
    }
}

function deletaTurma(codigoTurma){
    let turmas = JSON.parse(localStorage.getItem("turmas"))
    for (let i of turmas){
        if (i.codigoTurma == codigoTurma){
            turmas.splice(i,1)
            localStorage.setItem("turmas",JSON.stringify(turmas))
            window.location.href = "./index.html"
        }
    }
}