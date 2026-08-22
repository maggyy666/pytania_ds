#!/usr/bin/env bash
# ============================================================================
#  Uruchamia aplikacje na localhost (macOS / Linux).
#
#  Za pierwszym razem zaklada srodowisko wirtualne .venv i instaluje
#  zaleznosci z requirements.txt. Kolejne uruchomienia sa juz natychmiastowe.
#
#  Uzycie:  ./start.sh [port]      albo:  bash start.sh [port]
# ============================================================================
set -euo pipefail
cd "$(dirname "$0")"

PORT="${1:-8000}"
VENV_PY=".venv/bin/python"

# --- szukamy Pythona 3 ------------------------------------------------------

if command -v python3 >/dev/null 2>&1; then
    PY=python3
elif command -v python >/dev/null 2>&1 \
     && python -c 'import sys; sys.exit(0 if sys.version_info[0] >= 3 else 1)' 2>/dev/null; then
    PY=python
else
    echo
    echo "  Nie znaleziono Pythona 3."
    echo "  macOS:  brew install python   (albo https://www.python.org/downloads/)"
    echo "  Linux:  sudo apt install python3 python3-venv"
    echo
    exit 1
fi

# --- srodowisko wirtualne ---------------------------------------------------

if [ ! -x "$VENV_PY" ]; then
    echo
    echo "  Tworze srodowisko wirtualne .venv ..."
    "$PY" -m venv .venv
fi

# Venv moze istniec, ale byc niedokonczone, jesli poprzednia instalacja
# zostala przerwana - dlatego sprawdzamy sam import, a nie obecnosc katalogu.
if ! "$VENV_PY" -c "import flask" >/dev/null 2>&1; then
    echo "  Instaluje zaleznosci z requirements.txt ..."
    "$VENV_PY" -m pip install --upgrade pip --quiet
    "$VENV_PY" -m pip install -r requirements.txt --quiet
    echo "  Gotowe."
fi

echo
exec "$VENV_PY" serwer.py "$PORT"
