import {upLoadImgProfile} from '../registerForm/patterns&validInp.js';

// add event inp UploadPhotoProfileAccount
const inpUploadPhotoProfileAccount = document.querySelector('body #container #main .section .Account .infoUser > form .uploadPhoto > input[type="file"]');
const imgOne = document.querySelector('body #container #main .section .Account .infoUser > form .uploadPhoto > img');
const imgTwo = document.querySelector('body #container #main > .profileUser-mode-DL .profileUser > div > img');
const arrImgs = [imgOne,imgTwo];
inpUploadPhotoProfileAccount.onchange = function(){upLoadImgProfile(inpUploadPhotoProfileAccount,arrImgs)};

export {inpUploadPhotoProfileAccount , arrImgs};
// export function upLoadImgProfile(inpFile,arrImgs){
//     const reader = new FileReader();
//     reader.addEventListener('load',function(){
//         arrImgs.forEach(function(value){
//             value.src = reader.result;
//         });
//     });
//     if(inpFile.files[0]){
//         reader.readAsDataURL(inpFile.files[0]);
//     }
// }