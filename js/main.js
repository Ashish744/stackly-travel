const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const store={get:(k,d)=>{try{return JSON.parse(localStorage.getItem(k))??d}catch{return d}},set:(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v))}catch{}}};
const money=n=>'$'+Math.round(n).toLocaleString();
const toast=m=>{const t=$('#toast');t.textContent=m;t.classList.add('show');clearTimeout(t._t);t._t=setTimeout(()=>t.classList.remove('show'),2400)};
const imgTag=(id,w,alt)=>`<img src="${U(id,w)}" alt="${alt}" loading="lazy" onerror="this.style.minHeight='160px'">`;
let wish=store.get('stackly_wish',[]);

/* preloader */
(()=>{let p=0;const f=$('#plFill'),t=$('#plPct');const iv=setInterval(()=>{p=Math.min(p+Math.random()*14,95);f.style.width=p+'%';t.textContent=Math.floor(p)+'%'},160);
let finished=false;const end=()=>{if(finished)return;finished=true;clearInterval(iv);f.style.width='100%';t.textContent='100%';setTimeout(()=>{$('#preloader').classList.add('done');document.body.classList.add('ready');startTexts()},450)};
window.addEventListener('load',()=>setTimeout(end,900));setTimeout(end,6000)})();

/* text animations: split into chars/words, trigger on scroll */
function split(el){const mode=el.dataset.anim,txt=el.textContent;el.setAttribute('aria-label',txt);el.textContent='';let i=0;
 if(mode==='words'){txt.split(' ').forEach(w=>{const s=document.createElement('span');s.className='w';s.innerHTML=`<span class="u" style="--i:${i++}">${w}</span>`;el.appendChild(s)})}
 else{[...txt].forEach(c=>{const s=document.createElement('span');s.className='u';s.style.setProperty('--i',i++);s.textContent=c;el.appendChild(s)})}}
let started=false;
function startTexts(){if(started)return;started=true;const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.4});
 $$('[data-anim]').forEach(el=>{split(el);io.observe(el)});
 const cio=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){count(e.target);cio.unobserve(e.target)}}));$$('[data-count]').forEach(el=>cio.observe(el));typeLoop()}
function count(el){const to=+el.dataset.count,d=+el.dataset.dec||0,t0=performance.now();(function f(t){const k=Math.min((t-t0)/1800,1);el.textContent=(to*(1-Math.pow(1-k,3))).toFixed(d).replace(/\B(?=(\d{3})+(?!\d))/g,',');if(k<1)requestAnimationFrame(f)})(t0)}
function typeLoop(){const words=['dream getaway','beach escape','city adventure','mountain retreat','luxury stay'],el=$('#typed');let w=0,c=0,del=false;
 (function tick(){const word=words[w];
  if(!del){c++;el.textContent=word.slice(0,c);if(c===word.length){del=true;return setTimeout(tick,1600)}return setTimeout(tick,90)}
  c--;el.textContent=word.slice(0,c);if(c===0){del=false;w=(w+1)%words.length;return setTimeout(tick,350)}setTimeout(tick,45)})()}

/* header + nav */
const header=$('#header'),toTop=$('#toTop');
addEventListener('scroll',()=>{header.classList.toggle('sticky',scrollY>60);toTop.classList.toggle('show',scrollY>600)});header.classList.toggle('sticky',scrollY>60);
toTop.onclick=()=>scrollTo({top:0,behavior:'smooth'});
$('#burger').onclick=e=>{$('#menu').classList.toggle('open');e.currentTarget.classList.toggle('open')};
$$('#menu a').forEach(a=>a.onclick=()=>{$('#menu').classList.remove('open');$('#burger').classList.remove('open')});
$('#yr').textContent=new Date().getFullYear();

