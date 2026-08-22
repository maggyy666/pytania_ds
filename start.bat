@echo off
REM ===========================================================================
REM  Uruchamia aplikacje na localhost (Windows).
REM
REM  Za pierwszym razem zaklada srodowisko wirtualne .venv i instaluje
REM  zaleznosci z requirements.txt. Kolejne uruchomienia sa juz natychmiastowe.
REM
REM  Kliknij dwukrotnie albo:  start.bat [port]     np.  start.bat 8080
REM ===========================================================================
setlocal
cd /d "%~dp0"

set "PORT=%~1"
if "%PORT%"=="" set "PORT=8000"

set "VENV_PY=.venv\Scripts\python.exe"

REM --- szukamy Pythona -------------------------------------------------------

where py >nul 2>nul
if %errorlevel%==0 (
    set "PY=py -3"
    goto :srodowisko
)

where python >nul 2>nul
if %errorlevel%==0 (
    set "PY=python"
    goto :srodowisko
)

echo.
echo   Nie znaleziono Pythona.
echo   Zainstaluj go z https://www.python.org/downloads/
echo   (zaznacz "Add Python to PATH" podczas instalacji).
echo.
pause
exit /b 1

REM --- srodowisko wirtualne --------------------------------------------------

:srodowisko
if not exist "%VENV_PY%" (
    echo.
    echo   Tworze srodowisko wirtualne .venv ...
    %PY% -m venv .venv
    if errorlevel 1 goto :blad_venv
)

REM Sprawdzamy, czy Flask faktycznie siedzi w srodowisku - venv moze istniec,
REM ale byc niedokonczone, jesli poprzednia instalacja zostala przerwana.
"%VENV_PY%" -c "import flask" >nul 2>nul
if errorlevel 1 (
    echo   Instaluje zaleznosci z requirements.txt ...
    "%VENV_PY%" -m pip install --upgrade pip --quiet
    "%VENV_PY%" -m pip install -r requirements.txt --quiet
    if errorlevel 1 goto :blad_pip
    echo   Gotowe.
)

echo.
"%VENV_PY%" serwer.py %PORT%
exit /b %errorlevel%

REM --- obsluga bledow --------------------------------------------------------

:blad_venv
echo.
echo   Nie udalo sie utworzyc srodowiska wirtualnego.
echo   Sprobuj recznie:  python -m venv .venv
echo.
pause
exit /b 1

:blad_pip
echo.
echo   Nie udalo sie zainstalowac zaleznosci.
echo   Sprobuj recznie:  .venv\Scripts\python.exe -m pip install -r requirements.txt
echo.
pause
exit /b 1
