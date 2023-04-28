let menus = [
    {
        'name': 'Pizza Margherita',
        'price': '7,50 €',
        'cost': 7.5,
        'description': 'Pizza mit Tomaten, Mozzarella und Basilikum, typisch italienisch und köstlich.',
        'image': '',
        'amount': 0
    },
    {
        'name': 'Pizza Quattro Formaggi',
        'price': '8,50 €',
        'cost': 8.5,
        'description': 'Mit 4 verschiedenen Käsesorten, cremig und herzhaft.',
        'image': '',
        'amount': 0
    },
    {
        'name': 'Pizza Diavola',
        'price': '9,00 €',
        'cost': 9,
        'description': 'Scharfe Pizza mit Salami, Paprika und Peperoni, feurig und lecker.',
        'image': '',
        'amount': 0
    },
    {
        'name': 'Pizza Prosciutto e Funghi',
        'price': '8,50 €',
        'cost': 8.5,
        'description': 'Mit Schinken und Pilzen, klassisch und rustikal.',
        'image': '',
        'amount': 0
    },
    {
        'name': 'Pizza Capricciosa',
        'price': '9,50 €',
        'cost': 9.5,
        'description': 'Mit Schinken, Artischocken und Oliven, vielseitig und vollmundig.',
        'image': '',
        'amount': 0
    },
];

let shoppingCartAmount = [];
let shoppingCartPizza = [];
let shoppingCartCost = [];


function renderMenu() {
    let content = document.getElementById('menuContent');

    content.innerHTML = '';

    for (let i = 0; i < menus.length; i++) {
        const menu = menus[i];

        content.innerHTML +=
            templateMenu(i);
    };
    content.innerHTML += templateImpressum();
};


function templateMenu(i) {
    return /*html*/`
        <div onclick="addToCart(${i})" class="single-menu">
            <h4 class="single-menu-headline">${menus[i]['name']}</h4>
            <p class="single-menu-description">${menus[i]['description']}</p>
            <p class="single-menu-price">${menus[i]['price']}</p>
        </div>
    `;
};


function templateImpressum() {
    return /*html*/`
        <div class="impressum">
        <b>Impressum:</b> <br>
        <br>
        Pizzeria Da Luigi <br>
        Mariostraße 21 <br>
        12345 Pilzkönigreich <br>
        Gesetzlicher Vertreter: Luigi <br>
        </div>
    `;
};


function renderShoppingCart() {
    let contentCart = document.getElementById('shoppingCart');
    contentCart.innerHTML = '';
    if (shoppingCartAmount.length == 0) {
        contentCart.innerHTML +=
            templateEmptyShoppingCart();
    } else {
        contentCart.innerHTML += /*html*/`
        <h2 class="shopping-cart-headline">Warenkorb</h2>
        `;
        for (let i = 0; i < shoppingCartPizza.length; i++) {
            contentCart.innerHTML +=
                templateShoppingCart(i).replace(".", ",");
        };
        contentCart.innerHTML += renderSumCart().replace(".", ",");
    };
};


function renderShoppingCartPhone() {
    let contentCart = document.getElementById('innerContentShoppingCartPhone');
    contentCart.innerHTML = '';
    if (shoppingCartAmount.length == 0) {
        contentCart.innerHTML +=
            templateEmptyShoppingCart();
    } else {
        contentCart.innerHTML += /*html*/`
        <h2 class="shopping-cart-headline">Warenkorb</h2>
        `;
        for (let i = 0; i < shoppingCartPizza.length; i++) {
            contentCart.innerHTML +=
                templateShoppingCart(i).replace(".", ",");
        };
        contentCart.innerHTML += renderSumCart().replace(".", ",");
    };

}


