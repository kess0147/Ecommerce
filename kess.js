
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
}
 else {
    ready()
 }

 function ready() {
    var removeButton = document.getElementsByClassName("far fa-times-circle");

for (var i = 0; i < removeButton.length; i++) {
        var button = removeButton[i]
        button.addEventListener('click', removeCartItem)
  }

    var quantityInputs = document.getElementsByClassName('cart-new-quantity-input') 
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }

    var addToCartButtons = document.getElementsByClassName('add-btn')
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }

    document.getElementsByClassName('purchase')[0].addEventListener('click', purchaseClicked)
 }

    function purchaseClicked() {
        alert('Thank you very much for your purchase, we look forward in seeing you again!!')
        var cartItems = document.getElementsByClassName('cart-new-items')[0]
        while (cartItems.hasChildNodes()) {
            cartItems.removeChild(cartItems.firstChild)
        }
        updateCartTotal()
    }


function removeCartItem(event) {
    var buttonclicked = event.target
            buttonclicked.parentElement.parentElement.parentElement.remove() 
            updateCartTotal()
}

function addToCartClicked(event) {
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName('shop-item-tittle')[0].innerText
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
    var imageSrc = shopItem.getElementsByClassName('img-add-to-cart')[0].src
    console.log(title, price, imageSrc)
    addItemToCart(title, price, imageSrc)
    updateCartTotal()
}

function addItemToCart(title, price, imageSrc) {
  var cartRow = document.createElement('div')
  cartRow.classList.add('cart-new-row')
  
  var cartItems = document.getElementsByClassName('cart-new-items')[0]
  var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
  for (var i = 0; i < cartItemNames.length; i++) {
    if (cartItemNames[i].innerText == title) {
        alert('This item is already added to the cart')
        return
    
    }
  }
  var cartRowContents = `
  <div><div><i class="far fa-times-circle"></i></div></div>
  <div class="img"><img width="80px" src="${imageSrc}"></div>
  <div class="title">${title}</div>
  <div class="cart-new-price">${price}</div>
  <div ><input class="cart-new-quantity-input" type="number" value="2"></div>
  `
  cartRow.innerHTML = cartRowContents
  cartItems.append(cartRow)
  cartRow.getElementsByClassName('far fa-times-circle')[0].addEventListener('click', removeCartItem)
  cartRow.getElementsByClassName('cart-new-quantity-input')[0].addEventListener('change', quantityChanged)
}

function quantityChanged(event) {
    var input = event.target
    if(isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCartTotal()
}



const bar = document.getElementById("bar");
const close = document.getElementById("close");
const nav = document.getElementById("navbar");

if (bar) {
    bar.addEventListener('click', ()=> {
        nav.classList.add('active');
    })
}


if (close) {
    close.addEventListener('click', ()=> {
        nav.classList.remove('active');
    })
}




function updateCartTotal(){
    var cartItemContainer = document.getElementsByClassName('cart-new-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-new-row')
    var total = 0
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart-new-price')[0]
        var quantityElement = cartRow.getElementsByClassName('cart-new-quantity-input')[0]
        var price = parseFloat(priceElement.innerText.replace('$', ''))
        var quantity = quantityElement.value
        total = total + (price * quantity)
    }
    total = Math.round(total * 100) / 100
   document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total
}




