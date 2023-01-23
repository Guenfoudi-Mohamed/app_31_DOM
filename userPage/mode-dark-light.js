 
const lightMode = document.querySelector('body #container #main > .profileUser-mode-DL .mode-dark-light span.sun');
const darkMode = document.querySelector('body #container #main > .profileUser-mode-DL .mode-dark-light span.moon');

lightMode.addEventListener('click',function(){
    document.documentElement.style.setProperty('--color-Light-Dark-Mode','#424242');
    document.documentElement.style.setProperty('--bgBoxs','#fff');
    document.documentElement.style.setProperty('--boxSadowBoxs','0px 0px 10px 0px #e6e6e6');
    document.documentElement.style.setProperty('--bgColorBody','#f3f3f3');
});
darkMode.addEventListener('click',function(){
    document.documentElement.style.setProperty('--color-Light-Dark-Mode','#f5f5f5');
    document.documentElement.style.setProperty('--bgBoxs','#202528');
    document.documentElement.style.setProperty('--boxSadowBoxs','0px 0px 10px 0px #000');
    document.documentElement.style.setProperty('--bgColorBody','#000');
});