const header = document.querySelector('header');
const section = document.querySelector('section');

const requestURL = 'https://semegenkep.github.io/json/example.json';
const request = new XMLHttpRequest()
request.open('GET', requestURL)
request.responseType = 'json'
request.send()

request.onload = function(){
    const superHeroes = request.response
    populateHeader(superHeroes)
    showHeroes(superHeroes)
    
}

function populateHeader(json){
    let h1 = document.createElement('h1')
    let p = document.createElement('p')
    h1.textContent = json.squadName
    p.textContent = `Hometown: ${json.homeTown} // Formed: ${json.formed}`
    header.appendChild(h1)
    header.appendChild(p)
}

function showHeroes(json){
    json.members.forEach(member => {
        let article = document.createElement('article')
        let p1 = document.createElement('p') 
        let p2 = document.createElement('p') 
        let p3 = document.createElement('p') 
        let h2 = document.createElement('h2')
        let ul = document.createElement('ul')
        h2.textContent = member.name
        p1.textContent = `Secret identity: ${member.secretIdentity}`
        p2.textContent = `Age: ${member.age}`
        p3.textContent = `Superpowers:`
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