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
        const response = await fetch(`https://bohdandrychak.github.io//PR9/${lang}.json`)
        transaltions = await response.json()
        createSlides(transaltions)
    }
    catch(error){
        console.log(`Щось пішло не так: ${error}`)
    }
}

function createSlides(data){
    swiper_wrapper.innerHTML = ''
    data.products.forEach(product => {
        let productTag = document.createElement('div');
        let category = document.createElement('div');
        let image = document.createElement('img');
        let name = document.createElement('a');
        let price = document.createElement('div'); 
        let btn = document.createElement('button');
        
        if(product.productTag != 'none'){
            productTag.className = "product"
            productTag.classList.add(`${productTagClass}`)
        }
        category.className = "product-category"
        image.src = `images/${product.image}`
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
        swiper_wrapper.appendChild(productTag)
        swiper_wrapper.appendChild(category)
        swiper_wrapper.appendChild(image)
        swiper_wrapper.appendChild(name)
        swiper_wrapper.appendChild(price)
        swiper_wrapper.appendChild(btn)
    });
}
loadData('en')