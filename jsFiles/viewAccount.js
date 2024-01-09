const avt = document.getElementById("avt").querySelector("img")
const textInfo = document.getElementById("text-info")
const account = JSON.parse(localStorage.getItem("currentAccount")) || []
const accountsList = JSON.parse(localStorage.getItem("userAccounts")) || []
const changeInfoTab = document.getElementById("change-info-tab")
const mainInput = document.getElementById("text-input")
const notification = document.getElementById("custom-alert")

let index = accountsList.findIndex(acc => acc.name == account.name && acc.pass == account.pass)
let liList = document.getElementById("tab").querySelectorAll("li")
avt.src = "https://i.pinimg.com/originals/bc/d8/39/bcd83978d462922ddbd4dcc0b5cedc02.jpg"

// ALERT
function notice(content){
    notification.style.display = "flex"
    notification.innerHTML = content
    setTimeout(function(){
        notification.style.display="none"
    },3000)
}

// LOAD PAGES
function personalInfoLoad(li) {
    for (let li of liList) {
        li.style.backgroundColor = "#fffce6"
    }
    li.style.backgroundColor = "#e9e4be"
    textInfo.replaceChildren()

    let container = document.createElement("div")
    container.classList.add("personal-info-container", "darkgrey")

    let username = document.createElement("p")
    if (account != []) {
        // USERNAME
        let changeNameBtn = document.createElement("span")
        changeNameBtn.innerHTML = "edit"
        changeNameBtn.onclick = function () { changeName() }
        changeNameBtn.classList.add("material-symbols-outlined")

        username.innerHTML = "<b>Username: </b> &ensp;" + account.name + "&ensp;"
        username.appendChild(changeNameBtn)

        container.appendChild(username)

        // PASSWORD
        let visiblePassBtn = document.createElement("span")
        visiblePassBtn.classList.add("material-symbols-outlined")
        visiblePassBtn.innerHTML = "visibility_off"

        let pass = document.createElement("p")
        pass.innerHTML = "<b>Password: </b> &ensp;" + "*".repeat(account.pass.length) + "&ensp;"

        let changePassBtn = document.createElement("p")
        changePassBtn.innerHTML = "Change password?"
        changePassBtn.classList.add("change-pass-btn")
        changePassBtn.onclick = async function(){
            changePass()
        }

        visiblePassBtn.onclick = function () {
            checkUser(visiblePassBtn, pass)
        }

        pass.appendChild(visiblePassBtn)

        container.appendChild(pass)
        container.appendChild(changePassBtn)
    }
    else {
        username.innerHTML = "No account yet."
        let loginPageLink = document.createElement("a")
        loginPageLink.classList.add("login-page-link-btn")
        loginPageLink.href = "..pages/login.html"

        container.appendChild(username)
        container.appendChild(loginPageLink)
    }


    textInfo.appendChild(container)
}



function userShopsLoad(li) {
    for (let li of liList) {
        li.style.backgroundColor = "#fffce6"
    }
    li.style.backgroundColor = "#e9e4be"
    textInfo.replaceChildren()

}


function changeAccountLoad(li) {
    for (let li of liList) {
        li.style.backgroundColor = "#fffce6"
    }
    li.style.backgroundColor = "#e9e4be"
    textInfo.replaceChildren()

    for(let acc of accountsList){
        let container = document.createElement("div")
        container.classList.add("account-display-load")
        
        if(acc.name == account.name && acc.pass == account.pass){
            container.classList.add("darkgrey")
        }
        else{
            container.classList.add("unselected")
        }

        container.onclick = function(){
            localStorage.setItem("currentAccount",JSON.stringify(acc))
            location.reload()
        }

        let name = document.createElement("p")
        name.innerHTML = acc.name
        container.appendChild(name)

        textInfo.appendChild(container)
    }
}


//PAGE FEATURES
const editNameBtn = document.getElementById("change-info-tab").querySelector("p").querySelector("span")

function changeName() {
    visivleChangeInfoTab()
    changeInfoTab.querySelector("form").addEventListener("submit", function () {
        if (mainInput.value.trim().length != 0) {
            account.name = changeInfoTab.querySelector("input").value
            accountsList[index].name = changeInfoTab.querySelector("input").value

            localStorage.setItem("currentAccount", JSON.stringify(account))
            localStorage.setItem("userAccounts", JSON.stringify(accountsList))
            notice("Changed successfully!")
        }
        else {
            notice("No change was applied")
        }
    })
}

function visivleChangeInfoTab() {
    changeInfoTab.style.display = "flex"
    changeInfoTab.querySelector("input").value = account.name
}

function hideChangeInfoTab() {
    changeInfoTab.style.display = "none"
}

// CHECK IF THE PASSWORD IS CORRECT THEN DISPLAY IT
function checkUser(visiblePassBtn, passContainer) {
    changeInfoTab.querySelector("p").innerHTML = "Enter your password"

    if (visiblePassBtn.innerHTML != "visibility") {
        changeInfoTab.style.display = "flex"

        changeInfoTab.querySelector("form").addEventListener("submit", function (e) {
            e.preventDefault()
            if (mainInput.value == account.pass) {
                hideChangeInfoTab()
                passContainer.innerHTML = "<b>Password: </b> &ensp;" + account.pass + "&ensp;"
                visiblePassBtn.innerHTML = "visibility"
                passContainer.appendChild(visiblePassBtn)
            }
            else {
                hideChangeInfoTab()
                notice("Wrong password")
            }
        })
    }
    else{
        visiblePassBtn.innerHTML = "visibility_off"
        passContainer.innerHTML = "<b>Password: </b> &ensp;" + "*".repeat(account.pass.length) + "&ensp;"
        passContainer.appendChild(visiblePassBtn)
    }

}  


function changePass(){
    changeInfoTab.style.display = "flex"
    changeInfoTab.querySelector("p").innerHTML = "Enter your old password"

    changeInfoTab.querySelector("form").addEventListener("submit", function (e) {
        e.preventDefault()
        if (mainInput.value == account.pass) {
            changeInfoTab.querySelector("p").innerHTML = "Enter your new password"

            changeInfoTab.querySelector("form").addEventListener("submit", async function () {
                if(mainInput.value.trim() != 0 && mainInput.value != account.pass){
                    account.pass = mainInput.value
                    accountsList[index].pass = mainInput.value
    
                    localStorage.setItem("currentAccount",JSON.stringify(account))
                    localStorage.setItem("userAccounts",JSON.stringify(accountsList))
    
                    hideChangeInfoTab()
                    notice("Change password successfully!")
                }
                else{
                    notice("No change was applied!")
                    hideChangeInfoTab()
                }
                mainInput.value = ""
            })
        }
        else{
            hideChangeInfoTab()
            notice("Wrong password!")
        }
    })
}