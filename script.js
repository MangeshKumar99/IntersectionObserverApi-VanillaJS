const cards = document.querySelectorAll(".card");
console.log(cards);

const observer = new IntersectionObserver(
  (entries) => {
    console.log(entries);
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        //For lazy-loading images
        // observer.unobserve(entry.target);
      }
      if (!entry.isIntersecting) {
        entry.target.classList.remove("show");
      }
      // if (entry.target.innerHTML === "This is last content") {
      //   addCards();
      // }
    });
  },
  { threshold: 1 }
);

cards.forEach((card) => {
  observer.observe(card);
});

const lazyLoadingObserver = new IntersectionObserver((entry) => {
  if (entry[0].isIntersecting) {
    addCards();
    lazyLoadingObserver.unobserve(entry[0].target);
    lazyLoadingObserver.observe(document.querySelector(".card:last-child"));
  }
}, {});

lazyLoadingObserver.observe(document.querySelector(".card:last-child"));

const cardContainer = document.getElementById("card-container");

function addCards() {
  console.log("Adding cards...");
  for (let i = 0; i < 10; i++) {
    const div = document.createElement("div");
    div.innerHTML = "New card added";
    div.classList.add("card");
    cardContainer.appendChild(div);
    observer.observe(div);
  }
}
