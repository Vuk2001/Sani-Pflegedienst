// helper: set cookie
function setCookie(name, value, days) {
  const maxAge = 60 * 60 * 24 * days; // days -> seconds
  document.cookie = `${name}=${value}; max-age=${maxAge}; path=/; Secure; SameSite=Lax`;
}

// helper: get cookie
function getCookie(name) {
  return document.cookie.split("; ").find(row => row.startsWith(name + "="));
}

const cookieBox = document.querySelector("#cookie-wrapper"),
      acceptBtn = document.querySelector("#acceptBtn"),
      declineBtn = document.querySelector("#declineBtn");

function executeCodes() {
  const consent = getCookie("consent");

  if (consent) {
    if (consent.includes("accepted")) {
      loadAnalytics(); // pokreni analitiku samo ako je prihvaćeno
    }
    return; // ako kolačić postoji, ne prikazuj box
  }

  // ako kolačić ne postoji, pokaži box
  cookieBox.classList.add("show");

  acceptBtn.addEventListener("click", () => {
    setCookie("consent", "accepted", 30 * 6); // 6 mjeseci
    cookieBox.classList.remove("show");
    loadAnalytics();
  });

  declineBtn.addEventListener("click", () => {
    setCookie("consent", "declined", 30 * 6); // 6 mjeseci
    cookieBox.classList.remove("show");
    // ne učitava se analitika
  });
}

function loadAnalytics() {
  const script = document.createElement("script");
  script.src = "https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID";
  script.async = true;
  document.head.appendChild(script);

  script.onload = () => {
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag("js", new Date());
    gtag("config", "GA_MEASUREMENT_ID");
  };
}

window.addEventListener("load", executeCodes);

// // Cookies box
// const cookieBox = document.querySelector("cookie-wrapper"),
//   buttons = document.querySelectorAll(".button");
// const executeCodes = () => {
//   //if cookie contains codinglab it will be returned and below of this code will not run
//   if (document.cookie.includes("codinglab")) return;
//   cookieBox.classList.add("show");
//   buttons.forEach((button) => {
//     button.addEventListener("click", () => {
//       cookieBox.classList.remove("show");
//       //if button has acceptBtn id
//       if (button.id == "acceptBtn") {
//         //set cookies for 1 month. 60 = 1 min, 60 = 1 hours, 24 = 1 day, 30 = 30 days
//         document.cookie = "cookieBy= codinglab; max-age=" + 60 * 60 * 24 * 30;
//       }
//     }); 
//   });
// };
// //executeCodes function will be called on webpage load
// window.addEventListener("load", executeCodes);



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