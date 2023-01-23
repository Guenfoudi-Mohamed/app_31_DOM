// app_31

// event for status Text SignUp
const statusTextSignUp = document.querySelector('body #container #areaForm .wrapperForm > h5 .statusText.signIn');
statusTextSignUp.addEventListener('click',function(e){
    e.preventDefault();
    window.location.pathname = 'loginForm/login.html';
});

