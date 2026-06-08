(function () {
    'use strict';
    console.log('js running');
    Parse.initialize("76c9Dpyc5joVOl2gHKf6AL8p8RisCP8bvDmcB2fZ", "XfoHcKxFd264eFPyTNnOkVqwj2p5kV6J4OhurEEc");

    Parse.serverURL = 'https://parseapi.back4app.com/';

    gsap.registerPlugin(SplitText, ScrollToPlugin);

    window.addEventListener('load', () => {
        window.scrollTo(0, 0);
    });

    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }

    let split = SplitText.create(".text", {
        type: "chars"
    });

    const tl = gsap.timeline({
        repeat: -1,
        yoyo: true
    });

    tl.from(split.chars, {
        y: -40,
        duration: 2.4,
        ease: "sine.inOut",

        scale: 1,
        rotationX: 2,
        transformOrigin: "center center",
        stagger: {
            each: .09,
            from: "edges"
        }
    });

    const pleaseBtn = document.querySelector('#pleaseBtn');

    const screen2 = document.querySelector('#waiting-screen');

    const title = document.querySelector('#title');

    const goBtn = document.querySelector('#goBtn');

    const modalOverlay = document.querySelector('#modal-overlay');

    const testingOverlay = document.querySelector('#testing-overlay')

    const closeBtn = document.querySelector('#close');

    const sendBtn = document.querySelector('#send-btn');

    const timerDisplay = document.querySelector('#timer');

    const responseList = document.querySelector('#response-list');

    const authorInput = document.querySelector('#author-input');

    const messageInput = document.querySelector('#message-input');

    const openBtn = document.querySelector('#open-btn');

    const fullscreenBtn = document.querySelector('#fullscreen-btn');

    const instructionOverlay = document.querySelector('#instruction-overlay');

    const startWaitingBtn = document.querySelector('#start-waiting-btn');

    window.addEventListener('load', async () => {

        await loadResponses();

        document.querySelector('#container').style.visibility = 'visible';

        gsap.to('#loader', {
            autoAlpha: 0,
            duration: 0.8,
            onComplete: () => {
                document.querySelector('#loader').remove();
            }
        });

    });

    gsap.to('.loader-content', {
        y: -10,
        repeat: -1,
        yoyo: true,
        duration: 1
    });

    let seconds = 0;
    let timerInterval;

    closeBtn.addEventListener('click', () => {
        testingOverlay.classList.add('hidden');
    });

    gsap.set('#close', {
        autoAlpha: 0,
    });

    setTimeout(() => {
        gsap.to('#close', {
            duration: .5,
            autoAlpha: 1,
            // ease: "back.out(.8)"
        });
    }, 3000);

    fullscreenBtn.addEventListener('click', async () => {

        try {

            if (!document.fullscreenElement) {

                await document.documentElement.requestFullscreen();

                fullscreenBtn.textContent = 'Fullscreen Enabled';
                fullscreenBtn.disabled = true;
            }

        } catch (error) {

            console.error('Fullscreen failed:', error);

        }

    });

    pleaseBtn.addEventListener('click', () => {

        instructionOverlay.classList.remove('hidden')
        gsap.from('.modal', {
            duration: 0.8,
            y: 50,
            autoAlpha: 0,
            ease: 'power3.out'
        });

    });

    

    startWaitingBtn.addEventListener('click', () => {

        instructionOverlay.classList.add('hidden');

        document.body.classList.add('lock-scroll');

        openBtn.style.display = 'none';

        document.querySelector('#landing-screen').style.display = 'none';

        screen2.style.display = 'flex';

        gsap.from('#waiting-screen', {
            autoAlpha: 0,
            duration: 1
        });

        seconds = 0;
        timerDisplay.textContent = 0;

        startTimer();

        const delay = Math.random() * (120000 - 30000) + 30000;

        gsap.set('#go', {
            autoAlpha: 0,
            scale: 1,
            y: 10
        });

        setTimeout(() => {
            gsap.to('#go', {
                duration: .5,
                autoAlpha: 1,
                scale: 1,
                y: 0,
                ease: "power3.out"
            });
        }, delay);
        
    });
    
    function startTimer() {
        timerInterval  =setInterval(() => {
            seconds++;
            timerDisplay.textContent =seconds;
        }, 1000);
    }

    goBtn.addEventListener('click',  () => {
        clearInterval(timerInterval);

        modalOverlay.classList.remove('hidden');

        // animate backdrop
        gsap.fromTo(
            '#modal-overlay',
            {
                duration: 0.8,
                y: 50,
                autoAlpha: 0,
                ease: 'power3.out'
            },
            {
                autoAlpha: 1,
                duration: 0.3
            }

            
        );

        gsap.from('.modal', {
            duration: 0.8,
            y: 50,
            autoAlpha: 0,
            ease: 'power3.out'
        });

    });

    sendBtn.addEventListener('click', async () => {

        document.querySelector('#response-section').style.display = 'block';
        
        const initials = authorInput.value;
        const message = messageInput.value;

        if (!initials || !message) return;

        const Response = Parse.Object.extend('Responses');
        const response =  new Response();

        response.set('initials', initials);
        response.set('message', message);
        response.set('seconds', seconds);
        try {

            await response.save();

            console.log('Saved to Back4App!');

            addResponseToPage(initials, message, seconds);

            modalOverlay.classList.add('hidden');

            authorInput.value = '';
            messageInput.value = '';

            screen2.style.display = 'none';

            document.querySelector('#landing-screen').style.display = 'flex';

            openBtn.style.display = 'block';

            gsap.to(
                ['#title', '#pleaseBtn', '#rightArrow',
                    '#rightArrow2', '#leftArrow', '#leftArrow2'],
                {
                    autoAlpha: 1,
                    duration: 1
                }
            );

        } catch (error) {

            console.error(error);
        }

        screen2.style.display = 'none';

        gsap.to(
            ['#title', '#pleaseBtn', '#rightArrow',
                '#rightArrow2', '#leftArrow', '#leftArrow2'],
            {
                autoAlpha: 1,
                duration: 1
            }
        );

        document.querySelector('#response-section').style.display = 'block';

        gsap.to(window, {
            duration: 1.5,
            scrollTo: "#response-section",
            ease: 'power2.inOut',
            onComplete: () => {
                document.body.classList.remove('lock-scroll');
            }
        });


    });

    function addResponseToPage(initials, message, seconds) {
        const newResponse = `
        <div class="response-item">
            <div class="response-initials uppercase-field">
                ${initials}
            </div>

            <span class="script-label" id="bored-script">
                Bored for
            </span>

            <div class="response-time">
                ${seconds} sec
            </div>

            <div class="response-msg">
                ${message}
            </div>
        </div>
    `;

        responseList.insertAdjacentHTML('afterbegin', newResponse);
    }

    async function loadResponses() {

        const Response = Parse.Object.extend('Responses');

        const query = new Parse.Query(Response);

        query.descending('createdAt');

        try {

            const results = await query.find();

            results.forEach(item => {

                addResponseToPage(
                    item.get('initials'),
                    item.get('message'),
                    item.get('seconds')
                );

            });

        } catch (error) {

            console.error(error);

        }

    }

    loadResponses();

    openBtn.addEventListener('click', () => {


        const responseScreen = document.querySelector('#response-screen');

        document.querySelector('#response-section').style.display = 'block';
        document.body.classList.remove('lock-scroll');

        gsap.from('#response-section', {
            y: 100,
            autoAlpha: 0,
            duration: 1,
            ease: 'power3.out'
        });

        gsap.to(window, {
            duration: 1.5,
            scrollTo: '#response-screen',
            ease: 'power2.inOut',
            onComplete: () => {
                document.body.classList.remove('lock-scroll');
            }
        });

    });

    gsap.from('#response-section', {
        y: 100,
        autoAlpha: 0,
        duration: 1.2,
        ease: 'power3.out'
    });

    gsap.from('#open-btn', {
        scale: 0,
        rotation: 10,
        duration: .4,
        ease: 'back.out(1.7)'
    });

    document.body.classList.add('lock-scroll');

    gsap.from('.testing', {
        duration: 0.8,
        y: 50,
        autoAlpha: 0,
        ease: 'power3.out'
    });

})();