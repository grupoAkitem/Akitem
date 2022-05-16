const galeryImage = document.querySelector('.galery-image');
const preview = document.querySelector('.preview');
const divMainImage = document.querySelector('.div-main-image');
const mainImage = document.querySelector('.main-image');
const zoomImage = document.querySelector('.zoom-image');
const zoomPreview = document.querySelector('.zoom-preview');


const getItem = async () => {
        const id = window.location.href.split('?')[1];
        const response = await fetch(`https://api.mercadolibre.com/items/${id}`);
        const resultss = await response.json();
        console.log(resultss);
        return resultss;
    };

    const createImages = (imageSource, imgclass) => {
        const img = document.createElement('img');
        img.className = imgclass;
        img.src = imageSource;
        return img;
    }

    const createGalery = async () => {
        const { pictures } = await getItem();
        mainImage.src = pictures[0].url
        if (pictures.length > 5) {
            const slicePicture = pictures.slice(0, 5);
            slicePicture.forEach((element) => {
                preview.appendChild(createImages(element.url, 'preview-image'))
            });
        } else {
            pictures.forEach((element) => {
                preview.appendChild(createImages(element.url, 'preview-image'))
            });
        }
    }
    
    const mainImageDynamic = ({ target }) => {
        if (target.className === 'preview-image') {
            mainImage.src = target.src;
        }
    };
    preview.addEventListener('mousemove', mainImageDynamic)
    
    window.onload = () => {
        createGalery();
    };
