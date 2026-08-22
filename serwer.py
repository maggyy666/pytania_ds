"""
Serwer aplikacji do nauki - Flask.

Uruchomienie (po aktywacji venv):

    python serwer.py            # port 8000
    python serwer.py 8080       # inny port

Zwykle nie trzeba tego wolac recznie - start.bat (Windows) albo start.sh
(macOS/Linux) same zakladaja venv, instaluja zaleznosci i odpalaja serwer.
"""

import argparse
import os
import socket
import sys
import threading
import webbrowser

from flask import Flask, abort, send_from_directory

KATALOG = os.path.dirname(os.path.abspath(__file__))

# Serwujemy wylacznie pliki, z ktorych sklada sie strona. Bez tego pod
# localhost wisialaby cala zawartosc katalogu projektu - lacznie z .venv,
# .git czy kodem serwera.
DOZWOLONE_ROZSZERZENIA = {
    ".html", ".css", ".js", ".json", ".map",
    ".svg", ".png", ".jpg", ".jpeg", ".gif", ".webp", ".ico",
    ".woff", ".woff2", ".ttf",
}

app = Flask(__name__, static_folder=None)


def _bez_cache(odpowiedz):
    """Wylacza cache przegladarki.

    Dzieki temu po dopisaniu odpowiedzi w dane.js wystarczy odswiezyc strone -
    przegladarka nie podstawi starej wersji pliku.
    """
    odpowiedz.headers["Cache-Control"] = "no-store"
    return odpowiedz


@app.route("/")
def strona_glowna():
    return _bez_cache(send_from_directory(KATALOG, "index.html"))


@app.route("/<path:nazwa_pliku>")
def plik_statyczny(nazwa_pliku):
    czesci = nazwa_pliku.replace("\\", "/").split("/")

    # Katalogi zaczynajace sie od kropki (.venv, .git) sa poza zasiegiem.
    if any(czesc.startswith(".") for czesc in czesci):
        abort(404)

    if os.path.splitext(nazwa_pliku)[1].lower() not in DOZWOLONE_ROZSZERZENIA:
        abort(404)

    # send_from_directory sam pilnuje, zeby nie dalo sie wyjsc poza KATALOG
    # (np. przez ../../), wiec nie trzeba tego sprawdzac osobno.
    return _bez_cache(send_from_directory(KATALOG, nazwa_pliku))


@app.errorhandler(404)
def nie_znaleziono(_blad):
    return "404 - nie ma takiego pliku", 404


def port_zajety(port: int) -> bool:
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        s.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
        try:
            s.bind(("127.0.0.1", port))
        except OSError:
            return True
    return False


def main():
    parser = argparse.ArgumentParser(description="Serwer fiszek egzaminacyjnych.")
    parser.add_argument("port", nargs="?", type=int, default=8000,
                        help="port, na ktorym ma dzialac serwer (domyslnie 8000)")
    parser.add_argument("--bez-przegladarki", action="store_true",
                        help="nie otwieraj przegladarki po starcie")
    argumenty = parser.parse_args()

    port = argumenty.port

    if port_zajety(port):
        print(f"\n  Port {port} jest juz zajety.")
        print(f"  Uruchom na innym porcie, np.:  python serwer.py {port + 1}\n")
        sys.exit(1)

    adres = f"http://localhost:{port}"

    print("\n  Pytania na egzamin - serwer dziala")
    print(f"  ->  {adres}")
    print("\n  Zatrzymanie: Ctrl+C\n")

    if not argumenty.bez_przegladarki:
        threading.Timer(1.0, lambda: webbrowser.open(adres)).start()

    # host=127.0.0.1 - aplikacja nie jest widoczna dla innych komputerow w sieci.
    app.run(host="127.0.0.1", port=port, debug=False)


if __name__ == "__main__":
    main()
