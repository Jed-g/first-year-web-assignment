const date = new Date();

document.querySelector(
  "#copyright"
).textContent = `© Jedrzej Golebiewski ${date.getFullYear()}`;

document.querySelector("#logo").addEventListener("click", redirectToIndexHtml);

function redirectToIndexHtml() {
  window.location.href = "./index.html";
}

const menuButton = document.querySelector("#menu-icon");
menuButton.addEventListener("click", animateMenuIconClick);

const menuLinkArray = document.querySelectorAll("#anchor-tags a");

function animateMenuIconClick() {
  this.classList.toggle("animate-menu-icon-full");
  if (this.classList.contains("animate-menu-icon-full")) {
    document.querySelector("#side-menu").style.height = "100vh";
    document.querySelector("#logo").style.opacity = 0;
    document.querySelector("#current-page-info").style.opacity = 0;
    document.querySelector("header").style.backgroundColor = "#EB5E28";
    document
      .querySelector("#logo")
      .removeEventListener("click", redirectToIndexHtml);

      for (let i = 0; i < menuLinkArray.length; i++){
        setTimeout(() => menuLinkArray[i].style.marginLeft = "8%", i * 80);
      }
  } else {
    document
      .querySelector("#logo")
      .addEventListener("click", redirectToIndexHtml);
    document.querySelector("#side-menu").style.height = 0;
    document.querySelector("#logo").style.opacity = "100%";
    document.querySelector("#current-page-info").style.opacity = "100%";
    document.querySelector("header").style.backgroundColor = "#252422";
    for (let i = 0; i < menuLinkArray.length; i++){
      setTimeout(() => menuLinkArray[i].style.marginLeft = "-200%", i * 80);
    }
  }
}
