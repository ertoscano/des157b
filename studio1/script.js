(function () {
    'use strict';
    console.log('js running');

    const section = document.querySelector('#poem');
    const line1 = document.querySelector('#line1');
    const videoHover = document.querySelector('#myVideo');


    const loading = document.querySelector('.square');

    myVideo.addEventListener('playing', function () {
        loading.style.display = 'none';
    });

    videoHover.addEventListener('click', function (){
        videoHover.className = 'invert';
    });

    const intervalID = setInterval(checkTime, 1950);

    function checkTime() {
        if (1 < myVideo.currentTime && myVideo.currentTime < 3.5) {
        line1.className = 'showing';
            } else {
        line1.className = 'hidden';
            }

        if (6 < myVideo.currentTime && myVideo.currentTime < 8) {
            line2.className = 'showing';
        } else {
            line2.className = 'hidden';
        }

        if (11 < myVideo.currentTime && myVideo.currentTime < 13) {
            line3.className = 'showing';
        } else {
            line3.className = 'hidden';
        }

        }
   
})();