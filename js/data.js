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

const upscaleRes = 2;

canvas.width = upscaleRes * canvasContainer.offsetWidth;
canvas.height = canvas.width * 0.62;
canvas.style.width = `${canvas.width/upscaleRes}px`;
canvas.style.height = `${canvas.height/upscaleRes}px`;
const c = canvas.getContext("2d");

let chartType = 2;
document.querySelector("#chart-1").style.boxShadow = "0 0 3px 2px #EB5E28";

const colorSchemeButton1 = document.querySelector("#scheme-1");
colorSchemeButton1.style.boxShadow = "0 0 3px 2px #EB5E28";

const colorSchemeRGB = {sleeping: window.getComputedStyle(colorSchemeButton1.children[0]).backgroundColor.substring(4, 13),
     exercising: window.getComputedStyle(colorSchemeButton1.children[1]).backgroundColor.substring(4, 13),
      relaxing: window.getComputedStyle(colorSchemeButton1.children[2]).backgroundColor.substring(4, 13)
};

const cursor = {
    x: undefined,
    y: undefined
};

const arrayOfColorSchemeButtons = document.querySelectorAll(".color-scheme-inner");
const arrayOfChartTypeButtons = document.querySelectorAll("#chart-type svg");

window.addEventListener("resize", () => {
    cursor.x = undefined;
    cursor.y = undefined;

    pieChart.radius *= upscaleRes * canvasContainer.offsetWidth / canvas.width;
    pieChart.centerX *= upscaleRes * canvasContainer.offsetWidth / canvas.width;
    pieChart.centerY *= upscaleRes * canvasContainer.offsetWidth / canvas.width;

    barChart.originX *= upscaleRes * canvasContainer.offsetWidth / canvas.width;
    barChart.originY *= upscaleRes * canvasContainer.offsetWidth / canvas.width;
    barChart.axisYHeight *= upscaleRes * canvasContainer.offsetWidth / canvas.width;
    barChart.axisXWidth *= upscaleRes * canvasContainer.offsetWidth / canvas.width;
    barChart.axisYMaxHeight *= upscaleRes * canvasContainer.offsetWidth / canvas.width;
    barChart.axisXMaxWidth *= upscaleRes * canvasContainer.offsetWidth / canvas.width;
    barChart.axisThickness *= upscaleRes * canvasContainer.offsetWidth / canvas.width;

    canvas.width = upscaleRes * canvasContainer.offsetWidth;
    canvas.height = canvas.width * 0.62;

    canvas.style.width = `${canvas.width/upscaleRes}px`;
    canvas.style.height = `${canvas.height/upscaleRes}px`;
});

canvas.addEventListener("mousemove", evt => {
    cursor.x = evt.offsetX * upscaleRes;
    cursor.y = evt.offsetY * upscaleRes;
});

canvas.addEventListener("click", evt => {
    cursor.x = evt.offsetX * upscaleRes;
    cursor.y = evt.offsetY * upscaleRes;
});

document.addEventListener("click", evt => {
    if (evt.target.getAttribute("id") !== "canvas"){
        cursor.x = undefined;
        cursor.y = undefined;
    }
});

arrayOfColorSchemeButtons.forEach(button => button.addEventListener("click", () => {
    arrayOfColorSchemeButtons.forEach(button => button.style.boxShadow = "");
    button.style.boxShadow = "0 0 3px 2px #EB5E28";
    colorSchemeRGB.sleeping = window.getComputedStyle(button.children[0]).backgroundColor.substring(4, 13);
    colorSchemeRGB.exercising = window.getComputedStyle(button.children[1]).backgroundColor.substring(4, 13);
    colorSchemeRGB.relaxing = window.getComputedStyle(button.children[2]).backgroundColor.substring(4, 13);
}));

arrayOfChartTypeButtons.forEach(button => button.addEventListener("click", () => {
    arrayOfChartTypeButtons.forEach(button => button.style.boxShadow = "");
    button.style.boxShadow = "0 0 3px 2px #EB5E28";
    chartType = parseInt(button.getAttribute("id").slice(-1));
}));