/* selects + dates */
const opts=(el,n,label)=>el.innerHTML=Array.from({length:n},(_,i)=>`<option value="${i+1}">${i+1} ${label}${i?'s':''}</option>`).join('');
opts($('#sGuests'),10,'Guest');opts($('#sRooms'),5,'Room');opts($('#eGuests'),10,'Guest');opts($('#eRooms'),5,'Room');
const iso=d=>d.toISOString().slice(0,10),addDays=(s,n)=>{const d=new Date(s);d.setDate(d.getDate()+n);return iso(d)};
const today=iso(new Date());
[['#sIn','#sOut'],['#eIn','#eOut']].forEach(([a,b])=>{const i=$(a),o=$(b);i.min=today;i.value=addDays(today,7);o.min=addDays(i.value,1);o.value=addDays(today,10);
 i.onchange=()=>{o.min=addDays(i.value,1);if(o.value<=i.value)o.value=addDays(i.value,1);estimate()}});
$('#sIn').addEventListener('change',()=>{$('#eIn').value=$('#sIn').value;$('#eIn').dispatchEvent(new Event('change'))});
$('#sOut').addEventListener('change',()=>{$('#eOut').value=$('#sOut').value;estimate()});

/* destinations */
$('#cities').innerHTML=destinations.map(d=>`<option value="${d.city}">`).join('');
let destCat='All',destQ='';
const cats=['All',...new Set(destinations.map(d=>d.cat))];
$('#destChips').innerHTML=cats.map(c=>`<button class="chip ${c==='All'?'on':''}" data-c="${c}">${c}</button>`).join('');
$('#destChips').onclick=e=>{const b=e.target.closest('.chip');if(!b)return;destCat=b.dataset.c;$$('.chip').forEach(x=>x.classList.toggle('on',x===b));renderDest()};
function renderDest(){const q=destQ.toLowerCase(),list=destinations.filter(d=>(destCat==='All'||d.cat===destCat)&&(d.city+d.country).toLowerCase().includes(q));
 $('#destGrid').innerHTML=list.map((d,i)=>`<article class="dest" data-city="${d.city}" data-aos="zoom-in" data-aos-delay="${i%4*100}">${imgTag(d.img,700,d.city)}<div class="dest-info"><h3>${d.city}, ${d.country}</h3><p>${d.tag}</p><div class="row"><span>${d.hotels} hotels</span><b>from ${money(d.from)}</b></div></div></article>`).join('');
 $('#destEmpty').hidden=list.length>0;AOS.refresh()}
$('#destGrid').onclick=e=>{const c=e.target.closest('.dest');if(!c)return;$('#sDest').value=c.dataset.city;$('#estimate');applyCity(c.dataset.city)};

/* hotels */
let wishOnly=false;
const state=()=>({price:+$('#fPrice').value,rating:+$('#fRating').value,sort:$('#fSort').value,city:$('#sDest').value.trim().toLowerCase()});
function renderHotels(){const s=state();let l=hotels.filter(h=>h.price<=s.price&&h.rating>=s.rating&&(!s.city||(h.city.toLowerCase().includes(s.city)))&&(!wishOnly||wish.includes(h.name)));
 const sorts={pop:(a,b)=>b.pop-a.pop,low:(a,b)=>a.price-b.price,high:(a,b)=>b.price-a.price,rate:(a,b)=>b.rating-a.rating};l.sort(sorts[s.sort]);
 $('#priceOut').textContent='$'+s.price;$('#hotelInfo').textContent=`Showing ${l.length} of ${hotels.length} hotels${s.city?` in “${$('#sDest').value}”`:''}`;
 $('#hotelGrid').innerHTML=l.map((h,i)=>`<article class="hotel" data-aos="fade-up" data-aos-delay="${i%3*100}"><div class="h-img">${imgTag(h.img,700,h.name)}<span class="badge">${h.badge}</span><button class="heart ${wish.includes(h.name)?'on':''}" data-n="${h.name}" aria-label="Wishlist">♥</button></div><div class="h-body"><h3>${h.name}</h3><div class="loc">📍 ${h.city}</div><div class="am">${h.am.map(a=>`<span>${a}</span>`).join('')}</div><div class="h-foot"><span class="rate">★ ${h.rating}</span><span class="price">${money(h.price)}<small> /night</small></span></div><button class="btn btn-sm" data-book="${h.name}">Book this stay</button></div></article>`).join('');
 $('#hotelEmpty').hidden=l.length>0;AOS.refresh()}
