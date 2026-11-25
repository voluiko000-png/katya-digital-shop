import{i as n,m as l,a as c,b as m,p as t,c as p,g as s,L as u,f as i}from"./motion-t--Lwrj8.js";n();l("courses");c();function r(){const a=document.getElementById("courses"),o=s.length?s:t.slice(0,3);a&&(a.innerHTML=o.map((e,d)=>`
  <div class="course-card" data-reveal style="--d:${d*70}ms">
    <a href="product.html?id=${e.id}"><img src="${e.img}" alt=""></a>
    <div>
      <a class="n" href="product.html?id=${e.id}">${u(e)}</a>
      <div class="m">${e.pages?e.pages+" · ":""}${e.format} · ${i(e.price)}</div>
      <div class="small muted" style="margin-top:6px;max-width:520px">${e.desc}</div>
    </div>
    <div class="row">
      <span class="price">${i(e.price)}</span>
      <a class="card-buy" href="https://voluiko.gumroad.com/l/${e.gum}" target="_blank" rel="noopener" style="display:inline-flex;align-items:center;gap:6px;padding:8px 12px;border-radius:999px;background:#1f1b2e;color:#fff;font-weight:800;font-size:13px;text-decoration:none">Buy</a>
    </div>
  </div>`).join(""),document.querySelectorAll("[data-reveal]").forEach(e=>e.classList.add("is-in")))}r();document.addEventListener("locale:rerender",r);m(t);p();
