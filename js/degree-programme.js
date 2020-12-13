// author: Jedrzej Golebiewski

function expandDescriptionMobile(description) {
    if (description.classList.contains("last")){
        description.previousElementSibling.classList.remove("last");
    }

    requestAnimationFrame(() => {
        const titleH3 = description.previousElementSibling.querySelector("h3");
        const arrowLinesArray = description.previousElementSibling.querySelectorAll(".mobile-title-inner-arrow *");
    
        titleH3.style.color = "#252422";
        description.previousElementSibling.style.backgroundColor = "#EB5E28";
    
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
    
        if (description.scrollHeight !== 0){
            description.style.height = `${description.scrollHeight}px`;
    
            description.addEventListener('transitionend', function() {
                description.removeEventListener('transitionend', arguments.callee);
                if (description.style.height != 0){
                    description.style.height = "auto";
                }
          });
        } else {
            description.style.height = "auto"
        }

    });    
}

function collapseDescriptionMobile(description) {
    const titleH3 = description.previousElementSibling.querySelector("h3");
    const arrowLinesArray = description.previousElementSibling.querySelectorAll(".mobile-title-inner-arrow *");

    titleH3.style.color = "";
    description.previousElementSibling.style.backgroundColor = "";

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
    if (description.scrollHeight !== 0){
        description.style.height = `${description.scrollHeight}px`;

        requestAnimationFrame(() => {
            description.style.height = "";
            description.addEventListener('transitionend', function() {
                description.removeEventListener('transitionend', arguments.callee);
                if (description.classList.contains("last")){
                    description.previousElementSibling.classList.add("last");
                }
            });
        });
    } else {
        description.style.height = "";
        if (description.classList.contains("last")){
            description.previousElementSibling.classList.add("last");
        }
    }

}

function clickHappenedMobile(evt){
    if (isCollapsedMobile) {
        isCollapsedMobile = false;
        expandDescriptionMobile(evt.currentTarget.nextElementSibling);
        collapseDescriptionDesktop(document.querySelector(`#${titleObjectOfOpenedDescriptionDesktop.getAttribute("id").substring(0, 17)}description`));
        expandDescriptionDesktop(document.querySelector(`#desktop${evt.currentTarget.getAttribute("id").substring(6, 16)}description`));
        titleObjectOfOpenedDescriptionMobile = evt.currentTarget;
        titleObjectOfOpenedDescriptionDesktop = document.querySelector(`#desktop${evt.currentTarget.getAttribute("id").substring(6)}`);
    } else {
        if (evt.currentTarget === titleObjectOfOpenedDescriptionMobile) {
            isCollapsedMobile = true;
            collapseDescriptionMobile(evt.currentTarget.nextElementSibling);
        } else {
            collapseDescriptionMobile(titleObjectOfOpenedDescriptionMobile.nextElementSibling);
            expandDescriptionMobile(evt.currentTarget.nextElementSibling);
            collapseDescriptionDesktop(document.querySelector(`#${titleObjectOfOpenedDescriptionDesktop.getAttribute("id").substring(0, 17)}description`));
            expandDescriptionDesktop(document.querySelector(`#desktop${evt.currentTarget.getAttribute("id").substring(6, 16)}description`));
            titleObjectOfOpenedDescriptionMobile = evt.currentTarget;
            titleObjectOfOpenedDescriptionDesktop = document.querySelector(`#desktop${evt.currentTarget.getAttribute("id").substring(6)}`);
        }
    }
}

function closeDescriptionButtonClicked(){
    isCollapsedMobile = true;
    collapseDescriptionMobile(this.parentElement.parentElement);
}