$('#hotelGrid').onclick=e=>{const h=e.target.closest('.heart'),b=e.target.closest('[data-book]');
 if(h){const n=h.dataset.n;wish=wish.includes(n)?wish.filter(x=>x!==n):[...wish,n];store.set('stackly_wish',wish);toast(wish.includes(n)?'Added to wishlist ♥':'Removed from wishlist');updWish();if(wishOnly)renderHotels();else h.classList.toggle('on')}
 if(b){$('#eHotel').value=b.dataset.book;estimate();$('#estimate').scrollIntoView({behavior:'smooth'})}};
function updWish(){$('#wishCount').textContent=wish.length}
['fPrice','fRating','fSort'].forEach(id=>$('#'+id).addEventListener('input',renderHotels));
$('#fWish').onclick=e=>{wishOnly=!wishOnly;e.currentTarget.classList.toggle('on',wishOnly);renderHotels()};
$('#wishNav').onclick=()=>{wishOnly=true;$('#fWish').classList.add('on');renderHotels();$('#hotels').scrollIntoView({behavior:'smooth'})};
$('#fReset').onclick=()=>{$('#fPrice').value=600;$('#fRating').value=0;$('#fSort').value='pop';$('#sDest').value='';wishOnly=false;$('#fWish').classList.remove('on');destQ='';renderDest();renderHotels()};

/* hero search with validation */
function applyCity(c){$('#sDest').value=c;destQ=c;renderDest();renderHotels();const h=hotels.find(x=>x.city===c);if(h){$('#eHotel').value=h.name;estimate()}$('#hotels').scrollIntoView({behavior:'smooth'})}
$('#searchForm').onsubmit=e=>{e.preventDefault();const err=$('#searchErr'),i=$('#sIn').value,o=$('#sOut').value,d=$('#sDest').value.trim();err.textContent='';
 if(!i||!o)return err.textContent='Please choose both check-in and check-out dates.';
 if(i<today)return err.textContent='Check-in date cannot be in the past.';
 if(o<=i)return err.textContent='Check-out must be after check-in.';
 if(d&&!destinations.some(x=>x.city.toLowerCase().includes(d.toLowerCase())||x.country.toLowerCase().includes(d.toLowerCase())))return err.textContent=`We couldn't find “${d}”. Try Bali, Paris or Tokyo.`;
 destQ=d;renderDest();renderHotels();estimate();toast(`Showing stays for ${$('#sGuests').value} guest(s), ${$('#sRooms').value} room(s)`);$('#hotels').scrollIntoView({behavior:'smooth'})};

/* offers + coupon copy */
$('#offerGrid').innerHTML=offers.map((o,i)=>`<article class="offer" data-aos="flip-left" data-aos-delay="${i*100}">${imgTag(o.img,600,o.title)}<div class="o-body"><div class="off">${o.off}</div><h3>${o.title}</h3><p>${o.text}</p><div class="code"><b>${o.code}</b><button class="btn btn-sm" data-code="${o.code}">Copy</button></div></div></article>`).join('');
$('#offerGrid').onclick=async e=>{const b=e.target.closest('[data-code]');if(!b)return;const c=b.dataset.code;
 try{await navigator.clipboard.writeText(c)}catch{const t=document.createElement('textarea');t.value=c;document.body.appendChild(t);t.select();document.execCommand('copy');t.remove()}
 b.textContent='Copied ✓';setTimeout(()=>b.textContent='Copy',1800);toast(`Code ${c} copied!`);$('#eCode').value=c;estimate()};

