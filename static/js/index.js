// Imports/Exports
// @ts-check
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

/**
 * @returns {void}
 */
function prepara(){
    if (turmas[0]){
        let naoTem = document.querySelector(".nenhumaNota"),
        sect = document.querySelector(".turmas")
        if (naoTem){
            // @ts-ignore
            naoTem.style.display = "none"
        }
        imprimeTurmas(sect)
    }
}

/**
 * @param {Element} sect 
 * @returns {void}
 */
function imprimeTurmas(sect){
    sect.innerHTML = ""
    for(let turma of turmas){
        let div = document.createElement("div"),
        nome = document.createElement("h2"),
        codigo = document.createElement("p")
        div.classList.add("itemTurma")
        div.addEventListener("click",() => {
            sessionStorage.setItem("turma", turma.codigoTurma)
            window.location.href = "../../turma.html"
        })

        nome.textContent = turma.nomeTurma
        codigo.textContent = turma.codigoTurma
        div.appendChild(nome)
        div.appendChild(codigo)
        sect.appendChild(div)
        
    }
}


// Modal
/**
 * @returns {void}
 */

function acao() {
    let modal = document.querySelector(".modalBg")
    // @ts-ignore
    modal.style.display = 'flex';
}

/**
 * @returns {void}
 */
function fechar() {
    let modal = document.querySelector(".modalBg")
    // @ts-ignore
    modal.style.display = 'none';
}

/**
 * @returns {void}
 */

function submit()  {
    let nome = document.querySelector(".modalInputTurma"),
    codigo = document.querySelector(".modalInputEscola"),
    pnome = document.querySelector(".pNome"),
    pcodigo = document.querySelector(".pCodigo")
    // @ts-ignore
    if (!nome.value || !codigo.value){
        // @ts-ignore
        if (!nome.value){
            pnome.textContent = "Campo não preenchido";
        }
        else{
            pnome.textContent = " ";
        }
        // @ts-ignore
        if (!codigo.value){
            pcodigo.textContent = "Campo não preenchido";
        }
        else{
            pcodigo.textContent = " ";
        }
    }
    else{
        pnome.textContent = " ";
        pcodigo.textContent = " ";
        // @ts-ignore
        let novaTurma = new Turma(codigo.value,nome.value)
        /**
         * @type {boolean}
         */
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