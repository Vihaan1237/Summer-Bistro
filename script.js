const menuItems = {
  coffee: [
    {icon:"◉",tag:"THE CLASSIC",name:"House Brew",desc:"A smooth, comforting cup for easing into the day.",price:"Sample price"},
    {icon:"☼",tag:"SLOW SIPS",name:"Golden Latte",desc:"A creamy, mellow latte concept with a hint of warmth.",price:"Sample price"},
    {icon:"✳",tag:"COOL DOWN",name:"Garden Iced Tea",desc:"A refreshing tea idea for sunlit afternoons.",price:"Sample price"}
  ],
  brunch: [
    {icon:"✦",tag:"THE FAVOURITE",name:"Sunrise Toast",desc:"A sample brunch plate with fresh, bright flavours.",price:"Sample price"},
    {icon:"◒",tag:"SAVOURY",name:"Garden Bowl",desc:"A colourful bowl concept inspired by garden-fresh ingredients.",price:"Sample price"},
    {icon:"☼",tag:"ALL-DAY MOOD",name:"Bistro Melt",desc:"A warm, satisfying sandwich concept for a slower lunch.",price:"Sample price"}
  ],
  sweet: [
    {icon:"✿",tag:"A LITTLE TREAT",name:"Honey Cloud",desc:"A soft, sweet dessert concept with a golden finish.",price:"Sample price"},
    {icon:"◌",tag:"AFTERNOON",name:"Velvet Slice",desc:"A rich cake concept for the final few bites.",price:"Sample price"},
    {icon:"✧",tag:"PAIR IT UP",name:"Mini Patisserie",desc:"A small selection of sweet bites to share over coffee.",price:"Sample price"}
  ]
};
const menuGrid = document.querySelector("#menu-grid");
function renderMenu(category){
  menuGrid.innerHTML = menuItems[category].map((item,index)=>`
    <article class="menu-card">
      <div class="menu-card-top"><span>${item.tag}</span><span class="menu-card-icon">${item.icon}</span></div>
      <h3>${item.name}</h3><p>${item.desc}</p><span class="sample-price">${item.price}</span>
    </article>`).join("");
}
renderMenu("coffee");
document.querySelectorAll(".menu-tab").forEach(tab=>{
  tab.addEventListener("click",()=>{
    document.querySelectorAll(".menu-tab").forEach(item=>{
      item.classList.toggle("active",item===tab);
      item.setAttribute("aria-selected",item===tab ? "true" : "false");
    });
    renderMenu(tab.dataset.category);
  });
});
const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector("#site-nav");
menuToggle.addEventListener("click",()=>{
  const open = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded",String(open));
  menuToggle.setAttribute("aria-label",open ? "Close navigation" : "Open navigation");
});
nav.querySelectorAll("a").forEach(link=>link.addEventListener("click",()=>{
  nav.classList.remove("open");menuToggle.setAttribute("aria-expanded","false");
}));
const moodCopy = {
  dawn:{number:"1",glow:"rgba(231,184,95,.34)"},
  golden:{number:"2",glow:"rgba(255,175,77,.42)"},
  evening:{number:"3",glow:"rgba(201,124,88,.28)"}
};
const moodArt = document.querySelector("#mood-art");
document.querySelectorAll(".mood-button").forEach(button=>{
  button.addEventListener("click",()=>{
    document.querySelectorAll(".mood-button").forEach(item=>item.classList.toggle("active",item===button));
    const mood=button.dataset.mood;
    moodArt.dataset.mood=mood;
    document.querySelector("#mood-number").textContent=moodCopy[mood].number;
    document.documentElement.style.setProperty("--mood-glow",moodCopy[mood].glow);
  });
});
const observer = new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){entry.target.classList.add("is-visible");observer.unobserve(entry.target);}
  });
},{threshold:.12});
document.querySelectorAll(".reveal").forEach(element=>observer.observe(element));
const visitButton=document.querySelector("#visit-button");
const visitFeedback=document.querySelector("#visit-feedback");
visitButton.addEventListener("click",()=>{
  visitFeedback.textContent="This is a demo. Official address, opening hours, and contact or booking links can be added after approval.";
  visitFeedback.classList.add("feedback-highlight");
  visitFeedback.scrollIntoView({behavior:"smooth",block:"nearest"});
});
document.querySelectorAll('a[href^="#"]').forEach(anchor=>{
  anchor.addEventListener("click",event=>{
    const target=document.querySelector(anchor.getAttribute("href"));
    if(target){event.preventDefault();target.scrollIntoView({behavior:matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth"});}
  });
});
