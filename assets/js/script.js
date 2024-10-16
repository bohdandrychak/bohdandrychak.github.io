function scroll_up(){
    window.scrollTo({top: 0, behavior: 'smooth'});
}
function scroll_about(){
    const elem = document.querySelector('.about');
    elem.scrollIntoView({behavior: 'smooth'});
}
function scroll_skills(){
    const elem = document.querySelector('.portfolio-skills');
    elem.scrollIntoView({behavior: 'smooth'});
}
function scroll_portfolio(){
    const elem = document.querySelector('.portfolio');
    elem.scrollIntoView({behavior: 'smooth'});
}
function scroll_contact(){
    const elem = document.querySelector('.contact');
    elem.scrollIntoView({behavior: 'smooth'});
}