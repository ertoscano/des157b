(function(){
    'use strict';
    console.log('js running');

    gsap.registerPlugin(SplitText);

    let split = SplitText.create(".text",{
        type: "chars"
    });

    // gsap.from(split.chars, {
    //     duration: .5,
    //     y: 100,         
    //     autoAlpha: 0,   
    //     stagger: .1, 
    //     repeat: -1,
    //     yoyo: true,
        
    // });

    const tl = gsap.timeline({
        repeat: -1,
        yoyo: true
    });

    tl.from(split.chars, {
        y: -40,
        autoAlpha: -1,
        duration: 4,
        // ease: "sine.inOut",
        ease: "elastic.out(1, .7)",
        
        x: "random(-50,50)",
        y: "random(-50,50)",
        scale: 1.3,
        rotationX: 360,
        transformOrigin: "center center",
        filter: "blur(0px)",
        textShadow: "0px 80px 0px rgb(222, 112, 85)",
        stagger: {
            each: .05,
            from: "center"
        }

        
    });

    var granimInstance = new Granim({
        element: '#canvas-basic',
        direction: 'left-right',
        isPausedWhenNotInView: true,
        states: {
            "default-state": {
                gradients: [
                    ['#ffecc4', '#fcd6d3'],
                    ['#ffe0c6', '#f7a2db'],
                    ['#e9d19e', '#f7eadb']
                ]
            }
        }
    });
})();