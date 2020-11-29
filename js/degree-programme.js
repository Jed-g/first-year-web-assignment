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
            element.style.height = "auto";
            arrayOfMobileTitles.forEach( element => element.addEventListener('click', clickHappenedMobile));
            closeButtons.forEach(button => button.addEventListener("click", closeDescriptionButtonClicked));
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

    // transition height: auto -> height: scrollHeight is instant so the requestAnimationFrame() fires for this transition
    element.style.height = `${element.scrollHeight}px`;

    requestAnimationFrame(() => {
        element.style.height = "";
        element.addEventListener('transitionend', function() {
            element.removeEventListener('transitionend', arguments.callee);
            arrayOfMobileTitles.forEach( element => element.addEventListener('click', clickHappenedMobile));
            closeButtons.forEach(button => button.addEventListener("click", closeDescriptionButtonClicked));
            if (element.classList.contains("last")){
                element.previousElementSibling.classList.add("last");
            }
        });
    });
}

function clickHappenedMobile(evt){
    arrayOfMobileTitles.forEach( element => element.removeEventListener('click', clickHappenedMobile));
    closeButtons.forEach(button => button.removeEventListener("click", closeDescriptionButtonClicked));
    if (isCollapsed) {
        expandDescriptionMobile(evt.currentTarget.nextElementSibling);
        isCollapsed = false;
        titleObjectOfOpenedDesc = evt.currentTarget;
    } else {
        if (evt.currentTarget === titleObjectOfOpenedDesc) {
            collapseDescriptionMobile(evt.currentTarget.nextElementSibling);
            isCollapsed = true;
        } else {
            collapseDescriptionMobile(titleObjectOfOpenedDesc.nextElementSibling);
            expandDescriptionMobile(evt.currentTarget.nextElementSibling);
            titleObjectOfOpenedDesc = evt.currentTarget;
        }
    }
}

function closeDescriptionButtonClicked(){
    arrayOfMobileTitles.forEach( element => element.removeEventListener('click', clickHappenedMobile));
    closeButtons.forEach(button => button.removeEventListener("click", closeDescriptionButtonClicked));
    collapseDescriptionMobile(this.parentElement.parentElement);
    isCollapsed = true;
}

function expandDescriptionDesktop(element) {
    const titleH2 = element.previousElementSibling.querySelector("h2");
    const arrowLinesArray = element.previousElementSibling.querySelectorAll(".desktop-title-inner-arrow *");

    titleH2.style.color = "#252422";
    element.previousElementSibling.style.backgroundColor = "#EB5E28";

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
}

function collapseDescriptionDesktop(element) {
    const titleH2 = element.previousElementSibling.querySelector("h2");
    const arrowLinesArray = element.previousElementSibling.querySelectorAll(".desktop-title-inner-arrow *");

    titleH2.style.color = "#252422";
    element.previousElementSibling.style.backgroundColor = "#EB5E28";

    arrowLinesArray.forEach(line => {
        if (line.classList.contains("desktop-title-inner-line-1")){
            line.style.transform = "translate(0, calc(-50% - 150%)) rotate(90deg) translate(-50%, 0) scale(0.5, 1)";
        } else {
            line.style.transform = "translate(0, calc(-50% + 150%)) rotate(-90deg) translate(-50%, 0) scale(0.5, 1)";
        }

        line.style.backgroundColor = "#252422";
        setTimeout(() => {
          line.style.transform = "";
          line.classList.remove("animate-arrow");
        }, 150);
    });
}

function clickHappenedDesktop(evt){
    arrayOfDesktopTitles.forEach( element => element.removeEventListener('click', clickHappenedDesktop));
    
    expandDescriptionDesktop(evt.currentTarget.nextElementSibling);
}

let isCollapsed = true;
let titleObjectOfOpenedDesc = null;
const arrayOfMobileTitles = document.querySelectorAll('.mobile-title');
const closeButtons = document.querySelectorAll(".bar-to-close");
const arrayOfDesktopTitles = document.querySelectorAll(".desktop-title");

arrayOfMobileTitles.forEach( element => element.addEventListener('click', clickHappenedMobile));
closeButtons.forEach(button => button.addEventListener("click", closeDescriptionButtonClicked));
arrayOfDesktopTitles.forEach( element => element.addEventListener('click', clickHappenedDesktop));