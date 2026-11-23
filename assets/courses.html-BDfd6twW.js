import{i as d,m as i,a as r,b as o,p as n,c as l,g as m,L as u,f as s}from"./motion-BXOkv9de.js";d();i("courses");r();function e(){document.getElementById("courses").innerHTML=m.map((a,t)=>`
  <div class="course-card" data-reveal style="--d:${t*70}ms">
    <a href="product.html?id=${a.id}"><img src="${a.img}" alt=""></a>
    <div>
      <a class="n" href="product.html?id=${a.id}">${u(a)}</a>
      <div class="m">${a.pages} · ${a.format} · ${s(a.price)} <s style="color:#c4b3d6">${s(a.was)}</s></div>
      <div class="small muted" style="margin-top:6px;max-width:520px">${a.desc}</div>
    </div>
    <div class="row">
      <span class="price">${s(a.price)}</span>
      <button class="add-btn" data-gum="${a.gum}" title="Buy on Gumroad" aria-label="Buy">Buy</button>
    </div>
  </div>`).join(""),document.querySelectorAll("[data-reveal]").forEach(a=>a.classList.add("is-in"))}e();document.addEventListener("locale:rerender",e);o(n);l();
