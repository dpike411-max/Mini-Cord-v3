(() => {
const chatArea = document.getElementById('chatArea');
const form = document.getElementById('chatForm');
const input = document.getElementById('chatInput');
const KEY = 'lifelike:bot:conv';

function loadConv(){ try { return JSON.parse(localStorage.getItem(KEY))||[]; } catch { return []; } }
function saveConv(c){ localStorage.setItem(KEY, JSON.stringify(c)); }
function render(){
  chatArea.innerHTML='';
  const conv=loadConv();
  conv.forEach(m=>{
    const el=document.createElement('div');
    el.className='message '+m.role.toLowerCase();
    el.textContent=m.text;
    chatArea.appendChild(el);
  });
  chatArea.scrollTop = chatArea.scrollHeight;
}

function lifelikeRespond(msg){
  const m = msg.toLowerCase();
  if(/\bhello\b|\bhi\b|\bhey\b/.test(m)) return ["Hey there!","Hi! How’s it going?","Hello!"].sort(()=>0.5-Math.random())[0];
  if(/\bhow are you\b/.test(m)) return ["I’m doing well, thanks! How about you?","Feeling great! What about you?","All good here!"].sort(()=>0.5-Math.random())[0];
  if(/\bhelp\b/.test(m)) return ["I can chat with you offline! Ask me anything.","I’m here to chat. What’s on your mind?","Let’s talk!"].sort(()=>0.5-Math.random())[0];
  if(/\btime\b/.test(m)) return `Current local time: ${new Date().toLocaleTimeString()}`;
  const templates = [
    "Interesting! Can you tell me more about that?",
    "Hmm, I see… what else do you think?",
    "That’s cool! How does that make you feel?",
    "I hadn’t thought of that. Go on…",
    "Fascinating! Can you explain a bit more?"
  ];
  return templates[Math.floor(Math.random()*templates.length)];
}

form.addEventListener('submit',e=>{
  e.preventDefault();
  const text = input.value.trim();
  if(!text) return;
  const conv = loadConv();
  conv.push({role:'User', text});
  saveConv(conv);
  render();
  input.value='';
  conv.push({role:'Bot', text:'...'});
  saveConv(conv);
  render();
  setTimeout(()=>{
    const reply = lifelikeRespond(text);
    const c2 = loadConv();
    c2.pop();
    c2.push({role:'Bot', text:reply});
    saveConv(c2);
    render();
  }, 500 + Math.random()*1000);
});

render();
})();
