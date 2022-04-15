const allCategories = document.getElementById('all-categories');
const inputSearch = document.getElementById('search');
const sectionCardProducts = document.getElementById('cardProducts');

// function para fazer as requisição das APIs
// site da documentação da API https://developers.mercadolivre.com.br/pt_br/itens-e-buscas
async function getAPIs(req, product, categorie) {
    let url = '';
    switch (req) {
        case 'productGeneral':
            url = `https://api.mercadolibre.com/sites/MLB/search?q=${product}`;
            break;
        case 'productCategorie':
            url =  `https://api.mercadolibre.com/sites/MLB/search?category=${categorie}`;
            break;
        case 'productGeneralCategorie':
            url = ` https://api.mercadolibre.com/sites/MLB/search?category=${categorie}&q=${product}`;
            break;
        default:
            url = 'https://api.mercadolibre.com/sites/MLB/categories';
            break;
    }
    const response = await fetch(url);
    const result = await response.json();
    return result;
  }

  const loading = (bol) => {
    if (bol) {
      const container = document.querySelector('.container');
      const h1 = document.createElement('h1');
      h1.className = 'loading';
      h1.innerHTML = 'CARREGANDO...';
      container.appendChild(h1);
    } else {
      const apagaCarregar = document.querySelector('.loading');
      apagaCarregar.parentNode.removeChild(apagaCarregar);
    }
  };

  // function para criar o select das categorias
    const selectCategories = async () => {
    const categories = await getAPIs();
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
  function createProductItemElement({ id, title, thumbnail }) {
    const section = document.createElement('section');
    section.className = 'item';
  
    section.appendChild(createCustomElement('span', 'item__id', id));
    section.appendChild(createCustomElement('span', 'item__title', title));
    section.appendChild(createProductImageElement(thumbnail));
    section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));
  
    return section;
  }

  const createCardsProducts = async () => {
    // loading(true);
    const { results } = await getAPIs('productGeneral');
    // loading(false);
    results.forEach((element) => {
      // const createObjParam = createObjCard(element.id, element.title, element.thumbnail); 
      sectionCardProducts.appendChild(createProductItemElement(element));
    });
  };

window.onload = () => { 
    selectCategories();
    createCardsProducts();
  };