// minimal main.js kept
const SERVER_API = 'https://api.mcsrvstat.us/2/bedtwL.com'; // fallback to public API if no local /api/status

function setServerStatus(online){
  const dot = document.getElementById('status-dot');
  const text = document.getElementById('status-text');
  if(!dot||!text) return;
  if(online){
    dot.style.background = '#39d67a';
    text.textContent = '線上';
  } else {
    dot.style.background = '#888';
    text.textContent = '離線';
  }
}

function setPlayerCount(n){
  const el = document.getElementById('player-count');
  if(!el) return;
  el.textContent = `玩家: ${n}`;
}

async function fetchServer(){
  try{
    const res = await fetch(SERVER_API,{cache:'no-store'});
    if(!res.ok) throw new Error('bad');
    const j = await res.json();
    setServerStatus(!!j.online);
    setPlayerCount(j.players.online||0);
  }catch(e){
    setServerStatus(false);
    setPlayerCount(0);
  }
}

function copyIP(){
  const btn = document.getElementById('copy');
  if(!navigator.clipboard){
    alert('Clipboard not supported');
    return;
  }
  navigator.clipboard.writeText('bedtwL.com').then(()=>{
    // transient animation / color change
    btn.classList.add('copy-success','copy-anim');
    btn.textContent = 'Copied!';
    setTimeout(()=>{
      btn.classList.remove('copy-success');
      btn.textContent = 'Copy';
    },1200);
  }).catch(()=>{
    // fallback
    btn.textContent = 'Error';
    setTimeout(()=>btn.textContent='Copy',1200);
  });
}

// theme switching: store preference in localStorage and toggle html[data-theme]
function applyTheme(theme){
  // theme: 'dark' | 'light' | 'system'
  if(theme === 'system'){
    document.documentElement.removeAttribute('data-theme');
  } else {
    document.documentElement.setAttribute('data-theme', theme);
  }
}

function toggleTheme(){
  // Only toggle between light and dark when user presses the button.
  const cur = document.documentElement.getAttribute('data-theme');
  if(cur === 'light') applyTheme('dark');
  else applyTheme('light');
  try{ localStorage.setItem('site-theme', document.documentElement.getAttribute('data-theme')||'light') }catch(e){}
}

// attach listeners
window.addEventListener('load',()=>{
  const b = document.getElementById('copy');
  if(b) b.addEventListener('click',copyIP);
  // initial fetch and poll
  fetchServer();
  setInterval(fetchServer,10000);

  // bind theme toggle button
  const tbtn = document.getElementById('theme-toggle');
  if(tbtn) tbtn.addEventListener('click', toggleTheme);
});
