const qs = (el) => document.querySelector(el); 
function boleto(){
    qs("div.payment-boleto").style.display = "block";
    qs("div.payment-cartao").style.display = "none";
    qs("div.payment-pix").style.display = "none";
    qs("div.payment-picpay").style.display = "none";

}

function cartao(){
    qs("div.payment-boleto").style.display = "none";
    qs("div.payment-cartao").style.display = "block";
    qs("div.payment-pix").style.display = "none";
    qs("div.payment-picpay").style.display = "none";

}

function pix(){
    qs("div.payment-boleto").style.display = "none";
    qs("div.payment-cartao").style.display = "none";
    qs("div.payment-pix").style.display = "block";
    qs("div.payment-picpay").style.display = "none";

}

function picpay(){
    qs("div.payment-boleto").style.display = "none";
    qs("div.payment-cartao").style.display = "none";
    qs("div.payment-pix").style.display = "none";
    qs("div.payment-picpay").style.display = "block";

}
