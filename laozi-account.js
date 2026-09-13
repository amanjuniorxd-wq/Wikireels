(() => {
  'use strict';

  // A fictionalized daily account inspired by Laozi's themes. These are not
  // authentic historical posts or quotations attributed to Laozi.
  const VIDEO = 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4';
  const DAILY_THOUGHTS = [
    ['The strength of water', 'I was thinking about water today. It does not argue with the stone, yet it slowly changes the shape of mountains. Perhaps strength is not always resistance; sometimes it is patient persistence.'],
    ['When less becomes more', 'I was thinking about how a cup becomes useful because of the empty space inside it. What we leave open can be as important as what we fill.'],
    ['The quiet mind', 'I was thinking about the noise we carry even when the world is silent. A quiet mind does not need every question to have an immediate answer.'],
    ['Leading without forcing', 'I was thinking about leadership. The deepest influence may be the kind that leaves people feeling that they walked the path themselves.'],
    ['Returning to simplicity', 'I was thinking about simplicity. When desire multiplies, attention fragments. Perhaps returning to what is essential is a form of freedom.'],
    ['The usefulness of softness', 'I was thinking about softness. A flexible branch can survive the storm that breaks a rigid one. Adaptability is not weakness.'],
    ['Knowing when to stop', 'I was thinking about enough. Even a good thing becomes a burden when we cannot recognize the moment to stop adding more.'],
    ['The path and the traveler', 'I was thinking about the path. We often want a map before taking the first step, but understanding can arrive only after walking.'],
    ['Making space for others', 'I was thinking about conversation. If we prepare only to answer, we may never hear what another person is actually saying.'],
    ['The wisdom of uncertainty', 'I was thinking about uncertainty. Not knowing can be uncomfortable, but it can also keep the mind curious and humble.'],
    ['Nature does not hurry', 'I was thinking about trees. They do not rush toward tomorrow, yet seasons pass through them and they continue to grow.'],
    ['A different kind of victory', 'I was thinking about conflict. Winning an argument may satisfy the ego while leaving the relationship wounded. Is there a victory in which nobody needs to be defeated?']
  ];

  function dayIndex() {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 1);
    return Math.floor((now - start) / 86400000);
  }

  function todayThought() {
    return DAILY_THOUGHTS[dayIndex() % DAILY_THOUGHTS.length];
  }

  function renderLaoziAccount() {
    const c = document.getElementById('content');
    if (!c) return;
    const [title, thought] = todayThought();
    const date = new Intl.DateTimeFormat('en', {year:'numeric', month:'long', day:'numeric'}).format(new Date());
    const postNo = dayIndex() + 1;

    c.className = 'reels laozi-feed';
    c.innerHTML = `
      <div class="laozi-profile">
        <div class="laozi-avatar">道</div>
        <div><div class="laozi-name">Laozi</div><div class="handle">@laozi · Philosopher · Daily reflections</div></div>
        <button class="follow" onclick="this.textContent=this.textContent==='Follow'?'Following':'Follow'">Follow</button>
        <p>Ancient Chinese philosophy, presented as modern English reflections on simplicity, nature, action, stillness and the way.</p>
        <small>⚠️ Fictionalized educational account — not authentic historical posts or quotations.</small>
      </div>
      <article class="reel laozi-reel">
        <video src="${VIDEO}" muted loop playsinline autoplay preload="metadata"></video>
        <div class="shade"></div>
        <div class="reelinfo">
          <div class="handle">Laozi · Daily reflection #${postNo} · ${date}</div>
          <h2>${title}</h2>
          <p>${thought}</p>
          <div class="reel-credit">Account: <span>@laozi</span> · English reflection · inspired by Taoist themes</div>
        </div>
        <div class="rail">
          <button onclick="this.classList.toggle('liked')">♡</button><small>1.2K</small>
          <button>◯</button><small>86</small>
          <button>↗</button><small>Share</small>
          <button>▱</button><small>Save</small>
          <a href="${VIDEO}" download aria-label="Download Laozi daily reflection">↓</a><small>Download</small>
        </div>
      </article>`;
  }

  function addLaoziAccount() {
    if (document.getElementById('laoziBtn')) return;
    const tabs = document.querySelector('.tabs');
    if (!tabs) return;
    const b = document.createElement('button');
    b.id = 'laoziBtn';
    b.textContent = '☯ Laozi';
    b.title = 'Laozi — one English reflection every day';
    b.onclick = () => {
      document.querySelectorAll('.tabs button').forEach(x => x.classList.remove('on'));
      b.classList.add('on');
      renderLaoziAccount();
    };
    tabs.appendChild(b);

    const style = document.createElement('style');
    style.textContent = `
      .laozi-profile{padding:18px;max-width:720px;margin:0 auto;border-bottom:1px solid var(--line);background:linear-gradient(135deg,#111827,#0c1512)}
      .laozi-avatar{width:58px;height:58px;border-radius:50%;display:grid;place-items:center;background:#e8d9a8;color:#111;font-family:Georgia,serif;font-size:30px;font-weight:900;float:left;margin-right:12px}
      .laozi-name{font-family:Georgia,serif;font-size:22px;font-weight:900;padding-top:3px}
      .laozi-profile .follow{float:right}
      .laozi-profile p{clear:both;padding-top:14px;margin:0 0 7px;color:#cbd3df;line-height:1.5}
      .laozi-profile small{color:#9da7b6}
      .laozi-reel{min-height:calc(100dvh - 240px)}
      .laozi-reel .reel-credit{margin-top:9px;font-size:11px;color:#fff;opacity:.9}
      .laozi-reel .reel-credit span{color:#e8d9a8}
    `;
    document.head.appendChild(style);
  }

  window.LaoziAccount = { renderLaoziAccount, todayThought };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', addLaoziAccount);
  else addLaoziAccount();
})();
