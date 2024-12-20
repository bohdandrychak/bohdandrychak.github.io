const inputText = document.getElementById('inputText');
        const addBtn = document.getElementById('addBtn');
        const ul = document.getElementById('ul');
        addBtn.addEventListener('click', () => {
            let text = inputText.value;
            if(text == ''){
                alert("Enter text");
            }
            else{
                let li = document.createElement('li');
                let button = document.createElement('button');
                let p = document.createElement('p');
                p.textContent = text;
                p.contentEditable = true;
                button.textContent = 'Delete';
                button.id = text;
                li.id = text;
                li.appendChild(p);
                li.appendChild(button);
                let list = ul.appendChild(li);
                inputText.value = '';
                inputText.focus();
            }
        })
        document.addEventListener('click',(item)=>{
            if(item.target.tagName === 'BUTTON' && item.target.textContent === 'Delete'){
                if(confirm("Видалити елемент?")){
                    let listLi = document.getElementById(item.target.id);
                    ul.removeChild(listLi);
                } 
            }
        })