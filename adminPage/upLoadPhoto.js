import {upLoadImgProfile} from '../registerForm/patterns&validInp.js';

// add event inp UploadPhotoProfileAccount
const inpUploadPhotoProfileAccount = document.querySelector('body #container #main > section.leftSection .account .infoAdmin > form .uploadPhoto > input[type="file"]');
const imgOne = document.querySelector('body #container #main > section.leftSection .account .infoAdmin > form .uploadPhoto > img.imgProfile');
const imgTwo = document.querySelector('body #container #main > section.rightSection .profileAdmin-mode-DL .profileAdmin > div > img');
const arrImgs = [imgOne,imgTwo];
inpUploadPhotoProfileAccount.onchange = function(){upLoadImgProfile(inpUploadPhotoProfileAccount,arrImgs)};


export {arrImgs};