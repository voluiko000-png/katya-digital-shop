import{i as y,m as p,a as h,h as v,p as r,b,c as w,t as m,g as E,L as c,f as d,j as L,k as I}from"./motion-DBFwpIUt.js";y();p("shop");h();const H=(v.length?v:r).slice(0,6);let o=16;const B=16;function M(e,t){const i=e.was&&e.was>e.price;return`
  <a class="shelf-card" href="product.html?id=${e.id}" data-reveal style="--d:${t%8*40}ms">
    <div class="thumb">
      <img src="${e.img}" alt="${c(e)}" loading="lazy">
      ${e.badge?`<span class="tag">${e.badge}</span>`:i?`<span class="tag sale">−${d(e.was-e.price)}</span>`:""}
    </div>
    <div class="name">${c(e)}</div>
    <div class="meta">${e.format}${e.pages?" · "+e.pages:""}</div>
    <div class="price-row">
      <span class="price">${d(e.price)}${i?`<s>${d(e.was)}</s>`:""}</span>
      <button class="add-btn" data-add="${e.id}">+</button>
    </div>
  </a>`}function u(){const e=document.getElementById("catalog-grid"),t=document.getElementById("catalog-more");if(!e)return;const i=r.filter(a=>!a.bundle);if(e.innerHTML=i.slice(0,o).map(M).join(""),e.querySelectorAll("[data-reveal]").forEach(a=>a.classList.add("is-in")),t){const a=i.length-o;t.style.display=a>0?"inline-flex":"none",t.textContent=`${m("card.more")} (${a})`}}document.addEventListener("click",e=>{e.target.id==="catalog-more"&&(o+=B,u())});function T(){const e=document.getElementById("best-row-1");if(!e)return;const t=r.slice(0,6);let i=0;const a=()=>{e.innerHTML=t.map((n,s)=>`
        <a class="mini-card ${s===i?"is-active":""}" href="product.html?id=${n.id}">
          <div class="thumb" style="aspect-ratio:4/3"><img src="${n.img}" alt="${c(n)}"></div>
          <div class="name">${c(n)}</div>
          <div class="price">${d(n.price)}</div>
        </a>`).join("")};a(),setInterval(()=>{i=(i+1)%t.length,a()},3200)}const x=r.filter(e=>Number(e.id.slice(1))>=65||["c07","c08","c09","c10"].includes(e.id)).slice(0,6);function j(e,t=0,i=!1){const a=e.was&&e.was>e.price,n=e.badge?`<span class="tag">${e.badge}</span>`:a?`<span class="tag sale">−${d(e.was-e.price)}</span>`:"";return`
  <a class="shelf-card" href="product.html?id=${e.id}" data-reveal style="--d:${t}ms">
    <div class="thumb">
      <img src="${e.img}" alt="${c(e)}" loading="lazy">
      ${n}
    </div>
    <div class="name">${c(e)}</div>
    <div class="meta">${e.format}${e.pages?" · "+e.pages:""}</div>
    <div class="price-row">
      <span class="price">${d(e.price)}${a?`<s>${d(e.was)}</s>`:""}</span>
      <button class="add-btn" data-add="${e.id}">+</button>
    </div>
  </a>`}function $(){const e=document.getElementById("best-grid");e&&(e.innerHTML=H.slice(0,3).map((s,l)=>j(s,l*70)).join(""),e.querySelectorAll("[data-reveal]").forEach(s=>s.classList.add("is-in")));const t=document.getElementById("course-grid");t&&(t.innerHTML=E.slice(0,3).map((s,l)=>`
    <a class="course-card" href="product.html?id=${s.id}" data-reveal style="--d:${l*80}ms">
      <img src="${s.img}" alt="">
      <div>
        <div class="n">${c(s)}</div>
        <div class="m">${s.pages} · ${s.format} · ${d(s.price)} <s style="color:#c4b3d6">${d(s.was)}</s></div>
        <div class="small muted" style="margin-top:6px">${s.desc}</div>
      </div>
      <span class="btn btn-dark btn-sm">${m("course.open")}</span>
    </a>`).join(""));const i=document.getElementById("new-grid");i&&(i.innerHTML=x.map((s,l)=>`
    <a class="course-card" href="product.html?id=${s.id}" data-reveal style="--d:${l*60}ms">
      <img src="${s.img}" alt="">
      <div>
        <div class="n">${c(s)}</div>
        <div class="m">${s.format}${s.pages?" · "+s.pages:""}</div>
        <div class="row" style="margin-top:8px;gap:8px">
          <span class="price">${d(s.price)}</span>
          <s class="small" style="color:#c4b3d6;font-weight:700">${d(s.was)}</s>
        </div>
      </div>
      <button class="add-btn" data-add="${s.id}">+</button>
    </a>`).join(""));const a=document.getElementById("cat-grid");a&&(a.innerHTML=L.slice(0,10).map((s,l)=>`
    <a class="cat" href="shop.html?cat=${s.id}" data-reveal style="--d:${l*45}ms">
      <img src="${s.img}" alt="${c(s)}" loading="lazy">
      <div class="txt"><b>${c(s)}</b><span>${s.blurb}</span></div>
    </a>`).join(""));const n=document.getElementById("total-count");n&&(n.textContent=r.length)}function g(){const e=document.getElementById("values");if(e){const a=[["⚡","Instant delivery","Files land in your inbox right after checkout — no waiting."],["💸","$2 under the market","We compare prices every week and keep every pack cheaper than the usual listings."],["♻️","Lifetime updates","Buy once. Every future version of the pack is yours at no extra cost."],["🤝",m("nav.support"),"A human replies, helps you install files and sorts out refunds."]];e.innerHTML=a.map(([n,s,l],f)=>`
      <div class="value" data-reveal style="--d:${f*70}ms">
        <div class="ic">${n}</div><b>${s}</b><p>${l}</p>
      </div>`).join("")}const t=document.getElementById("reviews");if(t){t.innerHTML="";const a=t.closest("section")||t.parentElement;a&&(a.style.display="none")}const i=document.getElementById("faq-list");i&&(i.innerHTML=I.map((a,n)=>`
      <details class="faq-item" ${n===0?"open":""} data-reveal style="--d:${n*50}ms">
        <summary>${a.q}</summary><p>${a.a}</p>
      </details>`).join(""))}$();u();T();g();document.addEventListener("locale:rerender",()=>{$(),u(),g()});b(r);w();
