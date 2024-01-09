const avt = document.getElementById("avt").querySelector("img")
const textInfo = document.getElementById("text-info")
const account = JSON.parse(localStorage.getItem("currentAccount")) || []
const accountsList = JSON.parse(localStorage.getItem("userAccounts")) || []
const changeInfoTab = document.getElementById("change-info-tab")

let index = accountsList.findIndex( acc => acc.name == account.name && acc.pass == account.pass )
let liList = document.getElementById("tab").querySelectorAll("li")
avt.src = "https://i.pinimg.com/originals/bc/d8/39/bcd83978d462922ddbd4dcc0b5cedc02.jpg"


// LOAD PAGES
function personalInfoLoad(li){
    for(let li of liList){
        li.style.backgroundColor = "#fffce6"
    }
    li.style.backgroundColor = "#e9e4be"
    textInfo.replaceChildren()

    let container = document.createElement("div")
    container.classList.add("personal-info-container","darkgrey")

    let username = document.createElement("p")
    if(account != []){
        // USERNAME
        let changeNameBtn = document.createElement("span")
        changeNameBtn.innerHTML = "edit"
        changeNameBtn.setAttribute("onclick",`changeName('${changeNameBtn}')`)
        changeNameBtn.classList.add("material-symbols-outlined")

        username.innerHTML = "<b>Username: </b> &ensp;" + account.name + "&ensp;"
        username.appendChild(changeNameBtn)
        
        container.appendChild(username)

        // PASSWORD
        let visiblePassBtn = document.createElement("span")
        visiblePassBtn.classList.add("material-symbols-outlined")
        visiblePassBtn.innerHTML = "visibility_off"

        let pass = document.createElement("p")
        pass.innerHTML ="<b>Password: </b> &ensp;"+ "*".repeat(account.pass.length) + "&ensp;"

        visiblePassBtn.onclick = function(){
            if(visiblePassBtn.innerHTML != "visibility"){
                console.log(checkUser(account.pass))
                if(checkUser(account.pass)){
                    pass.innerHTML = "<b>Password: </b> &ensp;"+ account.pass + "&ensp;"
                    visiblePassBtn.innerHTML = "visibility"
                    pass.appendChild(visiblePassBtn)
                }
            }
            else{
                visiblePassBtn.innerHTML = "visibility_off"
                pass.innerHTML = "<b>Password: </b> &ensp;"+  "*".repeat(account.pass.length) + "&ensp;"
                pass.appendChild(visiblePassBtn)
            }
        }

        pass.appendChild(visiblePassBtn)

        container.appendChild(pass)
    }
    else{
        username.innerHTML = "No account yet."
        let loginPageLink = document.createElement("a")
        loginPageLink.classList.add("login-page-link-btn")
        loginPageLink.href = "..pages/login.html"

        container.appendChild(username)
        container.appendChild(loginPageLink)
    }


    textInfo.appendChild(container)
}



function userShopsLoad(li){
    for(let li of liList){
        li.style.backgroundColor = "#fffce6"
    }
    li.style.backgroundColor = "#e9e4be"
    textInfo.replaceChildren()

}


function changeAccountLoad(li){
    for(let li of liList){
        li.style.backgroundColor = "#fffce6"
    }
    li.style.backgroundColor = "#e9e4be"
    textInfo.replaceChildren()

}


//PAGE FEATURES
const editNameBtn= document.getElementById("change-info-tab").querySelector("p").querySelector("span")

function changeName(name){
    visivleChangeInfoTab()
    changeInfoTab.querySelector("form").addEventListener("submit",function(){
        if(changeInfoTab.querySelector("input").value.trim().length != 0){
            account.name = changeInfoTab.querySelector("input").value
            accountsList[index].name = changeInfoTab.querySelector("input").value

            localStorage.setItem("currentAccount",JSON.stringify(account))
            localStorage.setItem("userAccounts",JSON.stringify(accountsList))
            alert("Changed successfully!")
        }
        else{
            alert("No change was applied")
        }
    })
}

function visivleChangeInfoTab(){
    changeInfoTab.style.display = "flex"
    changeInfoTab.querySelector("input").value = account.name
}

function hideChangeInfoTab(){
    changeInfoTab.style.display = "none"
}

// CHECK IF THE PASSWORD IS CORRECT THEN DISPLAY IT
function checkUser(pass){
    changeInfoTab.style.display = "flex"
    changeInfoTab.querySelector("p").innerHTML = "Enter your password"

    changeInfoTab.addEventListener("submit",function(e){
        console.log(changeInfoTab.querySelector("input").value)
        if(changeInfoTab.querySelector("input").value == pass){
            e.preventDefault()
            changeInfoTab.querySelector("input").value  = ""
            hideChangeInfoTab()
            return true
        }
        else{
            changeInfoTab.querySelector("input").value  = ""
            alert("Wrong password")
            hideChangeInfoTab()
            return false
        }
    })
}  