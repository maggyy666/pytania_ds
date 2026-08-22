# Pytania na egzamin magisterski — Data Science

Prosta aplikacja do nauki metodą fiszek: pokazuje pytanie, na żądanie odsłania odpowiedź,
a Ty sam oceniasz, czy umiesz. Aplikacja zlicza punkty.

Backend: Python + Flask. Frontend: czysty HTML/CSS/JS, bez builda i bez `npm`.

## Wymagania

Python 3.9 lub nowszy. Nic więcej — resztę załatwia skrypt startowy.

## Jak uruchomić

**Windows** — kliknij dwukrotnie **`start.bat`**.

**macOS / Linux** — w terminalu w katalogu projektu:

```
bash start.sh
```

Przy pierwszym uruchomieniu skrypt zakłada środowisko wirtualne `.venv` i instaluje zależności
z `requirements.txt` — to trwa kilkanaście sekund. Kolejne uruchomienia są już natychmiastowe.

Serwer wstaje na <http://localhost:8000> i przeglądarka otwiera się sama. Zatrzymanie: `Ctrl+C`.

Inny port podajesz jako argument — `start.bat 8080` albo `bash start.sh 8080` — przydaje się,
gdy 8000 jest zajęty.

Serwer nasłuchuje wyłącznie na `127.0.0.1`, więc aplikacja nie jest widoczna dla innych
komputerów w sieci.

### Ręcznie, bez skryptu

```
python -m venv .venv
.venv\Scripts\activate        # Windows
source .venv/bin/activate     # macOS / Linux
pip install -r requirements.txt
python serwer.py
```

## Jak używać

Na górze są dwie zakładki:

- **Test** — tryb fiszek. Jedno pytanie naraz, sam się oceniasz, aplikacja liczy punkty.
- **Nauka** — cała lista 50 pytań z odpowiedziami pod spodem, do czytania jednym ciągiem.
  Każde pytanie ma kotwicę (`#p27`), więc da się linkować do konkretnego zagadnienia.

W trybie Test pod pytaniem są zawsze dostępne **✓ Dobrze** i **✗ Źle** — możesz ocenić się
i przejść dalej bez odsłaniania odpowiedzi. Przycisk **Pokaż odpowiedź** jest opcjonalny,
na te pytania, przy których chcesz sprawdzić treść.

| Klawisz | Działanie |
| --- | --- |
| `Spacja` / `Enter` | pokaż odpowiedź |
| `1` lub `D` | dobrze |
| `2` lub `Z` | źle |
| `R` | zacznij zestaw od nowa |

Skróty działają tylko w zakładce Test — w Nauce spacja normalnie przewija stronę.

Przełącznik **Losowa kolejność** po prawej stronie zakładek tasuje pytania (i zaczyna zestaw od nowa).
W tym trybie numery pytań są ukryte — żeby dało się uczyć treści, a nie kojarzyć „pytanie 27".
Numery wracają po wyłączeniu tasowania.

Postęp nie jest zapisywany — odświeżenie strony startuje od czystego licznika.

## Jak dopisywać odpowiedzi

Cała treść siedzi w jednym pliku: **`dane.js`**. Każde pytanie to jeden obiekt:

```js
{
  id: 5,
  pytanie: "Omówić algorytm k-najbliższych sąsiadów (KNN).",
  odpowiedz: ""      // <- tu wpisujesz odpowiedź
}
```

W odpowiedzi możesz używać HTML — przyda się do list:

```js
odpowiedz: "<ul><li>Algorytm leniwy</li><li>Wymaga normalizacji cech</li></ul>"
```

Przy dłuższych odpowiedziach wygodniej użyć backticków, bo tekst może się ciągnąć przez wiele linii:

```js
odpowiedz: `
  <p>Nieparametryczny algorytm klasyfikacji i regresji.</p>
  <ul>
    <li><b>Zasada działania</b> — głosowanie k najbliższych sąsiadów</li>
    <li><b>Metryki</b> — euklidesowa, Manhattan, cosinusowa</li>
  </ul>
`
```

Serwer wysyła pliki z nagłówkiem `Cache-Control: no-store`, więc po zapisaniu zmian wystarczy
odświeżyć stronę — przeglądarka nie podstawi starej wersji.

Puste odpowiedzi są w porządku — aplikacja pokaże wtedy notkę, że odpowiedź czeka na uzupełnienie,
a ocenianie działa normalnie. Plik zapisuj w kodowaniu **UTF-8**, żeby polskie znaki się nie rozsypały.

## Struktura

| Plik | Zawartość |
| --- | --- |
| `dane.js` | 50 pytań i odpowiedzi — jedyny plik, który edytujesz na co dzień |
| `index.html` | szkielet strony |
| `styl.css` | wygląd (automatyczny tryb jasny i ciemny wg ustawień systemu) |
| `app.js` | logika: odsłanianie, ocenianie, liczenie punktów |
| `serwer.py` | serwer Flask — oddaje pliki i wyłącza cache |
| `requirements.txt` | zależności Pythona |
| `start.bat` | venv + instalacja + uruchomienie — Windows |
| `start.sh` | venv + instalacja + uruchomienie — macOS / Linux |
