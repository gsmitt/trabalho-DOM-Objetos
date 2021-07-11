// Imports/Exports
import {turmas, salvarTurma} from "./funcoes.js";
import {Turma} from "./turma.js";
export {acao, fechar, submit}

// Prepara a página
window.onload = () =>{ 
    let cria = document.querySelector("#criarTurmaButton"),
    fecha = document.querySelector(".closeButtonModal"),
    sub = document.querySelector(".botaoCadastrarTurma")

    cria.addEventListener("click", () => {
        acao()
    })

    fecha.addEventListener("click", () => {
        fechar()
    })

    sub.addEventListener("click", () => {
        submit()
    })

    prepara()
}

function prepara(){
    if (turmas[0]){
        let naoTem = document.querySelector(".nenhumaNota"),
        sect = document.querySelector(".turmas")
        naoTem.style.display = "none"
        imprimeTurmas(sect)
    }
}


function imprimeTurmas(sect){
    sect.innerHTML = ""
    for(let i of turmas){
        let div = document.createElement("div"),
        nome = document.createElement("h2"),
        codigo = document.createElement("p")
        div.classList.add("itemTurma")
        
        div.addEventListener("click",() => {
            sessionStorage.setItem("turma", i.codigoTurma)
            window.location.href = "../../turma.html"
        })

        nome.textContent = i.nomeTurma
        codigo.textContent = i.codigoTurma
        div.appendChild(nome)
        div.appendChild(codigo)
        sect.appendChild(div)
    }
}


// Modal
function acao() {
    let modal = document.querySelector(".modalBg")

    modal.style.display = 'flex';
}

function fechar() {
    let modal = document.querySelector(".modalBg")

    modal.style.display = 'none';
}

function submit()  {
    let nome = document.querySelector(".modalInputTurma"),
    codigo = document.querySelector(".modalInputEscola"),
    pnome = document.querySelector(".pNome"),
    pcodigo = document.querySelector(".pCodigo")

    if (!nome.value || !codigo.value){
        if (!nome.value){
            pnome.textContent = "Campo não preenchido";
        }
        else{
            pnome.textContent = " ";
        }
        if (!codigo.value){
            pcodigo.textContent = "Campo não preenchido";
        }
        else{
            pcodigo.textContent = " ";
        }
    }
    else{
        pnome.textContent = " ";
        let novaTurma = new Turma(codigo.value,nome.value)
        let x = salvarTurma(novaTurma)
        prepara()
        if (!x){
            pcodigo.textContent = "Este código já existe";
        }
        else{
            fechar()
        }
    }
}