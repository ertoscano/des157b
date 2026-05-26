(function () {
    'use strict';
    console.log('js running');

    gsap.registerPlugin(SplitText);

    let split = SplitText.create(".text", {
        type: "chars"
    });

    const tl = gsap.timeline({
        repeat: -1,
        yoyo: true
    });

    tl.from(split.chars, {
        y: -40,
        autoAlpha: 1,
        duration: 2.4,
        ease: "sine.inOut",
        // ease: "elastic.out(.1, 2)",

        // x: "random(-20,20)",
        // y: "random(-20,20)",
        scale: 1,
        rotationX: 2,
        transformOrigin: "center center",
        filter: "blur(0px)",
        // textShadow: "0px 10px 0px #ffffff",
        stagger: {
            each: .09,
            from: "edges"
        }
    });

    

    // const timerclock = document.querySelector("#timer")

    const timer = new easytimer.Timer();

    timer.start();

    timer.addEventListener('secondsUpdated', function(e){
        $('#basicUsage').html(timer.getTimeValues().toString());
    });

})();