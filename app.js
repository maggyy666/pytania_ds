/* ==========================================================================
   Logika fiszek: pokaz odpowiedz -> oceniam sie sam -> licz punkty.
   Dane pochodza z dane.js (globalna tablica PYTANIA).
   ========================================================================== */

(function () {
  "use strict";

  // --- elementy strony -----------------------------------------------------

  const el = {
    numer:        document.getElementById("numer"),
    pytanie:      document.getElementById("pytanie"),
    odpowiedzBox: document.getElementById("odpowiedz-box"),
    odpowiedz:    document.getElementById("odpowiedz"),
    btnPokaz:     document.getElementById("btn-pokaz"),
    btnDobrze:    document.getElementById("btn-dobrze"),
    btnZle:       document.getElementById("btn-zle"),
    karta:        document.getElementById("karta"),
    podsumowanie: document.getElementById("podsumowanie"),
    wynik:        document.getElementById("wynik"),
    procent:      document.getElementById("procent"),
    rozbicie:     document.getElementById("rozbicie"),
    btnReset:     document.getElementById("btn-reset"),
    statDobrze:   document.getElementById("stat-dobrze"),
    statZle:      document.getElementById("stat-zle"),
    statPostep:   document.getElementById("stat-postep"),
    pasek:        document.getElementById("pasek"),
    losowo:       document.getElementById("losowo"),
    opcjaLosowo:  document.getElementById("opcja-losowo"),
    zakladkaTest: document.getElementById("zakladka-test"),
    zakladkaNauka:document.getElementById("zakladka-nauka"),
    widokTest:    document.getElementById("widok-test"),
    widokNauka:   document.getElementById("widok-nauka"),
    lista:        document.getElementById("lista"),
    btnRozwin:    document.getElementById("btn-rozwin"),
    naukaLicznik: document.getElementById("nauka-licznik")
  };

  // --- stan ----------------------------------------------------------------

  const stan = {
    kolejnosc: [],   // indeksy do tablicy PYTANIA, w kolejnosci wyswietlania
    pozycja: 0,      // ktore z kolei pytanie pokazujemy
    dobrze: 0,
    zle: 0,
    odslonieta: false,
    widok: "test"
  };

  // PYTANIA jest zadeklarowane przez `const` w dane.js, wiec nie trafia
  // do obiektu window - stad sprawdzenie przez typeof, a nie window.PYTANIA.
  const SA_DANE = typeof PYTANIA !== "undefined" && Array.isArray(PYTANIA) && PYTANIA.length > 0;

  // --- pomocnicze ----------------------------------------------------------

  function potasuj(tablica) {
    // Fisher-Yates
    for (let i = tablica.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [tablica[i], tablica[j]] = [tablica[j], tablica[i]];
    }
    return tablica;
  }

  function sesjaWToku() {
    return stan.pozycja > 0 || stan.odslonieta;
  }

  function notkaOBraku(p, ukryjNumer) {
    const gdzie = ukryjNumer ? "przy tym pytaniu" : "przy pytaniu nr " + p.id;
    return '<p class="brak-odpowiedzi">Odpowiedź nie została jeszcze uzupełniona — ' +
           'dopisz ją w pliku <code>dane.js</code>, w polu <code>odpowiedz</code> ' +
           gdzie + '.</p>';
  }

  // --- zakladki ------------------------------------------------------------

  function przelaczWidok(nazwa) {
    const test = nazwa === "test";

    el.widokTest.hidden = !test;
    el.widokNauka.hidden = test;

    el.zakladkaTest.classList.toggle("zakladka-aktywna", test);
    el.zakladkaNauka.classList.toggle("zakladka-aktywna", !test);
    el.zakladkaTest.setAttribute("aria-selected", String(test));
    el.zakladkaNauka.setAttribute("aria-selected", String(!test));

    // Tasowanie dotyczy tylko testu - w Nauce lista jest zawsze po kolei.
    el.opcjaLosowo.hidden = !test;

    stan.widok = nazwa;
  }

  function zbudujListe() {
    let gotowe = 0;

    const czesci = PYTANIA.map(function (p) {
      const tresc = (p.odpowiedz || "").trim();
      if (tresc) gotowe++;

      // W Nauce numery sa zawsze widoczne, wiec notka moze sie do nich odwolac.
      const odpowiedz = tresc || notkaOBraku(p, false);

      // Numer z wiodacym zerem (01, 02, ... 50) - lepiej wyglada w kolumnie.
      const numer = String(p.id).padStart(2, "0");

      // Nieopracowane zagadnienia dostaja plakietke w naglowku.
      const brak = tresc ? "" : '<span class="wpis-brak">do uzupełnienia</span>';

      // Caly wpis to <details> - klikniecie w numer albo pytanie rozwija
      // odpowiedz, wiec nie trzeba celowac w osobny przelacznik.
      return '<details class="wpis" id="p' + p.id + '">' +
               '<summary class="wpis-naglowek">' +
                 '<span class="wpis-numer">' + numer + '</span>' +
                 '<h2 class="wpis-pytanie"></h2>' +
                 brak +
               '</summary>' +
               '<div class="wpis-odpowiedz odpowiedz">' + odpowiedz + '</div>' +
             '</details>';
    });

    el.naukaLicznik.textContent = "Opracowane: " + gotowe + " z " + PYTANIA.length;

    el.lista.innerHTML = czesci.join("");

    // Tresc pytania wstawiamy jako tekst, zeby ewentualne znaki < i >
    // w tresci nie zostaly potraktowane jak HTML.
    const naglowki = el.lista.querySelectorAll(".wpis-pytanie");
    PYTANIA.forEach(function (p, i) {
      naglowki[i].textContent = p.pytanie;
    });
  }

  // --- sterowanie ----------------------------------------------------------

  function start() {
    stan.kolejnosc = PYTANIA.map(function (_, i) { return i; });
    if (el.losowo.checked) potasuj(stan.kolejnosc);

    stan.pozycja = 0;
    stan.dobrze = 0;
    stan.zle = 0;
    stan.odslonieta = false;

    el.podsumowanie.hidden = true;
    el.karta.hidden = false;

    pokazPytanie();
    odswiezStatystyki();
  }

  function pokazPytanie() {
    const p = PYTANIA[stan.kolejnosc[stan.pozycja]];

    // W trybie losowym numer pytania jest ukryty - inaczej latwo zaczac
    // kojarzyc "pytanie 27" zamiast uczyc sie tresci.
    if (el.losowo.checked) {
      el.numer.hidden = true;
      el.numer.textContent = "";
    } else {
      el.numer.hidden = false;
      el.numer.textContent = "Pytanie " + p.id;
    }

    el.pytanie.textContent = p.pytanie;

    stan.odslonieta = false;
    el.odpowiedzBox.hidden = true;
    el.odpowiedz.innerHTML = "";
    el.btnPokaz.hidden = false;
  }

  function odsloniecie() {
    if (stan.odslonieta || el.karta.hidden) return;

    const p = PYTANIA[stan.kolejnosc[stan.pozycja]];
    const tresc = (p.odpowiedz || "").trim();

    // Tresc jest wlasna, lokalna (dane.js) - HTML jest tu celowo dozwolony.
    el.odpowiedz.innerHTML = tresc || notkaOBraku(p, el.losowo.checked);

    stan.odslonieta = true;
    el.odpowiedzBox.hidden = false;
    el.btnPokaz.hidden = true;
  }

  function ocen(bylodobrze) {
    // Ocenic mozna w kazdej chwili - odslanianie odpowiedzi jest opcjonalne,
    // wiec nie blokujemy tu niczego poza ekranem podsumowania.
    if (el.karta.hidden) return;

    if (bylodobrze) stan.dobrze++;
    else stan.zle++;

    stan.pozycja++;

    if (stan.pozycja >= stan.kolejnosc.length) {
      pokazPodsumowanie();
    } else {
      pokazPytanie();
    }

    odswiezStatystyki();
  }

  function pokazPodsumowanie() {
    const razem = stan.dobrze + stan.zle;
    const proc = razem ? Math.round((stan.dobrze / razem) * 100) : 0;

    el.wynik.textContent = stan.dobrze + " / " + razem;
    el.procent.textContent = proc + "% poprawnych";
    el.rozbicie.innerHTML =
      "Dobrze <b>" + stan.dobrze + "</b>, do powtórki <b>" + stan.zle + "</b>.";

    el.karta.hidden = true;
    el.podsumowanie.hidden = false;
  }

  function odswiezStatystyki() {
    const razem = stan.kolejnosc.length;
    const biezace = Math.min(stan.pozycja + 1, razem);

    el.statDobrze.textContent = stan.dobrze;
    el.statZle.textContent = stan.zle;
    el.statPostep.textContent = biezace + " / " + razem;
    el.pasek.style.width = razem ? (stan.pozycja / razem) * 100 + "%" : "0%";
  }

  // --- zdarzenia -----------------------------------------------------------

  el.btnPokaz.addEventListener("click", odsloniecie);
  el.btnDobrze.addEventListener("click", function () { ocen(true); });
  el.btnZle.addEventListener("click", function () { ocen(false); });
  el.btnReset.addEventListener("click", start);

  el.zakladkaTest.addEventListener("click", function () { przelaczWidok("test"); });
  el.zakladkaNauka.addEventListener("click", function () { przelaczWidok("nauka"); });

  let wszystkoRozwiniete = false;
  el.btnRozwin.addEventListener("click", function () {
    wszystkoRozwiniete = !wszystkoRozwiniete;
    el.lista.querySelectorAll(".wpis").forEach(function (d) {
      d.open = wszystkoRozwiniete;
    });
    el.btnRozwin.textContent = wszystkoRozwiniete ? "Zwiń wszystkie" : "Rozwiń wszystkie";
  });

  el.losowo.addEventListener("change", function () {
    if (sesjaWToku() && !confirm("Zmiana kolejności zaczyna zestaw od nowa. Kontynuować?")) {
      el.losowo.checked = !el.losowo.checked;
      return;
    }
    start();
  });

  document.addEventListener("keydown", function (e) {
    if (e.ctrlKey || e.altKey || e.metaKey) return;

    // Skroty dzialaja tylko w tescie - w Nauce przeszkadzalyby przy czytaniu
    // (spacja musi przewijac strone).
    if (stan.widok !== "test") return;

    const naPrzycisku = document.activeElement &&
                        document.activeElement.tagName === "BUTTON";

    // Spacja: zawsze przejmujemy (blokuje przewijanie strony i podwojne klikniecie).
    if (e.code === "Space") {
      e.preventDefault();
      if (!el.podsumowanie.hidden) start();
      else if (!stan.odslonieta) odsloniecie();
      return;
    }

    // Enter na zafokusowanym przycisku obsluzy sama przegladarka.
    if (e.key === "Enter") {
      if (naPrzycisku) return;
      e.preventDefault();
      if (!el.podsumowanie.hidden) start();
      else if (!stan.odslonieta) odsloniecie();
      return;
    }

    const k = e.key.toLowerCase();

    if (k === "1" || k === "d") { ocen(true);  return; }
    if (k === "2" || k === "z") { ocen(false); return; }
    if (k === "r") {
      const trzebaPotwierdzic = el.podsumowanie.hidden && sesjaWToku();
      if (trzebaPotwierdzic && !confirm("Zacząć zestaw od nowa?")) return;
      start();
    }
  });

  // --- wejscie -------------------------------------------------------------

  if (SA_DANE) {
    zbudujListe();
    przelaczWidok("test");
    start();
  } else {
    el.numer.textContent = "Błąd";
    el.pytanie.textContent = "Nie udało się wczytać pytań z pliku dane.js.";
    el.btnPokaz.hidden = true;
  }
})();
