var swiper = new Swiper(".swiper", {
    slidesPerView: 4,
    loop: true,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      breakpoints: {
        1080: {
            slidesPerView: 4,
        },
        900: {
            slidesPerView: 3
        },
        700: {
            slidesPerView: 2,
        },
        0: {
            slidesPerView: 1,
        }
    }
});

let transaltions = {}
const swiper_wrapper =  document.getElementById('swiper-wrapper')

async function loadData(lang){
    try{
        const response = await fetch(`https://bohdandrychak.github.io//PR9/locales/${lang}.json`)
        transaltions = await response.json()
        createSlides(transaltions)
        localStorage.setItem('lang', lang);
    }
    catch(error){
        console.log(`Щось пішло не так: ${error}`)
    }
}

function createSlides(data){
    swiper_wrapper.innerHTML = ''
    data.products.forEach(product => {
        let slide = document.createElement('div');
        let productTag = document.createElement('div');
        let category = document.createElement('div');
        let image = document.createElement('img');
        let name = document.createElement('a');
        let price = document.createElement('div'); 
        let btn = document.createElement('button');
        
        slide.className = "swiper-slide"
        if(product.productTag != 'none'){
            productTag.className = "product"
            productTag.classList.add(product.productTagClass)
            productTag.textContent = product.productTag
        }
        category.className = "product-category"
        category.textContent = product.category
        image.src = `images/${product.image}`
        name.textContent = product.name
        name.className = "product-name"
        name.href = product.link
        btn.className = "Btn"
        if (product.price != "none"){
           price.textContent = product.price
           btn.classList.add("buyBtn")
        }
        else{
            btn.classList.add("noBtn")
        }
        btn.textContent = product.available
        slide.appendChild(productTag)
        slide.appendChild(category)
        slide.appendChild(image)
        slide.appendChild(name)
        slide.appendChild(price)
        slide.appendChild(btn)
        swiper_wrapper.appendChild(slide)
    });
    swiper.update()
}

document.getElementById('language-selector').addEventListener('change', function(){
    const selectedLanguage = this.value
    loadData(selectedLanguage)
})
let language = localStorage.getItem('lang')
if(language == null){
    language = 'en'
}
document.getElementById("language-selector").value = language;
loadData(language)
