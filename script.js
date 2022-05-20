import { createProductItemElement } from "./services/createElements.js";
import { fetchCategories, fetchProductGeneral } from "./services/getAPIs.js";

const allCategories = document.getElementById('all-categories');
const inputSearch = document.getElementById('search');
const sectionCardProducts = document.getElementById('cardProducts');
const searchBtn = document.getElementById('search-btn');

  // function para criar o select das categorias
  const selectCategories = async () => {
    const categories = await fetchCategories();
    categories.pop();
    categories.forEach((element) => {
        const optionsCategories = document.createElement('option');
        optionsCategories.value = element.id;
        optionsCategories.innerHTML = element.name;
        allCategories.appendChild(optionsCategories);
    });
    };

  const createCardsProducts = async (res) => {
    if (!res) {
      const { results } = await fetchProductGeneral();
      results.forEach((element) => {
        sectionCardProducts.appendChild(createProductItemElement(element));
      });
    } else {
      res.forEach((element) => {
        sectionCardProducts.appendChild(createProductItemElement(element));
      });
    }
  };

  const listProducts = async () => {
    const { results } = await fetchProductGeneral(inputSearch.value);
    if (results.length > 0) {
      const itensCards = document.querySelectorAll('.item');
      itensCards.forEach((e) => e.parentNode.removeChild(e));
      createCardsProducts(results);
      inputSearch.value = '';
    }
  };

  searchBtn.addEventListener('click', listProducts);
  document.addEventListener('keypress', ({ key }) => {
    if (key === 'Enter') {
      listProducts();
    }
  })

window.onload = () => { 
    selectCategories();
    createCardsProducts();
  };