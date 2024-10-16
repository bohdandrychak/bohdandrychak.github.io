let monthInput = document.getElementById('monthInput');
let yearInput = document.getElementById('yearInput');
let cardInput = document.getElementById('cardInput');
let emailInput = document.getElementById('emailInput');
let addressInput = document.getElementById('addressInput');
let cityInput = document.getElementById('cityInput');
let zipInput = document.getElementById('zipInput');

monthInput.addEventListener('input', function(){
    if (this.value.length > 2){
        if (this.value > 12){
            this.value = 12;
            this.value = this.value.slice(0, 2);
            yearInput.focus();
        }
    }
});

yearInput.addEventListener('input', function(){
    if (this.value.length > 2){
        this.value = this.value.slice(0, 2);
    }
});

cardInput.addEventListener('input', function(){
    if (this.value.length > 19){
        this.value = this.value.slice(0, 19);
    }
});

function cancelFunc(){
    monthInput.value = '';
    yearInput.value = '';
    cardInput.value = '';
    emailInput.value = '';
    addressInput.value = '';
    cityInput.value = '';
    zipInput.value = '';
    scroll(0, 0);
}

function checkData(){
    let date = new Date();

    if (monthInput.value == '' ||
        yearInput.value == '' ||
        cardInput.value == '' ||
        emailInput.value == '' ||
        addressInput.value == '' ||
        cityInput.value == '' ||
        zipInput.value == ''){
            alert('You have not entered all the data!');
            scroll(0, 0);
    }
    else if (cardInput.value.length < 14){
        alert('Card number is incorrect');
    }
    else if (date.getFullYear() > (parseInt(yearInput.value) + 2000)){
        alert("Expiry date is incorrect");
    }
    else if ((date.getMonth() + 1) > parseInt(monthInput.value)){
        alert("Expiry date is incorrect");
    }
}