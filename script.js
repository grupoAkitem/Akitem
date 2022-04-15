const allCategories = document.getElementById('all-categories');

// function para fazer as requisição das APIs
async function getCategories(req, product, categorie) {
    let url = 'https://api.mercadolibre.com/sites/MLB/categories';
    switch (req) {
        case 'productGeneral':
            url = `https://api.mercadolibre.com/sites/MLB/search?q=${product}`
        case 'productCategorie':
            url =  `https://api.mercadolibre.com/sites/MLB/search?category=${categorie}`
        case 'productGeneralCategorie':
            url = ` https://api.mercadolibre.com/sites/MLB/search?category=${categorie}&q=${product}`
        default:
            url = 'https://api.mercadolibre.com/sites/MLB/categories';
    }
    const response = await fetch(url);
    const result = await response.json();
    return result;
  }


  // function para criar o select das categorias
    const selectCategories = async () => {
    const categories = await getCategories();
    categories.forEach((element) => {
        const optionsCategories = document.createElement('option');
        optionsCategories.value = element.id;
        optionsCategories.innerHTML = element.name;
        allCategories.appendChild(optionsCategories);
    });
    };

    // function para criar img
    function createProductImageElement(imageSource) {
    const img = document.createElement('img');
    img.className = 'item__image';
    img.src = imageSource;
    return img;
  }
  
  // function para criar elementos
  function createCustomElement(element, className, innerText) {
    const e = document.createElement(element);
    e.className = className;
    e.innerText = innerText;
    return e;
  }
  
  // function para criar section com elementos
  function createProductItemElement({ sku, name, image }) {
    const section = document.createElement('section');
    section.className = 'item';
  
    section.appendChild(createCustomElement('span', 'item__sku', sku));
    section.appendChild(createCustomElement('span', 'item__title', name));
    section.appendChild(createProductImageElement(image));
    section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));
  
    return section;
  }

//   const createCardsProducts = () => {

//   };

window.onload = () => { 
    selectCategories();
  };