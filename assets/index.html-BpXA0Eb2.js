import{i as f,m as y,a as h,h as g,p as d,b,c as w,t as m,g as k,L as c,f as l,j as E,k as L}from"./motion-t--Lwrj8.js";f();y("shop");h();const B=(g.length?g:d).slice(0,6);let o=16;const I=16;function H(e,t){const n=e.was&&e.was>e.price;return`
  <a class="shelf-card" href="https://voluiko.gumroad.com/l/${e.gum}" target="_blank" rel="noopener" data-reveal style="--d:${t%8*40}ms">
    <div class="thumb">
      <img src="${e.img}" alt="${c(e)}" loading="lazy">
      ${e.badge?`<span class="tag">${e.badge}</span>`:n?`<span class="tag sale">−${l(e.was-e.price)}</span>`:""}
    </div>
    <div class="name">${c(e)}</div>
    <div class="meta">${e.format}${e.pages?" · "+e.pages:""}</div>
    <div class="price-row">
      <span class="price">${l(e.price)}${n?`<s>${l(e.was)}</s>`:""}</span>
      <span class="add-btn" aria-hidden="true">Buy</span>
    </div>
  </a>`}function u(){const e=document.getElementById("catalog-grid"),t=document.getElementById("catalog-more");if(!e)return;const n=d.filter(a=>!a.bundle);if(e.innerHTML=n.slice(0,o).map(H).join(""),e.querySelectorAll("[data-reveal]").forEach(a=>a.classList.add("is-in")),t){const a=n.length-o;t.style.display=a>0?"inline-flex":"none",t.textContent=`${m("card.more")} (${a})`}}document.addEventListener("click",e=>{e.target.id==="catalog-more"&&(o+=I,u())});function M(){const e=document.getElementById("best-row-1");if(!e)return;const t=d.slice(0,6);let n=0;const a=()=>{e.innerHTML=t.map((i,s)=>`
        <a class="mini-card ${s===n?"is-active":""}" href="product.html?id=${i.id}">
          <div class="thumb" style="aspect-ratio:4/3"><img src="${i.img}" alt="${c(i)}"></div>
          <div class="name">${c(i)}</div>
          <div class="price">${l(i.price)}</div>
        </a>`).join("")};a(),setInterval(()=>{n=(n+1)%t.length,a()},3200)}const T=d.filter(e=>Number(e.id.slice(1))>=65||["c07","c08","c09","c10"].includes(e.id)).slice(0,6);function x(e,t=0,n=!1){const a=e.was&&e.was>e.price,i=e.badge?`<span class="tag">${e.badge}</span>`:a?`<span class="tag sale">−${l(e.was-e.price)}</span>`:"";return`
  <a class="shelf-card" href="https://voluiko.gumroad.com/l/${e.gum}" target="_blank" rel="noopener" data-reveal style="--d:${t}ms">
    <div class="thumb">
      <img src="${e.img}" alt="${c(e)}" loading="lazy">
      ${i}
    </div>
    <div class="name">${c(e)}</div>
    <div class="meta">${e.format}${e.pages?" · "+e.pages:""}</div>
    <div class="price-row">
      <span class="price">${l(e.price)}${a?`<s>${l(e.was)}</s>`:""}</span>
      <span class="add-btn" aria-hidden="true">Buy</span>
    </div>
  </a>`}function v(){const e=document.getElementById("best-grid");e&&(e.innerHTML=B.slice(0,3).map((s,r)=>x(s,r*70)).join(""),e.querySelectorAll("[data-reveal]").forEach(s=>s.classList.add("is-in")));const t=document.getElementById("course-grid");t&&(t.innerHTML=k.slice(0,3).map((s,r)=>`
    <a class="course-card" href="https://voluiko.gumroad.com/l/${s.gum}" target="_blank" rel="noopener" data-reveal style="--d:${r*80}ms">
      <img src="${s.img}" alt="">
      <div>
        <div class="n">${c(s)}</div>
        <div class="m">${s.pages?s.pages+" · ":""}${s.format} · ${l(s.price)} <s style="color:#c4b3d6">${l(s.was||s.price)}</s></div>
        <div class="small muted" style="margin-top:6px">${s.desc}</div>
      </div>
      <span class="btn btn-dark btn-sm">${m("course.open")}</span>
    </a>`).join(""));const n=document.getElementById("new-grid");n&&(n.innerHTML=T.map((s,r)=>`
    <a class="course-card" href="https://voluiko.gumroad.com/l/${s.gum}" target="_blank" rel="noopener" data-reveal style="--d:${r*60}ms">
      <img src="${s.img}" alt="">
      <div>
        <div class="n">${c(s)}</div>
        <div class="m">${s.format}${s.pages?" · "+s.pages:""}</div>
        <div class="row" style="margin-top:8px;gap:8px">
          <span class="price">${l(s.price)}</span>
          <s class="small" style="color:#c4b3d6;font-weight:700">${l(s.was||s.price)}</s>
        </div>
      </div>
      <span class="btn btn-dark btn-sm">Buy</span>
    </a>`).join(""));const a=document.getElementById("cat-grid");a&&(a.innerHTML=E.slice(0,10).map((s,r)=>`
    <a class="cat" href="shop.html?cat=${s.id}" data-reveal style="--d:${r*45}ms">
      <img src="${s.img}" alt="${c(s)}" loading="lazy">
      <div class="txt"><b>${c(s)}</b><span>${s.blurb}</span></div>
    </a>`).join(""));const i=document.getElementById("total-count");i&&(i.textContent=d.length)}function $(){const e=document.getElementById("values");if(e){const a=[["⚡","Instant delivery","Files land in your inbox right after checkout — no waiting."],["💸","$2 under the market","We compare prices every week and keep every pack cheaper than the usual listings."],["♻️","Lifetime updates","Buy once. Every future version of the pack is yours at no extra cost."],["🤝",m("nav.support"),"A human replies, helps you install files and sorts out refunds."]];e.innerHTML=a.map(([i,s,r],p)=>`
      <div class="value" data-reveal style="--d:${p*70}ms">
        <div class="ic">${i}</div><b>${s}</b><p>${r}</p>
      </div>`).join("")}const t=document.getElementById("reviews");if(t){t.innerHTML="";const a=t.closest("section")||t.parentElement;a&&(a.style.display="none")}const n=document.getElementById("faq-list");n&&(n.innerHTML=L.map((a,i)=>`
      <details class="faq-item" ${i===0?"open":""} data-reveal style="--d:${i*50}ms">
        <summary>${a.q}</summary><p>${a.a}</p>
      </details>`).join(""))}v();u();M();$();document.addEventListener("locale:rerender",()=>{v(),u(),$()});b(d);w();
