const qs = (el) => document.querySelector(el); 
const qsa = (el) => document.querySelectorAll(el); 


function selecionar(){
    let input = qsa("input.radio");
    let payment = qsa("div.form");
   
    for(let i=0; i<payment.length; i++){
        payment[i].style.display = "none"
    }

    for(let i=0; i<input.length; i++){
        if(input[i].checked){
            payment[i].style.display = "flex";
            break;
        }
    }
}