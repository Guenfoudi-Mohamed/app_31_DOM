// app_31

const statusTextSignUp = document.querySelector('body #container #areaForm .wrapperForm > h5 .statusText.signUp');
statusTextSignUp.addEventListener('click',function(e){
    e.preventDefault();
    const wrapperFormLogin = document.querySelector('body #container #areaForm .wrapperForm.Login');
    wrapperFormLogin.classList.add('active');
    const wrapperFormSignUp = document.querySelector('body #container #areaForm .wrapperForm.SignUp');
    wrapperFormSignUp.classList.remove('active');
});


const statusTextSignIn = document.querySelector('body #container #areaForm .wrapperForm > h5 .statusText.signIn');
statusTextSignIn.addEventListener('click',function(e){
    e.preventDefault();
    const wrapperFormLogin = document.querySelector('body #container #areaForm .wrapperForm.Login');
    wrapperFormLogin.classList.remove('active');
    const wrapperFormSignUp = document.querySelector('body #container #areaForm .wrapperForm.SignUp');
    wrapperFormSignUp.classList.add('active');
});
