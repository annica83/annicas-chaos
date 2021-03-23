
const key = "62231d03d948a4cc38ad6f33222d7d63"

var latitude = 0;
var longitude = 0;
var searchDistance = 5;

function fetchAPI(){
const url = `https://api.documenu.com/v2/restaurants/search/geo?lat=${latitude}&lon=${longitude}&distance=${searchDistance}`;
fetch(url,
    {headers:
        {
            "X-API-KEY": key
        }
    })
    .then(response => response.json())
    .then (jsondata => {
        console.log(jsondata);
        cardList.innerHTML = "";
        //för varje restaurang skapar det en card
        for(let i = 0; i < jsondata.data.length; i++){
            createRestaurantCard(jsondata.data[i]);
        }
        
    })
    .catch(err => {console.log(err)});
}



const search = document.querySelector("#search");
search.addEventListener("click", () => {
    console.log("Boom baby!");
    fetchAPI();
}); 


const cardList = document.querySelector("#cardList");

function createRestaurantCard(restaurant) {
    const newDiv = document.createElement("div");
    newDiv.classname = "restaurantCard";

    

    const nameLabel = document.createElement("h2");
        nameLabel.innerText = restaurant.restaurant_name;
    newDiv.appendChild(nameLabel); 
    
    


    const addressLabel = document.createElement("h3");
    addressLabel.innerText = restaurant.address.formatted;
newDiv.appendChild(addressLabel);
    const phoneLabel = document.createElement("h3");
    phoneLabel.innerText = restaurant.restaurant_phone;
newDiv.appendChild(phoneLabel);

const newLine = document.createElement("hr");
newDiv.appendChild(newLine);
 

    cardList.appendChild(newDiv);
}





// kartan
    mapboxgl.accessToken = 'pk.eyJ1IjoiYW5uaWNhODMiLCJhIjoiY2tta2w3aWR2MTIzejJ4bXEwM2xkd3FqciJ9.z-iQLevaiz68epHdP-WNTA';
var map = new mapboxgl.Map({
container: 'map', // container ID
style: 'mapbox://styles/mapbox/streets-v11', // style URL
// center: [-74.5, 40], // starting position [lng, lat]
// zoom: 9 // starting zoom
});

// The `click` event is an example of a `MapMouseEvent`.
// Set up an event listener on the map.
function getCenterCoordinates() {
    const mapCenter = map.transform._center;
    latitude = mapCenter.lat;
    longitude = mapCenter.lng;
    return {lng: mapCenter.lng, lat: mapCenter.lat};
}
map.on('dragend', () => {
    // The event object (e) contains information like the
    // coordinates of the point on the map that was clicked.
    console.log(getCenterCoordinates());
  })
