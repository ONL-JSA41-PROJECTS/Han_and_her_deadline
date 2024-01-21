const userAvt = document.getElementById("userAvt")
const username = document.getElementById("username")
const login = document.getElementById("login_signup").querySelector("a")
const logout = document.getElementById("login_signup").querySelector("span")

let account = JSON.parse(localStorage.getItem("currentAccount")) || {}
let url = account.avt || "https://i.pinimg.com/originals/bc/d8/39/bcd83978d462922ddbd4dcc0b5cedc02.jpg" //default avt link


function getUserAccount(){

    if(JSON.parse(localStorage.getItem("currentAccount"))){
        login.innerHTML = `Welcome! ${account.name}`
        userAvt.style.backgroundImage = `url(${url})`
        logout.innerHTML="logout"
        login.href = "./pages/viewAccount.html"
        userAvt.style.display = "inline-block"
    }
    else{
        login.innerHTML = "Login/Signup"
        logout.innerHTML="no_accounts"
        login.href =  "./pages/login.html"
        userAvt.style.display = "none"
    }
}

logout.addEventListener("click",function(){
    userAvt.style.display = "none"
    if(logout.innerHTML == "logout"){
        localStorage.removeItem("currentAccount")
        location.reload()
    }
    else{
        alert("No account yet!")
    }
})
getUserAccount()

userAvt.addEventListener("click",function(){
    window.location.href = "./pages/viewAccount.html"
})

// ADD USER PRODUCTS && SHOPS INTO SHOP PAGE
function addAll() {
    let userAddedProducts = []

    try{
        accounts = JSON.parse(localStorage.getItem("userAccounts"))

        for (let account of accounts) {
            for (let shop of account.shops) {
                for (let product of shop.products) {
                    userAddedProducts.push({
                        id: product.id,
                        name: product.name,
                        describe: product.info,
                        img: product.img,
                        price: product.price || 0,
                        shop: shop.name,
                        shopImg: shop.cover,
                        publish_date: product.publish_date,
                        more: shop.info,
                    })
                }
            }
        }
        console.log(userAddedProducts)
    }
    catch(err){}

    sessionStorage.setItem("addedProducts",JSON.stringify(userAddedProducts))
}

    addAll()
