(function(){
    'use strict';
    
    let globalData;
    let numDataPoints;

    async function getData(){
        const myWater = await fetch('json-data.json');
        const data = await myWater.json();

        const dataPoints = Object.keys(data);
        globalData = Object.values(data);

        numDataPoints = dataPoints.length;
    }

    function showWaterInfo(point, data){
        const waterStages = [
            'images/water1.svg',
            'images/water2.svg',
            'images/water3.svg',
            'images/water4.svg',
            'images/water5.svg',
            'images/water6.svg',
            'images/water7.svg'
        ];

        document.querySelector('#reason').innerHTML = data[point].reason;
        // document.querySelector('#waters').innerHTML = waterStages[data[point].water];
        document.querySelector('#waters').src = waterStages[data[point].water];
        document.querySelector('#time').innerHTML = data[point].time;

    }

    function updateCircles(activeIndex){
        const circles = document.querySelectorAll('.circle');

        circles.forEach((circle, index) => {
            if (index === activeIndex) {
                circle.classList.add('on');
            }else {
                circle.classList.remove('on');
            }
        })
    }

    document.addEventListener('mousemove', reportPos);

    let prevLoc = 0;

    function reportPos(event) {

        const area = document.querySelector('#container');
        const rect = area.getBoundingClientRect();

        const xPos = event.clientX;

        if (xPos < rect.left || xPos > rect.right) return;

        const relativeX = xPos - rect.left;
        const timeSection = rect.width / numDataPoints;


        const changeTime = Math.min(
            numDataPoints -1,
            Math.floor(relativeX / timeSection)
        );

        if (changeTime != prevLoc){
            showWaterInfo(changeTime, globalData);
            updateCircles(changeTime);
            prevLoc = changeTime;
        }
    }

    getData();
})();