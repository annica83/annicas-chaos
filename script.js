const url = "data.json";
const cardList = document.querySelector("#cards");

fetch(url)
    .then(response => response.json())
    .then (data => {
        console.log(data);
        createHorseCard(data);
    });

function createHorseCard(data){
    const newDiv = document.createElement("div");

    const horseName = document.createElement("h2");
    horseName.innerText = data.name;

    const favoriteFood = document.createElement("h3");
    favoriteFood.innerText = data.favoriteFood;

    newDiv.appendChild(horseName);
    newDiv.appendChild(favoriteFood);

    cardList.appendChild(newDiv);

}
