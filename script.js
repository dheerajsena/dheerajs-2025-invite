
document.addEventListener('DOMContentLoaded',()=>{
  const modal=document.getElementById('modal');
  const openBtn=document.getElementById('openModal');
  const closeBtn=document.getElementById('closeModal');
  const sendBtn=document.getElementById('submitRsvp');
  const countEl=document.getElementById('countDown');
  const target=new Date("2025-05-11T16:00:00+10:00").getTime();

  setInterval(()=>{
    const t=target-Date.now();if(t<=0){countEl.textContent="Now!";return;}
    const h=Math.floor(t/36e5),m=Math.floor(t%36e5/6e4),s=Math.floor(t%6e4/1e3);
    countEl.textContent=`${h}h ${m}m ${s}s`;
  },1000);

  openBtn.onclick=()=>modal.classList.add('show');
  closeBtn.onclick=()=>modal.classList.remove('show');

  sendBtn.onclick=async()=>{
    const name=document.getElementById('guestName').value.trim();
    const rsvp=document.getElementById('guestRsvp').value;
    if(!name||!rsvp){alert("Fill everything");return;}
    await fetch("https://script.google.com/macros/s/AKfycbwNFGXHPzr5li9NjJE-PRcc_vlja5hN9RBs4EHReOdXtLhLgV0ro4Y4qCR7YBZOTcBlDw/exec",{method:'POST',mode:'no-cors',headers:{'Content-Type':'application/json'},body:JSON.stringify({name,rsvp,ua:navigator.userAgent})});

    if(rsvp==="Yes"&&confirm("Add to calendar?")){
      const ics=`BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
SUMMARY:Dheeraj’s Sundowner Party
DTSTART:20250511T060000Z
DTEND:20250511T120000Z
LOCATION:Level 41, 60 Kavanagh Street, Southbank
DESCRIPTION:Rooftop Party
END:VEVENT
END:VCALENDAR`;
      const blob=new Blob([ics],{type:"text/calendar"});
      const link=Object.assign(document.createElement('a'),{href:URL.createObjectURL(blob),download:"Dheeraj_Sundowner.ics"});
      link.click();
    }
    alert("Merci! See you in Monaco.");
    modal.classList.remove('show');
  };
});
