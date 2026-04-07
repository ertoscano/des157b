(function() {
    'use strict';

    const button = document.querySelector('button');
    const body = document.querySelector('body');
    const backgroundLight = document.querySelector('#background');
    const backgroundDark = document.querySelector('#backgroundDark');
    const sections = document.querySelectorAll('section')
    let mode = 'light';

    button.addEventListener('click', function() {
        if (mode === 'light') {
            body.className = 'switch';
            // banner.className = 'switch';
            button.className = 'switch';
            for (const section of sections) {
                section.className = 'switch';
            }
            background.className = 'hide';
            backgroundDark.className = 'show';
            mode = 'dark';
        } else {
            body.removeAttribute('class');
            // banner.removeAttribute('class');
            button.removeAttribute('class');
            for (const section of sections) {
                section.removeAttribute('class');
            }
            backgroundDark.className = 'hide';
            background.className = 'show';
            mode = 'light'
        }
    })
})()