const sleepingTimeWeek = data.sleeping.timeSpentDuringEachDayInHours.reduce((a, b) => a + b);
const exercisingTimeWeek = data.exercising.timeSpentDuringEachDayInHours.reduce((a, b) => a + b);
const relaxingTimeWeek = data.relaxing.timeSpentDuringEachDayInHours.reduce((a, b) => a + b);
const totalTimeSpentOnActivities = sleepingTimeWeek + exercisingTimeWeek + relaxingTimeWeek;

const pieChart = {
    title: "Total time spent doing each activity during an average whole week:",
    titleOpacity: 0,
    titleOpacityChangeRate: 0.02,
    legendOpacity: 0,
    legendOpacityChangeRate: 0.02,
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
        if (pieChart.sleepingCurrentAngle + pieChart.openingSpeed * 2 * Math.PI * pieChart.sleepingPercentageOfWeek
             < 2 * Math.PI * pieChart.sleepingPercentageOfWeek){
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

        if (pieChart.legendOpacity < 1) {
            pieChart.legendOpacity += pieChart.legendOpacityChangeRate;
        } else {
            pieChart.legendOpacity = 1;
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
              -Math.PI / 2 - (pieChart.sleepingCurrentAngle + pieChart.exercisingCurrentAngle
                 + pieChart.relaxingCurrentAngle), true);
        c.fillStyle = `rgb(${colorSchemeRGB.relaxing})`;
        c.fill(relaxingPart);

        drawLinesBetweenActivityPartsPieChart();
        drawLegend(pieChart.legendOpacity);

        c.font = `${canvas.height/12}px sans-serif`;
        c.font = `${canvas.height/12}px Poppins`;
        c.textAlign = "center";
        c.textBaseline = "middle";
        c.fillStyle = `rgba(37, 36, 34, ${pieChart.titleOpacity})`;
        c.fillText(pieChart.title.substring(0, 36), pieChart.centerX, canvas.height/22);
        c.fillText(pieChart.title.substring(37), pieChart.centerX, 3 * canvas.height/22);
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
              -Math.PI / 2 - (pieChart.sleepingCurrentAngle + pieChart.exercisingCurrentAngle
                 + pieChart.relaxingCurrentAngle), true);
        c.fillStyle = `rgb(${colorSchemeRGB.relaxing})`;
        c.fill(relaxingPart);


        if (c.isPointInPath(relaxingPart, cursor.x, cursor.y)){
            areaInFocus = 3;
            const relaxingPart = new Path2D();
            relaxingPart.moveTo(pieChart.centerX, pieChart.centerY);
            relaxingPart.arc(pieChart.centerX, pieChart.centerY, pieChart.radius * 1.1,
                 -Math.PI / 2 - (pieChart.sleepingCurrentAngle + pieChart.exercisingCurrentAngle),
                  -Math.PI / 2 - (pieChart.sleepingCurrentAngle + pieChart.exercisingCurrentAngle
                     + pieChart.relaxingCurrentAngle), true);
                  c.fillStyle = `rgba(${colorSchemeRGB.relaxing}, ${pieChart.opacityOnHover})`;
            c.fill(relaxingPart);
        }

        drawLinesBetweenActivityPartsPieChart(areaInFocus);
        drawLegend();
        drawExtraInfoPieChart(areaInFocus);

        c.font = `${canvas.height/12}px sans-serif`;
        c.font = `${canvas.height/12}px Poppins`;
        c.textAlign = "center";
        c.textBaseline = "middle";
        c.fillStyle = "rgb(37, 36, 34)";
        c.fillText(pieChart.title.substring(0, 36), pieChart.centerX, canvas.height/22);
        c.fillText(pieChart.title.substring(37), pieChart.centerX, 3 * canvas.height/22);
    },
    close: () => {
        pieChart.openingAnimationComplete = false;
        pieChart.openingSpeed = 0.02;
        pieChart.openingSpeedChangeRate = 0.0002;
        pieChart.sleepingCurrentAngle = 0;
        pieChart.exercisingCurrentAngle = 0;
        pieChart.relaxingCurrentAngle = 0;
        pieChart.titleOpacity = 0;
        pieChart.legendOpacity = 0;
    }
};

