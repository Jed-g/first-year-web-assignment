// author: Jedrzej Golebiewski

// Dynamically add year to footer copyright
const date = new Date();

document.querySelector("#copyright").textContent += ` ${date.getFullYear()}`;

// Attach "click" event listener to the logo in order to redirect to home
document.querySelectorAll(".logo").forEach(element => element.addEventListener("click", redirectToIndexHtml));

function redirectToIndexHtml() {
  window.location.href = "./index.html";
}

// Highlight current page link in menu
const currentHtmlFileName = window.location.pathname.split("/").pop().replace(".html", "");
const linkOfCurrentPage = document.querySelectorAll(`.${currentHtmlFileName}`);
linkOfCurrentPage.forEach(link => link.style.color = "#252422");

const menuIcon = document.querySelector("#menu-icon");

// Select elements from DOM
const menuLinkArrayMobile = document.querySelectorAll("#anchor-tags a");

const menuLinkArrayLeft = document.querySelectorAll("#anchor-tags-left a");
const menuLinkArrayRight = document.querySelectorAll("#anchor-tags-right a");

// Attach "click" event listener to the menu hamburger icon in order execute "animateMenuIconClick" function.
const menuButton = document.querySelector("#menu-icon");
menuButton.addEventListener("click", () => animateMenuIconClick("mobile"));

// Function responsible for animating mobile menu.
function animateMenuIconClick(sourceOfCall) {

  // Remove event listeners and call desktop menu function so that both menus have the same state.
  // The sourceOfCall logic is very important as it prevents endless recursion.
  if (sourceOfCall === "mobile"){

    if (!desktopMenuLockedOpen){
      desktopMenuLockedOpen = true;
      desktopMenuButton.removeEventListener("mouseenter", buttonMouseEnter);
      desktopMenuButton.removeEventListener("mouseleave", buttonMouseLeave);
      desktopMenuLinkArea.removeEventListener("mouseenter", linkAreaMouseEnter);
      desktopMenuLinkArea.removeEventListener("mouseleave", linkAreaMouseLeave);
    } else {
      desktopMenuLockedOpen = false;
      desktopMenuButton.addEventListener("mouseenter", buttonMouseEnter);
      desktopMenuButton.addEventListener("mouseleave", buttonMouseLeave);
      desktopMenuLinkArea.addEventListener("mouseenter", linkAreaMouseEnter);
      desktopMenuLinkArea.addEventListener("mouseleave", linkAreaMouseLeave);
    }

    animateDesktopMenu("mobile");
  }

  // Toggle css class to cross outer lines and make inner one transparent
  menuIcon.classList.toggle("animate-menu-icon");

  // "If" regarding whether to animate menu expansion or closure
  if (menuIcon.classList.contains("animate-menu-icon")) {

    document.body.classList.toggle("hide-overflow");

    menuIcon.classList.toggle("push-menu-button-top");

    // Remove "click" event listener from logo
    document.querySelector("#logo-mobile").removeEventListener("click", redirectToIndexHtml);
    document.querySelector("#logo-mobile").style.cursor = "default";

    // Make header elements transparent (didn't use z-index = -1 etc. because of conflict with hamburger icon disappearing)
    document.querySelector("#logo-mobile").style.opacity = 0;
    document.querySelector("#page-title-info-mobile").style.opacity = 0;
    document.querySelector("#mobile-tablet-header").style.backgroundColor = "#EB5E28";

    // Expand menu orange background from top
    document.querySelector("#side-menu").style.top = 0;

    // Expand "#anchor-tags" div from left or the two divs active in landscape orientation from both sides.
    // (has to be hidden when menu not in use, otherwise clicking on the screen is obscured by the transparent div)
    document.querySelector("#anchor-tags").style.left = 0;

    document.querySelector("#anchor-tags-left").style.left = 0;
    document.querySelector("#anchor-tags-right").style.left = "50vw";
   
    // Animate each of the menu links from the correct side.
    menuLinkArrayMobile.forEach((link, index) => {
      setTimeout(() => link.style.marginLeft = "8vw", index * 70);
    });

    menuLinkArrayLeft.forEach((link, index) => {
      setTimeout(() => link.style.marginLeft = "12vw", index * 140);
    });

    menuLinkArrayRight.forEach((link, index) => {
      setTimeout(() => link.style.marginLeft = "12vw", index * 140);
    });

  } else {

    document.body.classList.toggle("hide-overflow");

    menuIcon.classList.toggle("push-menu-button-top");

    // Add "click" event listener to logo enabling redirection to home
    document.querySelector("#logo-mobile").addEventListener("click", redirectToIndexHtml);
    document.querySelector("#logo-mobile").style.cursor = "pointer";

    // Make header opaque
    document.querySelector("#logo-mobile").style.opacity = "100%";
    document.querySelector("#page-title-info-mobile").style.opacity = "100%";
    document.querySelector("#mobile-tablet-header").style.backgroundColor = "#252422";

    // Hide menu background
    document.querySelector("#side-menu").style.top = "-100vh";

    // Hide divs
    document.querySelector("#anchor-tags").style.left = "-100vw";

    document.querySelector("#anchor-tags-left").style.left = "-50vw";
    document.querySelector("#anchor-tags-right").style.left = "100vw";

    // Hide menu links
    menuLinkArrayMobile.forEach((link, index) => {
      setTimeout(() => link.style.marginLeft = "", index * 40);
    });

    menuLinkArrayLeft.forEach((link, index) => {
      setTimeout(() => link.style.marginLeft = "", index * 80);
    });

    menuLinkArrayRight.forEach((link, index) => {
      setTimeout(() => link.style.marginLeft = "", index * 80);
    });
  }
}

