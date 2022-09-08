
// ẩn hiện cart

let cartDisplay = document.getElementById('divcart')
cartDisplay.onclick = function () {
    if (document.getElementById('cart').style.display === "none") {
        document.getElementById('cart').style.display = "block"
        document.getElementsByClassName('body')[0].style.opacity = "0.5"
    } else {
        document.getElementById('cart').style.display = "none"
        document.getElementsByClassName('body')[0].style.opacity = "1"
    }

}

// ẩn hiện Add product

function Add() {
    if (document.getElementById("addProduct").style.display === "block") {
        document.getElementById("addProduct").style.display = "none"
    } else {
        document.getElementById("addProduct").style.display = "block"
    }

}


//add product enter cart

let ProductEnterCart = []
let buttonBuy = document.querySelectorAll('.body>div>span>button')
let img = document.querySelectorAll('.body>div>img')
let nameProduct = document.querySelectorAll('.body>div>h2')
let price = document.querySelectorAll('.body>div>h3')
for (let i = 0; i < buttonBuy.length; i++) {
    buttonBuy[i].onclick = function () {
        let obj = {
            names: nameProduct[i].innerHTML,
            imgs: img[i].src,
            prices: price[i].innerHTML
        }
        ProductEnterCart.push(obj)
      ADD()
    }
}

function ADD() {
    let table =
        `<table>
               
       </table>`


    document.getElementById('product').innerHTML = table
}



