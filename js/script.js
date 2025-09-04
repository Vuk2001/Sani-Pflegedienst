// Cookies box
const cookieBox = document.querySelector("cookie-wrapper"),
  buttons = document.querySelectorAll(".button");
const executeCodes = () => {
  //if cookie contains codinglab it will be returned and below of this code will not run
  if (document.cookie.includes("codinglab")) return;
  cookieBox.classList.add("show");
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      cookieBox.classList.remove("show");
      //if button has acceptBtn id
      if (button.id == "acceptBtn") {
        //set cookies for 1 month. 60 = 1 min, 60 = 1 hours, 24 = 1 day, 30 = 30 days
        document.cookie = "cookieBy= codinglab; max-age=" + 60 * 60 * 24 * 30;
      }
    }); 
  });
};
//executeCodes function will be called on webpage load
window.addEventListener("load", executeCodes);



// Navigation and hamburger menu
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

// Otvori/zatvori meni
hamburger.addEventListener('click', (e) => {
  e.stopPropagation();
  navLinks.classList.toggle('active');
  hamburger.classList.toggle('open');
});

// Zatvori meni kad klikneš izvan njega
document.addEventListener('click', (e) => {
  if (navLinks.classList.contains('active') &&
      !navLinks.contains(e.target) &&
      !hamburger.contains(e.target)) {
    navLinks.classList.remove('active');
    hamburger.classList.remove('open');
  }
});

// Zatvori meni kad klikneš na link
const navItems = navLinks.querySelectorAll('a, button');
navItems.forEach(item => {
  item.addEventListener('click', () => {
    navLinks.classList.remove('active');
    hamburger.classList.remove('open');
  });
});




// Services section tabs
const tabLinks = document.querySelectorAll(".tab-link");
    const tabContents = document.querySelectorAll(".tab-content");

    tabLinks.forEach(link => {
      link.addEventListener("click", () => {
        tabLinks.forEach(btn => btn.classList.remove("active"));
        tabContents.forEach(content => content.style.display = "none");

        link.classList.add("active");
        document.getElementById(link.dataset.tab).style.display = "block";
      });
    });