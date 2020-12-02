const data = {
    sleeping: {
        timeSpentDuringEachDayInHours: [
            7,
            8,
            8,
            9,
            6,
            7,
            8
        ]
    },
    exercising: {
        timeSpentDuringEachDayInHours: [
            0.5,
            0.33,
            0.5,
            0.75,
            0.17,
            0.5,
            0.5
        ]
    },
    relaxing: {
        timeSpentDuringEachDayInHours: [
            2,
            1.5,
            2,
            2.5,
            3,
            1.75,
            2.25
        ]
    }
};
const canvasContainer = document.querySelector("#canvas-container");

const canvas = document.querySelector("canvas");

canvas.width = canvasContainer.offsetWidth;
canvas.height = canvas.width * 0.62;
const c = canvas.getContext("2d");

let chartType = 1;

const colorSchemeRGB = {sleeping: "255, 0, 0", exercising: "0, 255, 0", relaxing: "0, 0, 255"};

const cursor = {
    x: undefined,
    y: undefined
};

window.addEventListener("resize", () => {
    cursor.x *= canvasContainer.offsetWidth/canvas.width;
    cursor.y *= canvasContainer.offsetWidth/canvas.width;
    canvas.width = canvasContainer.offsetWidth;
    canvas.height = canvas.width * 0.62;
    pieChart.radius = canvas.height / 3;
});

canvas.addEventListener("mousemove", evt => {
    cursor.x = evt.offsetX;
    cursor.y = evt.offsetY;
});

canvas.addEventListener("click", evt => {
    cursor.x = evt.offsetX;
    cursor.y = evt.offsetY;
});

const sleepingTimeWeek = data.sleeping.timeSpentDuringEachDayInHours.reduce((a, b) => a + b);
const exercisingTimeWeek = data.exercising.timeSpentDuringEachDayInHours.reduce((a, b) => a + b);
const relaxingTimeWeek = data.relaxing.timeSpentDuringEachDayInHours.reduce((a, b) => a + b);
const totalTimeSpentOnActivities = sleepingTimeWeek + exercisingTimeWeek + relaxingTimeWeek;

