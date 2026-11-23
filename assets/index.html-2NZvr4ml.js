import{i as f,m as p,a as h,h as g,p as d,b,c as w,t as m,g as B,L as c,f as l,j as E,k as L}from"./motion-BkGm4Mtb.js";f();p("shop");h();const k=(g.length?g:d).slice(0,6);let o=16;const I=16;function H(e,t){const i=e.was&&e.was>e.price;return`
  <a class="shelf-card" href="product.html?id=${e.id}" data-reveal style="--d:${t%8*40}ms">
    <div class="thumb">
      <img src="${e.img}" alt="${c(e)}" loading="lazy">
      ${e.badge?`<span class="tag">${e.badge}</span>`:i?`<span class="tag sale">−${l(e.was-e.price)}</span>`:""}
    </div>
    <div class="name">${c(e)}</div>
    <div class="meta">${e.format}${e.pages?" · "+e.pages:""}</div>
    <div class="price-row">
      <span class="price">${l(e.price)}${i?`<s>${l(e.was)}</s>`:""}</span>
      <a class="add-btn buy-btn" href="https://voluiko.gumroad.com/l/${e.gum}" target="_blank" rel="noopener" title="Buy on Gumroad" aria-label="Buy">Buy</a>
    </div>
  </a>`}function u(){const e=document.getElementById("catalog-grid"),t=document.getElementById("catalog-more");if(!e)return;const i=d.filter(s=>!s.bundle);if(e.innerHTML=i.slice(0,o).map(H).join(""),e.querySelectorAll("[data-reveal]").forEach(s=>s.classList.add("is-in")),t){const s=i.length-o;t.style.display=s>0?"inline-flex":"none",t.textContent=`${m("card.more")} (${s})`}}document.addEventListener("click",e=>{e.target.id==="catalog-more"&&(o+=I,u())});function M(){const e=document.getElementById("best-row-1");if(!e)return;const t=d.slice(0,6);let i=0;const s=()=>{e.innerHTML=t.map((n,a)=>`
        <a class="mini-card ${a===i?"is-active":""}" href="product.html?id=${n.id}">
          <div class="thumb" style="aspect-ratio:4/3"><img src="${n.img}" alt="${c(n)}"></div>
          <div class="name">${c(n)}</div>
          <div class="price">${l(n.price)}</div>
        </a>`).join("")};s(),setInterval(()=>{i=(i+1)%t.length,s()},3200)}const T=d.filter(e=>Number(e.id.slice(1))>=65||["c07","c08","c09","c10"].includes(e.id)).slice(0,6);function x(e,t=0,i=!1){const s=e.was&&e.was>e.price,n=e.badge?`<span class="tag">${e.badge}</span>`:s?`<span class="tag sale">−${l(e.was-e.price)}</span>`:"";return`
  <a class="shelf-card" href="product.html?id=${e.id}" data-reveal style="--d:${t}ms">
    <div class="thumb">
      <img src="${e.img}" alt="${c(e)}" loading="lazy">
      ${n}
    </div>
    <div class="name">${c(e)}</div>
    <div class="meta">${e.format}${e.pages?" · "+e.pages:""}</div>
    <div class="price-row">
      <span class="price">${l(e.price)}${s?`<s>${l(e.was)}</s>`:""}</span>
      <a class="add-btn buy-btn" href="https://voluiko.gumroad.com/l/${e.gum}" target="_blank" rel="noopener" title="Buy on Gumroad" aria-label="Buy">Buy</a>
    </div>
  </a>`}function v(){const e=document.getElementById("best-grid");e&&(e.innerHTML=k.slice(0,3).map((a,r)=>x(a,r*70)).join(""),e.querySelectorAll("[data-reveal]").forEach(a=>a.classList.add("is-in")));const t=document.getElementById("course-grid");t&&(t.innerHTML=B.slice(0,3).map((a,r)=>`
    <a class="course-card" href="product.html?id=${a.id}" data-reveal style="--d:${r*80}ms">
      <img src="${a.img}" alt="">
      <div>
        <div class="n">${c(a)}</div>
        <div class="m">${a.pages} · ${a.format} · ${l(a.price)} <s style="color:#c4b3d6">${l(a.was)}</s></div>
        <div class="small muted" style="margin-top:6px">${a.desc}</div>
      </div>
      <span class="btn btn-dark btn-sm">${m("course.open")}</span>
    </a>`).join(""));const i=document.getElementById("new-grid");i&&(i.innerHTML=T.map((a,r)=>`
    <a class="course-card" href="product.html?id=${a.id}" data-reveal style="--d:${r*60}ms">
      <img src="${a.img}" alt="">
      <div>
        <div class="n">${c(a)}</div>
        <div class="m">${a.format}${a.pages?" · "+a.pages:""}</div>
        <div class="row" style="margin-top:8px;gap:8px">
          <span class="price">${l(a.price)}</span>
          <s class="small" style="color:#c4b3d6;font-weight:700">${l(a.was)}</s>
        </div>
      </div>
      <a class="add-btn buy-btn" href="https://voluiko.gumroad.com/l/${a.gum}" target="_blank" rel="noopener" title="Buy on Gumroad" aria-label="Buy">Buy</a>
    </a>`).join(""));const s=document.getElementById("cat-grid");s&&(s.innerHTML=E.slice(0,10).map((a,r)=>`
    <a class="cat" href="shop.html?cat=${a.id}" data-reveal style="--d:${r*45}ms">
      <img src="${a.img}" alt="${c(a)}" loading="lazy">
      <div class="txt"><b>${c(a)}</b><span>${a.blurb}</span></div>
    </a>`).join(""));const n=document.getElementById("total-count");n&&(n.textContent=d.length)}function $(){const e=document.getElementById("values");if(e){const s=[["⚡","Instant delivery","Files land in your inbox right after checkout — no waiting."],["💸","$2 under the market","We compare prices every week and keep every pack cheaper than the usual listings."],["♻️","Lifetime updates","Buy once. Every future version of the pack is yours at no extra cost."],["🤝",m("nav.support"),"A human replies, helps you install files and sorts out refunds."]];e.innerHTML=s.map(([n,a,r],y)=>`
      <div class="value" data-reveal style="--d:${y*70}ms">
        <div class="ic">${n}</div><b>${a}</b><p>${r}</p>
      </div>`).join("")}const t=document.getElementById("reviews");if(t){t.innerHTML="";const s=t.closest("section")||t.parentElement;s&&(s.style.display="none")}const i=document.getElementById("faq-list");i&&(i.innerHTML=L.map((s,n)=>`
      <details class="faq-item" ${n===0?"open":""} data-reveal style="--d:${n*50}ms">
        <summary>${s.q}</summary><p>${s.a}</p>
      </details>`).join(""))}v();u();M();$();document.addEventListener("locale:rerender",()=>{v(),u(),$()});b(d);w();
