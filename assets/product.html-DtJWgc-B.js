import{i as v,m as u,a as m,l as g,p as l,j as h,L as e,b as $,c as f,t,f as n,r as y}from"./motion-BXOkv9de.js";v();u("shop");m();const b=new URLSearchParams(location.search).get("id")||"p01",a=g(b)||l[0],o=h.find(d=>d.id===a.cat),c=a.was-a.price,w=Math.round(c/a.was*100),r=[a.img,"img/w_p09.jpg","img/w_p18.jpg","img/w_p05.jpg"];function p(){document.getElementById("pdp").innerHTML=`
  <div class="gallery">
    <div class="main-shot"><img id="main-img" src="${r[0]}" alt="${e(a)}"></div>
    <div class="thumbs">
      ${r.map((s,i)=>`<button data-shot="${s}" class="${i===0?"is-on":""}"><img src="${s}" alt=""></button>`).join("")}
    </div>
  </div>

  <div class="info">
    <div class="crumbs"><a href="shop.html">${t("nav.shop")}</a> / <a href="shop.html?cat=${a.cat}">${o?o.title:""}</a> / ${e(a)}</div>
    <h1 class="h1" data-split>${e(a)}</h1>
    <div class="stars-row"><span class="muted">Instant download · 7-day refunds · lifetime updates</span></div>
    <p class="lead" style="margin-top:12px;font-size:15px">${a.desc}</p>

    <div class="buybox">
      <div class="price-row">
        <div class="row">
          <span class="price">${n(a.price)}</span>
          <span class="old" style="text-decoration:line-through;color:var(--muted);font-weight:700">${n(a.was)}</span>
          ${c>0?`<span class="save-pill">Save ${n(c)} · ${w}%</span>`:""}
        </div>
        <span class="small muted">$2 under market</span>
      </div>
      <div class="actions">
        <button class="btn btn-dark" data-add="${a.id}">${t("product.add")}</button>
        <a class="btn btn-warm" href="${a.gum?"https://voluiko.gumroad.com/l/"+a.gum:"checkout.html"}" target="_blank" rel="noopener">${t("product.buy")}</a>
      </div>
      <div class="facts">
        <div>${a.pages||""}</div><div>${a.format}</div><div>${t("card.instant").split("·")[0]}</div><div>License</div>
      </div>
    </div>

    <div class="rating-bar">
      <div class="row">
        <div class="avatars"><span style="background:linear-gradient(140deg,#f7b955,#ec7a4c)"></span><span style="background:linear-gradient(140deg,#b9f0c8,#5fc98a)"></span><span style="background:linear-gradient(140deg,#d7ccfb,#8a6cf0)"></span></div>
        <div><b>Instant delivery · 7-day refunds</b><br><span>${t("checkout.delivery")} · ${t("checkout.refunds")}</span></div>
      </div>
      <span class="small" style="color:#ffd166;font-weight:800">${t("checkout.card")}</span>
    </div>

    <div class="reviews">
      <div class="rv"><div class="top"><span class="stars">★★★★★</span><span>2 days ago</span></div><b>Anna K.</b><p>Dropped straight into my workflow. Files are tidy and instructions clear.</p></div>
      <div class="rv"><div class="top"><span class="stars">★★★★★</span><span>5 days ago</span></div><b>Dmitry P.</b><p>Bought it for the team — the commercial license covered everything.</p></div>
    </div>

    <div class="includes">
      <h3>${t("product.inside")}</h3>
      <ul>
        <li>${a.format} ${t("product.files")}</li>
        <li>${a.pages||""}</li>
        <li>${t("product.updates")}</li>
        <li>${t("product.license")}</li>
      </ul>
      <p class="small muted" style="margin-top:12px">${t("product.delivery")}</p>
    </div>
  </div>`,document.querySelectorAll("[data-shot]").forEach(s=>{s.addEventListener("click",()=>{document.getElementById("main-img").src=s.dataset.shot,document.querySelectorAll("[data-shot]").forEach(i=>i.classList.toggle("is-on",i===s))})});const d=l.filter(s=>s.id!==a.id&&(s.cat===a.cat||s.bundle)).slice(0,4);document.getElementById("also").innerHTML=d.map((s,i)=>y(s,{delay:i*70})).join(""),document.querySelectorAll("#also [data-reveal]").forEach(s=>s.classList.add("is-in"))}p();document.title=`${e(a)} — Warmly`;document.addEventListener("locale:rerender",p);$(l);f();
