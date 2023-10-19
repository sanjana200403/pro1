const bar = document.getElementById('bar')
const nav = document.getElementById('navbar')
const close= document.getElementById('close')

if(bar){
    bar.addEventListener('click',()=>{
        nav.classList.add('active')
    })
}
if(close){
    close.addEventListener('click',()=>{
        nav.classList.remove('active')
    })
}
// ----open and close
const cartIcon = document.querySelector('#lg-bag')
const cartIcon2 = document.querySelector('#bg')
// console.log(cartIcon)
const cart = document.querySelector('.cart')
// console.log(cart)
const closeCart = document.querySelector('#cart-close')



if(cartIcon){
    cartIcon.addEventListener('click',()=>{
        cart.classList.add('active')
    })
}
if(cartIcon2){
    cartIcon2.addEventListener('click',()=>{
        cart.classList.add('active')
    })
}
if(closeCart){
    closeCart.addEventListener('click',()=>{
        cart.classList.remove('active')
    })
}
// ---- start when the document is ready....
if(document.readyState == "loading"){
document.addEventListener('DOMContentLoaded',start)
}
else{
    start()
}
// ---start
function start(){
    addEvents();

}
// -----update andrerender----
function update(){
    addEvents();
    updateTotal()

}
// -----add events---
function addEvents(){
    // remove items from cart
let cartRemove_btns = document.querySelectorAll('.cart-remove')
// console.log(cartRemove_btns)
cartRemove_btns.forEach((btn)=>{
   btn.addEventListener ('click',handle_removeCartItem)
})


// change item quantity
let cartQuantity_inputs = document.querySelectorAll('.cart-quantity')
cartQuantity_inputs.forEach(input=>{
    input.addEventListener("change",handle_quantity_change)
})
// add item
 let addCart_btns = document.querySelectorAll('.add-cart')
addCart_btns.forEach((btn)=>{
    btn.addEventListener('click',handle_addCartItem)

})
// ----buy order
const buy_btn =document.querySelector(".btn-buy")
buy_btn.addEventListener('click',handle_buyOrder)
}

//----------------- handle event functions---------
 let itemAdded =[]
function handle_addCartItem(){
    let product = this.parentElement;
    let title = product.querySelector('.sTitle').innerHTML
    let price = product.querySelector('.sPrice').innerHTML
    let img =product.querySelector('.img').src
    // console.log(title)
    // console.log(price)
    // console.log(img)
    let newToAdd ={
        title,
        price,
        img
    }
  
    
// handle cart item is already in exist
if(itemAdded.find(el=>el.title == newToAdd.title)){
    alert("This item is alredy Exist")
    return;
}  else{
    itemAdded.push(newToAdd)
        
}

    // ----add product to cart
let cartBoxElement = CartBoxComponent(title,price,img)
let newNode = document.createElement('div')
newNode.innerHTML = cartBoxElement
const cartContent = cart.querySelector(".cart-content");
cartContent.appendChild(newNode)
alert("item added")
update()
}

function handle_removeCartItem(){
this.parentElement.remove();
// update()
itemAdded = itemAdded.filter(
    (el)=>
    el.title ==
     this.parentElement.querySelector(".card-product-title").innerHTML);
// console.log(this.parentElement)
update();
// handle_addCartItem()
// handle_buyOrder()



}

function handle_quantity_change(){
    if(isNaN(this.value)|| this.value<1){
        this.value=1
    }
    this.value = Math.floor(this.value)
    update()

}

function handle_buyOrder(){
    if(itemAdded.length <=0){
        alert("there is no order to place Yet \n please make an order first")
        return;
    }
    const cartContent = cart.querySelector(".cart-content")
    cartContent.innerHTML=""
    alert("your order will be placed tomorrow")
    // cartContent.innerHTML=""
    itemAdded=[]
    update()
}
// function update total--------------------------------
function updateTotal(){
    let cartBoxes = document.querySelectorAll('.cart-box')
    const totalElement = cart.querySelector('.total-price')
    let total =0;
    cartBoxes.forEach(cartBox=>{
        let priceElement = cartBox.querySelector('.cart-price')
        let price = parseFloat(priceElement.innerHTML.replace("$",""))
        // console.log(price)
        let quantity = cartBox.querySelector(".cart-quantity").value
        total += price*quantity
    })
// keep 2 digit after the decimal  point
total = total.toFixed(2)
    totalElement.innerHTML="$"+total
}

// ---html component

function CartBoxComponent(title,price,img){


    return `
 <div class="cart-box">
<img src=${img} width="100px" alt="" class="cart-img">
<div class="detail-box">
    <div class="card-product-title">
    ${title}
    </div>
    <div class="cart-price">${price}</div>
    <input type="number" value="1" class="cart-quantity">
</div>
<!-- remove cart -->
<i class="fa-solid fa-trash cart-remove"></i>
</div> 

`

}
function hello(){
    console.log("hii")
}

