/* OrderPilot interactive workflow — dependency-free and framework-agnostic.
   Assets are extracted from the three supplied visual references.
*/
const ICON_PATHS = {
  whatsapp: '<path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.7 4.9 8.4 8.4 0 0 1-3.8-.9L3 21l1.7-5.6a8.4 8.4 0 0 1-.9-3.8A8.5 8.5 0 0 1 8.7 3.9a8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8v.5Z"/><path d="M8.5 8.8c.5 2.7 2 4.2 4.8 5.4l1.3-1.1 2 1-.5 2a2 2 0 0 1-2 1.3c-3.7-.4-7.4-4.1-7.8-7.8a2 2 0 0 1 1.3-2l1.9-.5 1 2-1 1.7Z"/>',
  globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a15.5 15.5 0 0 1 0 18M12 3a15.5 15.5 0 0 0 0 18"/>',
  qr: '<path d="M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM6 6h1M17 6h1M6 17h1M14 14h3v3h-3zM21 14v3M17 21h4M14 19v2M19 19h2"/>',
  check: '<path d="m5 12 4 4L19 6"/>',
  checkcircle: '<circle cx="12" cy="12" r="9"/><path d="m8 12 3 3 5-6"/>',
  chevron: '<path d="m9 18 6-6-6-6"/>',
  arrow: '<path d="M4 12h16m-7-7 7 7-7 7"/>',
  arrowThin: '<path d="M3 12h18m-6-6 6 6-6 6"/>',
  cart: '<circle cx="9" cy="20" r="1"/><circle cx="20" cy="20" r="1"/><path d="M2 3h2l2.3 11.4a2 2 0 0 0 2 1.6h10a2 2 0 0 0 2-1.6L22 7H5"/>',
  search: '<circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/>',
  menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
  phone: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19 19 0 0 1-8.3-3 18 18 0 0 1-5.5-5.5 19 19 0 0 1-3-8.4A2 2 0 0 1 5 2.9h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .8 2.9a2 2 0 0 1-.5 2.1L9 11a15 15 0 0 0 4 4l1.4-1.3a2 2 0 0 1 2.1-.5c.9.4 1.9.7 2.9.8a2 2 0 0 1 1.6 2Z"/>',
  camera: '<rect x="2" y="6" width="15" height="12" rx="2"/><path d="m17 10 5-3v10l-5-3"/>',
  back: '<path d="m15 18-6-6 6-6"/>',
  store: '<path d="M3 10h18l-2-6H5l-2 6ZM4 10v10h16V10M9 20v-7h6v7"/>',
  dashboard: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
  receipt: '<path d="M5 3h14v18l-3-2-4 2-4-2-3 2V3Z"/><path d="M9 8h6M9 12h6"/>',
  bell: '<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9ZM10 21h4"/>',
  chef: '<path d="M6 14a5 5 0 1 1 3-9 5 5 0 0 1 8 0 5 5 0 1 1 2 9v7H6v-7Z"/><path d="M6 16h13"/>',
  spoon: '<ellipse cx="9" cy="7" rx="4.5" ry="5"/><path d="M9 12v10M17 2v20M17 9h4V2"/>',
  cloche: '<path d="M3 18h18M5 16a7 7 0 0 1 14 0H5ZM12 9V7m-2 0h4"/>',
  user: '<circle cx="12" cy="7" r="4"/><path d="M4 21v-3a8 8 0 0 1 16 0v3"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  minus: '<path d="M5 12h14"/>',
  trash: '<path d="M3 6h18M8 6V4h8v2m3 0-1 15H6L5 6m5 4v7m4-7v7"/>',
  battery: '<rect x="2" y="6" width="18" height="12" rx="2"/><path d="M22 10v4"/><rect x="5" y="9" width="12" height="6" rx="1" fill="currentColor" stroke="none"/>',
  wifi: '<path d="M2 9a16 16 0 0 1 20 0M5 12a11 11 0 0 1 14 0M8 15a6 6 0 0 1 8 0M12 19h.01"/>',
  star: '<path d="m12 2 3 6 7 .9-5 5 1.2 7-6.2-3.3L5.8 21 7 14 2 9l7-.9 3-6Z"/>',
  paperclip: '<path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48"/>',
  mic: '<path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v4M8 23h8"/>',
  smile: '<circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01"/>',
};
function ico(name, className = '', size = 20) {
  return `<svg aria-hidden="true" class="icon ${className}" viewBox="0 0 24 24" width="${size}" height="${size}" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">${ICON_PATHS[name] || ICON_PATHS.check}</svg>`;
}
const channels = {
  whatsapp: { tab: 'WhatsApp', icon: 'whatsapp', leftTitle: 'New order on WhatsApp', leftDescription: 'A customer messages your menu and places an order.' },
  web: { tab: 'Web', icon: 'globe', leftTitle: 'New order from your website', leftDescription: 'A customer opens your menu online and orders from their phone.' },
  qr: { tab: 'Table QR', icon: 'qr', leftTitle: 'New order from a table', leftDescription: 'A guest scans the QR code at the table and orders from their seat.' },
};
const asset = (name) => `/orderpilot-workflow/${name}`;
function statusBar() { return `<div class="status-bar"><strong>9:41</strong><span class="status-icons"><span class="signal-bars"><i></i><i></i><i></i><i></i></span>${ico('wifi','',14)}${ico('battery','',20)}</span></div>`; }
function brandAvatar() { return `<span class="burger-avatar"><img src="${asset('burger.webp')}" alt="" /></span>`; }
function quantity() { return `<span class="quantity"><span>${ico('minus','',13)}</span><b>1</b><span>${ico('plus','',13)}</span></span>`; }
function confirmed(label = 'Ready for the team to review') { return `<div class="confirmed-box"><span class="confirmed-mark">${ico('check','',23)}</span><span><b>Details confirmed</b><small>${label}</small></span></div>`; }
function phoneWhatsApp() { return `<div class="device device--whatsapp"><div class="device-glass">
  ${statusBar()}<div class="phone-chat-header">${ico('back','go-back',24)}${brandAvatar()}<span class="chat-name"><strong>Zinger Burger</strong><small>Business account</small></span>${ico('camera','call-icon',20)}${ico('phone','call-icon',20)}</div>
  <div class="chat-wallpaper">
    <div class="chat-message chat-message--sent">Hi! I'd like to order<br>1 Zinger Burger + Fries <span class="chat-time">9:41 AM <b>✓✓</b></span></div>
    <div class="chat-message chat-message--received chat-receipt"><span>Here’s your order:</span><div class="order-chat-product"><img src="${asset('burger.webp')}" alt="Zinger burger and fries" /><div class="chat-product-info"><b>Zinger Burger + Fries</b><strong>Rs. 850</strong>${quantity()}</div></div><span class="chat-time">9:41 AM</span></div>
    <div class="chat-message chat-message--received chat-check-question">Is this correct? <span class="chat-time">9:41 AM</span></div>
    <div class="chat-message chat-message--sent chat-yes">Yes, that's correct! 🎉 <span class="chat-time">9:41 AM <b>✓✓</b></span></div>
    ${confirmed()}
    <div class="chat-message chat-message--received chat-order-ack"><span>Order <b>#1042</b> received! 👨‍🍳</span><small>Sent to kitchen · Preparing now</small><span class="chat-time">9:42 AM</span></div>
  </div>
  <div class="chat-input-bar"><div class="chat-input-pill">${ico('smile','chat-bar-icon',17)}<span class="chat-input-placeholder">Message</span>${ico('paperclip','chat-bar-icon',17)}${ico('camera','chat-bar-icon',17)}</div><span class="chat-mic-btn">${ico('mic','',16)}</span></div>
</div></div><span class="floating-whatsapp">${ico('whatsapp','',41)}</span>`; }
function phoneWeb() {return `<div class="device device--web"><div class="device-glass">
 ${statusBar()}<div class="url-bar"><span>♙ &nbsp; orderpilot.pk</span><span>↻</span></div><div class="store-header">${brandAvatar()}<span class="store-brand"><b>Zinger Burger</b><small>Burgers · Fries · More</small></span>${ico('search','',21)}${ico('menu','',21)}</div>
 <div class="category-pills"><span class="selected">Burgers</span><span>Sides</span><span>Drinks</span><span>Combos</span></div>
 <div class="web-main-item"><img src="${asset('burger.webp')}" alt="Zinger burger"/><span><b>Zinger Burger + Fries</b><small>Crispy chicken burger with fries and signature sauce.</small><strong>Rs. 850</strong>${quantity()}</span></div>
 <div class="cart-heading">${ico('cart','',18)}<b>Your cart</b><span>1</span><strong>Rs. 850</strong></div>
 <div class="web-cart-row"><img src="${asset('burger.webp')}" alt=""/><span><b>Zinger Burger + Fries</b><small>Rs. 850</small></span>${quantity()}${ico('trash','',17)}</div>
 <div class="checkout-btn">Checkout ${ico('arrow','',18)}</div>${confirmed()}
 <div class="web-order-status"><span>Order <b>#1042</b> sent to kitchen</span><small>Est. prep time: 15–20 mins</small></div>
 <div class="web-bottom-bar"><span>OrderPilot Direct Ordering</span><span>Cash on delivery</span></div>
 </div></div>`; }