/* estimator */
$('#eHotel').innerHTML=hotels.map(h=>`<option>${h.name}</option>`).join('');
let applied=null;
function estimate(){const h=hotels.find(x=>x.name===$('#eHotel').value),i=$('#eIn').value,o=$('#eOut').value,msg=$('#eMsg');msg.textContent='';
 const nights=Math.round((new Date(o)-new Date(i))/864e5);if(!i||!o||nights<1){msg.textContent='Check-out must be after check-in.';$('#bill').innerHTML='';return}
 const rooms=+$('#eRooms').value,guests=+$('#eGuests').value;if(guests>rooms*4){msg.textContent=`Max 4 guests per room – add ${Math.ceil(guests/4)-rooms} more room(s).`}
 const sub=h.price*nights*rooms;let disc=0;if(applied){const a=offers.find(x=>x.code===applied);if(a.min&&nights<a.min){msg.textContent=`${applied} needs ${a.min}+ nights.`}else disc=a.pct?sub*a.pct/100:a.flat}
 const tax=(sub-disc)*.12;$('#bill').innerHTML=`<div><span>${money(h.price)} × ${nights} night(s) × ${rooms} room(s)</span><span>${money(sub)}</span></div>${disc?`<div class="disc"><span>Coupon ${applied}</span><span>−${money(disc)}</span></div>`:''}<div><span>Taxes & fees (12%)</span><span>${money(tax)}</span></div><div class="tot"><span>Total</span><span>${money(sub-disc+tax)}</span></div>`}
$('#eApply').onclick=()=>{const c=$('#eCode').value.trim().toUpperCase();if(!c){applied=null;return estimate()}if(!offers.some(o=>o.code===c)){applied=null;estimate();return $('#eMsg').textContent='Invalid coupon code.'}applied=c;estimate();toast(`Coupon ${c} applied`)};
['eHotel','eOut','eRooms','eGuests'].forEach(id=>$('#'+id).addEventListener('input',estimate));

/* why + steps + faq */
$('#whyGrid').innerHTML=features.map((f,i)=>`<div class="why" data-aos="fade-up" data-aos-delay="${i%3*120}"><i>${f[0]}</i><h3>${f[1]}</h3><p>${f[2]}</p></div>`).join('');
$('#steps').innerHTML=steps.map((s,i)=>`<div class="step" data-aos="zoom-in" data-aos-delay="${i*150}"><span>${s[0]}</span><h4>${s[1]}</h4><p>${s[2]}</p></div>`).join('');
$('#faqList').innerHTML=faqs.map((f,i)=>`<details data-aos="fade-up" data-aos-delay="${i*60}"><summary>${f[0]}</summary><p>${f[1]}</p></details>`).join('');

/* testimonial slider */
let ti=0,timer;const tt=$('#tTrack');
tt.innerHTML=testimonials.map(t=>`<div class="t-card">${imgTag(t.img,200,t.n)}<div class="stars">${'★'.repeat(t.r)}${'☆'.repeat(5-t.r)}</div><q>${t.t}</q><h4>${t.n}</h4><small>${t.c}</small></div>`).join('');
$('#tDots').innerHTML=testimonials.map((_,i)=>`<button data-i="${i}" aria-label="Slide ${i+1}"></button>`).join('');
function go(i){ti=(i+testimonials.length)%testimonials.length;tt.style.transform=`translateX(-${ti*100}%)`;$$('#tDots button').forEach((b,j)=>b.classList.toggle('on',j===ti));clearInterval(timer);timer=setInterval(()=>go(ti+1),5000)}
$('#tPrev').onclick=()=>go(ti-1);$('#tNext').onclick=()=>go(ti+1);$('#tDots').onclick=e=>{if(e.target.dataset.i)go(+e.target.dataset.i)};

/* newsletter */
$('#newsForm').onsubmit=e=>{e.preventDefault();const v=$('#nEmail').value.trim(),m=$('#nMsg'),ok=/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
 if(!ok){m.style.color='#ffb4b4';return m.textContent='Please enter a valid email address.'}
 const list=store.get('stackly_subs',[]);if(list.includes(v.toLowerCase())){m.style.color='#ffe08a';return m.textContent='You are already subscribed!'}
 list.push(v.toLowerCase());store.set('stackly_subs',list);m.style.color='#9ff0d6';m.textContent='🎉 Thanks for subscribing! Deals are on the way.';$('#nEmail').value=''};

