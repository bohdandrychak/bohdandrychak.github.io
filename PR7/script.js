const header = document.querySelector('header');
const section = document.querySelector('section');

let translations = {}

async function loadLanguage(lang){
    try{
        const response = await fetch(`https://bohdandrychak.github.io/PR7/locales/${lang}.json`)
        translations = await response.json()
        updateText()
    }
    catch (error){
        console.error(`Error loading transaltions: ${error}`)
    }
}

function updateText(){
    populateHeader(translations)
    showHeroes(translations)
}

document.getElementById('language-selector').addEventListener('change', function(){
    const selectedLanguage = this.value
    loadLanguage(selectedLanguage)
})


function populateHeader(json){
    header.innerHTML = '';
    let h1 = document.createElement('h1')
    let p = document.createElement('p')
    h1.textContent = json.squadName
    p.textContent = `${json.homeTownTranslate}: ${json.homeTown} // ${json.formedTranslate}: ${json.formed}`
    header.appendChild(h1)
    header.appendChild(p)
}

function showHeroes(json){
    section.innerHTML = '';
    json.members.forEach(member => {
        let article = document.createElement('article')
        let p1 = document.createElement('p') 
        let p2 = document.createElement('p') 
        let p3 = document.createElement('p') 
        let h2 = document.createElement('h2')
        let ul = document.createElement('ul')
        h2.textContent = member.name
        p1.textContent = `${json.secretIdentityTranslate}: ${member.secretIdentity}`
        p2.textContent = `${json.ageTranslate}: ${member.age}`
        p3.textContent = `${json.powersTranslate}:`
        article.appendChild(h2)
        article.appendChild(p1)
        article.appendChild(p2)
        article.appendChild(p3)

        member.powers.forEach(power => {
            let li = document.createElement('li')
            li.textContent = power
            ul.appendChild(li)
        })
        article.appendChild(ul)
        section.append(article)
    });
}

loadLanguage('en')