function qrSign(className='') {return `<div class="qr-table-sign ${className}"><span class="sign-burger">☰</span><strong>Scan to Order</strong><small>Table 12</small><img src="${asset('sample-qr.svg')}" alt="Demo QR linking to the OrderPilot website" /><span>View our menu<br>and order here.</span></div>`;}
function phoneQr() {return `${qrSign('showcase-qr-stand')}<div class="device device--qr"><div class="device-glass">${statusBar()}
 <div class="qr-store-header">${ico('back','',21)}${brandAvatar()}<span><b>Zinger Burger</b><small>Table 12</small></span>${ico('search','',19)}</div>
 <div class="qr-menu-tabs"><span class="selected">Burgers</span><span>Sides</span><span>Drinks</span><span>Desserts</span></div>
 <div class="qr-feature-product"><img src="${asset('burger-qr.webp')}" alt="Zinger burger and fries"/><span><b>Zinger Burger + Fries</b><strong>Rs. 850</strong><small>Crispy chicken, fresh lettuce, our special sauce, with fries.</small><span class="qr-feature-controls">${quantity()}<em>Add</em></span></span></div>
 <div class="qr-menu-item"><img src="${asset('classic-burger.webp')}" alt="Classic burger"/><span><b>Classic Burger</b><strong>Rs. 750</strong></span><i>${ico('plus','',17)}</i></div>
 <div class="qr-menu-item"><img src="${asset('fries.webp')}" alt="Loaded fries"/><span><b>Loaded Fries</b><strong>Rs. 450</strong></span><i>${ico('plus','',17)}</i></div>
 <div class="qr-menu-item"><img src="${asset('wings.webp')}" alt="Chicken wings"/><span><b>Chicken Wings</b><strong>Rs. 690</strong></span><i>${ico('plus','',17)}</i></div>${confirmed()}
 <div class="qr-table-footer"><span>Order <b>#1042</b> · Table 12 sent</span><small>Kitchen is preparing your order</small></div>
 </div></div>`;}
