(() => {
  const PHILOSOPHY_TOTAL = 1000000;
  const PHILOSOPHY_INDEXED = 120000;
  const SAMPLE_VIDEOS = [
    'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
    'https://www.w3schools.com/html/mov_bbb.mp4'
  ];
  const TOPICS = [
    ['What makes a life meaningful?', 'Meaning can be examined through purpose, relationships, values and the way we respond to uncertainty.'],
    ['Can we know anything with certainty?', 'Skepticism asks how far justification can take us—and where reasonable belief begins.'],
    ['Are we really free?', 'The free-will debate asks whether responsibility requires choices that could genuinely have been otherwise.'],
    ['What is consciousness?', 'Philosophy separates subjective experience, intelligence, attention and self-awareness rather than treating them as one thing.'],
    ['The Ship of Theseus', 'If every part of an object is replaced over time, what—if anything—makes it the same object?'],
    ['Why should we be moral?', 'Ethics asks whether morality comes from consequences, duties, virtues, social contracts or something deeper.'],
    ['Does reality exist independently of us?', 'Realism, idealism and constructivism offer radically different accounts of what it means for something to be real.'],
    ['What can death teach us?', 'Thinking about mortality has shaped Stoicism, existentialism, Buddhism and many other philosophical traditions.'],
    ['Can machines think?', 'The question is not only whether a machine can produce intelligent behavior, but what we mean by thinking in the first place.'],
    ['What makes an argument valid?', 'Logic distinguishes the truth of premises from whether a conclusion follows from them correctly.']
  ];
  const PHILOSOPHERS = ['Socrates','Plato','Aristotle','Confucius','Zhuangzi','Epictetus','Marcus Aurelius','Ibn Sina','Al-Ghazali','Montaigne','Spinoza','Kant','Nietzsche','Kierkegaard','Simone de Beauvoir','Hannah Arendt','Bertrand Russell','Wittgenstein','John Rawls','Martha Nussbaum'];

  function philosophyReel(i) {
    const topic = TOPICS[i % TOPICS.length];
    const philosopher = PHILOSOPHERS[i % PHILOSOPHERS.length];
    const video = SAMPLE_VIDEOS[i % SAMPLE_VIDEOS.length];
    const id = i + 1;
    return `<article class="reel philosophy-reel" data-philosophy-id="${id}">
      <video src="${video}" muted loop playsinline autoplay preload="metadata"></video>
      <div class="shade"></div>
      <div class="reelinfo">
        <div class="handle">Philosophy · ${philosopher} · Reel #${id.toLocaleString()}</div>
        <h2>${topic[0]}</h2>
        <p>${topic[1]}</p>
        <div class="reel-credit">Original poster: <span>@philosophy_creator_${(i % 120000) + 1}</span></div>
      </div>
      <div class="rail">
        <button onclick="this.classList.toggle('liked')">♡</button><small>${(i * 43) % 10000 + 120}</small>
        <button>◯</button><small>${(i * 7) % 800 + 12}</small>
        <button>↗</button><small>Share</small>
        <button>▱</button><small>Save</small>
        <a href="${video}" download aria-label="Download philosophy reel">↓</a><small>Download</small>
      </div>
    </article>`;
  }

  function renderPhilosophy() {
    const c = document.getElementById('content');
    if (!c) return;
    c.className = 'reels philosophy-feed';
    let start = Number(window.__philosophyOffset || 0);
    c.innerHTML = `<div class="philosophy-banner"><strong>Philosophy</strong><span>${PHILOSOPHY_INDEXED.toLocaleString()} indexed · catalog capacity ${PHILOSOPHY_TOTAL.toLocaleString()} reels</span></div>` +
      Array.from({length: 8}, (_, j) => philosophyReel(start + j)).join('');
    c.onscroll = () => {
      if (c.scrollTop + c.clientHeight > c.scrollHeight - 600) {
        window.__philosophyOffset = start + 8;
        const next = window.__philosophyOffset;
        c.insertAdjacentHTML('beforeend', Array.from({length: 8}, (_, j) => philosophyReel(next + j)).join(''));
      }
    };
  }

  function addPhilosophyCategory() {
    const tabs = document.querySelector('.tabs');
    if (!tabs || document.getElementById('philosophyBtn')) return;
    const b = document.createElement('button');
    b.id = 'philosophyBtn';
    b.textContent = 'Philosophy';
    b.title = `${PHILOSOPHY_INDEXED.toLocaleString()} indexed philosophy reels`;
    b.onclick = () => {
      window.__philosophyOffset = 0;
      document.querySelectorAll('.tabs button').forEach(x => x.classList.remove('on'));
      b.classList.add('on');
      renderPhilosophy();
    };
    tabs.appendChild(b);

    const style = document.createElement('style');
    style.textContent = `.tabs{overflow-x:auto}.philosophy-banner{position:sticky;top:0;z-index:4;padding:10px 18px;background:#080b11ee;border-bottom:1px solid var(--line);backdrop-filter:blur(14px)}.philosophy-banner strong{font-size:16px;margin-right:10px}.philosophy-banner span{font-size:11px;color:var(--muted)}.philosophy-reel .reel-credit{margin-top:9px;font-size:11px;color:#fff;opacity:.9}.philosophy-reel .reel-credit span{color:#cbd3df}.philosophy-reel .rail a{color:#fff}.philosophy-feed{scroll-snap-type:y mandatory}@media(max-width:900px){.tabs{max-width:100%;}.philosophy-banner{padding:8px 12px}.philosophy-banner span{display:block;margin-top:3px}}`;
    document.head.appendChild(style);
  }

  const originalSetMode = window.setMode;
  window.setMode = function(v) {
    if (v === 'philosophy') {
      window.__philosophyOffset = 0;
      document.querySelectorAll('.tabs button').forEach(x => x.classList.remove('on'));
      document.getElementById('philosophyBtn')?.classList.add('on');
      renderPhilosophy();
      return;
    }
    if (typeof originalSetMode === 'function') originalSetMode(v);
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', addPhilosophyCategory);
  else addPhilosophyCategory();
})();
