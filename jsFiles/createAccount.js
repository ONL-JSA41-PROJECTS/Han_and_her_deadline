const form = document.getElementById("form")
let isExist = false

form.addEventListener("submit", function (e) {
    e.preventDefault()
    let userInfo = JSON.parse(localStorage.getItem("userAccount")) || []
    for (let info of userInfo) {
        if (document.getElementById("name").value == info.name && document.getElementById("pass").value == info.pass) {
    
            window.location.href = "../pages/login.html"
            alert("Your account is exist!")
            isExist = true
        }
    }
    if (!isExist) {
        userInfo.push({
            name: document.getElementById("name").value,
            pass: document.getElementById("pass").value,
        })
        window.location.href = "./login.html"
        alert("Your account can be used now!")
    }

    localStorage.setItem("userAccount", JSON.stringify(userInfo))
})

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