const days = [];

for (let i = 0; i < 7; i++){
    days.push([data.sleeping.timeSpentDuringEachDayInHours[i],
         data.exercising.timeSpentDuringEachDayInHours[i],
          data.relaxing.timeSpentDuringEachDayInHours[i]]);
}

const barChartHeightInHours = days.reduce((a, b) => Math.max(a, Math.max(...b)), 0);

const barChart = {
    title: "Typical time spent doing each activity on a given day:",
    titleOpacity: 0,
    titleOpacityChangeRate: 0.02,
    legendOpacity: 0,
    legendOpacityChangeRate: 0.02,
    openingAnimationComplete: false,
    barChartMaxValue: barChartHeightInHours,
    daysOfWeekNames: ["Mon", "Tues", "Wed", "Thu", "Fri", "Sat", "Sun"],
    axisYHeight: 0,
    axisXWidth: 0,
    axisYMaxHeight: 5 * canvas.height / 8,
    axisXMaxWidth: 3 * canvas.width / 4,
    axisThickness: canvas.width / 128,
    openingSpeed: 0.02,
    openingSpeedChangeRate: 0.0002,
    barAmount: 28,
    originX: canvas.width/12,
    originY: 11 * canvas.height/12,
    open: () => {
        if (barChart.axisYHeight < barChart.axisYMaxHeight){
            barChart.axisXWidth += barChart.openingSpeed * barChart.axisXMaxWidth;
            barChart.axisYHeight += barChart.openingSpeed * barChart.axisYMaxHeight;
            barChart.openingSpeed -= barChart.openingSpeedChangeRate;
        } else {
            barChart.openingAnimationComplete = true;
            barChart.axisXWidth = barChart.axisXMaxWidth;
            barChart.axisYHeight = barChart.axisYMaxHeight;
        }

        if (barChart.titleOpacity < 1) {
            barChart.titleOpacity += barChart.titleOpacityChangeRate;
        } else {
            barChart.titleOpacity = 1;
        }

        if (barChart.legendOpacity < 1) {
            barChart.legendOpacity += barChart.legendOpacityChangeRate;
        } else {
            barChart.legendOpacity = 1;
        }

        drawBars();

        drawXYAxes();

        drawLegend(barChart.legendOpacity);

        c.font = `${canvas.height/12}px sans-serif`;
        c.font = `${canvas.height/12}px Poppins`;
        c.textAlign = "center";
        c.textBaseline = "middle";
        c.fillStyle = `rgba(37, 36, 34, ${barChart.titleOpacity})`;
        c.fillText(barChart.title.substring(0, 29), canvas.width/2, canvas.height/22);
        c.fillText(barChart.title.substring(30), canvas.width/2, 3 * canvas.height/22);
    },
    update: () => {
        drawBars();

        drawXYAxes();

        drawLegend();

        c.font = `${canvas.height/12}px sans-serif`;
        c.font = `${canvas.height/12}px Poppins`;
        c.textAlign = "center";
        c.textBaseline = "middle";
        c.fillStyle = `rgba(37, 36, 34, ${barChart.titleOpacity})`;
        c.fillText(barChart.title.substring(0, 29), canvas.width/2, canvas.height/22);
        c.fillText(barChart.title.substring(30), canvas.width/2, 3 * canvas.height/22);
    },
    close: () => {
        barChart.openingAnimationComplete = false;
        barChart.openingSpeed = 0.02;
        barChart.openingSpeedChangeRate = 0.0002;
        barChart.titleOpacity = 0;
        barChart.legendOpacity = 0;
        barChart.axisYHeight = 0;
        barChart.axisXWidth = 0;
    }
}

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
        c.lineTo(pieChart.centerX - (pieChart.radius * 1.1) * Math.sin(pieChart.sleepingCurrentAngle
             + pieChart.exercisingCurrentAngle),
        pieChart.centerY - (pieChart.radius * 1.1) * Math.cos(pieChart.sleepingCurrentAngle
             + pieChart.exercisingCurrentAngle));
    } else {
        c.lineTo(pieChart.centerX - pieChart.radius * Math.sin(pieChart.sleepingCurrentAngle + pieChart.exercisingCurrentAngle),
        pieChart.centerY - pieChart.radius * Math.cos(pieChart.sleepingCurrentAngle + pieChart.exercisingCurrentAngle));
    }

    c.moveTo(pieChart.centerX, pieChart.centerY);
    c.lineTo(pieChart.centerX - pieChart.radius * Math.sin(pieChart.sleepingCurrentAngle
         + pieChart.exercisingCurrentAngle + pieChart.relaxingCurrentAngle),
    pieChart.centerY - pieChart.radius * Math.cos(pieChart.sleepingCurrentAngle
         + pieChart.exercisingCurrentAngle + pieChart.relaxingCurrentAngle));
    c.stroke();
}

