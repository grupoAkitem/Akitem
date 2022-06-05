document.querySelector("a#close_link").addEventListener('click', changestyle);
document.querySelector("div#close_button").addEventListener('click', changestyle);
document.querySelector("a#forget_password").addEventListener("click", changestyle);
const usuario = JSON.parse(localStorage.getItem('login'));
const emailEntrar = document.getElementById('email');
const btnEntrar = document.getElementById('btn-entrar');
const senha = document.getElementById('password');
const incorrect = document.getElementById("incorrect");
const verification =document.getElementById("verification")
const modalTrocSenha = document.getElementById("modal-trocar-senha");
const verificaEmail = document.getElementById("verificaEmail");
const BconfirmaSenha = document.getElementById("confirmaSenha");


function changestyle(){
    let change_password = document.querySelector("div.change_password");
    
    if (change_password.style.display === "flex"){
        change_password.style.display = "none";
        modalTrocSenha.style.display = "none";
        verificaEmail.style.display = "block";
       BconfirmaSenha.style.display = "none";
       document.querySelector("#modal-trocar-senha #verification").style.display = 'none';
       document.getElementById("nova_senha").value = ""
       document.getElementById("confirmar_senha").value = ""
        
    } else {
        change_password.style.display = "flex";
        document.getElementById("change_email").value = usuario.email;
    }   
}

btnEntrar.addEventListener('click', (event) => {
    event.preventDefault();
    if (usuario === null) {
        incorrect.innerText = 'Usuário não encontrado! Crie um cadastro grátis'
        verification.style.display = 'flex';
    } else if (emailEntrar.value !== usuario.email) {
        incorrect.innerText = 'Email incorreto'
        verification.style.display = 'flex';
        emailEntrar.style.border = '2px solid red';
    } else if (senha.value !== usuario.senha) {
        incorrect.innerText = 'Senha incorreta';
        verification.style.display = 'flex';
        senha.style.border = '2px solid red';
    } else if (senha.value === usuario.senha && emailEntrar.value === usuario.email) {
        usuario.active = true;
        localStorage.setItem('login', JSON.stringify(usuario));
        window.location.href = '/index.html';
    } else {
        incorrect.innerText = 'Usuário ou senha incorretos';
        verification.style.display = 'flex';
        senha.style.border = '2px solid red';
        emailEntrar.style.border = '2px solid red';
    }
})

window.onload = () => { 
    if (usuario !== null) {
        emailEntrar.value = usuario.email;
    }
  };


//-----Esqueci senha------//
document.querySelector(".change_password_content form").addEventListener('submit', (ev)=>{
    ev.preventDefault();
    } );





verificaEmail.addEventListener("click", ()=>{
    const trocarSenhaEmail = document.getElementById("change_email");

    trocarSenhaEmail.style.boxShadow = "none";
    trocarSenhaEmail.style.borderColor = "#000";
    trocarSenhaEmail.style.outlineColor = "000";

    if(trocarSenhaEmail.value !== usuario.email){
        trocarSenhaEmail.style.boxShadow = "0px 0px 10px #f00";
        trocarSenhaEmail.style.borderColor = "#f00";
        trocarSenhaEmail.style.outlineColor = "f00";
    } else{
        modalTrocSenha.style.display = "flex";
        verificaEmail.style.display = "none";
        BconfirmaSenha.style.display = "block";


        BconfirmaSenha.addEventListener("click", ()=>{
            const novaSenha = document.getElementById("nova_senha");
            const confSenha = document.getElementById("confirmar_senha");

            const senhasDiferentes = novaSenha.value !== confSenha.value;
            const senhaIgualAnterior = novaSenha.value === usuario.senha;
            const tamanhoMin = novaSenha.value.length < 6;
            const vazia = novaSenha.value.length === 0 || confSenha.value.length === 0 ;

            const verificarTrocSenha = document.querySelector("#modal-trocar-senha #verification");
            const erro = document.querySelector("#modal-trocar-senha #incorrect");
            const correct = document.querySelector("#modal-trocar-senha #correct");
            const iconI = document.querySelector(".incorrect .material-icons");
            const iconC = document.querySelector(".correct .material-icons");
            erro.style.display = 'block';
            iconI.style.display = 'block';
            correct.style.display = 'none';
            iconC.style.display = 'none';
            if(vazia){    
                erro.innerText = "Prencha os campos";
                iconI.innerText = "dangerous";
                verificarTrocSenha.style.display = 'flex';

            } else if(senhasDiferentes){
                erro.innerText = "As senhas novas são diferentes";
                 iconI.innerText = "dangerous";
                verificarTrocSenha.style.display = 'flex';

            } else if(tamanhoMin){
                erro.innerText = "A senha deve ter no mínimo 6 digitos";
                 iconI.innerText = "dangerous";
                verificarTrocSenha.style.display = 'flex';
        
            } else{
                usuario.senha = novaSenha.value;
                verificarTrocSenha.style.display = 'flex';
                erro.style.display = 'none';
                iconI.style.display = 'none';
                iconC.innerHTML = "check_circle";
                correct.innerText = "Senha criada com sucesso"
                correct.style.display = 'block';
                iconC.style.display = 'block';
                
               
            }
            
            
            
            
            
            
        })
    }
})