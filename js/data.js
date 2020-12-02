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

const canvas = document.querySelector("#canvas");

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
    pieChart.centerX = canvas.width / 2;
    pieChart.centerY = 5 * canvas.height / 8;
});

canvas.addEventListener("mousemove", evt => {
    cursor.x = evt.offsetX;
    cursor.y = evt.offsetY;
});

canvas.addEventListener("click", evt => {
    cursor.x = evt.offsetX;
    cursor.y = evt.offsetY;
});

document.addEventListener("click", evt => {
    if (evt.target.getAttribute("id") !== "canvas"){
        cursor.x = undefined;
        cursor.y = undefined;
    }
});

const sleepingTimeWeek = data.sleeping.timeSpentDuringEachDayInHours.reduce((a, b) => a + b);
const exercisingTimeWeek = data.exercising.timeSpentDuringEachDayInHours.reduce((a, b) => a + b);
const relaxingTimeWeek = data.relaxing.timeSpentDuringEachDayInHours.reduce((a, b) => a + b);
const totalTimeSpentOnActivities = sleepingTimeWeek + exercisingTimeWeek + relaxingTimeWeek;

const pieChart = {
    title: "Total time spent doing each activity during the whole week:",
    titleOpacity: 0,
    titleOpacityChangeRate: 0.02,
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
    centerX: canvas.width/2,
    centerY: 5 * canvas.height/8,
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
        
        if (pieChart.titleOpacity < 1) {
            pieChart.titleOpacity += pieChart.titleOpacityChangeRate;
        } else {
            pieChart.titleOpacity = 1;
        }

        const sleepingPart = new Path2D();
        sleepingPart.moveTo(pieChart.centerX, pieChart.centerY);
        sleepingPart.arc(pieChart.centerX, pieChart.centerY, pieChart.radius,
             -Math.PI / 2,
              -Math.PI / 2 - pieChart.sleepingCurrentAngle, true);
        c.fillStyle = `rgb(${colorSchemeRGB.sleeping})`;
        c.fill(sleepingPart);

        const exercisingPart = new Path2D();
        exercisingPart.moveTo(pieChart.centerX, pieChart.centerY);
        exercisingPart.arc(pieChart.centerX, pieChart.centerY, pieChart.radius,
             -Math.PI / 2 - pieChart.sleepingCurrentAngle,
              -Math.PI / 2 - (pieChart.sleepingCurrentAngle + pieChart.exercisingCurrentAngle), true);
        c.fillStyle = `rgb(${colorSchemeRGB.exercising})`;
        c.fill(exercisingPart);

        const relaxingPart = new Path2D();
        relaxingPart.moveTo(pieChart.centerX, pieChart.centerY);
        relaxingPart.arc(pieChart.centerX, pieChart.centerY, pieChart.radius,
             -Math.PI / 2 - (pieChart.sleepingCurrentAngle + pieChart.exercisingCurrentAngle),
              -Math.PI / 2 - (pieChart.sleepingCurrentAngle + pieChart.exercisingCurrentAngle + pieChart.relaxingCurrentAngle), true);
        c.fillStyle = `rgb(${colorSchemeRGB.relaxing})`;
        c.fill(relaxingPart);

        drawLinesBetweenActivityPartsPieChart();

        c.font = `normal ${canvas.height/12}px sans-serif`;
        c.font = `normal ${canvas.height/12}px Poppins`;
        c.textAlign = "center";
        c.textBaseline = "middle";
        c.fillStyle = `rgba(37, 36, 34, ${pieChart.titleOpacity})`;
        c.fillText(pieChart.title.substring(0, 36), pieChart.centerX, canvas.height/12 - canvas.height/24);
        c.fillText(pieChart.title.substring(37), pieChart.centerX, canvas.height/12 + canvas.height/24);
    },
    update: () => {
        let areaInFocus = null;
        const sleepingPart = new Path2D();
        sleepingPart.moveTo(pieChart.centerX, pieChart.centerY);
        sleepingPart.arc(pieChart.centerX, pieChart.centerY, pieChart.radius,
             -Math.PI / 2,
              -Math.PI / 2 - pieChart.sleepingCurrentAngle, true);
        c.fillStyle = `rgb(${colorSchemeRGB.sleeping})`;
        c.fill(sleepingPart);

        if (c.isPointInPath(sleepingPart, cursor.x, cursor.y)){
            areaInFocus = 1;
            const sleepingPart = new Path2D();
            sleepingPart.moveTo(pieChart.centerX, pieChart.centerY);
            sleepingPart.arc(pieChart.centerX, pieChart.centerY, pieChart.radius * 1.1,
                 -Math.PI / 2,
                  -Math.PI / 2 - pieChart.sleepingCurrentAngle, true);
            c.fillStyle = `rgba(${colorSchemeRGB.sleeping}, ${pieChart.opacityOnHover})`;
            c.fill(sleepingPart);
        }

        const exercisingPart = new Path2D();
        exercisingPart.moveTo(pieChart.centerX, pieChart.centerY);
        exercisingPart.arc(pieChart.centerX, pieChart.centerY, pieChart.radius,
             -Math.PI / 2 - pieChart.sleepingCurrentAngle,
              -Math.PI / 2 - (pieChart.sleepingCurrentAngle + pieChart.exercisingCurrentAngle), true);
        c.fillStyle = `rgb(${colorSchemeRGB.exercising})`;
        c.fill(exercisingPart);


        if (c.isPointInPath(exercisingPart, cursor.x, cursor.y)){
            areaInFocus = 2;
            const exercisingPart = new Path2D();
            exercisingPart.moveTo(pieChart.centerX, pieChart.centerY);
            exercisingPart.arc(pieChart.centerX, pieChart.centerY, pieChart.radius * 1.1,
                 -Math.PI / 2 - pieChart.sleepingCurrentAngle,
                  -Math.PI / 2 - (pieChart.sleepingCurrentAngle + pieChart.exercisingCurrentAngle), true);
                  c.fillStyle = `rgba(${colorSchemeRGB.exercising}, ${pieChart.opacityOnHover})`;
            c.fill(exercisingPart);
        }

        const relaxingPart = new Path2D();
        relaxingPart.moveTo(pieChart.centerX, pieChart.centerY);
        relaxingPart.arc(pieChart.centerX, pieChart.centerY, pieChart.radius,
             -Math.PI / 2 - (pieChart.sleepingCurrentAngle + pieChart.exercisingCurrentAngle),
              -Math.PI / 2 - (pieChart.sleepingCurrentAngle + pieChart.exercisingCurrentAngle + pieChart.relaxingCurrentAngle), true);
        c.fillStyle = `rgb(${colorSchemeRGB.relaxing})`;
        c.fill(relaxingPart);


        if (c.isPointInPath(relaxingPart, cursor.x, cursor.y)){
            areaInFocus = 3;
            const relaxingPart = new Path2D();
            relaxingPart.moveTo(pieChart.centerX, pieChart.centerY);
            relaxingPart.arc(pieChart.centerX, pieChart.centerY, pieChart.radius * 1.1,
                 -Math.PI / 2 - (pieChart.sleepingCurrentAngle + pieChart.exercisingCurrentAngle),
                  -Math.PI / 2 - (pieChart.sleepingCurrentAngle + pieChart.exercisingCurrentAngle + pieChart.relaxingCurrentAngle), true);
                  c.fillStyle = `rgba(${colorSchemeRGB.relaxing}, ${pieChart.opacityOnHover})`;
            c.fill(relaxingPart);
        }

        drawLinesBetweenActivityPartsPieChart(areaInFocus);
        drawExtraInfo(areaInFocus);

        c.font = `normal ${canvas.height/12}px sans-serif`;
        c.font = `normal ${canvas.height/12}px Poppins`;
        c.textAlign = "center";
        c.textBaseline = "middle";
        c.fillStyle = "rgb(37, 36, 34)";
        c.fillText(pieChart.title.substring(0, 36), pieChart.centerX, canvas.height/12 - canvas.height/24);
        c.fillText(pieChart.title.substring(37), pieChart.centerX, canvas.height/12 + canvas.height/24);
    },
    close: () => {
        pieChart.openingAnimationComplete = false;
        pieChart.openingSpeed = 0.02;
        pieChart.openingSpeedChangeRate = 0.0002;
        pieChart.sleepingCurrentAngle = 0;
        pieChart.exercisingCurrentAngle = 0;
        pieChart.relaxingCurrentAngle = 0;
        pieChart.titleOpacity = 0;
    }
};