function drawExtraInfoPieChart(areaInFocus = null){
    const rectangleWidth = canvas.width/6;
    const rectangleHeight = canvas.height/6;
    c.fillStyle = "#403D39";
    c.textAlign = "start";
    c.textBaseline = "middle";
    c.font = `${rectangleHeight/3}px sans-serif`;
    c.font = `${rectangleHeight/3}px Poppins`;

    if (areaInFocus === 1){
        const extraInfoRectangle = {
            x: pieChart.centerX - (pieChart.radius * 1.2) * Math.sin(pieChart.sleepingCurrentAngle / 3) - rectangleWidth,
            y: pieChart.centerY - (pieChart.radius * 1.2) * Math.cos(pieChart.sleepingCurrentAngle / 3)
        }
        
        c.fillRect(extraInfoRectangle.x, extraInfoRectangle.y, rectangleWidth, rectangleHeight);

        c.fillStyle = "#FFFCF2";
        c.fillText(`${Math.round(pieChart.sleepingPercentageOfWeek * 10000) / 100}%`,
         extraInfoRectangle.x + rectangleWidth/12, extraInfoRectangle.y + rectangleHeight/3);
        c.fillText(`${sleepingTimeWeek}H`,
         extraInfoRectangle.x + rectangleWidth/12, extraInfoRectangle.y + 2 * rectangleHeight/3);

    } else if (areaInFocus === 2){
        const extraInfoRectangle = {
            x: pieChart.centerX - (pieChart.radius * 1.2) * Math.sin(pieChart.sleepingCurrentAngle
                 + pieChart.exercisingCurrentAngle / 2),
            y: pieChart.centerY - (pieChart.radius * 1.2) * Math.cos(pieChart.sleepingCurrentAngle
                 + pieChart.exercisingCurrentAngle / 2) - rectangleHeight/2
        }

        c.fillRect(extraInfoRectangle.x, extraInfoRectangle.y, rectangleWidth, rectangleHeight);

        c.fillStyle = "#FFFCF2";
        c.fillText(`${Math.round(pieChart.exercisingPercentageOfWeek * 10000) / 100}%`,
         extraInfoRectangle.x + rectangleWidth/12, extraInfoRectangle.y + rectangleHeight/3);
        c.fillText(`${Math.floor(exercisingTimeWeek)}H ${(exercisingTimeWeek % 1) * 60}MIN`,
         extraInfoRectangle.x + rectangleWidth/12, extraInfoRectangle.y + 2 * rectangleHeight/3);

    } else if (areaInFocus === 3){
        const extraInfoRectangle = {
            x: pieChart.centerX - (pieChart.radius * 1.2) * Math.sin(pieChart.sleepingCurrentAngle
                 + pieChart.exercisingCurrentAngle + pieChart.relaxingCurrentAngle / 3),
            y: pieChart.centerY - (pieChart.radius * 1.2) * Math.cos(pieChart.sleepingCurrentAngle
                 + pieChart.exercisingCurrentAngle + pieChart.relaxingCurrentAngle / 3) - rectangleHeight
        }

        c.fillRect(extraInfoRectangle.x, extraInfoRectangle.y, rectangleWidth, rectangleHeight);

        c.fillStyle = "#FFFCF2";
        c.fillText(`${Math.round(pieChart.relaxingPercentageOfWeek * 10000) / 100}%`,
         extraInfoRectangle.x + rectangleWidth/12, extraInfoRectangle.y + rectangleHeight/3);
        c.fillText(`${relaxingTimeWeek}H`, extraInfoRectangle.x + rectangleWidth/12,
         extraInfoRectangle.y + 2 * rectangleHeight/3);

    }
}