/* privacy policy modal */
const pm=$('#privacyModal'),openPM=e=>{e&&e.preventDefault();pm.hidden=false;document.body.style.overflow='hidden';$('#ppClose').focus()},closePM=()=>{pm.hidden=true;document.body.style.overflow=''};
$$('.open-privacy').forEach(a=>a.onclick=openPM);$('#ppClose').onclick=closePM;$('#ppOk').onclick=closePM;
pm.onclick=e=>{if(e.target===pm)closePM()};addEventListener('keydown',e=>{if(e.key==='Escape'&&!pm.hidden)closePM()});

/* how-it-works journey: person walks 1→2→3, plane flies 3→4 */
(()=>{const walker=$('#walker'),jp=$('#jplane'),wrap=$('#stepsWrap');let run=false,token=0;
 const sleep=ms=>new Promise(r=>setTimeout(r,ms));
 const spans=()=>$$('#steps .step span');
 /* x = centre of each step column measured against the wrapper (scale-safe, ignores AOS transforms); y = step top padding */
 const pts=()=>{const wr=wrap.getBoundingClientRect();return $$('#steps .step').map(st=>{const r=st.getBoundingClientRect();return{x:r.left+r.width/2-wr.left,y:parseFloat(getComputedStyle(st).paddingTop)||20}})};
 const hit=i=>{const s=spans()[i];if(!s)return;s.classList.remove('hit');void s.offsetWidth;s.classList.add('hit')};
 async function loop(){if(run)return;run=true;const tok=++token,alive=()=>run&&tok===token;
  const W=34,H=54,PW=84,PH=36;
  while(alive()){
   if(innerWidth<=1024){await sleep(1000);continue}
   const p=pts(),pos=(i)=>`translate(${p[i].x-W/2}px,${p[i].y-H+3}px)`;
   jp.style.opacity=0;walker.style.transform=pos(0);walker.style.opacity=1;hit(0);await sleep(900);if(!alive())return;
   for(let i=0;i<2;i++){
    walker.classList.add('walking');
    await walker.animate([{transform:pos(i)},{transform:pos(i+1)}],{duration:2400,easing:'ease-in-out'}).finished;
    walker.style.transform=pos(i+1);walker.classList.remove('walking');hit(i+1);await sleep(900);if(!alive())return}
   /* board the plane at step 3 and fly to step 4 */
   walker.style.opacity=0;
   const x2=p[2].x,x3=p[3].x,y=p[2].y-24,dx=x3-x2,pl=(x,yy,r,s)=>`translate(${x-PW/2}px,${yy-PH/2}px) rotate(${r}deg) scale(${s})`;
   jp.style.opacity=1;
   await jp.animate([
    {transform:pl(x2,y+10,-6,.6),opacity:0,offset:0},
    {transform:pl(x2+dx*.2,y-26,-16,1),opacity:1,offset:.25},
    {transform:pl(x2+dx*.5,y-44,0,1),opacity:1,offset:.5},
    {transform:pl(x3-dx*.2,y-26,12,1),opacity:1,offset:.78},
    {transform:pl(x3,y+6,16,.6),opacity:0,offset:1}],{duration:3200,easing:'ease-in-out'}).finished;
   jp.style.opacity=0;if(!alive())return;hit(3);await sleep(2200);
  }}
 new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){setTimeout(()=>{if(e.target.dataset.on!=='1'){}loop()},1200)}else{run=false;token++;walker.style.opacity=0;jp.style.opacity=0}}),{threshold:.6}).observe(wrap)})();

/* init */
AOS.init({duration:800,once:true,offset:70,easing:'ease-out-cubic'});
updWish();renderDest();renderHotels();estimate();go(0);