let desktopMenuOpen = false;

let desktopMenuLockedOpen = false;
let desktopMenuButtonAreaEntered = false;
let desktopMenuLinkAreaEntered = false;

const desktopMenuButton = document.querySelector("#menu-desktop-icon");
const desktopMenuButtonH1 = document.querySelector("#menu-desktop-inner h1");
const desktopMenuButtonArrowElementsArray = document.querySelectorAll("#menu-desktop-arrow *");
const desktopMenuLinkArea = document.querySelector("#menu-desktop-anchor-tags");
const desktopMenuAnchorTagsArray = document.querySelectorAll("#menu-desktop-anchor-tags-inner a");

// Declared here globally, because later on this is required.
let attachEventListenersTimeoutFunction;

// Function responsible for desktop menu button click.
function buttonClick(){
  if (!desktopMenuLockedOpen){

    desktopMenuLockedOpen = true;

    if (!desktopMenuOpen){
      animateDesktopMenu("desktop");
    }
    desktopMenuButton.removeEventListener("mouseenter", buttonMouseEnter);
    desktopMenuButton.removeEventListener("mouseleave", buttonMouseLeave);
    desktopMenuLinkArea.removeEventListener("mouseenter", linkAreaMouseEnter);
    desktopMenuLinkArea.removeEventListener("mouseleave", linkAreaMouseLeave);
    clearTimeout(attachEventListenersTimeoutFunction);
  } else {
    desktopMenuLockedOpen = false;
    animateDesktopMenu("desktop");
    // Global variable is required here, because the timeout can be potentially cleared.
    attachEventListenersTimeoutFunction = setTimeout(() => {
      desktopMenuButtonAreaEntered = false;
      desktopMenuLinkAreaEntered = false;
      desktopMenuButton.addEventListener("mouseenter", buttonMouseEnter);
      desktopMenuButton.addEventListener("mouseleave", buttonMouseLeave);
      desktopMenuLinkArea.addEventListener("mouseenter", linkAreaMouseEnter);
      desktopMenuLinkArea.addEventListener("mouseleave", linkAreaMouseLeave);
    }, 400);
  }
}

// If desktop menu is opened and locked in place (not expanded on hover) then a click outside the menu will close it.
function clickOutsideDesktopMenuCloseMenu() {
  if (desktopMenuOpen){
    desktopMenuLockedOpen = false;
    animateDesktopMenu("desktop");

    attachEventListenersTimeoutFunction = setTimeout(() => {
      desktopMenuButtonAreaEntered = false;
      desktopMenuLinkAreaEntered = false;
      desktopMenuButton.addEventListener("mouseenter", buttonMouseEnter);
      desktopMenuButton.addEventListener("mouseleave", buttonMouseLeave);
      desktopMenuLinkArea.addEventListener("mouseenter", linkAreaMouseEnter);
      desktopMenuLinkArea.addEventListener("mouseleave", linkAreaMouseLeave);
    }, 400);
  }
}

// Desktop menu will stay open if it was initially opened by a hover and then a click happened in the link area.
function linkAreaClick() {
  desktopMenuLockedOpen = true;

  desktopMenuButton.removeEventListener("mouseenter", buttonMouseEnter);
  desktopMenuButton.removeEventListener("mouseleave", buttonMouseLeave);
  desktopMenuLinkArea.removeEventListener("mouseenter", linkAreaMouseEnter);
  desktopMenuLinkArea.removeEventListener("mouseleave", linkAreaMouseLeave);
}

