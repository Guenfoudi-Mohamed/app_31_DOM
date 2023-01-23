
// add event for btnLogOut
const btnLogOut = document.querySelector('body #container section#sideBar button.btnLogOut');
btnLogOut.onclick = function(){
    location.pathname = 'loginForm/login.html';
}