function drawXYAxes(){
    c.beginPath();
    c.strokeStyle = "#252422";
    c.lineWidth = barChart.axisThickness;
    c.lineCap = "square";

    c.moveTo(barChart.originX, barChart.originY);
    c.lineTo(barChart.originX, barChart.originY - barChart.axisYHeight);

    c.moveTo(barChart.originX, barChart.originY);
    c.lineTo(barChart.originX + barChart.axisXWidth, barChart.originY);

    c.moveTo(barChart.originX, barChart.originY);
    c.lineTo(barChart.originX - canvas.width / 128, barChart.originY);
    c.moveTo(barChart.originX, barChart.originY - barChart.axisYHeight / 4);
    c.lineTo(barChart.originX - canvas.width / 128, barChart.originY - barChart.axisYHeight / 4);
    c.moveTo(barChart.originX, barChart.originY - barChart.axisYHeight / 2);
    c.lineTo(barChart.originX - canvas.width / 128, barChart.originY - barChart.axisYHeight / 2);
    c.moveTo(barChart.originX, barChart.originY - 3 * barChart.axisYHeight / 4);
    c.lineTo(barChart.originX - canvas.width / 128, barChart.originY - 3 * barChart.axisYHeight / 4);
    c.moveTo(barChart.originX, barChart.originY - barChart.axisYHeight);
    c.lineTo(barChart.originX - canvas.width / 128, barChart.originY - barChart.axisYHeight);

    c.stroke();

    const intervals = [0, barChart.barChartMaxValue / 4, barChart.barChartMaxValue / 2,
         3 * barChart.barChartMaxValue / 4, barChart.barChartMaxValue];

    c.font = `500 ${canvas.height/24}px sans-serif`;
    c.font = `500 ${canvas.height/24}px Poppins`;
    c.textAlign = "end";
    c.textBaseline = "middle";
    c.fillStyle = `rgba(37, 36, 34, ${barChart.titleOpacity})`;
    c.fillText(`${intervals[0]}`, barChart.originX - canvas.width / 48, barChart.originY);
    c.fillText(`${intervals[1]}`, barChart.originX - canvas.width / 48, barChart.originY - barChart.axisYHeight / 4);
    c.fillText(`${intervals[2]}`, barChart.originX - canvas.width / 48, barChart.originY - barChart.axisYHeight / 2);
    c.fillText(`${intervals[3]}`, barChart.originX - canvas.width / 48, barChart.originY - 3 * barChart.axisYHeight / 4);
    c.fillText(`${intervals[4]}`, barChart.originX - canvas.width / 48, barChart.originY - barChart.axisYHeight);

    c.font = `600 ${canvas.height/24}px sans-serif`;
    c.font = `600 ${canvas.height/24}px Poppins`;
    c.textAlign = "center";
    c.textBaseline = "bottom";
    c.fillText("(H)", barChart.originX, barChart.originY - barChart.axisYHeight - canvas.height / 24);
}

