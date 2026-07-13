/*!
 * NEXAI Chat Widget — standalone embeddable chat bubble.
 * One <script> tag, no dependencies, works on any website.
 * Styles are isolated in a Shadow DOM so they never collide with the host page.
 *
 * Usage (paste before </body> on the client's site):
 *
 *   <script>
 *     window.NexaiChat = {
 *       webhook: "https://n8n.nex-a-i.com/webhook/kunde-chat", // required
 *       name:    "Musterfirma Assistent",                      // header title
 *       accent:  "#4d7cff",                                    // brand color
 *       greeting:"Hallo! Wie kann ich Ihnen helfen?",          // first bubble
 *       placeholder: "Nachricht schreiben …",
 *       locale:  "de",                                         // "de" | "en"
 *       fallbackPhone: "0176 80714816"                         // shown on errors
 *     };
 *   </script>
 *   <script src="https://nex-a-i.com/chat-widget.js" async></script>
 */
(function () {
  "use strict";
  if (window.__nexaiChatLoaded) return;
  window.__nexaiChatLoaded = true;

  var cfg = window.NexaiChat || {};
  // Allow config via data-attributes on the script tag as a fallback.
  var self = document.currentScript;
  function attr(k, d) {
    return (self && self.getAttribute("data-" + k)) || cfg[k] || d;
  }

  var WEBHOOK = attr("webhook", "");
  if (!WEBHOOK) {
    console.error("[NexaiChat] Missing `webhook` URL in window.NexaiChat.");
    return;
  }
  var NAME = attr("name", "Assistent");
  var ACCENT = attr("accent", "#4d7cff");
  var GREETING = attr("greeting", "Hallo! Wie kann ich Ihnen helfen?");
  var PLACEHOLDER = attr("placeholder", "Nachricht schreiben …");
  var LOCALE = attr("locale", "de");
  var STATUS = attr("status", LOCALE === "en" ? "Online" : "Online");
  var PHONE = attr("fallbackPhone", "");
  var SEND_LABEL = LOCALE === "en" ? "Send" : "Senden";
  var CLOSE_LABEL = LOCALE === "en" ? "Close chat" : "Chat schließen";
  var OPEN_LABEL = LOCALE === "en" ? "Open chat" : "Chat öffnen";
  var DISCLAIMER =
    LOCALE === "en" ? "AI assistant · May make mistakes" : "KI-Assistent · Kann Fehler machen";
  var ERROR_TEXT =
    LOCALE === "en"
      ? "Sorry, there was a technical problem. Please try again in a moment" +
        (PHONE ? " — or call us at " + PHONE + "." : ".")
      : "Entschuldigung, es gab ein technisches Problem. Bitte versuchen Sie es gleich erneut" +
        (PHONE ? " – oder rufen Sie uns an unter " + PHONE + "." : ".");

  var STORAGE_KEY = "nexai-chat-embed";
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function uid() {
    if (window.crypto && crypto.randomUUID) return crypto.randomUUID();
    return "id-" + Date.now() + "-" + Math.floor(Math.random() * 1e9);
  }

  // ---- session (per tab) ----
  var sessionId, messages;
  try {
    var saved = JSON.parse(sessionStorage.getItem(STORAGE_KEY) || "null");
    sessionId = (saved && saved.sessionId) || uid();
    messages = (saved && saved.messages) || [];
  } catch (e) {
    sessionId = uid();
    messages = [];
  }
  function persist() {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ sessionId: sessionId, messages: messages }));
    } catch (e) {}
  }

  // ---- host + shadow root (style isolation) ----
  var host = document.createElement("div");
  host.setAttribute("aria-live", "polite");
  host.style.cssText = "all:initial";
  document.body.appendChild(host);
  var root = host.attachShadow ? host.attachShadow({ mode: "open" }) : host;

  var style = document.createElement("style");
  style.textContent = [
    ":host,*{box-sizing:border-box}",
    ".nx-btn,.nx-panel{position:fixed;z-index:2147483000;font-family:ui-sans-serif,system-ui,-apple-system,'Segoe UI',Roboto,sans-serif}",
    ".nx-btn{bottom:20px;right:20px;width:56px;height:56px;border:none;border-radius:50%;cursor:pointer;display:grid;place-items:center;color:#fff;background:" +
      ACCENT +
      ";box-shadow:0 10px 30px -8px " +
      ACCENT +
      "cc,0 4px 12px rgba(0,0,0,.3);transition:transform .2s,box-shadow .2s}",
    ".nx-btn:hover{transform:translateY(-2px)}",
    ".nx-btn:focus-visible{outline:3px solid " + ACCENT + "88;outline-offset:2px}",
    ".nx-btn svg{width:26px;height:26px}",
    ".nx-panel{display:flex;flex-direction:column;overflow:hidden;background:#0e0f16;color:#f4f5fa;border:1px solid rgba(255,255,255,.1);box-shadow:0 24px 70px -20px rgba(0,0,0,.7);opacity:0;transform:translateY(16px) scale(.98);transition:opacity .3s cubic-bezier(.16,1,.3,1),transform .3s cubic-bezier(.16,1,.3,1);pointer-events:none}",
    ".nx-panel.open{opacity:1;transform:none;pointer-events:auto}",
    "@media(min-width:640px){.nx-panel{bottom:92px;right:20px;width:380px;height:min(600px,calc(100vh - 120px));border-radius:20px}}",
    "@media(max-width:639px){.nx-panel{inset:0;border-radius:0}}",
    reduce ? ".nx-panel,.nx-btn{transition:none}" : "",
    ".nx-head{display:flex;align-items:center;gap:10px;padding:14px 16px;border-bottom:1px solid rgba(255,255,255,.08);background:rgba(255,255,255,.02)}",
    ".nx-avatar{width:34px;height:34px;border-radius:50%;flex:none;display:grid;place-items:center;color:#fff;font-weight:700;font-size:15px;background:" +
      ACCENT +
      "}",
    ".nx-title{font-size:15px;font-weight:600;line-height:1.2}",
    ".nx-status{font-size:12px;color:#a2a6b8;display:flex;align-items:center;gap:6px}",
    ".nx-dot{width:7px;height:7px;border-radius:50%;background:#34d399;box-shadow:0 0 8px #34d399}",
    ".nx-x{margin-left:auto;background:none;border:none;color:#a2a6b8;cursor:pointer;width:34px;height:34px;border-radius:8px;display:grid;place-items:center}",
    ".nx-x:hover{background:rgba(255,255,255,.06);color:#fff}",
    ".nx-body{flex:1;overflow-y:auto;padding:16px;display:flex;flex-direction:column;gap:12px}",
    ".nx-row{display:flex;gap:8px;max-width:100%}",
    ".nx-row.user{justify-content:flex-end}",
    ".nx-bubble{max-width:85%;padding:10px 13px;border-radius:14px;font-size:14px;line-height:1.5;white-space:pre-wrap;word-wrap:break-word}",
    ".nx-row.bot .nx-bubble{background:#1c1e2a;border:1px solid rgba(255,255,255,.08);border-top-left-radius:4px}",
    ".nx-row.user .nx-bubble{background:rgba(255,255,255,.09);border:1px solid rgba(255,255,255,.14);border-top-right-radius:4px}",
    ".nx-row.err .nx-bubble{border-color:rgba(255,107,107,.4);color:#e6a9a9}",
    ".nx-typing{display:flex;gap:4px;padding:12px 14px;background:#1c1e2a;border:1px solid rgba(255,255,255,.08);border-radius:14px;border-top-left-radius:4px;width:fit-content}",
    ".nx-typing span{width:6px;height:6px;border-radius:50%;background:#6c7080;animation:nxb 1.1s infinite}",
    ".nx-typing span:nth-child(2){animation-delay:.18s}.nx-typing span:nth-child(3){animation-delay:.36s}",
    reduce ? "" : "@keyframes nxb{0%,60%,100%{opacity:.3}30%{opacity:1}}",
    ".nx-foot{padding:12px 14px calc(12px + env(safe-area-inset-bottom));border-top:1px solid rgba(255,255,255,.08)}",
    ".nx-form{display:flex;align-items:flex-end;gap:8px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.14);border-radius:22px;padding:6px 6px 6px 14px}",
    ".nx-input{flex:1;background:none;border:none;color:#f4f5fa;font-size:14px;font-family:inherit;resize:none;max-height:96px;padding:6px 0;outline:none}",
    ".nx-input::placeholder{color:#6c7080}",
    ".nx-send{flex:none;width:36px;height:36px;border-radius:50%;border:none;cursor:pointer;color:#fff;background:" +
      ACCENT +
      ";display:grid;place-items:center}",
    ".nx-send:disabled{opacity:.4;cursor:default}",
    ".nx-send svg{width:16px;height:16px}",
    ".nx-note{text-align:center;font-size:11px;color:#6c7080;margin-top:8px}",
  ].join("");
  root.appendChild(style);

  // ---- launcher ----
  var btn = document.createElement("button");
  btn.className = "nx-btn";
  btn.setAttribute("aria-label", OPEN_LABEL);
  btn.innerHTML =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>';
  root.appendChild(btn);

  // ---- panel ----
  var panel = document.createElement("div");
  panel.className = "nx-panel";
  panel.setAttribute("role", "dialog");
  panel.setAttribute("aria-label", NAME);
  var initial = NAME.trim().charAt(0).toUpperCase() || "A";
  panel.innerHTML =
    '<div class="nx-head">' +
    '<div class="nx-avatar">' + escapeHtml(initial) + "</div>" +
    '<div><div class="nx-title"></div><div class="nx-status"><span class="nx-dot"></span><span class="nx-statustext"></span></div></div>' +
    '<button class="nx-x" aria-label="' + escapeAttr(CLOSE_LABEL) + '"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg></button>' +
    "</div>" +
    '<div class="nx-body"></div>' +
    '<div class="nx-foot">' +
    '<form class="nx-form"><textarea class="nx-input" rows="1"></textarea>' +
    '<button type="submit" class="nx-send" aria-label="' + escapeAttr(SEND_LABEL) + '"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg></button></form>' +
    '<div class="nx-note"></div>' +
    "</div>";
  root.appendChild(panel);

  // text content set via textContent to avoid any injection
  panel.querySelector(".nx-title").textContent = NAME;
  panel.querySelector(".nx-statustext").textContent = STATUS;
  panel.querySelector(".nx-note").textContent = DISCLAIMER;
  var input = panel.querySelector(".nx-input");
  input.placeholder = PLACEHOLDER;
  input.setAttribute("aria-label", PLACEHOLDER);
  var body = panel.querySelector(".nx-body");
  var sendBtn = panel.querySelector(".nx-send");
  var form = panel.querySelector(".nx-form");

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function escapeAttr(s) {
    return escapeHtml(s);
  }

  function rowEl(role, text, isErr) {
    var row = document.createElement("div");
    row.className = "nx-row " + (role === "user" ? "user" : "bot") + (isErr ? " err" : "");
    var bub = document.createElement("div");
    bub.className = "nx-bubble";
    bub.textContent = text; // plain text — never innerHTML
    row.appendChild(bub);
    return row;
  }
  function scrollDown() {
    body.scrollTop = body.scrollHeight;
  }
  function render() {
    body.innerHTML = "";
    body.appendChild(rowEl("bot", GREETING, false));
    messages.forEach(function (m) {
      body.appendChild(rowEl(m.role, m.content, m.error));
    });
    scrollDown();
  }
  render();

  var sending = false;
  var typingEl = null;
  function showTyping() {
    typingEl = document.createElement("div");
    typingEl.className = "nx-row bot";
    typingEl.innerHTML = '<div class="nx-typing"><span></span><span></span><span></span></div>';
    body.appendChild(typingEl);
    scrollDown();
  }
  function hideTyping() {
    if (typingEl && typingEl.parentNode) typingEl.parentNode.removeChild(typingEl);
    typingEl = null;
  }

  function send(text) {
    text = (text || "").trim();
    if (!text || sending) return;
    sending = true;
    sendBtn.disabled = true;
    messages.push({ role: "user", content: text });
    body.appendChild(rowEl("user", text, false));
    persist();
    showTyping();

    var ctrl = new AbortController();
    var to = setTimeout(function () { ctrl.abort(); }, 55000);

    fetch(WEBHOOK, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId: sessionId, message: text, locale: LOCALE }),
      signal: ctrl.signal,
    })
      .then(function (r) { return r.json().catch(function () { return null; }); })
      .then(function (data) {
        var reply = data && (data.reply || data.output);
        hideTyping();
        if (typeof reply === "string" && reply.trim()) {
          messages.push({ role: "assistant", content: reply });
          body.appendChild(rowEl("bot", reply, false));
        } else {
          messages.push({ role: "assistant", content: ERROR_TEXT, error: true });
          body.appendChild(rowEl("bot", ERROR_TEXT, true));
        }
      })
      .catch(function () {
        hideTyping();
        messages.push({ role: "assistant", content: ERROR_TEXT, error: true });
        body.appendChild(rowEl("bot", ERROR_TEXT, true));
      })
      .then(function () {
        clearTimeout(to);
        sending = false;
        sendBtn.disabled = false;
        persist();
        scrollDown();
        input.focus();
      });
  }

  // ---- interactions ----
  var open = false;
  function setOpen(v) {
    open = v;
    if (v) {
      panel.classList.add("open");
      btn.setAttribute("aria-label", CLOSE_LABEL);
      setTimeout(function () { input.focus(); }, 60);
    } else {
      panel.classList.remove("open");
      btn.setAttribute("aria-label", OPEN_LABEL);
      btn.focus();
    }
  }
  btn.addEventListener("click", function () { setOpen(!open); });
  panel.querySelector(".nx-x").addEventListener("click", function () { setOpen(false); });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && open) setOpen(false);
  });
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var v = input.value;
    input.value = "";
    send(v);
  });
  input.addEventListener("keydown", function (e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      var v = input.value;
      input.value = "";
      send(v);
    }
  });
})();
