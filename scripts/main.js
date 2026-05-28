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

function toggleTheme(){document.body.classList.toggle('light-mode')}

// attach listeners
window.addEventListener('load',()=>{
  const b = document.getElementById('copy');
  if(b) b.addEventListener('click',copyIP);
  // initial fetch and poll
  fetchServer();
  setInterval(fetchServer,10000);
});
