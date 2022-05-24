const qs = (el) => document.querySelector(el);
const qsa = (el) => document.querySelectorAll(el);

 
qsa('form').forEach( (el)=>{
    el.addEventListener('submit', (el)=>{
    el.preventDefault();
    } )
} ); 

qs('#cpfBill').setAttribute('onkeypress', '$(this) .mask("999.999.999-99")');


qs('#cardCpf').setAttribute('onkeypress', '$(this) .mask("999.999.999-99")');


qs('#cepBill').setAttribute('onkeypress', '$(this) .mask("99999-999")');


qs('#numCartao').setAttribute('onkeypress', '$(this) .mask("9999 9999 9999 9999")');


qs('#cvc').setAttribute('onkeypress', '$(this) .mask("999")');


qs('#val').setAttribute('onkeypress', '$(this) .mask("99/99")');


qs('.boleto form #UFBill').addEventListener('keyup', (ev) => {

    const input = ev.target;
    input.value = input.value.toUpperCase();
})

/*------------------------------------------------------------------------------*/
function selecionar() {
    const input = qsa("input.radio");
    const payment = qsa("div.form");

    for (let i = 0; i < payment.length; i++) {
        payment[i].style.display = "none"
    }

    for (let i = 0; i < input.length; i++) {
        if (input[i].checked) {
            payment[i].style.display = "flex";
            break;
        }
    }
}



qs('.boleto form button').addEventListener('click', () => {
    const nameBill = qs('.boleto form #nameBill');
    const cpfBill = qs('.boleto form #cpfBill');
    const cepBill = qs('.boleto form #cepBill');
    const addressBill = qs('.boleto form #addressBill');
    const numBill = qs('.boleto form #numBill');
    const bairroBill = qs('.boleto form #bairroBill');
    const cityBill = qs('.boleto form #cityBill');
    const UFBill = qs('.boleto form #UFBill');

    if (nameBill.value.length < 5) {
        inputError(nameBill);
        return false
    }
    if (cpfBill.value.length !== 14) {
        inputError(cpfBill);
        return false;
    }
    if (cepBill.value.length !== 9) {
        inputError(cepBill);
        return false;
    }
    if (addressBill.value.length < 5) {
        inputError(addressBill);
        return false
    }
    if (bairroBill.value.length < 5) {
        inputError(bairroBill);
        return false
    }
    if (cityBill.value.length < 5) {
        inputError(cityBill);
        return false
    }
    if (numBill.value.length < 1) {
        inputError(numBill);
        return false
    }
    if (!isNaN(UFBill.value[0]) || !isNaN(UFBill.value[1]) || UFBill.value.length !== 2) {
        inputError(UFBill);
        return false
    } else {
        const doc = new jsPDF();
        const valor = 100;
        doc.setFontSize(16);
        doc.rect(0, 0, 220, 20);
        doc.rect(0, 0, 120, 20);
        doc.rect(0, 0, 220, 50);
        doc.rect(0, 0, 220, 80);


        doc.text('Beneficiário: Akitem', 15, 13);
        doc.text(`Valor: R$${valor.toFixed(2)}`, 122, 13)
        doc.text(`Pagador: ${nameBill.value}`, 15, 30);
        doc.text(`CPF:  ${cpfBill.value}`, 15, 45);
        doc.text(`${addressBill.value}     Nº ${numBill.value}`, 15, 60);
        doc.text(`Cep: ${cepBill.value}`, 15, 69)
        doc.text(`${bairroBill.value} - ${cityBill.value} - ${UFBill.value}`, 15, 77);
        doc.save('boleto');
    }
})



