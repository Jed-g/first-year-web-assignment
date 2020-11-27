function expandDescription(element) {
    if (element.classList.contains("last")){
        element.previousElementSibling.classList.remove("last");
    }

    requestAnimationFrame(() => {
        const titleH2 = element.previousElementSibling.querySelector("h2");
        const arrowLinesArray = element.previousElementSibling.querySelectorAll(".mobile-title-inner-arrow *");
    
        titleH2.style.color = "#252422";
        element.previousElementSibling.style.backgroundColor = "#EB5E28";
    
        arrowLinesArray.forEach(line => {
            line.style.transform = "scale(0.5, 1)";
            line.style.backgroundColor = "#252422";
            setTimeout(() => {
              line.style.transform = "";
              line.classList.add("animate-arrow");
            }, 150);
          });
    
        element.style.height = `${element.scrollHeight}px`;
    
        element.addEventListener('transitionend', function(evt) {
            element.removeEventListener('transitionend', arguments.callee);
            element.style.height = "auto";
            arrayOfMobileTitles.forEach( element => element.addEventListener('click', clickHappened));
      });
    });    
}

function collapseDescription(element) {
    const titleH2 = element.previousElementSibling.querySelector("h2");
    const arrowLinesArray = element.previousElementSibling.querySelectorAll(".mobile-title-inner-arrow *");

    titleH2.style.color = "";
    element.previousElementSibling.style.backgroundColor = "";

    arrowLinesArray.forEach(line => {
        line.style.transform = "scale(0.5, 1)";
        line.style.backgroundColor = "";
        setTimeout(() => {
          line.style.transform = "";
          line.classList.remove("animate-arrow");
        }, 100);
      });

    element.style.height = `${element.scrollHeight}px`;
    requestAnimationFrame(() => {
        element.style.height = "";
        element.addEventListener('transitionend', function(evt) {
            element.removeEventListener('transitionend', arguments.callee);
            arrayOfMobileTitles.forEach( element => element.addEventListener('click', clickHappened));
            if (element.classList.contains("last")){
                element.previousElementSibling.classList.add("last");
            }
        });
    });
}

function clickHappened(evt){
    arrayOfMobileTitles.forEach( element => element.removeEventListener('click', clickHappened));
    if (isCollapsed) {
        expandDescription(evt.currentTarget.nextElementSibling);
        isCollapsed = false;
        titleObjectOfOpenedDesc = evt.currentTarget;
    } else {
        if (evt.currentTarget === titleObjectOfOpenedDesc) {
            collapseDescription(evt.currentTarget.nextElementSibling);
            isCollapsed = true;
        } else {
            collapseDescription(titleObjectOfOpenedDesc.nextElementSibling);
            expandDescription(evt.currentTarget.nextElementSibling);
            titleObjectOfOpenedDesc = evt.currentTarget;
        }
    }
}

let isCollapsed = true;
let titleObjectOfOpenedDesc = null;
const arrayOfMobileTitles = document.querySelectorAll('.mobile-title');
arrayOfMobileTitles.forEach( element => element.addEventListener('click', clickHappened));