const pieChart = {
    title: "Total time spent doing each activity during the whole week:",
    openingAnimationComplete: false,
    sleepingPercentageOfWeek: sleepingTimeWeek / totalTimeSpentOnActivities,
    exercisingPercentageOfWeek: exercisingTimeWeek / totalTimeSpentOnActivities,
    relaxingPercentageOfWeek: relaxingTimeWeek / totalTimeSpentOnActivities,
    openingSpeed: 0.02,
    openingSpeedChangeRate: 0.0002,
    sleepingCurrentAngle: 0,
    exercisingCurrentAngle: 0,
    relaxingCurrentAngle: 0,
    opacityOnHover: 0.5,
    radius: canvas.height/3,
    open: () => {
        if (pieChart.sleepingCurrentAngle + pieChart.openingSpeed * 2 * Math.PI * pieChart.sleepingPercentageOfWeek < 2 * Math.PI * pieChart.sleepingPercentageOfWeek){
            pieChart.sleepingCurrentAngle += pieChart.openingSpeed * 2 * Math.PI * pieChart.sleepingPercentageOfWeek;
            pieChart.exercisingCurrentAngle += pieChart.openingSpeed * 2 * Math.PI * pieChart.exercisingPercentageOfWeek;
            pieChart.relaxingCurrentAngle += pieChart.openingSpeed * 2 * Math.PI * pieChart.relaxingPercentageOfWeek;
            pieChart.openingSpeed -= pieChart.openingSpeedChangeRate;
        } else {
            pieChart.openingAnimationComplete = true;
            pieChart.sleepingCurrentAngle = 2 * Math.PI * pieChart.sleepingPercentageOfWeek;
            pieChart.exercisingCurrentAngle = 2 * Math.PI * pieChart.exercisingPercentageOfWeek;
            pieChart.relaxingCurrentAngle = 2 * Math.PI * pieChart.relaxingPercentageOfWeek;
        }

        const sleepingPart = new Path2D();
        sleepingPart.moveTo(canvas.width/2, canvas.height/2);
        sleepingPart.arc(canvas.width/2, canvas.height/2, pieChart.radius,
             -Math.PI / 2,
              -Math.PI / 2 - pieChart.sleepingCurrentAngle, true);
        c.fillStyle = `rgb(${colorSchemeRGB.sleeping})`;
        c.fill(sleepingPart);

        const exercisingPart = new Path2D();
        exercisingPart.moveTo(canvas.width/2, canvas.height/2);
        exercisingPart.arc(canvas.width/2, canvas.height/2, pieChart.radius,
             -Math.PI / 2 - pieChart.sleepingCurrentAngle,
              -Math.PI / 2 - (pieChart.sleepingCurrentAngle + pieChart.exercisingCurrentAngle), true);
        c.fillStyle = `rgb(${colorSchemeRGB.exercising})`;
        c.fill(exercisingPart);

        const relaxingPart = new Path2D();
        relaxingPart.moveTo(canvas.width/2, canvas.height/2);
        relaxingPart.arc(canvas.width/2, canvas.height/2, pieChart.radius,
             -Math.PI / 2 - (pieChart.sleepingCurrentAngle + pieChart.exercisingCurrentAngle),
              -Math.PI / 2 - (pieChart.sleepingCurrentAngle + pieChart.exercisingCurrentAngle + pieChart.relaxingCurrentAngle), true);
        c.fillStyle = `rgb(${colorSchemeRGB.relaxing})`;
        c.fill(relaxingPart);

        drawLinesBetweenActivityPartsPieChart();
    },
    update: () => {
        let areaInFocus = null;
        const sleepingPart = new Path2D();
        sleepingPart.moveTo(canvas.width/2, canvas.height/2);
        sleepingPart.arc(canvas.width/2, canvas.height/2, pieChart.radius,
             -Math.PI / 2,
              -Math.PI / 2 - pieChart.sleepingCurrentAngle, true);
        c.fillStyle = `rgb(${colorSchemeRGB.sleeping})`;
        c.fill(sleepingPart);

        if (c.isPointInPath(sleepingPart, cursor.x, cursor.y)){
            areaInFocus = 1;
            const sleepingPart = new Path2D();
            sleepingPart.moveTo(canvas.width/2, canvas.height/2);
            sleepingPart.arc(canvas.width/2, canvas.height/2, pieChart.radius * 1.1,
                 -Math.PI / 2,
                  -Math.PI / 2 - pieChart.sleepingCurrentAngle, true);
            c.fillStyle = `rgba(${colorSchemeRGB.sleeping}, ${pieChart.opacityOnHover})`;
            c.fill(sleepingPart);
        }

        const exercisingPart = new Path2D();
        exercisingPart.moveTo(canvas.width/2, canvas.height/2);
        exercisingPart.arc(canvas.width/2, canvas.height/2, pieChart.radius,
             -Math.PI / 2 - pieChart.sleepingCurrentAngle,
              -Math.PI / 2 - (pieChart.sleepingCurrentAngle + pieChart.exercisingCurrentAngle), true);
        c.fillStyle = `rgb(${colorSchemeRGB.exercising})`;
        c.fill(exercisingPart);


        if (c.isPointInPath(exercisingPart, cursor.x, cursor.y)){
            areaInFocus = 2;
            const exercisingPart = new Path2D();
            exercisingPart.moveTo(canvas.width/2, canvas.height/2);
            exercisingPart.arc(canvas.width/2, canvas.height/2, pieChart.radius * 1.1,
                 -Math.PI / 2 - pieChart.sleepingCurrentAngle,
                  -Math.PI / 2 - (pieChart.sleepingCurrentAngle + pieChart.exercisingCurrentAngle), true);
                  c.fillStyle = `rgba(${colorSchemeRGB.exercising}, ${pieChart.opacityOnHover})`;
            c.fill(exercisingPart);
        }

        const relaxingPart = new Path2D();
        relaxingPart.moveTo(canvas.width/2, canvas.height/2);
        relaxingPart.arc(canvas.width/2, canvas.height/2, pieChart.radius,
             -Math.PI / 2 - (pieChart.sleepingCurrentAngle + pieChart.exercisingCurrentAngle),
              -Math.PI / 2 - (pieChart.sleepingCurrentAngle + pieChart.exercisingCurrentAngle + pieChart.relaxingCurrentAngle), true);
        c.fillStyle = `rgb(${colorSchemeRGB.relaxing})`;
        c.fill(relaxingPart);


        if (c.isPointInPath(relaxingPart, cursor.x, cursor.y)){
            areaInFocus = 3;
            const relaxingPart = new Path2D();
            relaxingPart.moveTo(canvas.width/2, canvas.height/2);
            relaxingPart.arc(canvas.width/2, canvas.height/2, pieChart.radius * 1.1,
                 -Math.PI / 2 - (pieChart.sleepingCurrentAngle + pieChart.exercisingCurrentAngle),
                  -Math.PI / 2 - (pieChart.sleepingCurrentAngle + pieChart.exercisingCurrentAngle + pieChart.relaxingCurrentAngle), true);
                  c.fillStyle = `rgba(${colorSchemeRGB.relaxing}, ${pieChart.opacityOnHover})`;
            c.fill(relaxingPart);
        }

        drawLinesBetweenActivityPartsPieChart(areaInFocus);
    },
    close: () => {
        pieChart.openingAnimationComplete = false;
        pieChart.openingSpeed = 0.02;
        pieChart.openingSpeedChangeRate = 0.0002;
        pieChart.sleepingCurrentAngle = 0;
        pieChart.exercisingCurrentAngle = 0;
        pieChart.relaxingCurrentAngle = 0;
    }
};

