//Export/Import
import {Aluno} from "./alunos.js";
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

    subm1.addEventListener("click", () => {
        let nome = document.querySelector(".modalInputTurma").value
        if(!codigo){
            campo.innerHTML = "Campo vazio"
        }
        else{mudaTurma(atual.codigoTurma, nome ,atual.codigoTurma)}
        
    })

    subm2.addEventListener("click",() => {
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
            }
        }
    })

    subm3.addEventListener("click", () => {
        
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

function submit()  {
    let nome = document.querySelector(".nomeAluno"),
    matricula = document.querySelector(".matriculaAluno"),
    tele = document.querySelector(".telefoneAluno"),
    email = document.querySelector(".emailAluno").
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
        atual.alunos.push(novoAluno)
        console.log(atual)
        prepara()
        if (!x){
            pcodigo.textContent = "Este código já existe";
        }
        else{
            fechar()
        }
    }
}