document.addEventListener("DOMContentLoaded",()=>{

const products = [
  {id : 1, name : "P1", price: 30},
  {id : 2, name : "P2", price: 49.99},
  {id : 3, name : "P3", price: 14.99},
  {id : 4, name : "P4", price: 69.99}
];

const cart = [];

const productList = document.getElementById("product-list");
const cartItems = document.getElementById("cart-items");
const emptyCart = document.getElementById("empty-cart");
const cartTotal = document.getElementById("cart-total");
const totalPrice = document.getElementById("total-price");
const checkoutBtn = document.getElementById("checkout-btn");
const clearCartBtn = document.getElementById("clear-cart");


products.forEach(p => {
  console.log("executed");
  const list = document.createElement("div");
  list.classList.add("product");
  list.innerHTML =`<span>${p.name} - $${p.price.toFixed(2)}</span>
  <button data-id="${p.id}">Add to Cart</button>`
  productList.appendChild(list);
});

productList.addEventListener("click",(e)=>{
  if(e.target.tagName === "BUTTON"){
    e.stopPropagation();
    const id = parseInt (e.target.getAttribute("data-id"));
    const product = products.find((p) => p.id === id);
    addToCart(product);
  }
})

function addToCart(prod){
  cart.push(prod);
  console.log(cart);
  renderCart(prod);
}

function renderCart(prod){
  cartItems.innerHTML=" ";
  let total = 0;
   if(cart.length>0){
     emptyCart.classList.add("hidden");
     cartTotal.classList.remove("hidden");

    cart.forEach((prod,index) => { 
    const item = document.createElement("li");
    item.setAttribute("id", `${index}`);
    item.innerHTML=`
    <span>${prod.name} - $${prod.price}</span>
    <button > Delete </button>`;
    cartItems.appendChild(item);
    total += prod.price;
    totalPrice.textContent=`$${total.toFixed(2)}`;
    });

  }else{
    total = 0;
    cartTotal.classList.add("hidden");
    emptyCart.classList.remove("hidden");
  }}


checkoutBtn.addEventListener("click",()=>{
  if(cart.length == 0){
    alert("Cart is empty!");
  }
  else{
    cart.length = 0;
    alert("Checkout sucessful");
    renderCart();
  }
  
})
//delete items
cartItems.addEventListener("click",(e)=>{
  if(e.target.tagName == "BUTTON"){
    let item = e.target.parentNode;
    console.log(item);
    let itemId = parseInt(item.id);
    console.log(itemId);
    cart.splice(itemId, 1);
    item.remove();
    console.log(cart);
    renderCart();
}})

clearCartBtn.addEventListener("click",()=>{
   cart.length = 0;
  console.log(cart);
  while (cartItems.firstChild) {
    cartItems.removeChild(cartItems.firstChild);
  }
  total = 0;
  totalPrice.textContent=`$0.00`;
  emptyCart.classList.remove("hidden");
})

})