function drawLinesBetweenActivityPartsPieChart(onFocus = null){
    c.lineWidth = 2;
    c.lineCap = "round";
    c.strokeStyle = "#fffcf2";
    c.beginPath();
    c.moveTo(pieChart.centerX, pieChart.centerY);

    if (onFocus === 1 || onFocus === 3){
        c.lineTo(pieChart.centerX, canvas.height/6 - pieChart.radius * 0.1);
    } else {
        c.lineTo(pieChart.centerX, canvas.height/6);
    }

    c.moveTo(pieChart.centerX, pieChart.centerY);
    if (onFocus === 1 || onFocus === 2){
        c.lineTo(pieChart.centerX - (pieChart.radius * 1.1) * Math.sin(pieChart.sleepingCurrentAngle),
        pieChart.centerY - (pieChart.radius * 1.1) * Math.cos(pieChart.sleepingCurrentAngle));
    } else {
        c.lineTo(pieChart.centerX - pieChart.radius * Math.sin(pieChart.sleepingCurrentAngle),
        pieChart.centerY - pieChart.radius * Math.cos(pieChart.sleepingCurrentAngle));
    }

    c.moveTo(pieChart.centerX, pieChart.centerY);
    if (onFocus === 2 || onFocus === 3){
        c.lineTo(pieChart.centerX - (pieChart.radius * 1.1) * Math.sin(pieChart.sleepingCurrentAngle + pieChart.exercisingCurrentAngle),
        pieChart.centerY - (pieChart.radius * 1.1) * Math.cos(pieChart.sleepingCurrentAngle + pieChart.exercisingCurrentAngle));
    } else {
        c.lineTo(pieChart.centerX - pieChart.radius * Math.sin(pieChart.sleepingCurrentAngle + pieChart.exercisingCurrentAngle),
        pieChart.centerY - pieChart.radius * Math.cos(pieChart.sleepingCurrentAngle + pieChart.exercisingCurrentAngle));
    }

    c.moveTo(pieChart.centerX, pieChart.centerY);
    c.lineTo(pieChart.centerX - pieChart.radius * Math.sin(pieChart.sleepingCurrentAngle + pieChart.exercisingCurrentAngle + pieChart.relaxingCurrentAngle),
    pieChart.centerY - pieChart.radius * Math.cos(pieChart.sleepingCurrentAngle + pieChart.exercisingCurrentAngle + pieChart.relaxingCurrentAngle));
    c.stroke();
}