function templateShoppingCart(i) {
    return /*html*/`
        <table class="table">
            <tr>
                <td class="td1">${shoppingCartAmount[i]} x</td>
                <td class="td2">${shoppingCartPizza[i]}</td>
                <td class="td3">${shoppingCartCost[i].toFixed(2)} €</td>
            </tr>
        </table>
        <div class="container-cart-buttons">
            <img onclick="decreaseAmount(${i})" src="./icons/minus.png" id="decreaseButton${[i]}" class="button-cart hover">
            <img onclick="increaseAmount(${i})" src="./icons/plus.png" id="increaseButton${[i]}" class="button-cart hover">
        </div>
        <br class="linebreak-shopping-cart-single">
    `;
};


function templateEmptyShoppingCart() {
    return /*html*/`
            <h2 class="shopping-cart-headline">Warenkorb</h2>
            <div id="emptyCart" class="cart-empty">
                <img class="img-shopping-cart" src="./icons/shopping-bag.png" alt="">
                <h4 class="headline-shopping-cart">Fülle deinen Warenkorb</h4>
                <p>Füge einige leckere Gerichte aus der Speisekarte hinzu und bestelle dein Essen.</p>
            </div>
    `;
};


function addToCart(i) {
    let pizza = shoppingCartPizza.indexOf(menus[i]['name']);

    if (pizza === -1) {
        shoppingCartAmount.push(menus[i]['amount']);
        shoppingCartPizza.push(menus[i]['name']);
        shoppingCartCost.push(menus[i]['cost']);
        pizza = shoppingCartPizza.indexOf(menus[i]['name']);
        shoppingCartAmount[pizza] += 1;
    } else {
        shoppingCartAmount[pizza] += 1;
        shoppingCartCost[pizza] += menus[i]['cost'];
    };
    renderShoppingCart();
};


function increaseAmount(i) {
    shoppingCartAmount[i] += 1;
    shoppingCartCost[i] = shoppingCartCost[i] / (shoppingCartAmount[i] - 1) * shoppingCartAmount[i];
    renderShoppingCart();
    renderShoppingCartPhone();
};


function decreaseAmount(i) {
    if (shoppingCartAmount[i] > 1) {
        shoppingCartAmount[i] -= 1;
        shoppingCartCost[i] = shoppingCartCost[i] / (shoppingCartAmount[i] + 1) * shoppingCartAmount[i];
    } else if (shoppingCartAmount[i] === 1) {
        shoppingCartAmount.splice(i, 1);
        shoppingCartCost.splice(i, 1);
        shoppingCartPizza.splice(i, 1);
    };
    renderShoppingCart();
    renderShoppingCartPhone();
};


function renderSumCart() {
    let sum = 0;
    let delivery = 0;
    
    for (let i = 0; i < shoppingCartCost.length; i++) {
        sum += shoppingCartCost[i];
    };

    let total = sum + delivery;

    return /*html*/`
        <div class="sum-row">
            <p>Zwischensumme:</p>
            <p>${sum.toFixed(2)} €</p>
        </div>
        <div class="sum-row">
            <p>Lieferkosten:</p>
            <p>${delivery.toFixed(2)} €</p>
        </div>
        <div class="sum-row">
            <p>Gesamtkosten:</p>
            <p id="orderSum">${total.toFixed(2)} €</p>
        </div>
        <button onclick="sendOrder(${total})" class="order-button hover">Bestellen</button>
    `;
};


function sendOrder (total) {
    if (total >= 25) {
        shoppingCartAmount.splice(0, shoppingCartAmount.length);
        shoppingCartPizza.splice(0, shoppingCartPizza.length);
        shoppingCartCost.splice(0, shoppingCartCost.length);
        renderShoppingCart();
        renderShoppingCartPhone();
        alert('Ihre Bestellung ist eingegangen und wird bearbeitet.')
    } else {
        alert('Der Mindestbestellwert beträgt 25 €')
    };
};


function openShoppingCartPhone() {
    content = document.getElementById('contentShoppingCartPhone');
    content.classList.remove('d-none');
    content.classList.add('d-flex');
    renderShoppingCartPhone();
}


function closeShoppingCartPhone() {
    content = document.getElementById('contentShoppingCartPhone');
    content.classList.add('d-none');
    content.classList.remove('d-flex');

}


