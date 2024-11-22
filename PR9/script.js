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

async function loadData(lang){
    const response = await fetch("")
}