function drawExtraInfo(areaInFocus = null){
    const rectangleWidth = canvas.width/6;
    const rectangleHeight = canvas.height/6;
    c.fillStyle = "#403D39";
    c.textAlign = "start";
    c.textBaseline = "middle";
    c.font = `normal ${rectangleHeight/3}px sans-serif`;
    c.font = `normal ${rectangleHeight/3}px Poppins`;

    if (areaInFocus === 1){
        const extraInfoRectangle = {
            x: pieChart.centerX - (pieChart.radius * 1.2) * Math.sin(pieChart.sleepingCurrentAngle / 3) - rectangleWidth,
            y: pieChart.centerY - (pieChart.radius * 1.2) * Math.cos(pieChart.sleepingCurrentAngle / 3)
        }
        
        c.fillRect(extraInfoRectangle.x, extraInfoRectangle.y, rectangleWidth, rectangleHeight);

        c.fillStyle = "#FFFCF2";
        c.fillText(`${Math.round(pieChart.sleepingPercentageOfWeek * 10000) / 100}%`, extraInfoRectangle.x + rectangleWidth/12, extraInfoRectangle.y + rectangleHeight/3);
        c.fillText(`${sleepingTimeWeek}H`, extraInfoRectangle.x + rectangleWidth/12, extraInfoRectangle.y + 2 * rectangleHeight/3);

    } else if (areaInFocus === 2){
        const extraInfoRectangle = {
            x: pieChart.centerX - (pieChart.radius * 1.2) * Math.sin(pieChart.sleepingCurrentAngle + pieChart.exercisingCurrentAngle / 2),
            y: pieChart.centerY - (pieChart.radius * 1.2) * Math.cos(pieChart.sleepingCurrentAngle + pieChart.exercisingCurrentAngle / 2) - rectangleHeight/2
        }

        c.fillRect(extraInfoRectangle.x, extraInfoRectangle.y, rectangleWidth, rectangleHeight);

        c.fillStyle = "#FFFCF2";
        c.fillText(`${Math.round(pieChart.exercisingPercentageOfWeek * 10000) / 100}%`, extraInfoRectangle.x + rectangleWidth/12, extraInfoRectangle.y + rectangleHeight/3);
        c.fillText(`${Math.floor(exercisingTimeWeek)}H ${(exercisingTimeWeek % 1) * 60}MIN`, extraInfoRectangle.x + rectangleWidth/12, extraInfoRectangle.y + 2 * rectangleHeight/3);

    } else if (areaInFocus === 3){
        const extraInfoRectangle = {
            x: pieChart.centerX - (pieChart.radius * 1.2) * Math.sin(pieChart.sleepingCurrentAngle + pieChart.exercisingCurrentAngle + pieChart.relaxingCurrentAngle / 3),
            y: pieChart.centerY - (pieChart.radius * 1.2) * Math.cos(pieChart.sleepingCurrentAngle + pieChart.exercisingCurrentAngle + pieChart.relaxingCurrentAngle / 3) - rectangleHeight
        }

        c.fillRect(extraInfoRectangle.x, extraInfoRectangle.y, rectangleWidth, rectangleHeight);

        c.fillStyle = "#FFFCF2";
        c.fillText(`${Math.round(pieChart.relaxingPercentageOfWeek * 10000) / 100}%`, extraInfoRectangle.x + rectangleWidth/12, extraInfoRectangle.y + rectangleHeight/3);
        c.fillText(`${relaxingTimeWeek}H`, extraInfoRectangle.x + rectangleWidth/12, extraInfoRectangle.y + 2 * rectangleHeight/3);

    }
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