qs('.cartao form button').addEventListener('click', ()=>{
    const cardHolderCpf= qs('.cartao #cardCpf');
    const holderCard= qs('.cartao #cardName');
    const cardNumber= qs('.cartao #numCartao');
    const val = qs('.cartao #val');
    const valValid = val.value.split("/");
    const ano = new Date().getFullYear();
    const cardCvc= qs('.cartao #cvc');

    if (holderCard.value == "" || holderCard.value.length < 5){
        inputError(holderCard);
        return false;
    }
    if (cardHolderCpf.value.length !== 14){
        inputError(cardHolderCpf);
        return false;
    }
    
    if (cardNumber.value == "" || cardNumber.value.length < 10){
        inputError(cardNumber);
        return false;
    }
    if (cardCvc.value.length !== 3){
        inputError(cardCvc);
        return false;
    }
    if(valValid[0] > 12 || valValid[1] < ano.toString().slice(-2) ){
        inputError(val);
        return false;
    }
    
    qs('.cartao').style.height = "300px";
    qs('.cartao').innerHTML = "<h2>Aguarde enquanto processamos os dados</h2>"
    setTimeout(()=>{
        qs('.cartao').innerHTML += '<h3 class="aprovedPayment">Pagamento realizado com sucesso</h3>'
    }, 3000)

})


/*-----------------------Pix/PicPay-------------------------*/
window.onload = function(){
    const paymentValue = 100; 
    var QRcode =' https://chart.googleapis.com/chart?chs=300x300&cht=qr&chld=H&chl=Valor a ser pago: R$';
    const QRcodeContent = QRcode + encodeURIComponent(Number(paymentValue).toFixed(2));
    document.querySelector('.pix #qrcode').src = QRcodeContent;
    qs('.pix .form-value').innerHTML = `Valor da compra R$${paymentValue.toFixed(2)}`
    document.querySelector('.picpay #qrcode').src = QRcodeContent;
    qs('.picpay .form-value').innerHTML = `Valor da compra R$${paymentValue.toFixed(2)}`
}



/*-----------------------Error-------------------------*/
function inputError (el){
    el.style.boxShadow = "0px 0px 5px #f00";

    el.addEventListener('blur', ()=>{
        el.style.boxShadow = "none";
    }) 

    setTimeout(()=>{
        el.addEventListener('focus', ()=>{
            el.style.boxShadow = " 0px 0px 5px #ffbe00";
        }) 
    },3000)
   
    
}

function pesquisacep(valor){
    let cep = valor.replace(/\D/g, "");
    let script = document.createElement('script');
    script.src = 'https://viacep.com.br/ws/'+ cep + '/json/?callback=meu_callback';
    document.body.appendChild(script);
}

function limpa_formulário_cep() {
    //Limpa valores do formulário de cep.
    document.getElementById('addressBill').value= ("");
    document.getElementById('bairroBill').value= ("");
    document.getElementById('cityBill').value= ("");
    document.getElementById('UFBill').value= ("");
    
}

function meu_callback(conteudo) {
if (!("erro" in conteudo)) {
    //Atualiza os campos com os valores.
    document.getElementById('addressBill').value=(conteudo.logradouro);
    document.getElementById('bairroBill').value=(conteudo.bairro);
    document.getElementById('cityBill').value=(conteudo.localidade);
    document.getElementById('UFBill').value=(conteudo.uf);
    
} //end if.
else {
    //CEP não Encontrado.
    limpa_formulário_cep();
    inputError(qs('.boleto form #cepBill'))
}
}

function pesquisacep(valor) {

//Nova variável "cep" somente com dígitos.
var cep = valor.replace(/\D/g, '');

//Verifica se campo cep possui valor informado.
if (cep != "") {

    //Expressão regular para validar o CEP.
    var validacep = /^[0-9]{8}$/;

    //Valida o formato do CEP.
    if(validacep.test(cep)) {

        //Preenche os campos com "..." enquanto consulta webservice.
        document.getElementById('addressBill').value="...";
        document.getElementById('bairroBill').value="...";
        document.getElementById('cityBill').value="...";
        document.getElementById('UFBill').value="...";
        

        //Cria um elemento javascript.
        var script = document.createElement('script');

        //Sincroniza com o callback.
        script.src = 'https://viacep.com.br/ws/'+ cep + '/json/?callback=meu_callback';

        //Insere script no documento e carrega o conteúdo.
        document.body.appendChild(script);

    } //end if.
    else {
        //cep é inválido.
        limpa_formulário_cep();
    }
} //end if.
else {
    //cep sem valor, limpa formulário.
    limpa_formulário_cep();
}
};