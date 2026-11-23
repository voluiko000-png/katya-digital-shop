import{i as t,m as i,a as r,b as o,p as n,c as l,g as m,L as c,f as s}from"./motion-C2676ko6.js";t();i("courses");r();function d(){document.getElementById("courses").innerHTML=m.map((a,e)=>`
  <div class="course-card" data-reveal style="--d:${e*70}ms">
    <a href="product.html?id=${a.id}"><img src="${a.img}" alt=""></a>
    <div>
      <a class="n" href="product.html?id=${a.id}">${c(a)}</a>
      <div class="m">${a.pages} · ${a.format} · ${s(a.price)} <s style="color:#c4b3d6">${s(a.was)}</s></div>
      <div class="small muted" style="margin-top:6px;max-width:520px">${a.desc}</div>
    </div>
    <div class="row">
      <span class="price">${s(a.price)}</span>
      <button class="add-btn" data-add="${a.id}">+</button>
    </div>
  </div>`).join(""),document.querySelectorAll("[data-reveal]").forEach(a=>a.classList.add("is-in"))}d();document.addEventListener("locale:rerender",d);o(n);l();