function drawLinesBetweenActivityPartsPieChart(onFocus = null){
    c.lineWidth = 2;
    c.lineCap = "round";
    c.strokeStyle = "#fffcf2";
    c.beginPath();
    c.moveTo(canvas.width/2, canvas.height/2);

    if (onFocus === 1 || onFocus === 3){
        c.lineTo(canvas.width/2, canvas.height/6 - pieChart.radius * 0.1);
    } else {
        c.lineTo(canvas.width/2, canvas.height/6);
    }

    c.moveTo(canvas.width/2, canvas.height/2);
    if (onFocus === 1 || onFocus === 2){
        c.lineTo(canvas.width/2 - (pieChart.radius * 1.1) * Math.sin(pieChart.sleepingCurrentAngle),
        canvas.height/2 - (pieChart.radius * 1.1) * Math.cos(pieChart.sleepingCurrentAngle));
    } else {
        c.lineTo(canvas.width/2 - pieChart.radius * Math.sin(pieChart.sleepingCurrentAngle),
        canvas.height/2 - pieChart.radius * Math.cos(pieChart.sleepingCurrentAngle));
    }

    c.moveTo(canvas.width/2, canvas.height/2);
    if (onFocus === 2 || onFocus === 3){
        c.lineTo(canvas.width/2 - (pieChart.radius * 1.1) * Math.sin(pieChart.sleepingCurrentAngle + pieChart.exercisingCurrentAngle),
        canvas.height/2 - (pieChart.radius * 1.1) * Math.cos(pieChart.sleepingCurrentAngle + pieChart.exercisingCurrentAngle));
    } else {
        c.lineTo(canvas.width/2 - pieChart.radius * Math.sin(pieChart.sleepingCurrentAngle + pieChart.exercisingCurrentAngle),
        canvas.height/2 - pieChart.radius * Math.cos(pieChart.sleepingCurrentAngle + pieChart.exercisingCurrentAngle));
    }

    c.moveTo(canvas.width/2, canvas.height/2);
    c.lineTo(canvas.width/2 - pieChart.radius * Math.sin(pieChart.sleepingCurrentAngle + pieChart.exercisingCurrentAngle + pieChart.relaxingCurrentAngle),
    canvas.height/2 - pieChart.radius * Math.cos(pieChart.sleepingCurrentAngle + pieChart.exercisingCurrentAngle + pieChart.relaxingCurrentAngle));
    c.stroke();
}

function main() {
    c.clearRect(0, 0, canvas.width, canvas.height);
    if (chartType === 1){
        pieChart.openingAnimationComplete || pieChart.open();
        pieChart.openingAnimationComplete && pieChart.update();
    }

    requestAnimationFrame(main);
}

main();