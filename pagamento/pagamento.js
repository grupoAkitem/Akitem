const qs = (el) => document.querySelector(el); 
function boleto(){
    qs("div.boleto").style.display = "block";
    qs("div.cartao").style.display = "none";
    qs("div.pix").style.display = "none";
    qs("div.picpay").style.display = "none";

}

function cartao(){
    qs("div.boleto").style.display = "none";
    qs("div.cartao").style.display = "block";
    qs("div.pix").style.display = "none";
    qs("div.picpay").style.display = "none";

}

function pix(){
    qs("div.boleto").style.display = "none";
    qs("div.cartao").style.display = "none";
    qs("div.pix").style.display = "block";
    qs("div.picpay").style.display = "none";

}

function picpay(){
    qs("div.boleto").style.display = "none";
    qs("div.cartao").style.display = "none";
    qs("div.pix").style.display = "none";
    qs("div.picpay").style.display = "block";

}