function expandDescriptionDesktop(description) {
    description.classList.add("expanding");
    description.classList.remove("collapsing");
    const correspondingTitle = document.querySelector(`#${description.getAttribute("id").substring(0, 17)}title`);
    const titleH3 = correspondingTitle.querySelector("h3");
    const arrowLinesArray = correspondingTitle.querySelectorAll(".desktop-title-inner-arrow *");

    titleH3.style.color = "#252422";
    correspondingTitle.style.backgroundColor = "#EB5E28";

    arrowLinesArray.forEach(line => {
        if (line.classList.contains("desktop-title-inner-line-1")){
            line.style.transform = "translate(0, calc(-50% - 150%)) rotate(90deg) scale(0.5, 1)";
        } else {
            line.style.transform = "translate(0, calc(-50% + 150%)) rotate(-90deg) scale(0.5, 1)";
        }

        line.style.backgroundColor = "#252422";
        setTimeout(() => {
            if (!description.classList.contains("collapsing")){
                line.style.transform = "";
                line.classList.add("animate-arrow");
            }
        }, 150);
    });

    setTimeout(() => {
        if (!description.classList.contains("collapsing")){
            description.style.width = "100%";
            description.getAttribute("id").includes("8") && description.classList.add("last");
            setTimeout(() => {
                if (!description.classList.contains("collapsing")){
                    description.style.top = 0;
                    description.style.height = "100%";
                    description.style.backgroundColor = "#ccc5b9";
                    description.classList.add("last");
                    description.firstElementChild.style.opacity = "100%";
                    setTimeout(() => {
                        if (!description.classList.contains("collapsing")){
                            description.style.overflowY = "scroll";
                            description.style.overflowY = "overlay";
                        }
                    }, 400);
                }
            }, 400);
        }
    }, 400);
}

function collapseDescriptionDesktop(description) {
    description.classList.remove("expanding");
    description.classList.add("collapsing");
    const correspondingTitle = document.querySelector(`#${description.getAttribute("id").substring(0, 17)}title`);
    const titleH3 = correspondingTitle.querySelector("h3");
    const arrowLinesArray = correspondingTitle.querySelectorAll(".desktop-title-inner-arrow *");


    description.style.overflowY = "hidden";

    description.style.top = "";
    description.style.height = "calc((100% - 7px) / 8)";
    description.style.backgroundColor = "#eb5e28";
    description.getAttribute("id").includes("8") || description.classList.remove("last");
    description.firstElementChild.style.opacity = 0;
    setTimeout(() => {
        if (!description.classList.contains("expanding")){
            description.style.width = 0;
            description.classList.remove("last");
            setTimeout(() => {
                if (!description.classList.contains("expanding")){
                    titleH3.style.color = "#ccc5b9";
                    correspondingTitle.style.backgroundColor = "#252422";
        
                    arrowLinesArray.forEach(line => {
                        if (line.classList.contains("desktop-title-inner-line-1")){
                            line.style.transform = "translate(0, calc(-50% - 150%)) rotate(90deg) translate(-50%, 0) scale(0.5, 1)";
                        } else {
                            line.style.transform = "translate(0, calc(-50% + 150%)) rotate(-90deg) translate(-50%, 0) scale(0.5, 1)";
                        }
        
                        line.style.backgroundColor = "#ccc5b9";
                        setTimeout(() => {
                            if (!description.classList.contains("expanding")){
                                line.style.transform = "";
                                line.classList.remove("animate-arrow");
                            }
                        }, 150);
                    });
                }
            }, 400);
        }        
    }, 400);
}

function clickHappenedDesktop(evt){
    if (titleObjectOfOpenedDescriptionDesktop !== evt.currentTarget){
        expandDescriptionDesktop(document.querySelector(`#${evt.currentTarget.getAttribute("id").substring(0, 17)}description`));
        collapseDescriptionDesktop(document.querySelector(`#${titleObjectOfOpenedDescriptionDesktop.getAttribute("id").substring(0, 17)}description`));
        expandDescriptionMobile(document.querySelector(`#mobile${evt.currentTarget.getAttribute("id").substring(7)}`).nextElementSibling);
        if (isCollapsedMobile){
            isCollapsedMobile = false;
        } else {
            collapseDescriptionMobile(titleObjectOfOpenedDescriptionMobile.nextElementSibling);
        }

        titleObjectOfOpenedDescriptionDesktop = evt.currentTarget;
        titleObjectOfOpenedDescriptionMobile = document.querySelector(`#mobile${evt.currentTarget.getAttribute("id").substring(7)}`);

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