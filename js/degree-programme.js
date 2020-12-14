// author: Jedrzej Golebiewski

// Script is implemented in such a way that in desktop view one module description is always open whereas
// in mobile view it is possible to fully collapse all the descriptions. This decision was made because of
// aesthetics and the fact that the fully collapsed "module viewing element" on desktop looks bad.

// Mobile & desktop views will always have the same description open.


function expandDescriptionMobile(description) {
    if (description.classList.contains("last")){
        description.previousElementSibling.classList.remove("last");
    }

    // Wait until bottom right corner has straightened out before proceeding if last module is being expanded.
    requestAnimationFrame(() => {
        // Select relevant elements from DOM
        const titleH3 = description.previousElementSibling.querySelector("h3");
        const arrowLinesArray = description.previousElementSibling.querySelectorAll(".mobile-title-inner-arrow *");
    
        // Change module title element colours and arrow orientation to show that it was selected.
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
    
        // Conditional to not expand the module description if user opened the module and then closed it
        // before the expand function managed to finish properly.
        if (description.scrollHeight !== 0){
            // Animate description height
            description.style.height = `${description.scrollHeight}px`;
            
            // Once transition ends, then and only then switch to auto height, because auto property is not animatable.
            description.addEventListener('transitionend', function() {
                description.removeEventListener('transitionend', arguments.callee);
                if (description.style.height != 0){
                    description.style.height = "auto";
                }
          });
        } else {
            description.style.height = "auto";
        }
    });    
}

function collapseDescriptionMobile(description) {
    // Select relevant elements from DOM
    const titleH3 = description.previousElementSibling.querySelector("h3");
    const arrowLinesArray = description.previousElementSibling.querySelectorAll(".mobile-title-inner-arrow *");

    // Return module title elements to default
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

    if (description.scrollHeight !== 0){
        description.style.height = `${description.scrollHeight}px`;

        // Wait for re-render between height: auto -> height: scrollHeight and height: scrollHeight -> height: 0
        // to avoid height: auto -> height: 0
        // height: auto is not an animatable property.
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
        // Round bottom right corner if element is last
        if (description.classList.contains("last")){
            description.previousElementSibling.classList.add("last");
        }
    }
}

// Logic for click event handling on mobile
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

// On mobile you can close the module description by using the "close button" in the bottom right of each
// module description. This function handles that.
function closeDescriptionButtonClicked(){
    isCollapsedMobile = true;
    collapseDescriptionMobile(this.parentElement.parentElement);
}

function expandDescriptionDesktop(description) {
    // Assign temporary class to element to handle multiple clicks on different modules at once and prevent bugs and unwanted behaviour.
    description.classList.add("expanding");
    description.classList.remove("collapsing");
    const correspondingTitle = document.querySelector(`#${description.getAttribute("id").substring(0, 17)}title`);
    const titleH3 = correspondingTitle.querySelector("h3");
    const arrowLinesArray = correspondingTitle.querySelectorAll(".desktop-title-inner-arrow *");

    // Change module title element colours and arrow orientation to show that it was selected.
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

    // Transition stages
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
                            // Once module description has expanded, enable scrolling.
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
    // Assign temporary class to element to handle multiple clicks on different modules at once and prevent bugs and unwanted behaviour.
    description.classList.remove("expanding");
    description.classList.add("collapsing");
    const correspondingTitle = document.querySelector(`#${description.getAttribute("id").substring(0, 17)}title`);
    const titleH3 = correspondingTitle.querySelector("h3");
    const arrowLinesArray = correspondingTitle.querySelectorAll(".desktop-title-inner-arrow *");

    // Revert to default description values
    description.style.overflowY = "hidden";

    description.style.top = "";
    description.style.height = "calc((100% - 7px) / 8)";
    description.style.backgroundColor = "#eb5e28";
    description.getAttribute("id").includes("8") || description.classList.remove("last");
    description.firstElementChild.style.opacity = 0;

    // Transition stages
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

// Logic for click event handling on desktop
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

// Variables for state management
let isCollapsedMobile = true;
let titleObjectOfOpenedDescriptionMobile = null;
let titleObjectOfOpenedDescriptionDesktop = document.querySelector("#desktop-module-1-title");

// Attach event listeners
const arrayOfMobileTitles = document.querySelectorAll('.mobile-title');
const closeButtons = document.querySelectorAll(".bar-to-close");
const arrayOfDesktopTitles = document.querySelectorAll(".desktop-title");

arrayOfMobileTitles.forEach(element => element.addEventListener('click', clickHappenedMobile));
closeButtons.forEach(button => button.addEventListener("click", closeDescriptionButtonClicked));
arrayOfDesktopTitles.forEach(element => element.addEventListener('click', clickHappenedDesktop));