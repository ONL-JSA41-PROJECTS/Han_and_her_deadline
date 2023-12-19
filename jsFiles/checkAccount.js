const form = document.getElementById("form")
let userInfo = JSON.parse(localStorage.getItem("userAccount")) || []

form.addEventListener("submit",function (e) {
    e.preventDefault()
    if (JSON.parse(localStorage.getItem("userAccount")) && JSON.parse(localStorage.getItem("userAccount"))[0]) {
        checkInfo()
    }
    else {
        window.location.href = "../pages/signup.html"
        alert("There's no account")
    }
})

function saveInfo(){
    userInfo[remember]=true
    localStorage.setItem("userAccount",JSON.stringify(userInfo))
}

function checkInfo(){
    for(let info of userInfo){
        if(document.getElementById("name").value == info.name && document.getElementById("pass").value == info.pass){
            if (document.getElementById("remember").checked){
                saveInfo()
            }
            window.location.href="../pages/shop.html"
            alert("Hope you have a nice time")
        }
        else{
         
        }
    }
}

// sign in with gg
function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
  }

  function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
  }