// Functions responsible for the behaviour of the desktop menu in relation to the cursor/mouse position (hover).
// All edge cases were thoroughly tested and work correctly.
// The timeouts in the 2nd and 4th functions are there so that the 1st and 3rd functions have time to change the important
// variables before the 2nd and 4th functions execute. Because of this, if the cursor travels directly between the desktop
// menu button and link area, the animation to close the menu won't happen.
function buttonMouseEnter() {
  desktopMenuButtonAreaEntered = true;
  if (!desktopMenuLinkAreaEntered && !desktopMenuOpen){
    animateDesktopMenu("desktop");
  }
}

function buttonMouseLeave() {
  setTimeout(() => {
    desktopMenuButtonAreaEntered = false;
    if (!desktopMenuLinkAreaEntered && desktopMenuOpen){
      animateDesktopMenu("desktop");
    }
  }, 1);
}

function linkAreaMouseEnter() {
  desktopMenuLinkAreaEntered = true;
  if (!desktopMenuButtonAreaEntered && !desktopMenuOpen){
    animateDesktopMenu("desktop");
  }
}

function linkAreaMouseLeave() {
  setTimeout(() => {
    desktopMenuLinkAreaEntered = false;
    if (!desktopMenuButtonAreaEntered && desktopMenuOpen){
      animateDesktopMenu("desktop");
    }
  }, 1);
}

// Attach event listeners
desktopMenuButton.addEventListener("click", buttonClick);
desktopMenuLinkArea.addEventListener("click", linkAreaClick);
desktopMenuButton.addEventListener("mouseenter", buttonMouseEnter);
desktopMenuButton.addEventListener("mouseleave", buttonMouseLeave);
desktopMenuLinkArea.addEventListener("mouseenter", linkAreaMouseEnter);
desktopMenuLinkArea.addEventListener("mouseleave", linkAreaMouseLeave);

// Event listeners for closing desktop menu upon a click outside the menu area.
document.querySelector("#desktop-header").addEventListener("click", evt => {
  if (["desktop-header", "page-title-info-desktop"].includes(evt.target.getAttribute("id"))){
  clickOutsideDesktopMenuCloseMenu();
  }
});

document.querySelector("main").addEventListener("click", clickOutsideDesktopMenuCloseMenu);
document.querySelector("footer").addEventListener("click", clickOutsideDesktopMenuCloseMenu);

// Function responsible for animating desktop menu.
function animateDesktopMenu(sourceOfCall) {

  desktopMenuOpen = !desktopMenuOpen;

  // Condition to prevent endless recursion. Transfer state to mobile.
  if (sourceOfCall === "desktop"){
    animateMenuIconClick("desktop");
  }

  // Condition to open or close desktop menu.
  // desktopMenuOpen value was inverted earlier, hence the first block opens the desktop menu.
  if (desktopMenuOpen){
    // Change desktop menu button properties.
    desktopMenuButtonArrowElementsArray.forEach(line => {
      if (line.classList.contains("desktop-line-1")){
          line.style.transform = "translate(16%, -50%) scale(0.5, 1)";
      } else {
          line.style.transform = "translate(-16%, -50%) scale(0.5, 1)";
      }
      line.style.backgroundColor = "#403d39";
      setTimeout(() => {
        line.style.transform = "";
        line.classList.add("animate-menu-desktop-icon");
      }, 150);
    });

    desktopMenuButton.style.backgroundColor = "#eb5e28";
    desktopMenuButtonH1.style.color = "#403d39";
    
    // Animate link area and the links themselves.
    desktopMenuLinkArea.style.top = 0;

    desktopMenuAnchorTagsArray.forEach((link, index) => {
      // For some reason, if there isn't a time offset of atleast a couple ms, the first link, i.e. "Home", doesn't
      // get its marginTop property set properly.
      // This is why there is a "+ 10(ms)" below.
      // I have been unable to find the reason for this behaviour, however everything works correctly.
      setTimeout(() => link.style.marginTop = 0, index * 60 + 10);
    });

  } else {
    // Change desktop menu button properties.
    desktopMenuButtonArrowElementsArray.forEach(line => {
      if (line.classList.contains("desktop-line-1")){
        line.style.transform = "translate(16%, -50%) scale(0.5, 1)";
      } else {
          line.style.transform = "translate(-16%, -50%) scale(0.5, 1)";
      }
      line.style.backgroundColor = "";
      setTimeout(() => {
        line.style.transform = "";
        line.classList.remove("animate-menu-desktop-icon");
      }, 150);
    });

    desktopMenuButton.style.backgroundColor = "";
    desktopMenuButtonH1.style.color = "#ccc5b9";

    // Revert to default.
    desktopMenuLinkArea.style.top = "";

    desktopMenuAnchorTagsArray.forEach((link, index) => {
      setTimeout(() => link.style.marginTop = "", index * 30);
    });
  }
};