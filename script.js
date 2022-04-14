const allCategories = document.getElementById('all-categories');

async function getCategories() {
    try {
      const url = 'https://api.mercadolibre.com/sites/MLB/categories';
      const response = await fetch(url);
      const result = await response.json();
      return result;
    } catch (error) {
      return error;
    }
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

window.onload = () => { 
    selectCategories();
  };