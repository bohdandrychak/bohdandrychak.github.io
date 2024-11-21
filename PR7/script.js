document.addEventListener("DOMContentLoaded", () =>{
    let translations = {}


    async function loadLanguage(lang){
        try{
            const response = await fetch(`https://bohdandrychak.github.io/PR7/locales/${lang}.json`)
            translations = await response.json()
            updateText()
        }
        catch (eror){
            console.error(`Error loading transaltions: ${error}`)
        }
    }

    function updateText(){
        document.getElementById('greeting').textContent = translations['greeting'] || 'greeting'
        document.getElementById('farewell').textContent = translations['farewell'] || 'farewell'
    }

    document.getElementById('language-selector').addEventListener('change', function(){
        const selectedLanguage = this.value
        loadLanguage(selectedLanguage)
    })
    loadLanguage('en')
})
