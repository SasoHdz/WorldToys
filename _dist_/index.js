import getDescription from "./getData.js";

const API = 'https://api.mercadolibre.com/sites/MLM/search?q=';
const button = document.getElementById('search');
const inputToy = document.getElementById('toy');
let app = document.getElementById('app');
const ganancia = 20;

function calcularPrecionConGanancia(precio, descuento)
{
    const precioDescuento = (precio*(100 + descuento)/100);

    return precioDescuento;
}


const fetchData = (url) => {
    window.fetch(url)
    .then(reponse => reponse.json())
    .then(responseJson => {
        let toys = responseJson.results;
        let nodos = [];
        let i = 0;

        toys.forEach((element)=>{
            const container = document.createElement('DIV');
            const img = document.createElement('img');
            const title = document.createElement('p');
            const price = document.createElement('p');
            const buton = document.createElement('button');

            if(i%2==0){
                container.className =
                "text-center mt-4 mx-2 border-2 border-solid border-blue-400 bg-blue-300 items-center sm:container-sm md:container-md rounded-2xl";
                buton.className = "w-40 mt-4 rounded-lg bg-blue-500 text-white text-xl";
            }
            else {
                container.className =
                "text-center mt-4 mx-2 border-2 border-solid border-pink-400 bg-pink-300 items-center container-md rounded-2xl";
                buton.className = "w-40 mt-4 mb-4 rounded-lg bg-pink-500 text-white text-xl";
            }
            i++;

            img.width = '120';
            img.className = "rounded-lg mx-auto";
            title.className = "text-xl text-gray-600";
            price.className = "text-xl text-gray-600";

            img.src = element.thumbnail;
            title.textContent = element.title;
            price.textContent = '$ '+ calcularPrecionConGanancia(parseInt(element.price),ganancia);
            container.dataset.Id = element.id;
            container.dataset.ganancia = calcularPrecionConGanancia(parseInt(element.price),ganancia) - parseInt(element.price);
            buton.textContent = 'Detalles';
            console.log(container.dataset.ganancia);
            
            container.append(img,title,price,buton);
            nodos.push(container);
        })
        app.append(...nodos);
    });
}


const searchToy = () => {
    cleanToys();
    const toy = inputToy.value;
    console.log(toy);

    const URL = API+toy;
    console.log(URL);
    fetchData(URL);
}

const cleanToys = () => { 
    const toys = app;
    toys.remove();
    app = document.createElement('div');
    app.id = 'app';
    app.className = "overflow-y-scroll mt-4 mx-auto w-5/6 grid sm:grid-cols-2 md:grid-cols-3";

    const container = document.querySelector('div');
    container.appendChild(app);

}

button.addEventListener('click',searchToy);
inputToy.addEventListener('input',searchToy);

//Falta implementar descripcion 
//Seleccionar un elemento 
//Formulario de envio 
// Y enviar los pedidos por watssap
//