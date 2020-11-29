function expandDescriptionMobile(element) {
    if (element.classList.contains("last")){
        element.previousElementSibling.classList.remove("last");
    }

    requestAnimationFrame(() => {
        const titleH2 = element.previousElementSibling.querySelector("h2");
        const arrowLinesArray = element.previousElementSibling.querySelectorAll(".mobile-title-inner-arrow *");
    
        titleH2.style.color = "#252422";
        element.previousElementSibling.style.backgroundColor = "#EB5E28";
    
        arrowLinesArray.forEach(line => {
            if (line.classList.contains("mobile-title-inner-line-1")){
                line.style.transform = "translate(15%, -50%) scale(0.5, 1)";
            } else {
                line.style.transform = "translate(-15%, -50%) scale(0.5, 1)";
            }
            line.style.backgroundColor = "#252422";
            setTimeout(() => {
              line.style.transform = "";
              line.classList.add("animate-arrow");
            }, 150);
        });
    
        element.style.height = `${element.scrollHeight}px`;
    
        element.addEventListener('transitionend', function() {
            element.removeEventListener('transitionend', arguments.callee);
            if (element.style.height != 0){
                element.style.height = "auto";
            }
      });
    });    
}

function collapseDescriptionMobile(element) {
    const titleH2 = element.previousElementSibling.querySelector("h2");
    const arrowLinesArray = element.previousElementSibling.querySelectorAll(".mobile-title-inner-arrow *");

    titleH2.style.color = "";
    element.previousElementSibling.style.backgroundColor = "";

    arrowLinesArray.forEach(line => {
        if (line.classList.contains("mobile-title-inner-line-1")){
            line.style.transform = "translate(15%, -50%) scale(0.5, 1)";
        } else {
            line.style.transform = "translate(-15%, -50%) scale(0.5, 1)";
        }
        line.style.backgroundColor = "";
        setTimeout(() => {
          line.style.transform = "";
          line.classList.remove("animate-arrow");
        }, 150);
    });

    // Wait for re-render between height: auto -> height: scrollHeight and height: scrollHeight -> height: 0
    // to avoid height: auto -> height: 0
    // height: auto is not an animatable property.

    element.style.height = `${element.scrollHeight}px`;

    requestAnimationFrame(() => {
        element.style.height = "";
        element.addEventListener('transitionend', function() {
            element.removeEventListener('transitionend', arguments.callee);
            if (element.classList.contains("last")){
                element.previousElementSibling.classList.add("last");
            }
        });
    });
}

function clickHappenedMobile(evt){
    if (isCollapsedMobile) {
        isCollapsedMobile = false;
        expandDescriptionMobile(evt.currentTarget.nextElementSibling);
        titleObjectOfOpenedDescriptionMobile = evt.currentTarget;
    } else {
        if (evt.currentTarget === titleObjectOfOpenedDescriptionMobile) {
            isCollapsedMobile = true;
            collapseDescriptionMobile(evt.currentTarget.nextElementSibling);
        } else {
            collapseDescriptionMobile(titleObjectOfOpenedDescriptionMobile.nextElementSibling);
            expandDescriptionMobile(evt.currentTarget.nextElementSibling);
            titleObjectOfOpenedDescriptionMobile = evt.currentTarget;
        }
    }
}

function closeDescriptionButtonClicked(){
    isCollapsedMobile = true;
    collapseDescriptionMobile(this.parentElement.parentElement);
}

function expandDescriptionDesktop(element) {
    const correspondingTitle = document.querySelector(`#${element.getAttribute("id").substring(0, 17)}title`);
    const titleH2 = correspondingTitle.querySelector("h2");
    const arrowLinesArray = correspondingTitle.querySelectorAll(".desktop-title-inner-arrow *");

    titleH2.style.color = "#252422";
    correspondingTitle.style.backgroundColor = "#EB5E28";

    arrowLinesArray.forEach(line => {
        if (line.classList.contains("desktop-title-inner-line-1")){
            line.style.transform = "translate(0, calc(-50% - 150%)) rotate(90deg) scale(0.5, 1)";
        } else {
            line.style.transform = "translate(0, calc(-50% + 150%)) rotate(-90deg) scale(0.5, 1)";
        }

        line.style.backgroundColor = "#252422";
        setTimeout(() => {
          line.style.transform = "";
          line.classList.add("animate-arrow");
        }, 150);
    });

    setTimeout(() => {
        element.style.width = "100%";
        element.getAttribute("id").includes("8") && element.classList.add("last");
        setTimeout(() => {
            element.style.top = 0;
            element.style.height = "100%";
            element.style.backgroundColor = "#ccc5b9";
            element.classList.add("last");
            setTimeout(() => {
                element.style.overflowY = "overlay";
            }, 400);
        }, 400);
    }, 400);
}

function collapseDescriptionDesktop(element) {
    const correspondingTitle = document.querySelector(`#${element.getAttribute("id").substring(0, 17)}title`);
    const titleH2 = correspondingTitle.querySelector("h2");
    const arrowLinesArray = correspondingTitle.querySelectorAll(".desktop-title-inner-arrow *");

    element.style.overflowY = "hidden";

    element.style.top = "";
    element.style.height = "calc((100% - 7px) / 8)";
    element.style.backgroundColor = "#eb5e28";
    element.getAttribute("id").includes("8") || element.classList.remove("last");
    setTimeout(() => {
        element.style.width = 0;
        element.classList.remove("last");
        setTimeout(() => {            
            titleH2.style.color = "";
            correspondingTitle.style.backgroundColor = "";

            arrowLinesArray.forEach(line => {
                if (line.classList.contains("desktop-title-inner-line-1")){
                    line.style.transform = "translate(0, calc(-50% - 150%)) rotate(90deg) translate(-50%, 0) scale(0.5, 1)";
                } else {
                    line.style.transform = "translate(0, calc(-50% + 150%)) rotate(-90deg) translate(-50%, 0) scale(0.5, 1)";
                }

                line.style.backgroundColor = "";
                setTimeout(() => {
                line.style.transform = "";
                line.classList.remove("animate-arrow");
                }, 150);
            });
        }, 400);
    }, 400);
}

function clickHappenedDesktop(evt){
    if (titleObjectOfOpenedDescriptionDesktop !== evt.currentTarget){
        expandDescriptionDesktop(document.querySelector(`#${evt.currentTarget.getAttribute("id").substring(0, 17)}description`));
        collapseDescriptionDesktop(document.querySelector(`#${titleObjectOfOpenedDescriptionDesktop.getAttribute("id").substring(0, 17)}description`));
        titleObjectOfOpenedDescriptionDesktop = evt.currentTarget;
    }
}

let isCollapsedMobile = true;
let titleObjectOfOpenedDescriptionMobile = null;
let titleObjectOfOpenedDescriptionDesktop = document.querySelector("#desktop-module-1-title");
const arrayOfMobileTitles = document.querySelectorAll('.mobile-title');
const closeButtons = document.querySelectorAll(".bar-to-close");
const arrayOfDesktopTitles = document.querySelectorAll(".desktop-title");

arrayOfMobileTitles.forEach(element => element.addEventListener('click', clickHappenedMobile));
closeButtons.forEach(button => button.addEventListener("click", closeDescriptionButtonClicked));
arrayOfDesktopTitles.forEach(element => element.addEventListener('click', clickHappenedDesktop));