function leftPanel(mode) {const c=channels[mode];return `<div class="showcase-intro"><span class="eyebrow green-eye">EXAMPLE</span><h2>${c.leftTitle}</h2><p>${c.leftDescription}</p></div><div class="showcase-decoration one"></div><div class="showcase-decoration two"></div><div class="showcase-scene">${mode==='whatsapp'?phoneWhatsApp():mode==='web'?phoneWeb():phoneQr()}</div>`;}
function miniOrderBoard(mode) {return `<div class="mini-board"><div class="mini-sidebar">${ico('store','',12)}${ico('receipt','',12)}${ico('dashboard','',12)}</div><div class="mini-orders"><strong>Orders</strong><div><b>#1042</b><span>${mode==='qr'?'Table 12':'1 Zinger Burger + Fries'}</span><em class="mini-new">New</em></div><div><b>#1041</b><span>${mode==='qr'?'Table 8':'2 Chicken Wraps'}</span><em class="mini-preparing">Preparing</em></div><div><b>#1040</b><span>${mode==='qr'?'Table 3':'1 Beef Burger'}</span><em class="mini-ready">Ready</em></div></div></div>`; }
function miniFirst(mode) {
 if (mode==='whatsapp') return `<div class="mini-whatsapp"><span class="mini-person">${ico('user','',24)}</span><div class="mini-bubble"><b>1 Zinger Burger<br>+ Fries</b><small>9:41 AM <span>✓✓</span></small></div><span class="mini-spark">〃</span></div>`;
 if(mode==='web')return `<div class="mini-storefront"><div class="mini-browser-bar">‹ &nbsp; ▣ &nbsp; orderpilot.pk &nbsp; ↻</div><div class="mini-store-menu"><span>Burgers</span> Sides &nbsp; Drinks</div><div class="mini-store-product"><img src="${asset('burger.webp')}" alt=""/><div><b>Zinger Burger + Fries</b><small>Rs. 850</small><em>Add to cart</em></div></div></div>`;
 return `<div class="mini-qr-order">${qrSign('mini-qr-sign')}<div class="mini-qr-phone"><span class="mini-notch"></span><img src="${asset('burger.webp')}" alt=""/><b>Zinger Burger + Fries</b><span>${quantity()}</span><em>Add to order</em></div></div>`;
}
function miniChecked(mode) {return `<div class="mini-check-row"><div class="mini-checked-product"><img src="${asset('burger.webp')}" alt=""/><div><b>Zinger Burger + Fries</b><small>Rs. 850 ${mode==='qr'?'· Table 12':''}</small>${quantity()}</div></div><span class="round-checked">${ico('check','',25)}</span></div>`;}
function kitchenProgress() {return `<div class="kitchen-progress"><div><span>${ico('chef','',31)}</span><small>New</small></div>${ico('chevron','kitchen-arrow',19)}<div><span>${ico('spoon','',29)}</span><small>Preparing</small></div>${ico('chevron','kitchen-arrow',19)}<div><span>${ico('cloche','',29)}</span><small>Ready</small></div></div>`;}
function stepCard(number, art, title, text, extraClass='') {return `<article class="step-card ${extraClass}"><span class="step-number">${number}</span><div class="step-illustration">${art}</div><h3>${title}</h3><p>${text}</p></article>`;}
function rightPanel(mode) {return `<div class="journey-heading"><span class="eyebrow">WHAT HAPPENS NEXT</span><h2>The same four steps, whichever way they order.</h2></div><div class="steps-wrap">
 <svg aria-hidden="true" class="connector-track" viewBox="0 0 792 552" preserveAspectRatio="none"><path d="M761 135 H777 Q789 135 789 148 V270 Q789 280 779 280 H292 Q282 280 282 293" stroke="#b8e3d4" stroke-width="1.6" stroke-dasharray="5 5" stroke-linecap="round" fill="none"/></svg>
 <span aria-hidden="true" class="connector-arrow arrow-top">${ico('arrowThin','',32)}</span><span aria-hidden="true" class="connector-arrow arrow-bottom">${ico('arrowThin','',32)}</span>
 <div class="steps-grid">
 ${stepCard('01',miniFirst(mode),'Customer orders.','On WhatsApp, on your website, or from the table QR.','step-first')}
 ${stepCard('02',miniChecked(mode),'The order is checked.','Items, quantity and total are confirmed before it reaches the kitchen.','step-second')}
 ${stepCard('03',miniOrderBoard(mode),'Your team sees it.','It shows up on your screen, already written down.','step-third')}
 ${stepCard('04',kitchenProgress(),'Mark it as it moves.','New, preparing, ready. WhatsApp customers get an update automatically.','step-fourth')}
 </div></div>`;}

export {channels, ico, leftPanel, rightPanel};
