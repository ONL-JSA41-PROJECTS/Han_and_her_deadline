const userAvt = document.getElementById("userAvt")
const username = document.getElementById("username")
const login = document.getElementById("login_signup").querySelector("a")
const logout = document.getElementById("login_signup").querySelector("span")

let account = JSON.parse(localStorage.getItem("currentAccount")) || {}
let url = "https://cn-e-pic.itoon.org/cartoon-posters/24244213562.webp"

function getUserAccount(){

    if(JSON.parse(localStorage.getItem("currentAccount"))){
        login.innerHTML = `Welcome! ${account.name}`
        userAvt.style.backgroundImage = `url(${url})`
        logout.innerHTML="logout"
        login.href = "../pages/viewAccount.html"
        userAvt.style.display = "inline-block"
    }
    else{
        login.innerHTML = "Login/Signup"
        logout.innerHTML="no_accounts"
        login.href = "../pages/login.html"
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
    window.location.href = "../pages/viewAccount.html"
})