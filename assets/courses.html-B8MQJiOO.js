import{i as t,m as d,a as i,b as o,p as l,c as n,g as m,L as u,f as e}from"./motion-BkGm4Mtb.js";t();d("courses");i();function s(){document.getElementById("courses").innerHTML=m.map((a,r)=>`
  <div class="course-card" data-reveal style="--d:${r*70}ms">
    <a href="product.html?id=${a.id}"><img src="${a.img}" alt=""></a>
    <div>
      <a class="n" href="product.html?id=${a.id}">${u(a)}</a>
      <div class="m">${a.pages} · ${a.format} · ${e(a.price)} <s style="color:#c4b3d6">${e(a.was)}</s></div>
      <div class="small muted" style="margin-top:6px;max-width:520px">${a.desc}</div>
    </div>
    <div class="row">
      <span class="price">${e(a.price)}</span>
      <a class="add-btn buy-btn" href="https://voluiko.gumroad.com/l/${a.gum}" target="_blank" rel="noopener" title="Buy on Gumroad" aria-label="Buy">Buy</a>
    </div>
  </div>`).join(""),document.querySelectorAll("[data-reveal]").forEach(a=>a.classList.add("is-in"))}s();document.addEventListener("locale:rerender",s);o(l);n();
