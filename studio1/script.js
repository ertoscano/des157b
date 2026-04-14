// (function () {
//     'use strict';
//     console.log('js running');

//     const section = document.querySelector('#poem');
//     const line1 = document.querySelector('#line1');
//     const img1 = document.querySelector('#img1');
//     const fs = document.querySelector('.fas');

//     const intervalID = setInterval(checkTime, 1000);

//     fs.addEventListener('click', function () {

//             if (!document.fullscreenElement) {

//         document.documentElement.requestFullscreen();

//             } else {

//         document.exitFullscreen();

//             }
//         });

//     function checkTime() {
//             if (1 < myVideo.currentTime && myVideo.currentTime < 3) {
//         line1.className = 'showing';
//             } else {
//         line1.className = 'hidden';
//             }

//     if (5 < myVideo.currentTime && myVideo.currentTime < 7) {
//         img1.className = "showing";
//             } else {
//         img1.className = 'hidden';
//             }
//         }

// })();