function drawBars(){
    const maxWidth = barChart.axisXMaxWidth - 3 * barChart.axisThickness / 2;
    const barThickness = maxWidth / barChart.barAmount;

    c.font = `500 ${canvas.height/24}px sans-serif`;
    c.font = `500 ${canvas.height/24}px Poppins`;
    c.textAlign = "center";
    c.textBaseline = "top";
    c.fillStyle = `rgba(37, 36, 34, ${barChart.titleOpacity})`;

    for (let i = 0; i < 7; i++){
        c.fillText(barChart.daysOfWeekNames[i], barChart.originX + barChart.axisThickness/2 + barThickness * i * 4 + 5 * barThickness/2,
            barChart.originY + canvas.height/48);
    }

    for (let i = 0; i < barChart.barAmount; i++){
        if (i % 4 === 1){
            const heightOfActivity = (barChart.axisYMaxHeight - barChart.axisThickness/2) * days[Math.floor(i/4)][0] / barChart.barChartMaxValue
             * barChart.axisYHeight/barChart.axisYMaxHeight;
            c.fillStyle = `rgb(${colorSchemeRGB.sleeping})`;
            c.fillRect(barChart.originX + barChart.axisThickness/2 + barThickness * i,
                barChart.originY - barChart.axisThickness/2 - heightOfActivity,barThickness, heightOfActivity);
        } else if (i % 4 === 2){
            const heightOfActivity = (barChart.axisYMaxHeight - barChart.axisThickness/2) * days[Math.floor(i/4)][1] / barChart.barChartMaxValue
             * barChart.axisYHeight/barChart.axisYMaxHeight;
            c.fillStyle = `rgb(${colorSchemeRGB.exercising})`;
            c.fillRect(barChart.originX + barChart.axisThickness/2 + barThickness * i,
                barChart.originY - barChart.axisThickness/2 - heightOfActivity,barThickness, heightOfActivity);
        } else if (i % 4 === 3){
            const heightOfActivity = (barChart.axisYMaxHeight - barChart.axisThickness/2) * days[Math.floor(i/4)][2] / barChart.barChartMaxValue
             * barChart.axisYHeight/barChart.axisYMaxHeight;
            c.fillStyle = `rgb(${colorSchemeRGB.relaxing})`;
            c.fillRect(barChart.originX + barChart.axisThickness/2 + barThickness * i,
                 barChart.originY - barChart.axisThickness/2 - heightOfActivity,barThickness, heightOfActivity);
        }
    }
}

function drawLegend(opacity = 1){
    c.fillStyle = `rgbA(64, 61, 57, ${opacity})`;
    c.textAlign = "start";
    c.textBaseline = "middle";
    c.font = `${canvas.height/24}px sans-serif`;
    c.font = `${canvas.height/24}px Poppins`;

    const offsetX = canvas.width / 18;
    const offsetY = 0;

    c.fillText("Sleeping", 77 * canvas.width/96 + offsetX, 13 * canvas.height/48 + offsetY);
    c.fillText("Exercising", 77 * canvas.width/96 + offsetX, canvas.height/3 + offsetY);
    c.fillText("Relaxing", 77 * canvas.width/96 + offsetX, 19 * canvas.height/48 + offsetY);

    c.fillStyle = `rgbA(${colorSchemeRGB.sleeping}, ${opacity})`;
    c.fillRect(3 * canvas.width/4 + offsetX, canvas.height/4 + offsetY, canvas.width/24, canvas.height/24);

    c.fillStyle = `rgbA(${colorSchemeRGB.exercising}, ${opacity})`;
    c.fillRect(3 * canvas.width/4 + offsetX, 15 * canvas.height / 48 + offsetY, canvas.width/24, canvas.height/24);

    c.fillStyle = `rgbA(${colorSchemeRGB.relaxing}, ${opacity})`;
    c.fillRect(3 * canvas.width/4 + offsetX, 9 * canvas.height / 24 + offsetY, canvas.width/24, canvas.height/24);
}

function main() {
    c.clearRect(0, 0, canvas.width, canvas.height);
    if (chartType === 1){
        pieChart.openingAnimationComplete || pieChart.open();
        pieChart.openingAnimationComplete && pieChart.update();
        barChart.close();
    } else if (chartType === 2) {
        barChart.openingAnimationComplete || barChart.open();
        barChart.openingAnimationComplete && barChart.update();
        pieChart.close();
    } else if (chartType === 3) {
        pieChart.close();
        barChart.close();
    }

    requestAnimationFrame(main);
}

main();