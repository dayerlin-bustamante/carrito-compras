import myJson from "./cards.json" assert { type: "json" };

const cards = document.querySelector("#box-cards");
let fragmentCards = "";

myJson.forEach((card) => {
  fragmentCards += `
    <div class="col-md-3 col-xs-6">
      <div class="card h-100">
        <img src="${card.img}" class="card-img-top" alt="weather app project">
        <div class="card-body">
          <h5 class="card-title">${card.title}</h5>
          <p class="card-text">${card.description}</p>
          <img src="${card.starts}">
          <a class="btn-primary agregar-carrito" href="#" data-id="${card.id}">+</a>
          <p class="card-precio">${card.precio}</p>
        </div>
      </div>
    </div>
  `;
});

cards.innerHTML = fragmentCards;

// Eventos
const carrito = document.querySelector("#carrito");
const contenedorCarrito = document.querySelector("#lista-carrito tbody");
const vaciasCarrito = document.querySelector("#vaciar-carrito");
let add_carrito = [];

onlisten();
function onlisten() {
  cards.addEventListener("click", addClothes);
  carrito.addEventListener("click", removeClothes);
  vaciasCarrito.addEventListener("click", () => {
    add_carrito = [];
    paintCarritoElements();
  });
}

function removeClothes(e) {
  e.preventDefault();
  if (e.target.classList.contains("borrar-clothes")) {
    const clothesId = e.target.getAttribute("data-id");
    //me quedo con los elementos menos con el del mismo ID
    add_carrito = add_carrito.filter((articulo) => articulo.id !== clothesId);
    paintCarritoElements();
  }
}

function addClothes(e) {
  e.preventDefault();
  if (e.target.classList.contains("agregar-carrito")) {
    const objCard = myJson[e.target.dataset.id];
    const existe = add_carrito.some((articulo) => articulo.id === objCard.id);
    if (existe) {
      objCard.cantidad++;
    } else {
      objCard.cantidad = 1;
      add_carrito = [...add_carrito, objCard];
    }
    paintCarritoElements();
  }
}

function paintCarritoElements() {
  //clean html
  let fragmentCarrito = "";
  //run
  add_carrito.forEach((element) => {
    const { img, title, precio, cantidad, id } = element;
    fragmentCarrito += `
    <tr>
        <td>
          <img src="${img}" width="100">
        </td>
        <td>${title}</td>
        <td>${precio}</td>
        <td>${cantidad}</td>
        <td>
          <a href="#" class="borrar-clothes" data-id="${id}">X</a>
        </td>
      </tr>
    `;
  });
  contenedorCarrito.innerHTML = fragmentCarrito;
}

//another way to clean html is:
/* function cleanHtml(){
  /elemento que tiene html
  variable.innerHTML = '';

  /another way:

  /remove each first child until there are no more
  while (variable.firstChild) {
    variable.removeChild(variable.firstChild)
  }
} */
