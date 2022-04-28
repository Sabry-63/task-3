class Product {
    constructor(name, price) {
        this.id = Date.now();
        this.name = name;
        this.price = price;
        this.isInCart = false;
        this.quantity = 0;
    }
}

class Products {
    constructor() {
        this.itemsProducts = [];
    }
    addProduct(name, price) {
        const product = new Product(name, price);
        this.itemsProducts.push(product);
        return product;
    }
}

class Cart {
    constructor() {
        this.cartProducts = [];
    }

    addToCart(id) {
        const product = products.itemsProducts.find((p) => p.id === id);
        this.cartProducts.forEach((p) => {
            if (p.id === product.id) {
                p.quantity++;
            }
        });
        if (!product.isInCart) {
            this.cartProducts.push(product);
            product.quantity = 1;
            product.isInCart = true;
        }
    }

    removeInCart(id) {
        const product = products.itemsProducts.find((p) => p.id === id);
        this.cartProducts = this.cartProducts.filter(
            (p) => p.id !== product.id
        );
        product.isInCart = false;
    }

    totalPrices() {
        const producPrice = this.cartProducts.map((p) => p.price * p.quantity);
        let total = 0;
        for (let i in producPrice) {
            total += producPrice[i];
        }
        return total;
    }
}

const products = new Products();
const btnCreate = document.getElementById('btn-create');
const inputName = document.getElementById('productName');
const inputPrice = document.getElementById('productPrice');

btnCreate.addEventListener('click', () => {
    const name = inputName.value;
    const price = inputPrice.value;
    if (name === '') {
        inputName.focus();
    } else if (price === '') {
        inputPrice.focus();
    } else {
        products.addProduct(name, parseInt(price));
        renderProducts(products);
        inputName.value = '';
        inputPrice.value = '';
    }
});

const renderProducts = (products) => {
    const productContainer = document.getElementById('products');
    productContainer.innerHTML = '';
    products.itemsProducts.forEach((p) => {
        productContainer.innerHTML += `
        <div class="col-md-3 mb-3">
            <div class="card">
                <div class="card-body">
                    <h4 class="card-title">${p.name}</h4>
                    <p class="card-text">${p.price}</p>
                    <button class="btn btn-secondary" id="addToCart" onClick=(addToCart(${p.id}))>
                        <i
                            class="fa fa-cart-plus"
                            aria-hidden="true"
                        ></i>
                    </button>
                </div>
            </div>
        </div>
        `;
    });
};

const cart = new Cart();
const cartTotal = document.querySelector('.cartTotal');
function addToCart(product) {
    cart.addToCart(product);
    const itemsInCart = cart.cartProducts;
    renderCart(itemsInCart);
}

function removeInCart(product) {
    cart.removeInCart(product);
    const itemsInCart = cart.cartProducts;
    renderCart(itemsInCart);
}

function renderCart(itemsInCart) {
    const counter = document.querySelector('.bagde-contuer');
    const cartContent = document.querySelector('.cartContent');
    const total = cart.totalPrices();
    counter.textContent = itemsInCart.length;
    cart.totalPrices();
    cartTotal.textContent = total;

    cartContent.innerHTML = '';
    itemsInCart.forEach((p) => {
        cartContent.innerHTML += `
            <div class="card mb-3 border-bottom pb-3">
                <div class="card-body">
                    <h4 class="card-title">name: ${p.name}</h4>
                    <p class="card-text">price :${p.price}</p>
                    <p class="card-text">quantity :${p.quantity}</p>
                    <button class="btn btn-secondary" id="addToCart" onClick=(removeInCart(${p.id}))>
                        <i
                            class="fa fa-times"
                            aria-hidden="true"
                        ></i>
                    </button>
                </div>
            </div>
        `;
    });
}
