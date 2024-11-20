document.addEventListener('DOMContentLoaded', getMyLocation);
let watchId =  null;
let map = L.map('map')
const ourCoords = { latitude: 48.9154705, 
                    longitude: 24.7329644};

function getMyLocation(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(displayLocation, displayError);
        map.setView([ourCoords.latitude, ourCoords.longitude], 13);
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);
        var marker = L.marker([ourCoords.latitude, ourCoords.longitude]).addTo(map);
        marker.bindPopup(`Your are here: ${ourCoords.latitude}, ${ourCoords.longitude}`).openPopup();
        var watchButton = document.getElementById("watch");
        watchButton.onclick = watchLocation;
        var clearWatchButton = document.getElementById("clearWatch");
        clearWatchButton.onclick = clearWatch;
    }
    else{
        alert("Oops, no geolocation support");
    }
}

function displayLocation(positon){
    let latitude = positon.coords.latitude;
    let longitude = positon.coords.longitude;
    let div = document.getElementById('location');
    div.innerHTML = `You are at Latitude: ${latitude}, Longitude: ${longitude}`;
    div.innerHTML += `(With ${positon.coords.accuracy} meters accuracy)`
    let km = computeDistance(positon.coords, ourCoords);
    let distance = document.getElementById("distance");
    distance.innerHTML = `You are ${km} km from the college`

    var marker = L.marker([latitude, longitude]).addTo(map);
        marker.bindPopup(`Your are here: ${latitude}, ${longitude}`).openPopup();
}

function displayError(error){
    const errorTypes = {
        0: "Unknown error",
        1: "Permission denied by user",
        2: "position is not available",
        3: "Request timed out"
    };
    let errorMessage = errorTypes[error.code];
    if(error.code == 0 || error.code == 2){
        errorMessage = errorMessage + " " + error.message;
    }
    let div = document.getElementById("location");
    div.innerHTML = errorMessage;
}

function computeDistance(startCoords, destCoords){
    let startLatRads = degreesToRadians(startCoords.latitude);
    let startLongRads = degreesToRadians(startCoords.longitude);
    let destLatRads =  degreesToRadians(destCoords.latitude);
    let destLongRads = degreesToRadians(destCoords.longitude);
    let Radius = 6471;

    let distance = Math.acos(Math.sin(startLatRads) * Math.sin(destLatRads) + 
        Math.cos(startLatRads) * Math.cos(destLatRads) * 
        Math.cos(startLongRads - destLongRads)) * Radius;
    
        return distance;
}

function degreesToRadians(degrees){
    let radians = (degrees * Math.PI)/180;
    return radians;
}

function watchLocation(){
    watchId = navigator.geolocation.watchPosition(displayLocation, displayError)
}

function clearWatch(){
    if(watchId){
        navigator.geolocation.clearWatch(watchId)
        watchId = null;
    }
}
let applyBtn = document.getElementById('applyBtn');
applyBtn.addEventListener('click', addPin)
function addPin(){
    let x = parseFloat(document.getElementById('x').value);
    let y = parseFloat(document.getElementById('y').value);
    if (isNaN(x) || isNaN(y)|| x < -90 || x > 90 || y < -180 || y > 180) {
        alert("Невірні координати");
        return;
    }
    map.setView([x, y], 13);
    var marker = L.marker([x, y]).addTo(map)
}