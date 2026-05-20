/* AEF_PUBLIC_SCENE_THEME_WOODFIRE_20260520 */
(function () {
  var LOGO_URL = "/static/uploads/avivando_el_fuego/radio-logo-woodfire-20260520.jpg";
  var RADIO_URL = "https://40.160.2.176.sslip.io/public/avivando_el_fuego";
  var APP_URL = "https://ministerioavivandoelfuego.com/radio";

  window.addEventListener("beforeinstallprompt", function (event) {
    event.preventDefault();
    window.__afInstallPrompt = event;
  });

  function ready(callback) {
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", callback);
    else callback();
  }

  function bars() {
    var html = "";
    for (var i = 0; i < 24; i += 1) {
      var h = 28 + ((i * 23) % 68);
      html += '<span class="bar" style="height:' + h + "%;animation-delay:" + i * 45 + 'ms"></span>';
    }
    return html;
  }

  function hero() {
    return '' +
      '<a id="af-hero-link" href="#public-radio-player" aria-label="Ir al reproductor de Avivando el Fuego Radio">' +
        '<section class="af-hero">' +
          '<div class="af-logo-stage">' +
            '<div class="af-logo-frame">' +
              '<img class="af-logo-img" src="' + LOGO_URL + '" alt="Avivando el Fuego Radio">' +
            '</div>' +
            '<div class="af-logo-caption">Identidad oficial de la emisora</div>' +
          '</div>' +
          '<div class="af-hero-copy">' +
            '<p class="af-kicker">Radio cristiana online 24/7</p>' +
            '<h1 class="af-title">Avivando <span>El Fuego Radio</span></h1>' +
            '<p class="af-copy">Una senal de adoracion, alabanza, palabra y fuego espiritual desde el servidor propio del ministerio.</p>' +
            '<div class="af-live-strip">' +
              '<div><strong>Ahora sonando</strong><span id="af-now-title">Avivando el Fuego Radio</span></div>' +
              '<div class="af-visual-lockup" aria-hidden="true">' +
                '<img class="af-visual-logo" src="' + LOGO_URL + '" alt="">' +
                '<div id="af-visualizer">' + bars() + '</div>' +
              '</div>' +
            '</div>' +
            '<div class="af-actions">' +
              '<a class="af-action af-action-primary" href="' + APP_URL + '" target="_blank" rel="noopener">Abrir app web</a>' +
              '<a class="af-action" href="https://ministerioavivandoelfuego.com" target="_blank" rel="noopener">Ministerio web</a>' +
              '<button class="af-action" type="button" id="af-share-btn">Compartir emisora</button>' +
            '</div>' +
          '</div>' +
        '</section>' +
      '</a>';
  }

  function installModal() {
    return '' +
      '<button id="af-install-btn" type="button">Instalar app</button>' +
      '<div id="af-install-modal" role="dialog" aria-modal="true" aria-label="Instalar la radio">' +
        '<div id="af-install-card">' +
          '<button id="af-install-close" type="button" aria-label="Cerrar">x</button>' +
          '<h3>Usar como aplicacion</h3>' +
          '<p class="intro">Primero toca play. Luego puedes instalarla o dejarla sonando en segundo plano.</p>' +
          '<div id="af-install-tabs">' +
            '<button class="af-tab" data-tab="ios" type="button">iPhone</button>' +
            '<button class="af-tab" data-tab="android" type="button">Android</button>' +
            '<button class="af-tab" data-tab="desktop" type="button">PC</button>' +
          '</div>' +
          '<div class="af-pane" data-pane="ios"><h4>iPhone / iPad</h4><ol><li>Abre este enlace en Safari.</li><li>Toca Compartir.</li><li>Elige Anadir a pantalla de inicio.</li><li>Confirma en Anadir.</li></ol></div>' +
          '<div class="af-pane" data-pane="android"><h4>Android</h4><ol><li>Abre este enlace en Chrome.</li><li>Toca el menu de tres puntos.</li><li>Elige Instalar app o Agregar a pantalla principal.</li><li>Confirma.</li></ol></div>' +
          '<div class="af-pane" data-pane="desktop"><h4>PC</h4><ol><li>Busca el icono de instalar en la barra del navegador.</li><li>Tambien puedes usar el menu del navegador.</li><li>Confirma la instalacion.</li></ol></div>' +
        '</div>' +
      '</div>';
  }

  function songModal() {
    return '' +
      '<div id="af-modal" role="dialog" aria-modal="true" aria-label="Informacion de la cancion">' +
        '<div id="af-modal-card">' +
          '<button id="af-modal-close" type="button" aria-label="Cerrar">x</button>' +
          '<img id="af-modal-art" src="' + LOGO_URL + '" alt="Arte de la emisora">' +
          '<h3 id="af-modal-title">Avivando el Fuego Radio</h3>' +
          '<p id="af-modal-artist">Ministerio Avivando el Fuego</p>' +
        '</div>' +
      '</div>';
  }

  function platform() {
    var u = navigator.userAgent;
    if (/iPhone|iPad|iPod/i.test(u)) return "ios";
    if (/Android/i.test(u)) return "android";
    return "desktop";
  }

  function selectInstallPane(tab) {
    document.querySelectorAll(".af-tab").forEach(function (el) { el.classList.toggle("active", el.dataset.tab === tab); });
    document.querySelectorAll(".af-pane").forEach(function (el) { el.classList.toggle("active", el.dataset.pane === tab); });
  }

  function getNowPlayingText() {
    var title = document.querySelector(".now-playing-title");
    var artist = document.querySelector(".now-playing-artist");
    var t = title ? title.textContent.trim() : "";
    var a = artist ? artist.textContent.trim() : "";
    return [a, t].filter(Boolean).join(" - ") || "Avivando el Fuego Radio";
  }

  async function updateNowPlaying() {
    try {
      var response = await fetch("/api/nowplaying/avivando_el_fuego", { cache: "no-store" });
      if (response.ok) {
        var data = await response.json();
        var song = data && data.now_playing && data.now_playing.song;
        var text = song && (song.text || [song.artist, song.title].filter(Boolean).join(" - "));
        if (text) {
          var now = document.getElementById("af-now-title");
          if (now) now.textContent = text;
          if ("mediaSession" in navigator) {
            navigator.mediaSession.metadata = new MediaMetadata({
              title: song.title || "Avivando el Fuego Radio",
              artist: song.artist || "Ministerio Avivando el Fuego",
              album: "Radio cristiana online 24/7",
              artwork: [{ src: LOGO_URL, sizes: "1024x1024", type: "image/jpeg" }]
            });
          }
        }
      }
    } catch (_) {
      var fallback = document.getElementById("af-now-title");
      if (fallback) fallback.textContent = getNowPlayingText();
    }
  }

  function configureAudio() {
    var audio = document.querySelector("audio");
    if (!audio || audio.dataset.afReady === "1") return;
    audio.dataset.afReady = "1";
    audio.setAttribute("playsinline", "");
    audio.preload = "none";
    if (!("mediaSession" in navigator)) return;
    var sync = function () { navigator.mediaSession.playbackState = audio.paused ? "paused" : "playing"; };
    audio.addEventListener("play", sync);
    audio.addEventListener("playing", sync);
    audio.addEventListener("pause", sync);
    sync();
  }

  function openInstall() {
    if (window.__afInstallPrompt) {
      window.__afInstallPrompt.prompt();
      window.__afInstallPrompt.userChoice.then(function () { window.__afInstallPrompt = null; });
    }
    var modal = document.getElementById("af-install-modal");
    if (modal) modal.classList.add("show");
  }

  function closeInstall() {
    var modal = document.getElementById("af-install-modal");
    if (modal) modal.classList.remove("show");
  }

  function openSong() {
    var title = document.getElementById("af-modal-title");
    var artist = document.getElementById("af-modal-artist");
    var art = document.getElementById("af-modal-art");
    var pageTitle = document.querySelector(".now-playing-title");
    var pageArtist = document.querySelector(".now-playing-artist");
    var pageArt = document.querySelector("img.album_art");
    if (title) title.textContent = pageTitle ? pageTitle.textContent.trim() : "Avivando el Fuego Radio";
    if (artist) artist.textContent = pageArtist ? pageArtist.textContent.trim() : "Ministerio Avivando el Fuego";
    if (art && pageArt && pageArt.src) art.src = pageArt.src;
    var modal = document.getElementById("af-modal");
    if (modal) modal.classList.add("show");
  }

  function closeSong() {
    var modal = document.getElementById("af-modal");
    if (modal) modal.classList.remove("show");
  }

  function shareRadio() {
    if (navigator.share) {
      navigator.share({ title: "Avivando el Fuego Radio", text: "Escucha la radio cristiana online 24/7.", url: RADIO_URL }).catch(function () {});
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(RADIO_URL).then(function () { alert("Enlace de la radio copiado."); });
    }
  }

  ready(function () {
    if (!document.getElementById("af-hero-link")) {
      var target = document.querySelector("main") || document.querySelector(".public-page") || document.body;
      target.insertAdjacentHTML("afterbegin", hero());
      document.body.insertAdjacentHTML("beforeend", songModal() + installModal());
    }

    selectInstallPane(platform());
    updateNowPlaying();
    window.setInterval(updateNowPlaying, 15000);
    configureAudio();
    new MutationObserver(configureAudio).observe(document.documentElement, { childList: true, subtree: true });

    document.addEventListener("click", function (event) {
      if (event.target.closest("#af-share-btn")) {
        event.preventDefault();
        event.stopPropagation();
        shareRadio();
      }
      if (event.target.closest("#af-install-btn")) {
        event.preventDefault();
        openInstall();
      }
      if (event.target.closest("#af-install-close") || event.target === document.getElementById("af-install-modal")) closeInstall();
      if (event.target.closest("#af-modal-close") || event.target === document.getElementById("af-modal")) closeSong();
      if (event.target.closest("a.album-art")) {
        event.preventDefault();
        openSong();
      }
      var tab = event.target.closest(".af-tab");
      if (tab) selectInstallPane(tab.dataset.tab);
    }, true);

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        closeInstall();
        closeSong();
      }
    });
  });
})();
