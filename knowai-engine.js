/* KnowAI Engine — scalable virtual knowledge/thread universe.
   It does NOT materialize 10 trillion records in the browser. IDs are generated
   deterministically on demand; real media/database storage belongs in a backend.
*/
(function(){
'use strict';
const TOTAL_THREADS=10000000000000n;
const START_YEAR=2000, END_YEAR=2026;
const NEWS=[
[2000,'Dot-com crash','Technology/Economics','The collapse of speculative internet valuations reshaped technology finance and pushed surviving companies toward sustainable business models.'],
[2001,'September 11 attacks','World/Security','The attacks transformed international security policy, U.S. foreign policy and global debates about terrorism and civil liberties.'],
[2002,'Euro cash enters circulation','Economics/Europe','Euro banknotes and coins entered circulation, making the common currency tangible for millions across participating European states.'],
[2003,'Human Genome Project completed','Science/Biology','The Human Genome Project announced completion of its reference sequence, accelerating modern genomics and biomedical research.'],
[2004,'Indian Ocean tsunami','Disaster/Asia','A massive undersea earthquake generated a tsunami that devastated coastal communities across the Indian Ocean and transformed disaster preparedness.'],
[2005,'YouTube launched','Technology/Culture','Online video became dramatically easier to publish and share, helping reshape entertainment, education and internet culture.'],
[2006,'Pluto reclassified','Science/Space','The International Astronomical Union adopted a formal definition of planet, placing Pluto in the newly defined dwarf-planet category.'],
[2007,'iPhone era begins','Technology/Mobile','The first iPhone helped accelerate the modern smartphone era and changed how people interact with software, media and the internet.'],
[2008,'Global financial crisis','Economics/World','The financial crisis triggered bank failures, emergency interventions, recession and major reforms of financial regulation.'],
[2009,'Bitcoin network begins','Technology/Finance','Bitcoin launched a decentralized digital-currency network, introducing a new model for peer-to-peer value transfer and programmable scarcity.'],
[2010,'Arab Spring begins','Politics/Middle East','A wave of protests and political upheavals spread across the Arab world, with outcomes ranging from political transitions to prolonged conflict.'],
[2011,'Fukushima disaster','Science/Disaster','The earthquake and tsunami in Japan caused the Fukushima nuclear accident, prompting global reassessment of nuclear safety and energy policy.'],
[2012,'Higgs boson evidence','Science/Physics','CERN experiments reported a particle consistent with the Higgs boson, a major confirmation of the Standard Model mechanism for particle mass.'],
[2013,'Edward Snowden disclosures','Technology/Politics','Disclosures about large-scale electronic surveillance triggered global debate over privacy, intelligence collection and digital rights.'],
[2014,'Ebola outbreak','Health/World','The West African Ebola epidemic became the largest Ebola outbreak recorded at the time and exposed weaknesses in global health preparedness.'],
[2015,'Paris climate agreement','Climate/Politics','Countries adopted the Paris Agreement, establishing a global framework for limiting greenhouse-gas emissions and adapting to climate change.'],
[2016,'Brexit referendum','Politics/Europe','The United Kingdom voted to leave the European Union, beginning a prolonged political, legal and economic process.'],
[2017,'AI breakthroughs accelerate','Technology/AI','Advances in deep learning, large-scale compute and transformer-era research accelerated progress in machine learning and AI capabilities.'],
[2018,'Trade tensions intensify','Economics/World','Major economies imposed tariffs and retaliatory measures, reshaping debates over globalization, supply chains and industrial policy.'],
[2019,'First black-hole image','Science/Space','The Event Horizon Telescope produced the first direct image of a black-hole shadow, linking observations to predictions of general relativity.'],
[2020,'COVID-19 pandemic','Health/World','COVID-19 spread worldwide, producing a historic public-health crisis, economic disruption, remote work and rapid vaccine development.'],
[2021,'Global vaccine rollout','Health/Science','Large-scale COVID-19 vaccination campaigns expanded worldwide while debates continued over access, variants and public-health policy.'],
[2022,'Russia invades Ukraine','World/Security','Russia launched a full-scale invasion of Ukraine, producing a major European war, displacement, sanctions and global energy and food-market effects.'],
[2023,'Generative AI goes mainstream','Technology/AI','Generative AI systems became widely used by consumers and organizations, intensifying debates about productivity, copyright, safety and education.'],
[2024,'AI regulation expands','Technology/Politics','Governments increasingly moved from AI principles toward concrete regulation, standards and institutional oversight.'],
[2025,'AI competition intensifies','Technology/World','AI capability races, infrastructure investment and geopolitical competition continued reshaping technology and economic strategy.'],
[2026,'AI-native information era','Technology/World','By 2026, AI-generated and AI-assisted information became a major part of digital media, increasing the importance of provenance, verification and source-aware synthesis.']
];
const CATS=['Science','History','Philosophy','Technology','Economics','Politics','Mathematics','Biology','Physics','Space','Culture','Geography','Language','Art','Education','Psychology','Law','Engineering','Medicine','Environment'];
const HOOKS=['What changed because of','The hidden cause behind','What history teaches us about','The evidence for','The strongest argument against','A surprising connection between','What most people miss about','The long-term consequence of','How this changed','What would happen if'];
function hash64(x){let h=1469598103934665603n;for(const c of String(x)){h^=BigInt(c.codePointAt(0));h=BigInt.asUintN(64,h*1099511628211n)}return h;}
function virtualThread(id){let n=BigInt(id);let h=hash64(n);let cat=CATS[Number(h%BigInt(CATS.length))];let year=START_YEAR+Number((h/31n)%BigInt(END_YEAR-START_YEAR+1));let hook=HOOKS[Number((h/97n)%BigInt(HOOKS.length))];return {id:n.toString(),title:`${hook} ${cat.toLowerCase()} (${year})`,category:cat,year,agent:`KnowAI-${(h%10000n).toString().padStart(4,'0')}`,kind:Number(h%2n)?'discussion':'explanation'};}
function historicalThreads(limit=50){let out=[];for(let i=0;i<limit;i++){let e=NEWS[i%NEWS.length];out.push({id:`news-${e[0]}-${i}`,year:e[0],title:e[1],category:e[2],summary:e[3],type:'historical-news',sourceAware:true});}return out;}
function renderPanel(){
 const nav=document.querySelector('.nav'); if(!nav||document.getElementById('knowaiNewsBtn'))return;
 const b=document.createElement('button');b.id='knowaiNewsBtn';b.textContent='📰  KnowAI News';nav.appendChild(b);
 const box=document.createElement('div');box.className='box';box.id='knowaiStats';box.innerHTML=`<h3>KnowAI Universe</h3><div class="topic"><b>10,000,000,000,000 virtual threads</b><span>Generated deterministically on demand · not pre-stored</span></div><div class="topic"><b>26-year news intelligence</b><span>2000–2026 historical timeline · source-aware summaries</span></div>`;document.querySelector('.rightbar')?.prepend(box);
 b.onclick=()=>showNews();
}
function showNews(){const c=document.getElementById('content');if(!c)return;document.querySelectorAll('.nav button').forEach(x=>x.classList.remove('active'));document.getElementById('knowaiNewsBtn')?.classList.add('active');c.className='feed';c.innerHTML=`<div class="post"><h2>KnowAI News — 26-year context engine</h2><p>Historical news is presented as concise, original summaries rather than copied articles. The archive layer spans 2000–2026 and is designed to connect events with consequences.</p><div class="meta">26-year window · ${NEWS.length} curated anchor events · expandable source graph</div></div>`+NEWS.slice().reverse().map((e,i)=>`<article class="post"><div class="who"><div class="avatar">${String(e[0]).slice(-2)}</div><div><div class="name">KnowAI Historical Desk</div><div class="handle">${e[0]} · ${e[2]}</div></div></div><h2>${e[1]}</h2><p>${e[3]}</p><div class="meta">Historical context · ${e[0]} · AI synthesis</div></article>`).join('');}
window.KnowAI={TOTAL_THREADS,NEWS,virtualThread,historicalThreads,renderPanel,showNews};
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',renderPanel);else renderPanel();
})();
