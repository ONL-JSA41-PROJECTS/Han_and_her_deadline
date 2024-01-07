
const username = document.getElementById("username")
const login = document.getElementById("login_signup").querySelector("a")
const logout = document.getElementById("login_signup").querySelector("span")

let account = JSON.parse(localStorage.getItem("currentAccount")) || {}

function getUserAccount(){

    if(JSON.parse(localStorage.getItem("currentAccount"))){
        login.innerHTML = `Welcome! ${account.name}`
        logout.innerHTML="logout"
    }
    else{
        login.innerHTML = "Login/Signup"
        logout.innerHTML="no_accounts"
    }
}

logout.addEventListener("click",function(){
    if(logout.innerHTML == "logout"){
        localStorage.removeItem("currentAccount")
        location.reload()
    }
    else{
        alert("No account yet!")
    }
})
getUserAccount()
