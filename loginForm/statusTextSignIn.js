
// event for status Text SignIn
const statusTextSignIn = document.querySelector('body #container #areaForm .wrapperForm > h5 .statusText.signUp');
statusTextSignIn.addEventListener('click',function(e){
    e.preventDefault();
    window.location.pathname = 'registerForm/register.html';
});