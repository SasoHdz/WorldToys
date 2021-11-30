
const API = 'https://api.mercadolibre.com/sites/MLM/search?q=';
const button = document.getElementById('search');
const inputToy = document.getElementById('toy');
let app = document.getElementById('app');
const ganancia = 30;

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

        toys.forEach((element)=>{
            const container = document.createElement('DIV');
            const img = document.createElement('img');
            const title = document.createElement('p');
            const price = document.createElement('p');

            container.className =
            "text-center mt-4 mx-2 border-2 border-solid border-blue-400 items-center container-md rounded";
            img.width = '120';
            img.className = "rounded mx-auto";
            title.className = "text-xl";
            price.className = "text-xl";

            img.src = element.thumbnail;
            title.textContent = element.title;
            price.textContent = '$ '+ calcularPrecionConGanancia(parseInt(element.price),ganancia);
            container.dataset.Id = element.id;
            container.dataset.ganancia = calcularPrecionConGanancia(parseInt(element.price),ganancia) - parseInt(element.price);
            console.log(container.dataset.ganancia);
            
            container.append(img,title,price);
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
    app.className = "overflow-y-scroll mt-4 mx-auto w-5/6 grid grid-cols-3";

    const container = document.querySelector('div');
    container.appendChild(app);

}

button.addEventListener('click',searchToy);

//Falta implementar descripcion 
//Seleccionar un elemento 
//Formulario de envio 
// Y enviar los pedidos por watssap
//