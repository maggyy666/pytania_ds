/*
 * ==========================================================================
 *  PYTANIA I ODPOWIEDZI - egzamin magisterski (Informatyka / Data Science)
 * ==========================================================================
 *
 *  Jak uzupelniac odpowiedzi:
 *
 *  1. Znajdz pytanie po numerze (pole `id`) i wpisz tresc w pole `odpowiedz`.
 *
 *  2. W odpowiedzi mozna uzywac HTML - przyda sie do list i wyroznien:
 *
 *       odpowiedz: "<ul><li>Pierwszy punkt</li><li>Drugi punkt</li></ul>"
 *
 *     Przydatne tagi: <ul> <ol> <li> <b> <i> <code> <p> <br>
 *
 *  3. Przy dluzszych odpowiedziach wygodniej uzyc backtickow - wtedy tekst
 *     moze sie ciagnac przez wiele linii:
 *
 *       odpowiedz: `
 *         <p>Krotkie wprowadzenie.</p>
 *         <ul>
 *           <li><b>Etap 1</b> - opis</li>
 *           <li><b>Etap 2</b> - opis</li>
 *         </ul>
 *       `
 *
 *  4. Puste odpowiedzi ("") sa OK - aplikacja pokaze wtedy notatke, ze
 *     odpowiedz nie zostala jeszcze uzupelniona, a ocenianie dziala normalnie.
 *
 *  Plik zapisuj w kodowaniu UTF-8, zeby polskie znaki sie nie rozsypaly.
 */

const PYTANIA = [
  {
    id: 1,
    pytanie: "Omówić jakie wyróżnia się etapy w przetwarzaniu i analizie danych w uczeniu maszynowym i krótko je scharakteryzować.",
    odpowiedz: `
      <p>Proces jest <b>iteracyjny</b> — jeśli wyniki są słabe, wracamy do wcześniejszych etapów.
      Typowe etapy:</p>
      <ol>
        <li><b>Zrozumienie problemu</b> — ustalamy, co chcemy przewidzieć, jaki to typ zadania
        (klasyfikacja, regresja, grupowanie) i jaką metryką zmierzymy sukces.</li>
        <li><b>Pozyskanie danych</b> — zebranie danych z baz, plików, API. Ważna jest
        reprezentatywność próby.</li>
        <li><b>Eksploracja danych (EDA)</b> — statystyki, wykresy, korelacje. Poznajemy dane:
        braki, wartości odstające, niezbalansowane klasy.</li>
        <li><b>Wstępne przetwarzanie</b> — czyszczenie: uzupełnienie braków, usunięcie duplikatów,
        kodowanie zmiennych kategorycznych, skalowanie cech.</li>
        <li><b>Inżynieria i selekcja cech</b> — tworzenie nowych, użytecznych zmiennych i odrzucenie
        zbędnych; ewentualnie redukcja wymiarowości (np. PCA).</li>
        <li><b>Podział zbioru</b> — na część treningową, walidacyjną i testową. Zbioru testowego
        nie dotykamy aż do końcowej oceny.</li>
        <li><b>Trening modelu</b> — wybór algorytmu i dopasowanie go do danych treningowych;
        zwykle porównujemy kilka modeli.</li>
        <li><b>Strojenie hiperparametrów</b> — szukanie najlepszych ustawień algorytmu
        (np. grid search) na zbiorze walidacyjnym.</li>
        <li><b>Ocena modelu</b> — pomiar jakości na zbiorze testowym; sprawdzamy, czy model
        nie jest przeuczony.</li>
        <li><b>Wdrożenie i monitorowanie</b> — udostępnienie modelu (np. jako API) i obserwacja
        jego jakości w czasie, bo dane się zmieniają i model trzeba douczać.</li>
      </ol>
      <p><b>Warto pamiętać:</b> praca nad danymi (etapy 2–5) zajmuje zwykle większość czasu
      projektu — sam trening jest najkrótszy.</p>
    `
  },
  {
    id: 2,
    pytanie: "Omówić po co się stosuje walidację krzyżową w uczeniu maszynowym oraz jakie metody walidacji wyróżniamy.",
    odpowiedz: `
      <p><b>Walidacja krzyżowa</b> polega na wielokrotnym dzieleniu danych na część uczącą
      i testującą oraz uśrednieniu wyników z tych podziałów.</p>

      <p><b>Po co się ją stosuje:</b></p>
      <ul>
        <li>żeby ocenić, jak model radzi sobie na <b>danych, których nie widział</b>
        (zdolność do generalizacji),</li>
        <li>żeby <b>wykryć przeuczenie</b> — duża różnica między wynikiem treningowym
        a walidacyjnym to sygnał ostrzegawczy,</li>
        <li>żeby ocena była <b>stabilna</b> — nie zależy od jednego, przypadkowego podziału,</li>
        <li>żeby <b>lepiej wykorzystać małe zbiory</b> — każda obserwacja bywa i treningowa,
        i testowa,</li>
        <li>żeby uczciwie <b>porównywać modele i stroić hiperparametry</b>.</li>
      </ul>

      <p><b>Najważniejsze metody:</b></p>
      <ul>
        <li><b>Hold-out</b> — jeden prosty podział, np. 70/30. Szybki, ale mało stabilny
        (to jeszcze nie jest walidacja krzyżowa).</li>
        <li><b>k-krotna (k-fold)</b> — dane dzielimy na <i>k</i> części (zwykle 5 lub 10);
        model trenujemy <i>k</i> razy, za każdym razem inna część jest testowa, a wyniki uśredniamy.</li>
        <li><b>Stratyfikowana k-krotna</b> — jak wyżej, ale każda część zachowuje proporcje klas.
        Standard przy klasyfikacji.</li>
        <li><b>Leave-one-out (LOOCV)</b> — testujemy na pojedynczych obserwacjach
        (<i>k</i> = liczba próbek). Dokładne, ale bardzo kosztowne obliczeniowo.</li>
        <li><b>Grupowa</b> — powiązane obserwacje (np. pomiary tego samego pacjenta) trafiają
        w całości do jednej części, żeby nie było wycieku danych.</li>
        <li><b>Dla szeregów czasowych</b> — nie wolno tasować danych; trenujemy na przeszłości,
        testujemy na przyszłości (podział kroczący).</li>
      </ul>

      <p><b>Częsty błąd:</b> skalowanie czy selekcja cech wykonana na całych danych <i>przed</i>
      podziałem — to wyciek informacji z części testowej i zawyżenie wyniku. Te kroki trzeba
      robić osobno w każdej iteracji, tylko na części treningowej.</p>
    `
  },
  {
    id: 3,
    pytanie: "Opisać kryteria oceny wyników w uczeniu maszynowym. Proszę omówić metody oceniania skuteczności predykcji klasyfikatorów.",
    odpowiedz: `
      <p>Podstawą oceny klasyfikatora jest <b>macierz pomyłek</b> (confusion matrix), która zlicza:
      TP (prawdziwie pozytywne), TN (prawdziwie negatywne), FP (fałszywe alarmy) i FN (przeoczenia).</p>
      <p>Z niej wyprowadza się główne metryki:</p>
      <ul>
        <li><b>Accuracy (dokładność)</b> = (TP+TN)/wszystkie — odsetek poprawnych predykcji.
        Myląca przy niezbalansowanych klasach.</li>
        <li><b>Precision (precyzja)</b> = TP/(TP+FP) — jaki procent przewidzianych "pozytywnych"
        rzeczywiście jest pozytywny.</li>
        <li><b>Recall (czułość)</b> = TP/(TP+FN) — jaki procent rzeczywistych pozytywnych
        model wykrył.</li>
        <li><b>F1-score</b> — średnia harmoniczna precyzji i czułości; dobra, gdy zależy nam
        na obu naraz.</li>
        <li><b>Specyficzność</b> = TN/(TN+FP) — jak dobrze rozpoznawane są przypadki negatywne.</li>
        <li><b>Krzywa ROC i AUC</b> — wykres czułości względem odsetka fałszywych alarmów przy
        różnych progach decyzyjnych; pole pod krzywą (AUC) blisko 1 oznacza dobry model,
        0.5 — model losowy.</li>
      </ul>
      <p>Wybór metryki zależy od problemu: w diagnostyce medycznej ważniejszy jest recall
      (nie przeoczyć chorego), w filtrze spamu — precision (nie blokować dobrych maili).</p>
      <p>Dla <b>regresji</b> stosuje się inne kryteria: MSE/RMSE (błąd średniokwadratowy),
      MAE (średni błąd bezwzględny) i R² (jaka część zmienności jest wyjaśniona przez model).
      Ocenę zawsze robi się na danych testowych, najlepiej z walidacją krzyżową.</p>
    `
  },
  {
    id: 4,
    pytanie: "Opisać metody stosowane do wstępnego przetwarzania danych? Dlaczego ten etap jest ważny w uczeniu maszynowym?",
    odpowiedz: `
      <p>Wstępne przetwarzanie (preprocessing) to przygotowanie surowych danych do treningu.
      Główne metody:</p>
      <ul>
        <li><b>Obsługa braków danych</b> — usunięcie wierszy/kolumn albo imputacja
        (średnią, medianą, modą, przewidywaniem z innych cech).</li>
        <li><b>Usuwanie duplikatów i błędów</b> — ujednolicenie formatów, jednostek, typów.</li>
        <li><b>Obsługa wartości odstających</b> — wykrycie (np. reguła 1.5·IQR, z-score)
        i decyzja: usunąć, przyciąć czy zostawić.</li>
        <li><b>Kodowanie zmiennych kategorycznych</b> — one-hot encoding, label encoding,
        bo większość algorytmów wymaga liczb.</li>
        <li><b>Skalowanie i normalizacja</b> — sprowadzenie cech do wspólnej skali
        (standaryzacja, min-max), ważne dla KNN, SVM, sieci neuronowych.</li>
        <li><b>Balansowanie klas</b> — oversampling (np. SMOTE), undersampling lub wagi klas,
        gdy jedna klasa dominuje.</li>
        <li><b>Selekcja i ekstrakcja cech</b> — odrzucenie zbędnych zmiennych,
        redukcja wymiarowości (PCA).</li>
      </ul>
      <p><b>Dlaczego to ważne:</b> obowiązuje zasada <i>"garbage in, garbage out"</i> — nawet
      najlepszy algorytm nie da dobrych wyników na złych danych. Brudne dane prowadzą do
      błędnych wniosków, a nieskalowane cechy potrafią zdominować model. W praktyce ten etap
      zajmuje większość czasu w projekcie ML i często poprawia wynik bardziej niż zmiana algorytmu.</p>
    `
  },
  {
    id: 5,
    pytanie: "Omówić algorytm k-najbliższych sąsiadów (KNN).",
    odpowiedz: `
      <p><b>KNN</b> to prosty algorytm klasyfikacji (i regresji) oparty na podobieństwie:
      nowa obserwacja dostaje taką klasę, jaką ma większość spośród jej <i>k</i> najbliższych
      sąsiadów w zbiorze treningowym (w regresji — średnią ich wartości).</p>
      <p><b>Działanie:</b></p>
      <ol>
        <li>Oblicz odległość nowego punktu do wszystkich punktów treningowych
        (najczęściej euklidesową, może być też Manhattan czy Minkowskiego).</li>
        <li>Wybierz <i>k</i> najbliższych punktów.</li>
        <li>Przypisz klasę przez głosowanie większościowe (lub uśrednij wartości).</li>
      </ol>
      <p><b>Cechy charakterystyczne:</b></p>
      <ul>
        <li>Jest to algorytm <b>leniwy</b> (lazy learning) — nie ma fazy treningu, cała praca
        odbywa się przy predykcji, dlatego predykcja bywa wolna dla dużych zbiorów.</li>
        <li><b>Wymaga skalowania cech</b> — inaczej cecha o dużym zakresie zdominuje odległości.</li>
        <li>Dobór <i>k</i>: małe <i>k</i> → wrażliwość na szum (przeuczenie), duże <i>k</i> →
        zbytnie wygładzenie (niedouczenie). Zwykle dobiera się je walidacją krzyżową;
        dla klasyfikacji binarnej wybiera się nieparzyste, by uniknąć remisów.</li>
        <li>Słabo działa przy wielu wymiarach (tzw. przekleństwo wymiarowości).</li>
      </ul>
      <p><b>Zalety:</b> prosty, intuicyjny, bez założeń o rozkładzie danych.
      <b>Wady:</b> kosztowna predykcja, wrażliwość na szum, skalę i nieistotne cechy.</p>
    `
  },
  {
    id: 6,
    pytanie: "Opisać metodę maszyny wektorów nośnych (SVM).",
    odpowiedz: `
      <p><b>SVM</b> to klasyfikator, który szuka <b>hiperpłaszczyzny rozdzielającej klasy
      z maksymalnym marginesem</b> — czyli tak, żeby odstęp między granicą decyzyjną
      a najbliższymi punktami obu klas był jak największy. Te najbliższe punkty to
      <b>wektory nośne</b> (support vectors) — tylko one wyznaczają granicę.</p>
      <ul>
        <li><b>Maksymalny margines</b> — im szerszy margines, tym lepsza odporność na nowe dane
        (lepsza generalizacja).</li>
        <li><b>Miękki margines (parametr C)</b> — w praktyce dopuszcza się pewne błędy
        klasyfikacji. Duże C = mało błędów, ryzyko przeuczenia; małe C = szerszy margines,
        większa tolerancja błędów.</li>
        <li><b>Kernel trick (sztuczka jądrowa)</b> — gdy dane nie są liniowo separowalne,
        funkcja jądra niejawnie przenosi je do przestrzeni o wyższym wymiarze, gdzie stają się
        separowalne. Popularne jądra: liniowe, wielomianowe, RBF (gaussowskie), sigmoidalne.</li>
      </ul>
      <p><b>Zalety:</b> skuteczny w przestrzeniach o wielu wymiarach, odporny na przeuczenie
      przy dobrym doborze parametrów, elastyczny dzięki jądrom.
      <b>Wady:</b> wolny dla bardzo dużych zbiorów, wymaga skalowania cech i strojenia
      parametrów (C, gamma), nie daje wprost prawdopodobieństw.</p>
      <p>Istnieje też wersja do regresji (SVR). Klasyfikację wieloklasową realizuje się
      strategiami one-vs-one lub one-vs-all.</p>
    `
  },
  {
    id: 7,
    pytanie: "Opisać etap normalizacji, po co się go stosuje w uczeniu maszynowym?",
    odpowiedz: `
      <p><b>Normalizacja</b> (szerzej: skalowanie cech) to sprowadzenie zmiennych do wspólnej,
      porównywalnej skali. Najczęstsze techniki:</p>
      <ul>
        <li><b>Min-max</b> — przeskalowanie do przedziału [0, 1]:
        <code>x' = (x − min) / (max − min)</code>.</li>
        <li><b>Standaryzacja (z-score)</b> — odjęcie średniej i podzielenie przez odchylenie
        standardowe: <code>x' = (x − μ) / σ</code>; wynik ma średnią 0 i odchylenie 1.</li>
        <li><b>Skalowanie odporne (robust)</b> — z użyciem mediany i IQR, mniej wrażliwe
        na wartości odstające.</li>
      </ul>
      <p><b>Po co się to robi:</b></p>
      <ul>
        <li>Algorytmy oparte na <b>odległości</b> (KNN, SVM, k-means) bez skalowania faworyzują
        cechy o dużych zakresach — np. pensja w złotych "przykryje" wiek w latach.</li>
        <li><b>Gradient prosty</b> (regresja, sieci neuronowe) zbiega szybciej i stabilniej,
        gdy cechy mają podobną skalę.</li>
        <li>Metody jak <b>PCA</b> czy regularyzacja (Ridge/Lasso) wymagają porównywalnych skal,
        żeby uczciwie traktować wszystkie cechy.</li>
      </ul>
      <p><b>Ważne:</b> parametry skalowania (min, max, średnią, odchylenie) wyznacza się
      <b>tylko na zbiorze treningowym</b> i tym samym przekształceniem transformuje zbiór
      testowy — inaczej dochodzi do wycieku danych. Drzewa decyzyjne i lasy losowe
      skalowania nie wymagają.</p>
    `
  },
  {
    id: 8,
    pytanie: "Omówić klasyfikator lasu losowego.",
    odpowiedz: `
      <p><b>Las losowy</b> (random forest) to metoda zespołowa: zbiór wielu drzew decyzyjnych,
      których predykcje są łączone — przez głosowanie większościowe (klasyfikacja) albo
      uśrednienie (regresja).</p>
      <p><b>Skąd losowość (dwa źródła):</b></p>
      <ul>
        <li><b>Bagging</b> — każde drzewo uczy się na innej próbce bootstrapowej
        (losowanie ze zwracaniem z danych treningowych).</li>
        <li><b>Losowy podzbiór cech</b> — przy każdym podziale węzła drzewo wybiera najlepszą
        cechę tylko spośród losowo wybranych (np. √p cech), co dekoreluje drzewa.</li>
      </ul>
      <p>Pojedyncze drzewo łatwo się przeucza (ma dużą wariancję); uśrednienie wielu
      zdekorelowanych drzew <b>redukuje wariancję</b> i daje stabilny, dokładny model.</p>
      <p><b>Dodatkowe własności:</b></p>
      <ul>
        <li><b>Błąd OOB (out-of-bag)</b> — obserwacje niewylosowane do próbki drzewa (~37%)
        służą jako darmowy zbiór walidacyjny.</li>
        <li><b>Ważność cech</b> — las pozwala ocenić, które zmienne najbardziej wpływają
        na predykcję.</li>
        <li>Główne hiperparametry: liczba drzew, maksymalna głębokość, liczba cech na podział.</li>
      </ul>
      <p><b>Zalety:</b> wysoka dokładność, odporność na przeuczenie i szum, brak potrzeby
      skalowania cech, obsługa danych mieszanych.
      <b>Wady:</b> mniejsza interpretowalność niż pojedyncze drzewo, większy koszt
      obliczeniowy i pamięciowy.</p>
    `
  },
  {
    id: 9,
    pytanie: "Omówić regresję wieloraką i regresję grzbietową.",
    odpowiedz: `
      <p><b>Regresja wieloraka</b> (wielokrotna) to regresja liniowa z wieloma zmiennymi
      objaśniającymi: <code>y = b0 + b1·x1 + b2·x2 + … + bn·xn + ε</code>.
      Współczynniki dobiera się <b>metodą najmniejszych kwadratów</b> — tak, by suma kwadratów
      różnic między wartościami rzeczywistymi a przewidywanymi była minimalna.
      Każdy współczynnik mówi, o ile zmieni się <i>y</i>, gdy dana cecha wzrośnie o 1
      (przy pozostałych stałych). Problemy: wrażliwość na <b>współliniowość</b> cech
      (skorelowane zmienne dają niestabilne współczynniki) i na przeuczenie przy wielu cechach.</p>
      <p><b>Regresja grzbietowa (Ridge)</b> to regresja wieloraka z <b>regularyzacją L2</b>:
      do minimalizowanej funkcji dodaje się karę za duże współczynniki:</p>
      <p><code>min: SSE + λ · Σ bj²</code></p>
      <ul>
        <li>Kara "ściąga" współczynniki w stronę zera (ale ich nie zeruje), co
        <b>stabilizuje model przy współliniowości</b> i zmniejsza przeuczenie.</li>
        <li>Parametr <b>λ</b> steruje siłą regularyzacji: λ = 0 → zwykła regresja;
        duże λ → mocno spłaszczone współczynniki (ryzyko niedouczenia).
        λ dobiera się walidacją krzyżową.</li>
        <li>Przed regresją grzbietową cechy trzeba <b>wystandaryzować</b>, bo kara zależy
        od skali współczynników.</li>
      </ul>
      <p>Dla porównania: <b>Lasso</b> (L1) potrafi zerować współczynniki, więc działa też jako
      selekcja cech; <b>Elastic Net</b> łączy obie kary.</p>
    `
  },
  {
    id: 10,
    pytanie: "Omówić typy, metody treningu, strukturę i zasadę działania sztucznych sieci neuronowych.",
    odpowiedz: `
      <p><b>Struktura.</b> Sieć neuronowa składa się z warstw neuronów: wejściowej, ukrytych
      i wyjściowej. Każdy neuron liczy sumę ważoną wejść plus bias i przepuszcza ją przez
      <b>funkcję aktywacji</b> (ReLU, sigmoid, tanh, softmax na wyjściu klasyfikatora).
      Wiedza sieci jest zapisana w <b>wagach połączeń</b>.</p>
      <p><b>Zasada działania.</b> Sygnał płynie od wejścia do wyjścia (propagacja w przód).
      Nieliniowe funkcje aktywacji pozwalają sieci modelować dowolnie złożone zależności.</p>
      <p><b>Trening.</b> Uczenie polega na minimalizacji funkcji straty (np. entropia krzyżowa,
      MSE) metodą <b>gradientu prostego</b>. Gradienty wag liczy algorytm
      <b>propagacji wstecznej</b> (backpropagation) — błąd z wyjścia jest propagowany wstecz
      przez sieć z użyciem reguły łańcuchowej. W praktyce używa się wariantów SGD
      (mini-batch, momentum, Adam). Kluczowe hiperparametry: współczynnik uczenia, liczba epok,
      rozmiar batcha; przed przeuczeniem chronią dropout, regularyzacja i early stopping.</p>
      <p><b>Typy sieci:</b></p>
      <ul>
        <li><b>Perceptron wielowarstwowy (MLP)</b> — klasyczna sieć w pełni połączona,
        dane tabelaryczne.</li>
        <li><b>Konwolucyjne (CNN)</b> — filtry splotowe, analiza obrazów.</li>
        <li><b>Rekurencyjne (RNN, LSTM, GRU)</b> — dane sekwencyjne: tekst, szeregi czasowe.</li>
        <li><b>Transformery</b> — mechanizm uwagi (attention), obecny standard w NLP.</li>
        <li><b>Autoenkodery</b> — kompresja i rekonstrukcja danych (uczenie nienadzorowane).</li>
        <li><b>GAN</b> — generator + dyskryminator, generowanie danych.</li>
      </ul>
      <p>Sposoby uczenia: nadzorowane (najczęściej), nienadzorowane (autoenkodery)
      i ze wzmacnianiem (deep RL).</p>
    `
  },
  {
    id: 11,
    pytanie: "Omówić metody optymalizacji hiper-parametrów klasyfikatorów, w tym algorytmy genetyczne.",
    odpowiedz: `
      <p><b>Hiperparametry</b> to ustawienia algorytmu, których model sam się nie uczy
      (np. liczba drzew w lesie, C i gamma w SVM, współczynnik uczenia w sieci).
      Dobiera się je, oceniając każdą konfigurację walidacją krzyżową. Główne metody:</p>
      <ul>
        <li><b>Grid search</b> — wyczerpujące sprawdzenie wszystkich kombinacji z zadanej siatki.
        Proste i pewne, ale koszt rośnie wykładniczo z liczbą parametrów.</li>
        <li><b>Random search</b> — losowe próbkowanie kombinacji. Zaskakująco skuteczne —
        przy tym samym budżecie zwykle lepsze od siatki, bo gęściej próbkuje istotne parametry.</li>
        <li><b>Optymalizacja bayesowska</b> — buduje probabilistyczny model zależności
        "hiperparametry → wynik" i wybiera kolejne punkty tam, gdzie spodziewa się poprawy.
        Efektywna, gdy pojedyncza ocena jest droga (narzędzia: Optuna, Hyperopt).</li>
        <li><b>Algorytmy genetyczne</b> — metoda ewolucyjna:
          <ol>
            <li>tworzy się <b>populację</b> losowych konfiguracji (osobników, zakodowanych
            jako "chromosomy"),</li>
            <li>każdą ocenia <b>funkcja przystosowania</b> (np. accuracy z walidacji krzyżowej),</li>
            <li><b>selekcja</b> — najlepsze osobniki przechodzą dalej,</li>
            <li><b>krzyżowanie</b> — łączenie parametrów dwóch rodziców w potomka,</li>
            <li><b>mutacja</b> — losowa zmiana parametru, chroni przed utknięciem w optimum
            lokalnym,</li>
            <li>powtarzamy przez wiele pokoleń, aż wynik przestanie się poprawiać.</li>
          </ol>
        Dobrze radzą sobie z dużymi, nieregularnymi przestrzeniami parametrów, ale wymagają
        wielu ewaluacji.</li>
        <li>Inne: <b>Hyperband / successive halving</b> (szybkie odrzucanie słabych konfiguracji)
        i metody rojowe (PSO).</li>
      </ul>
      <p><b>Ważne:</b> strojenia nie wolno robić na zbiorze testowym — używa się zbioru
      walidacyjnego albo zagnieżdżonej walidacji krzyżowej.</p>
    `
  },
  {
    id: 12,
    pytanie: "Klasy i metody abstrakcyjne - podać przykłady praktycznego zastosowania.",
    odpowiedz: `
      <p><b>Klasa abstrakcyjna</b> to klasa, której nie można utworzyć bezpośrednio (nie da się
      zrobić z niej obiektu) — służy jako wspólna baza dla klas pochodnych. <b>Metoda
      abstrakcyjna</b> ma tylko sygnaturę, bez implementacji; każda konkretna klasa pochodna
      <b>musi</b> ją zaimplementować.</p>
      <p>Klasa abstrakcyjna może (w odróżnieniu od interfejsu) zawierać też zwykłe metody
      z implementacją i pola — definiuje więc wspólny szkielet oraz kontrakt dla podklas.</p>
      <p><b>Przykład (Java):</b></p>
      <p><code>abstract class Figura {<br>
      &nbsp;&nbsp;abstract double pole();&nbsp;&nbsp;// każda figura liczy pole inaczej<br>
      &nbsp;&nbsp;void opisz() { System.out.println("Pole: " + pole()); }<br>
      }<br>
      class Kolo extends Figura { ... pole() { return Math.PI*r*r; } }<br>
      class Prostokat extends Figura { ... pole() { return a*b; } }</code></p>
      <p><b>Praktyczne zastosowania:</b></p>
      <ul>
        <li><b>Hierarchie domenowe</b> — <code>Figura</code>/<code>Kolo</code>,
        <code>Pojazd</code>/<code>Samochod</code>: wspólny interfejs, różne implementacje.</li>
        <li><b>Wzorzec Template Method</b> — klasa abstrakcyjna definiuje szkielet algorytmu,
        a kroki zmienne zostawia podklasom (np. <code>InputStream.read()</code> w Javie).</li>
        <li><b>Frameworki i biblioteki</b> — np. w scikit-learn każdy estymator implementuje
        <code>fit()</code>/<code>predict()</code>; w Javie <code>AbstractList</code>,
        <code>HttpServlet</code>.</li>
        <li><b>Wymuszenie kontraktu</b> — kompilator pilnuje, że nikt nie stworzy klasy
        pochodnej bez wymaganych metod.</li>
      </ul>
      <p>W Pythonie odpowiednikiem jest moduł <code>abc</code>
      (<code>ABC</code>, <code>@abstractmethod</code>), w C++ — metody czysto wirtualne
      (<code>virtual ... = 0</code>).</p>
    `
  },
  {
    id: 13,
    pytanie: "Pojęcie hermetyzacji oraz metody praktycznej realizacji w językach obiektowo zorientowanych.",
    odpowiedz: `
      <p><b>Hermetyzacja (enkapsulacja)</b> to jeden z filarów programowania obiektowego:
      ukrycie wewnętrznego stanu i szczegółów implementacji obiektu oraz udostępnienie na
      zewnątrz tylko kontrolowanego interfejsu. Świat zewnętrzny komunikuje się z obiektem
      przez jego metody, a nie przez bezpośredni dostęp do pól.</p>
      <p><b>Po co:</b></p>
      <ul>
        <li>ochrona spójności danych — obiekt nie da się wprowadzić w niepoprawny stan
        (np. setter odrzuci ujemny wiek),</li>
        <li>możliwość zmiany implementacji bez psucia kodu, który z klasy korzysta,</li>
        <li>mniejsze sprzężenie między modułami i łatwiejsze testowanie.</li>
      </ul>
      <p><b>Realizacja w praktyce:</b></p>
      <ul>
        <li><b>Modyfikatory dostępu</b> — <code>private</code> (tylko wewnątrz klasy),
        <code>protected</code> (klasa + pochodne), <code>public</code> (wszyscy);
        w Javie dodatkowo dostęp pakietowy.</li>
        <li><b>Gettery i settery</b> — pola prywatne, dostęp przez metody, które mogą
        walidować dane; w C# — <b>właściwości</b> (properties), w Pythonie —
        dekorator <code>@property</code>.</li>
        <li><b>Konwencje Pythona</b> — brak twardych modyfikatorów; <code>_pole</code> to
        umowa "nie ruszać", <code>__pole</code> uruchamia name mangling.</li>
        <li><b>Interfejsy i klasy abstrakcyjne</b> — ujawniają "co" obiekt robi,
        ukrywając "jak".</li>
        <li><b>Niemutowalność</b> — pola <code>final</code>/<code>readonly</code>,
        obiekty niezmienne.</li>
      </ul>
      <p><b>Przykład:</b> klasa <code>KontoBankowe</code> z prywatnym polem <code>saldo</code>
      i metodami <code>wplac()</code>/<code>wyplac()</code>, które pilnują, by saldo nie
      zeszło poniżej zera.</p>
    `
  },
  {
    id: 14,
    pytanie: "Omówić mechanizm polimorfizmu.",
    odpowiedz: `
      <p><b>Polimorfizm</b> ("wielopostaciowość") to mechanizm, dzięki któremu to samo wywołanie
      metody może zachowywać się różnie w zależności od faktycznego typu obiektu. Pozwala pisać
      kod operujący na typie ogólnym, który poprawnie działa dla wszystkich typów pochodnych.</p>
      <p><b>Rodzaje:</b></p>
      <ul>
        <li><b>Polimorfizm dynamiczny (nadpisywanie metod, overriding)</b> — klasa pochodna
        dostarcza własną wersję metody klasy bazowej. O tym, która wersja się wykona, decyduje
        <b>rzeczywisty typ obiektu w czasie wykonania</b> (późne wiązanie; w C++ wymaga słowa
        <code>virtual</code>, w Javie jest domyślne).</li>
        <li><b>Polimorfizm statyczny (przeciążanie, overloading)</b> — kilka metod o tej samej
        nazwie, ale różnych parametrach; wybór następuje w czasie kompilacji. Do tej kategorii
        należą też szablony/generyki.</li>
        <li><b>Duck typing</b> (Python) — liczy się, czy obiekt "umie" daną metodę,
        a nie jego typ.</li>
      </ul>
      <p><b>Przykład:</b></p>
      <p><code>Figura f = new Kolo(3);<br>
      f.pole(); // wykona się pole() z klasy Kolo, nie z Figura<br><br>
      for (Figura fig : listaFigur) suma += fig.pole(); // działa dla każdej figury</code></p>
      <p><b>Korzyści:</b> wspólny interfejs dla rodziny klas, łatwa rozszerzalność — nową klasę
      (np. <code>Trojkat</code>) dodajemy bez zmiany istniejącego kodu (zasada otwarte-zamknięte).
      Polimorfizm jest fundamentem wzorców projektowych (Strategy, Factory) i frameworków.
      Realizowany jest zwykle przez tablicę metod wirtualnych (vtable).</p>
    `
  },
  {
    id: 15,
    pytanie: "Omówić zasadnicze cechy mechanizmu dziedziczenia.",
    odpowiedz: `
      <p><b>Dziedziczenie</b> to mechanizm, w którym klasa pochodna (podklasa) przejmuje pola
      i metody klasy bazowej (nadklasy) i może je rozszerzać lub modyfikować. Modeluje relację
      <b>"jest rodzajem"</b> (is-a): pies <i>jest</i> zwierzęciem.</p>
      <p><b>Zasadnicze cechy:</b></p>
      <ul>
        <li><b>Ponowne użycie kodu</b> — wspólne pola i metody definiujemy raz, w klasie bazowej.</li>
        <li><b>Rozszerzanie</b> — podklasa dodaje własne pola i metody.</li>
        <li><b>Nadpisywanie (overriding)</b> — podklasa może zastąpić metodę bazową własną
        wersją; do wersji rodzica sięga przez <code>super</code> (Java, Python)
        lub operator zakresu (C++).</li>
        <li><b>Podstawa polimorfizmu</b> — obiekt podklasy można podstawić wszędzie tam,
        gdzie oczekiwany jest typ bazowy (zasada podstawienia Liskov).</li>
        <li><b>Hierarchia i przechodniość</b> — dziedziczenie tworzy drzewa klas;
        wnuk dziedziczy także po dziadku.</li>
        <li><b>Widoczność</b> — pochodna widzi składowe <code>public</code>
        i <code>protected</code>, nie widzi <code>private</code>.</li>
        <li><b>Pojedyncze vs wielokrotne</b> — Java i C# pozwalają dziedziczyć tylko po jednej
        klasie (wiele interfejsów), C++ i Python dopuszczają dziedziczenie wielokrotne
        (problem rombu; Python rozwiązuje go kolejnością MRO).</li>
        <li>Konstruktory nie są dziedziczone — podklasa wywołuje konstruktor bazowy
        (<code>super()</code>).</li>
      </ul>
      <p><b>Uwaga praktyczna:</b> dziedziczenie silnie wiąże klasy, więc nadużywane utrudnia
      zmiany — często lepsza jest <b>kompozycja</b> ("ma" zamiast "jest").</p>
    `
  },
  {
    id: 16,
    pytanie: "Omówić zasadnicze elementy modelu MVC (Model-View-Controller).",
    odpowiedz: `
      <p><b>MVC</b> to wzorzec architektoniczny dzielący aplikację na trzy warstwy o osobnych
      odpowiedzialnościach:</p>
      <ul>
        <li><b>Model</b> — dane i logika biznesowa: obiekty domenowe, reguły, dostęp do bazy
        danych. Nie wie nic o interfejsie użytkownika.</li>
        <li><b>Widok (View)</b> — warstwa prezentacji: wyświetla dane z modelu użytkownikowi
        (HTML/szablony, GUI). Nie zawiera logiki biznesowej.</li>
        <li><b>Kontroler (Controller)</b> — pośrednik: odbiera akcje użytkownika (kliknięcie,
        żądanie HTTP), wywołuje odpowiednie operacje na modelu i wybiera widok do
        wyświetlenia.</li>
      </ul>
      <p><b>Typowy przepływ (aplikacja webowa):</b> żądanie HTTP → kontroler → operacje na
      modelu (np. pobranie rekordów z bazy) → przekazanie danych do widoku → wyrenderowana
      strona wraca do użytkownika.</p>
      <p><b>Korzyści:</b></p>
      <ul>
        <li>separacja odpowiedzialności — zmiana wyglądu nie dotyka logiki i odwrotnie,</li>
        <li>łatwiejsze testowanie (model testujemy bez interfejsu),</li>
        <li>równoległa praca zespołu (frontend/backend),</li>
        <li>wiele widoków dla tych samych danych (strona WWW, aplikacja mobilna, API).</li>
      </ul>
      <p><b>Przykłady:</b> Spring MVC (Java), ASP.NET MVC, Ruby on Rails, Laravel;
      Django używa bliskiej odmiany MTV (Model-Template-View). Pokrewne wzorce: MVP i MVVM.</p>
    `
  },
  {
    id: 17,
    pytanie: "Omów krótko środowisko OpenMP.",
    odpowiedz: `
      <p><b>OpenMP</b> (Open Multi-Processing) to standard programowania równoległego dla
      systemów z <b>pamięcią wspólną</b> (wielordzeniowy procesor w jednej maszynie).
      Obejmuje dyrektywy kompilatora, bibliotekę funkcji i zmienne środowiskowe dla
      C, C++ i Fortranu.</p>
      <ul>
        <li><b>Model fork-join</b> — program działa sekwencyjnie w jednym wątku; napotkawszy
        region równoległy, tworzy zespół wątków, które dzielą pracę, a po zakończeniu regionu
        łączą się z powrotem.</li>
        <li><b>Dyrektywy pragma</b> — zrównoleglenie osiąga się adnotacjami w istniejącym kodzie:
        <br><code>#pragma omp parallel for<br>
        for (int i = 0; i &lt; n; i++) c[i] = a[i] + b[i];</code></li>
        <li><b>Zakres zmiennych</b> — klauzule <code>shared</code> (wspólne dla wątków)
        i <code>private</code> (kopia na wątek) oraz <code>reduction</code> do bezpiecznego
        sumowania wyników.</li>
        <li><b>Synchronizacja</b> — <code>critical</code>, <code>atomic</code>,
        <code>barrier</code> — chronią przed wyścigami przy dostępie do wspólnych danych.</li>
        <li>Przydatne funkcje: <code>omp_get_thread_num()</code>,
        <code>omp_get_num_threads()</code>; liczbę wątków ustawia
        <code>OMP_NUM_THREADS</code>.</li>
      </ul>
      <p><b>Zalety:</b> bardzo niski próg wejścia — kod sekwencyjny zrównolegla się kilkoma
      dyrektywami, a bez obsługi OpenMP program dalej działa sekwencyjnie.
      <b>Ograniczenie:</b> działa tylko w obrębie jednej maszyny — na klastrach stosuje się MPI
      (często hybrydowo: MPI między węzłami + OpenMP wewnątrz węzła).</p>
    `
  },
  {
    id: 18,
    pytanie: "Omów krótko środowisko MPI.",
    odpowiedz: `
      <p><b>MPI</b> (Message Passing Interface) to standard programowania równoległego dla
      systemów z <b>pamięcią rozproszoną</b> — klastrów, gdzie węzły nie współdzielą pamięci
      i komunikują się <b>przekazywaniem komunikatów</b> przez sieć. Implementacje:
      OpenMPI, MPICH, Intel MPI.</p>
      <ul>
        <li><b>Model programu</b> — uruchamia się wiele <b>procesów</b> (często kopii tego
        samego programu — model SPMD), każdy z własną pamięcią. Proces zna swój numer
        (<b>rank</b>) i liczbę procesów w komunikatorze (<code>MPI_COMM_WORLD</code>)
        i na tej podstawie dzieli pracę.</li>
        <li><b>Komunikacja punkt-punkt</b> — <code>MPI_Send</code> / <code>MPI_Recv</code>
        (także warianty nieblokujące <code>MPI_Isend</code>/<code>MPI_Irecv</code>).</li>
        <li><b>Komunikacja kolektywna</b> — <code>MPI_Bcast</code> (rozgłoszenie),
        <code>MPI_Scatter</code> (rozdzielenie danych), <code>MPI_Gather</code> (zebranie),
        <code>MPI_Reduce</code> (np. suma z wszystkich procesów),
        <code>MPI_Barrier</code> (synchronizacja).</li>
        <li><b>Cykl życia</b> — <code>MPI_Init</code> … <code>MPI_Finalize</code>;
        program uruchamia się poleceniem <code>mpirun -np N ./program</code>.</li>
      </ul>
      <p><b>Zalety:</b> skaluje się na tysiące węzłów — standard w obliczeniach HPC
      i superkomputerach. <b>Wady:</b> trudniejsze programowanie niż OpenMP — jawne zarządzanie
      komunikacją i podziałem danych. Często łączy się oba: MPI między węzłami,
      OpenMP wewnątrz węzła.</p>
    `
  },
  {
    id: 19,
    pytanie: "Omów taksonomię Flynna.",
    odpowiedz: `
      <p><b>Taksonomia Flynna</b> (1966) klasyfikuje architektury komputerowe według dwóch
      kryteriów: liczby <b>strumieni instrukcji</b> i liczby <b>strumieni danych</b>
      przetwarzanych jednocześnie. Daje to cztery klasy:</p>
      <ul>
        <li><b>SISD</b> (Single Instruction, Single Data) — jeden strumień instrukcji, jeden
        strumień danych: klasyczny komputer sekwencyjny (architektura von Neumanna),
        pojedynczy rdzeń.</li>
        <li><b>SIMD</b> (Single Instruction, Multiple Data) — ta sama instrukcja wykonywana
        równocześnie na wielu danych: procesory wektorowe, rozszerzenia SSE/AVX,
        <b>karty graficzne (GPU)</b>. Idealne do operacji na macierzach i obrazach —
        stąd rola GPU w uczeniu głębokim.</li>
        <li><b>MISD</b> (Multiple Instruction, Single Data) — wiele instrukcji na tych samych
        danych: klasa głównie teoretyczna; podawany przykład to systemy odporne na błędy
        z redundantnym przetwarzaniem (np. komputery promu kosmicznego).</li>
        <li><b>MIMD</b> (Multiple Instruction, Multiple Data) — wiele niezależnych procesorów,
        każdy wykonuje własne instrukcje na własnych danych: procesory wielordzeniowe,
        klastry, superkomputery. Dzieli się dalej na systemy z <b>pamięcią wspólną</b>
        (programowane np. OpenMP) i <b>pamięcią rozproszoną</b> (MPI).</li>
      </ul>
      <p>Mimo wieku taksonomia wciąż porządkuje myślenie o równoległości; współczesne maszyny
      zwykle łączą klasy (np. klaster MIMD, którego węzły używają jednostek SIMD).</p>
    `
  },
  {
    id: 20,
    pytanie: "Wymień typy sieci głębokich.",
    odpowiedz: `
      <ul>
        <li><b>MLP / DNN</b> — głębokie sieci w pełni połączone (wielowarstwowy perceptron);
        dane tabelaryczne.</li>
        <li><b>CNN</b> — sieci konwolucyjne (splotowe); obrazy, wideo, rozpoznawanie obiektów
        (np. ResNet, VGG).</li>
        <li><b>RNN</b> — sieci rekurencyjne, w tym <b>LSTM</b> i <b>GRU</b>; dane sekwencyjne:
        tekst, mowa, szeregi czasowe.</li>
        <li><b>Transformery</b> — oparte na mechanizmie uwagi (attention); NLP i coraz częściej
        wizja (BERT, GPT, ViT).</li>
        <li><b>Autoenkodery</b> — kompresja i rekonstrukcja danych; redukcja wymiarowości,
        odszumianie, detekcja anomalii (także wariacyjne VAE).</li>
        <li><b>GAN</b> — generatywne sieci przeciwstawne (generator + dyskryminator);
        generowanie obrazów i danych syntetycznych.</li>
        <li><b>Modele dyfuzyjne</b> — generowanie obrazów przez odwracanie procesu zaszumiania
        (Stable Diffusion).</li>
        <li><b>GNN</b> — grafowe sieci neuronowe; dane o strukturze grafu (sieci społeczne,
        cząsteczki chemiczne).</li>
        <li><b>Sieci głębokiego uczenia ze wzmacnianiem</b> — np. Deep Q-Network (DQN);
        agenci uczący się przez interakcję ze środowiskiem.</li>
        <li>Historyczne/klasyczne: <b>Deep Belief Networks</b> i ograniczone maszyny
        Boltzmanna (RBM).</li>
      </ul>
    `
  },
  {
    id: 21,
    pytanie: "Wyjaśnij pojęcia: uczenie nadzorowane, uczenie nienadzorowane, uczenie ze wzmacnianiem.",
    odpowiedz: `
      <ul>
        <li><b>Uczenie nadzorowane</b> — model uczy się na danych <b>z etykietami</b>: każdej
        obserwacji towarzyszy poprawna odpowiedź. Cel: nauczyć się odwzorowania wejście →
        wyjście, aby przewidywać etykiety dla nowych danych. Zadania: <b>klasyfikacja</b>
        (etykieta dyskretna, np. spam/nie-spam) i <b>regresja</b> (wartość ciągła, np. cena
        mieszkania). Algorytmy: regresja liniowa i logistyczna, KNN, SVM, drzewa, lasy losowe,
        sieci neuronowe.</li>
        <li><b>Uczenie nienadzorowane</b> — dane <b>bez etykiet</b>; model sam szuka struktury
        i wzorców. Zadania: <b>grupowanie</b> (k-means, DBSCAN, klasteryzacja hierarchiczna),
        <b>redukcja wymiarowości</b> (PCA, t-SNE), <b>reguły asocjacyjne</b> (analiza koszyka,
        Apriori), <b>detekcja anomalii</b>. Przykład: segmentacja klientów sklepu.</li>
        <li><b>Uczenie ze wzmacnianiem</b> — <b>agent</b> działa w <b>środowisku</b>: obserwuje
        stan, wykonuje akcje i otrzymuje <b>nagrody</b> lub kary. Nie ma gotowych poprawnych
        odpowiedzi — agent uczy się metodą prób i błędów strategii (polityki) maksymalizującej
        łączną nagrodę. Kluczowy jest balans eksploracji (próbowanie nowego) i eksploatacji
        (korzystanie ze sprawdzonych akcji). Algorytmy: Q-learning, DQN, policy gradient.
        Zastosowania: gry (AlphaGo), robotyka, sterowanie, systemy rekomendacyjne.</li>
      </ul>
      <p>Istnieje też forma pośrednia — <b>uczenie półnadzorowane</b> (mało danych z etykietami,
      dużo bez) oraz <b>samonadzorowane</b> (etykiety generowane z samych danych, np. trening
      dużych modeli językowych).</p>
    `
  },
  {
    id: 22,
    pytanie: "Wymień przykłady baz danych typu No-SQL.",
    odpowiedz: `
      <p>Bazy NoSQL dzieli się na cztery główne typy — przykłady:</p>
      <ul>
        <li><b>Dokumentowe</b> (przechowują dokumenty JSON/BSON) — <b>MongoDB</b>, CouchDB,
        Amazon DocumentDB, Firebase Firestore.</li>
        <li><b>Klucz-wartość</b> (proste pary klucz → wartość, bardzo szybkie) — <b>Redis</b>,
        Amazon DynamoDB, Memcached, Riak.</li>
        <li><b>Kolumnowe</b> (rodziny kolumn, ogromne wolumeny zapisów) — <b>Apache Cassandra</b>,
        HBase, ScyllaDB, Google Bigtable.</li>
        <li><b>Grafowe</b> (węzły i relacje, np. sieci społeczne, rekomendacje) — <b>Neo4j</b>,
        Amazon Neptune, ArangoDB.</li>
      </ul>
      <p>Wyróżnia się też bazy <b>szeregów czasowych</b> (InfluxDB, TimescaleDB) oraz
      <b>wyszukiwarki pełnotekstowe</b> (Elasticsearch). Bazy NoSQL wybiera się przy dużej
      skali, elastycznym schemacie i łatwym skalowaniu poziomym.</p>
    `
  },
  {
    id: 23,
    pytanie: "Czym jest Hadoop?",
    odpowiedz: `
      <p><b>Apache Hadoop</b> to otwartoźródłowa platforma do <b>rozproszonego przechowywania
      i przetwarzania bardzo dużych zbiorów danych (Big Data)</b> na klastrach zbudowanych
      ze zwykłych, tanich maszyn. Zamiast przenosić dane do obliczeń, Hadoop przenosi
      obliczenia do danych.</p>
      <p><b>Główne komponenty:</b></p>
      <ul>
        <li><b>HDFS</b> (Hadoop Distributed File System) — rozproszony system plików: pliki
        dzielone są na bloki (domyślnie 128 MB) i replikowane (zwykle ×3) na wielu węzłach,
        co daje odporność na awarie. Architektura: NameNode (metadane) + DataNode (dane).</li>
        <li><b>MapReduce</b> — model programowania wsadowego: faza <b>Map</b> przetwarza dane
        równolegle na węzłach (pary klucz-wartość), faza <b>Reduce</b> agreguje wyniki.</li>
        <li><b>YARN</b> — zarządca zasobów klastra: przydziela pamięć i CPU zadaniom.</li>
      </ul>
      <p><b>Ekosystem:</b> Hive (zapytania SQL nad HDFS), Pig, HBase (baza NoSQL),
      Spark (szybsze przetwarzanie w pamięci, dziś często zastępuje MapReduce),
      Sqoop, Oozie, ZooKeeper.</p>
      <p><b>Cechy:</b> skalowalność pozioma (dokładanie węzłów), odporność na awarie dzięki
      replikacji, przetwarzanie wsadowe ogromnych wolumenów. Ograniczenia: duże opóźnienia
      (nie nadaje się do zapytań interaktywnych), złożona administracja — stąd popularność
      Sparka i rozwiązań chmurowych.</p>
    `
  },
  {
    id: 24,
    pytanie: "Opisz cechy Haara.",
    odpowiedz: `
      <p><b>Cechy Haara</b> (Haar-like features) to proste cechy obrazu używane w detekcji
      obiektów, spopularyzowane przez algorytm <b>Violi-Jonesa</b> (2001) do wykrywania twarzy
      w czasie rzeczywistym.</p>
      <ul>
        <li><b>Budowa</b> — prostokątne maski złożone z obszarów jasnych i ciemnych
        (dwu-, trzy- i czteroprostokątne, np. dwa prostokąty obok siebie albo prostokąt
        w ramce). Wartość cechy = suma pikseli pod obszarem białym minus suma pod czarnym.</li>
        <li><b>Co wykrywają</b> — lokalne kontrasty: krawędzie, linie, przejścia jasności.
        Na twarzy np. oczy są ciemniejsze od czoła i policzków, a nasada nosa jaśniejsza
        od oczu — takie kontrasty dobrze łapią maski Haara.</li>
        <li><b>Obraz całkowy (integral image)</b> — kluczowa optymalizacja: pozwala policzyć
        sumę pikseli dowolnego prostokąta w stałym czasie (4 odczyty), więc tysiące cech
        liczy się błyskawicznie.</li>
        <li><b>Selekcja i kaskada</b> — cech jest ogromnie dużo (setki tysięcy na okno),
        więc algorytm <b>AdaBoost</b> wybiera najbardziej dyskryminujące, a klasyfikatory
        układa się w <b>kaskadę</b>: proste etapy szybko odrzucają obszary bez twarzy,
        złożone analizują tylko obiecujące fragmenty.</li>
      </ul>
      <p>Nazwa pochodzi od podobieństwa do falek Haara. Implementacja dostępna w OpenCV
      (kaskady Haara); współcześnie w detekcji dominują sieci konwolucyjne, ale cechy Haara
      pozostają szybkie i lekkie obliczeniowo.</p>
    `
  },
  {
    id: 25,
    pytanie: "Wymień i scharakteryzuj krótko przykładowy algorytm binaryzacji obrazu.",
    odpowiedz: `
      <p><b>Binaryzacja</b> to zamiana obrazu w skali szarości na czarno-biały: piksele jaśniejsze
      od progu T stają się białe, ciemniejsze — czarne. Przykładowy algorytm:</p>
      <p><b>Metoda Otsu</b> — automatycznie dobiera globalny próg na podstawie histogramu:</p>
      <ol>
        <li>Wyznacz histogram jasności obrazu.</li>
        <li>Dla każdego możliwego progu T podziel piksele na dwie klasy (tło i obiekt).</li>
        <li>Wybierz próg, który <b>minimalizuje wariancję wewnątrz klas</b> (równoważnie:
        maksymalizuje wariancję między klasami).</li>
      </ol>
      <p>Działa bardzo dobrze, gdy histogram jest dwumodalny (wyraźne tło i obiekt);
      dostępna w OpenCV jako <code>cv2.threshold(..., cv2.THRESH_OTSU)</code>.</p>
      <p><b>Inne podejścia:</b></p>
      <ul>
        <li><b>Proste progowanie globalne</b> — próg ustalony ręcznie, np. T = 128;
        zawodzi przy nierównym oświetleniu.</li>
        <li><b>Progowanie adaptacyjne</b> — próg liczony lokalnie dla otoczenia każdego piksela
        (średnia lub średnia ważona Gaussem minus stała); odporne na nierównomierne
        oświetlenie, np. przy skanach dokumentów. Warianty lokalne: metody Niblacka
        i Sauvoli.</li>
      </ul>
    `
  },
  {
    id: 26,
    pytanie: "Wymień 3 przykładowe testy do sprawdzania równości wariancji.",
    odpowiedz: `
      <ul>
        <li><b>Test Levene'a</b> — najpopularniejszy; bada odchylenia obserwacji od średniej
        grupowej. Stosunkowo odporny na odstępstwa od normalności, działa dla 2 i więcej grup.</li>
        <li><b>Test Bartletta</b> — ma większą moc, gdy dane rzeczywiście pochodzą z rozkładu
        normalnego, ale jest bardzo wrażliwy na jego brak.</li>
        <li><b>Test Browna-Forsythe'a</b> — odmiana testu Levene'a używająca <b>mediany</b>
        zamiast średniej; najbardziej odporny na wartości odstające i skośne rozkłady.</li>
      </ul>
      <p>Dodatkowo: <b>test F</b> (Fishera) — porównanie wariancji dokładnie dwóch grup przez
      iloraz wariancji; <b>test Hartleya</b> (F-max) dla grup równolicznych.</p>
      <p><b>Kontekst:</b> równość wariancji (homoscedastyczność) to założenie m.in. ANOVA
      i testu t-Studenta — te testy sprawdza się przed ich zastosowaniem. Hipoteza zerowa
      zawsze brzmi: wariancje we wszystkich grupach są równe.</p>
    `
  },
  {
    id: 27,
    pytanie: "Scharakteryzuj metodę ANOVA.",
    odpowiedz: `
      <p><b>ANOVA</b> (Analysis of Variance, analiza wariancji) to test statystyczny sprawdzający,
      czy <b>średnie w trzech lub więcej grupach różnią się istotnie</b>. Zastępuje wielokrotne
      testy t, które kumulowałyby błąd I rodzaju.</p>
      <ul>
        <li><b>Hipotezy:</b> H0 — wszystkie średnie grupowe są równe;
        H1 — przynajmniej jedna się różni.</li>
        <li><b>Idea:</b> całkowitą zmienność danych rozbija się na zmienność <b>między grupami</b>
        (efekt czynnika) i <b>wewnątrz grup</b> (losowa). Statystyka
        <code>F = wariancja międzygrupowa / wariancja wewnątrzgrupowa</code> —
        im większe F, tym silniejszy dowód, że grupy naprawdę się różnią.
        Wartość F porównuje się z rozkładem F-Snedecora; p &lt; 0.05 → odrzucamy H0.</li>
        <li><b>Założenia:</b> normalność rozkładu w grupach, <b>równość wariancji</b>
        (sprawdzana np. testem Levene'a), niezależność obserwacji.</li>
        <li><b>Rodzaje:</b> jednoczynnikowa (jeden czynnik grupujący), dwuczynnikowa
        (dwa czynniki + ich interakcja), ANOVA dla pomiarów powtarzanych, MANOVA
        (wiele zmiennych zależnych).</li>
        <li><b>Testy post-hoc:</b> ANOVA mówi tylko, ŻE grupy się różnią — żeby wskazać KTÓRE,
        stosuje się testy Tukeya, Bonferroniego lub Scheffégo.</li>
      </ul>
      <p>Gdy założenia nie są spełnione, używa się nieparametrycznego odpowiednika —
      testu Kruskala-Wallisa. <b>Przykład:</b> porównanie skuteczności trzech leków —
      czy średnie wyniki pacjentów w trzech grupach różnią się istotnie.</p>
    `
  },
  {
    id: 28,
    pytanie: "Omów test Kruskala-Wallisa.",
    odpowiedz: `
      <p><b>Test Kruskala-Wallisa</b> to <b>nieparametryczny</b> odpowiednik jednoczynnikowej
      ANOVA: sprawdza, czy trzy lub więcej niezależnych grup pochodzi z tej samej populacji
      (czy mają te same rozkłady/mediany). Jest rozszerzeniem testu Manna-Whitneya na więcej
      niż dwie grupy.</p>
      <ul>
        <li><b>Kiedy się go stosuje:</b> gdy nie są spełnione założenia ANOVA — dane nie mają
        rozkładu normalnego, wariancje są nierówne, próby są małe, albo dane są rangowe
        (porządkowe, np. oceny w skali 1–5).</li>
        <li><b>Idea działania:</b> wszystkie obserwacje ze wszystkich grup łączy się razem
        i <b>zamienia na rangi</b> (1 = najmniejsza wartość). Następnie porównuje się sumy
        (średnie) rang w grupach — jeśli grupy są podobne, średnie rangi powinny być zbliżone.
        Statystyka H ma w przybliżeniu rozkład chi-kwadrat z (k−1) stopniami swobody.</li>
        <li><b>Hipotezy:</b> H0 — rozkłady we wszystkich grupach są takie same;
        H1 — przynajmniej jedna grupa ma inny rozkład (przesuniętą medianę).
        p &lt; 0.05 → odrzucamy H0.</li>
        <li><b>Post-hoc:</b> test wskazuje tylko, że jakaś różnica istnieje; które pary grup
        się różnią, sprawdza się np. testem Dunna z poprawką na wielokrotne porównania.</li>
      </ul>
      <p><b>Zalety:</b> brak wymogu normalności, odporność na wartości odstające (praca na
      rangach). <b>Wada:</b> mniejsza moc niż ANOVA, gdy dane faktycznie są normalne.</p>
    `
  },
  {
    id: 29,
    pytanie: "Scharakteryzuj technologię EJB.",
    odpowiedz: `
      <p><b>EJB</b> (Enterprise JavaBeans) to technologia z platformy <b>Java EE / Jakarta EE</b>
      do budowy komponentów logiki biznesowej po stronie serwera. Komponenty (beany) działają
      w <b>kontenerze EJB</b> serwera aplikacyjnego (np. WildFly, GlassFish, WebSphere), który
      przejmuje za programistę sprawy techniczne:</p>
      <ul>
        <li><b>zarządzanie transakcjami</b> (deklaratywnie, bez ręcznego commit/rollback),</li>
        <li><b>bezpieczeństwo</b> (role i uprawnienia przez adnotacje),</li>
        <li><b>zarządzanie cyklem życia i pulą instancji</b>, współbieżność,</li>
        <li>dostęp zdalny (RMI), wstrzykiwanie zależności, usługi czasowe (timery).</li>
      </ul>
      <p><b>Rodzaje beanów:</b></p>
      <ul>
        <li><b>Stateless Session Bean</b> — bez stanu między wywołaniami; typowe usługi
        biznesowe (najczęściej używany).</li>
        <li><b>Stateful Session Bean</b> — pamięta stan konwersacji z konkretnym klientem
        (np. koszyk zakupowy).</li>
        <li><b>Singleton Session Bean</b> — jedna instancja na aplikację (np. wspólna
        konfiguracja).</li>
        <li><b>Message-Driven Bean (MDB)</b> — asynchroniczny odbiorca komunikatów z kolejek
        JMS.</li>
      </ul>
      <p>Dawne <i>entity beans</i> (trwałość danych) zastąpiło <b>JPA</b>. Od wersji EJB 3
      technologia opiera się na prostych klasach POJO z adnotacjami
      (<code>@Stateless</code>, <code>@Stateful</code>). Współcześnie w nowych projektach
      częściej wybiera się Spring lub CDI, ale EJB wciąż działa w wielu systemach
      korporacyjnych.</p>
    `
  },
  {
    id: 30,
    pytanie: "Wyjaśnij pojęcie ścieżki krytycznej w teorii zarządzania projektami.",
    odpowiedz: `
      <p><b>Ścieżka krytyczna</b> (Critical Path Method, CPM) to <b>najdłuższy ciąg zależnych
      od siebie zadań</b> w projekcie — sekwencja, która wyznacza <b>minimalny możliwy czas
      ukończenia całego projektu</b>.</p>
      <ul>
        <li>Zadania na ścieżce krytycznej mają <b>zerowy zapas czasu</b> (slack/float) —
        opóźnienie któregokolwiek z nich <b>opóźnia cały projekt</b>.</li>
        <li>Zadania poza ścieżką mają zapas — można je przesuwać w granicach zapasu bez
        wpływu na termin końcowy.</li>
      </ul>
      <p><b>Jak się ją wyznacza:</b></p>
      <ol>
        <li>Rozpisz zadania, czasy trwania i zależności (co musi skończyć się przed czym) —
        powstaje graf/diagram sieciowy.</li>
        <li><b>Przejście w przód</b> — policz najwcześniejsze możliwe momenty rozpoczęcia
        i zakończenia każdego zadania (ES, EF).</li>
        <li><b>Przejście wstecz</b> — policz najpóźniejsze dopuszczalne momenty (LS, LF).</li>
        <li>Zapas = LS − ES. Zadania z zapasem 0 tworzą ścieżkę krytyczną.</li>
      </ol>
      <p><b>Po co to menedżerowi:</b> wie, które zadania monitorować i wzmacniać zasobami
      w pierwszej kolejności, umie ocenić realny termin końca projektu i skutki opóźnień.
      Ścieżka krytyczna może się zmieniać w trakcie projektu. Wizualizuje się ją na wykresie
      Gantta lub diagramie sieciowym; metodą pokrewną jest <b>PERT</b>, która używa
      probabilistycznych (trzypunktowych) oszacowań czasu.</p>
    `
  },
  {
    id: 31,
    pytanie: "Omów metodykę SCRUM.",
    odpowiedz: `
      <p><b>Scrum</b> to zwinna (Agile) metodyka zarządzania pracą nad produktem: zamiast
      planować wszystko z góry, zespół dostarcza produkt <b>iteracyjnie i przyrostowo</b>,
      w krótkich cyklach, ucząc się z każdej iteracji.</p>
      <p><b>Role:</b></p>
      <ul>
        <li><b>Product Owner</b> — odpowiada za wizję produktu i priorytety; zarządza
        backlogiem produktu, reprezentuje interes klienta.</li>
        <li><b>Scrum Master</b> — dba o proces: usuwa przeszkody, chroni zespół, pilnuje
        zasad Scruma (nie jest kierownikiem).</li>
        <li><b>Zespół deweloperski</b> — samoorganizujący się, interdyscyplinarny,
        zwykle 3–9 osób; sam decyduje, jak wykona pracę.</li>
      </ul>
      <p><b>Wydarzenia:</b></p>
      <ul>
        <li><b>Sprint</b> — iteracja o stałej długości (1–4 tygodnie), kończąca się działającym
        przyrostem produktu.</li>
        <li><b>Planowanie sprintu</b> — wybór zadań z backlogu i ustalenie celu sprintu.</li>
        <li><b>Daily Scrum</b> — codzienne 15-minutowe spotkanie synchronizacyjne.</li>
        <li><b>Przegląd sprintu (Review)</b> — prezentacja przyrostu interesariuszom, zbieranie
        informacji zwrotnej.</li>
        <li><b>Retrospektywa</b> — zespół analizuje własny proces i planuje usprawnienia.</li>
      </ul>
      <p><b>Artefakty:</b> <b>Product Backlog</b> (uporządkowana lista wszystkich wymagań),
      <b>Sprint Backlog</b> (zadania wybrane na sprint), <b>Przyrost</b> (działający produkt
      spełniający Definition of Done).</p>
      <p><b>Zalety:</b> szybka reakcja na zmiany wymagań, częste dostarczanie wartości,
      przejrzystość postępu (np. wykres burndown), ciągłe doskonalenie zespołu.</p>
    `
  },
  {
    id: 32,
    pytanie: "Omów podstawowe charakterystyki opisujące szereg czasowy.",
    odpowiedz: `
      <p><b>Szereg czasowy</b> to ciąg obserwacji uporządkowanych w czasie (np. dzienna
      temperatura, miesięczna sprzedaż). Podstawowe charakterystyki (składowe):</p>
      <ul>
        <li><b>Trend</b> — długookresowa tendencja rozwojowa: systematyczny wzrost lub spadek
        poziomu zjawiska (np. wieloletni wzrost sprzedaży).</li>
        <li><b>Sezonowość</b> — regularne wahania o stałym, znanym okresie: dobowym,
        tygodniowym, rocznym (np. wzrost sprzedaży przed świętami).</li>
        <li><b>Cykliczność</b> — wahania długookresowe o niestałym okresie, np. cykle
        koniunkturalne; w odróżnieniu od sezonowości okres nie jest z góry ustalony.</li>
        <li><b>Składowa losowa (szum)</b> — nieregularne, przypadkowe odchylenia,
        których nie wyjaśnia żadna z powyższych składowych.</li>
      </ul>
      <p>Szereg dekomponuje się na te składowe w modelu <b>addytywnym</b>
      (y = T + S + C + e) lub <b>multiplikatywnym</b> (y = T · S · C · e), gdy amplituda wahań
      rośnie z poziomem szeregu.</p>
      <p><b>Charakterystyki statystyczne:</b></p>
      <ul>
        <li><b>Stacjonarność</b> — stałość średniej i wariancji w czasie; wymagana przez wiele
        modeli (np. ARIMA), sprawdzana testem ADF; osiągana przez różnicowanie.</li>
        <li><b>Autokorelacja (ACF/PACF)</b> — korelacja szeregu z jego własnymi opóźnieniami;
        pokazuje, jak silnie przeszłość wpływa na teraźniejszość i pomaga dobrać model.</li>
        <li>Miary opisowe: średnia, wariancja, przyrosty i dynamika (indeksy łańcuchowe).</li>
      </ul>
    `
  },
  {
    id: 33,
    pytanie: "Wyjaśnij skrót ETL.",
    odpowiedz: `
      <p><b>ETL = Extract, Transform, Load</b> — proces przenoszenia danych ze źródeł do
      docelowego magazynu (najczęściej hurtowni danych):</p>
      <ul>
        <li><b>Extract (ekstrakcja)</b> — pobranie danych ze źródeł: baz relacyjnych, plików
        CSV/JSON, API, systemów ERP/CRM, logów.</li>
        <li><b>Transform (transformacja)</b> — przekształcenie do docelowej postaci:
        czyszczenie i walidacja, ujednolicenie formatów i jednostek, usuwanie duplikatów,
        łączenie danych z wielu źródeł, agregacje, mapowanie na docelowy schemat.</li>
        <li><b>Load (ładowanie)</b> — zapis przetworzonych danych do hurtowni lub bazy
        docelowej — pełny albo przyrostowy (tylko zmiany), zwykle w cyklach
        (np. co noc).</li>
      </ul>
      <p><b>Zastosowanie:</b> zasilanie hurtowni danych i systemów Business Intelligence,
      integracja danych z wielu systemów, przygotowanie danych do analiz i uczenia
      maszynowego. Narzędzia: Apache Airflow, SSIS, Talend, Informatica, AWS Glue.</p>
      <p><b>Odmiana ELT</b> — najpierw ładowanie surowych danych, transformacja dopiero
      w docelowej hurtowni; popularna w chmurze (Snowflake, BigQuery), gdzie moc obliczeniowa
      hurtowni jest tania i skalowalna.</p>
    `
  },
  {
    id: 34,
    pytanie: "Wymień 3 frameworki wykorzystywane w rozwiązywaniu problemów z dziedziny uczenia maszynowego.",
    odpowiedz: `
      <ul>
        <li><b>scikit-learn</b> (Python) — klasyczne uczenie maszynowe: regresja, SVM, drzewa,
        lasy losowe, klasteryzacja, preprocessing, walidacja krzyżowa. Spójne API
        <code>fit()/predict()</code>; standard do danych tabelarycznych.</li>
        <li><b>TensorFlow</b> (Google, z wysokopoziomowym API <b>Keras</b>) — uczenie głębokie:
        budowa i trening sieci neuronowych, obliczenia na GPU/TPU, wdrażanie modeli
        (TensorFlow Lite, Serving).</li>
        <li><b>PyTorch</b> (Meta) — uczenie głębokie z dynamicznym grafem obliczeń; obecnie
        najpopularniejszy w badaniach naukowych i przy dużych modelach językowych.</li>
      </ul>
      <p>Inne warte wymienienia: <b>XGBoost / LightGBM</b> (gradient boosting — najskuteczniejsze
      na danych tabelarycznych), <b>Hugging Face Transformers</b> (gotowe modele NLP),
      <b>Apache Spark MLlib</b> (ML na dużą skalę, rozproszony), <b>Pandas/NumPy</b> jako
      biblioteki wspierające.</p>
    `
  },
  {
    id: 35,
    pytanie: "Omów mechanizm dependency injection.",
    odpowiedz: `
      <p><b>Dependency Injection (DI, wstrzykiwanie zależności)</b> to wzorzec, w którym obiekt
      <b>nie tworzy sam swoich zależności</b> (np. przez <code>new</code>), lecz <b>dostaje je
      z zewnątrz</b> — od kodu wywołującego albo od kontenera DI. To realizacja zasady
      odwrócenia sterowania (IoC — Inversion of Control).</p>
      <p><b>Problem bez DI:</b> klasa <code>ZamowienieService</code>, która sama robi
      <code>new MySQLRepozytorium()</code>, jest sztywno związana z konkretną implementacją —
      trudno ją przetestować i podmienić bazę.</p>
      <p><b>Sposoby wstrzykiwania:</b></p>
      <ul>
        <li><b>przez konstruktor</b> (zalecany) — zależności są jawne i obiekt zawsze kompletny:
        <br><code>class ZamowienieService {<br>
        &nbsp;&nbsp;ZamowienieService(Repozytorium repo) { this.repo = repo; }<br>}</code></li>
        <li><b>przez setter</b> — zależności opcjonalne, ustawiane po utworzeniu,</li>
        <li><b>przez pole/interfejs</b> — np. adnotacja <code>@Autowired</code>
        na polu w Springu.</li>
      </ul>
      <p><b>Kontener DI</b> (Spring, Jakarta CDI, Guice, ASP.NET Core DI, Angular) sam buduje
      graf obiektów: rejestruje typy, tworzy instancje, zarządza ich cyklem życia
      (singleton, per żądanie) i wstrzykuje je tam, gdzie są potrzebne.</p>
      <p><b>Korzyści:</b></p>
      <ul>
        <li><b>luźne sprzężenie</b> — klasa zależy od interfejsu, nie od implementacji,</li>
        <li><b>testowalność</b> — w testach wstrzykuje się atrapy (mocki),</li>
        <li>łatwa podmiana implementacji i konfiguracji, czytelna struktura zależności.</li>
      </ul>
    `
  },
  {
    id: 36,
    pytanie: "Wyjaśnij skrót REST.",
    odpowiedz: `
      <p><b>REST = REpresentational State Transfer</b> — styl architektoniczny projektowania
      usług sieciowych (API) oparty na protokole HTTP, opisany przez Roya Fieldinga (2000).</p>
      <p><b>Kluczowe idee:</b></p>
      <ul>
        <li><b>Zasoby</b> — wszystko jest zasobem identyfikowanym przez URL,
        np. <code>/uzytkownicy/15</code>. Zasób ma reprezentację, zwykle JSON (lub XML).</li>
        <li><b>Metody HTTP jako operacje (CRUD):</b>
          <ul>
            <li><code>GET</code> — pobranie zasobu,</li>
            <li><code>POST</code> — utworzenie nowego,</li>
            <li><code>PUT</code>/<code>PATCH</code> — aktualizacja (całości/części),</li>
            <li><code>DELETE</code> — usunięcie.</li>
          </ul></li>
        <li><b>Bezstanowość</b> — każde żądanie zawiera wszystko, co potrzebne do obsługi
        (np. token uwierzytelniający); serwer nie przechowuje stanu sesji klienta,
        co ułatwia skalowanie.</li>
        <li><b>Kody statusu HTTP</b> — <code>200 OK</code>, <code>201 Created</code>,
        <code>404 Not Found</code>, <code>500 Internal Server Error</code>.</li>
        <li>Pozostałe zasady: jednolity interfejs, architektura klient–serwer,
        cache'owalność odpowiedzi, system warstwowy.</li>
      </ul>
      <p><b>Przykład:</b> <code>GET /api/uzytkownicy/15</code> zwraca
      <code>{"id": 15, "imie": "Anna"}</code> ze statusem 200.</p>
      <p>API zgodne z tym stylem nazywa się <b>RESTful</b>. Alternatywy: GraphQL, gRPC, SOAP.</p>
    `
  },
  {
    id: 37,
    pytanie: "Wyjaśnij pojęcia: bagging i boosting w kontekście uczenia maszynowego.",
    odpowiedz: `
      <p>Obie techniki to metody <b>uczenia zespołowego</b> (ensemble) — łączą wiele słabszych
      modeli w jeden mocniejszy, ale robią to odwrotnie:</p>
      <p><b>Bagging</b> (Bootstrap AGGregatING):</p>
      <ul>
        <li>Modele trenowane <b>równolegle i niezależnie</b>, każdy na innej próbce
        bootstrapowej (losowanie ze zwracaniem z danych treningowych).</li>
        <li>Predykcje łączy się głosowaniem większościowym (klasyfikacja) lub uśrednieniem
        (regresja).</li>
        <li>Cel: <b>redukcja wariancji</b> — stabilizuje modele skłonne do przeuczenia,
        jak głębokie drzewa decyzyjne.</li>
        <li>Sztandarowy przykład: <b>las losowy</b> (bagging + losowy podzbiór cech
        w każdym podziale).</li>
      </ul>
      <p><b>Boosting:</b></p>
      <ul>
        <li>Modele trenowane <b>sekwencyjnie</b> — każdy kolejny koncentruje się na błędach
        poprzedników (zwiększa wagi źle sklasyfikowanych próbek albo dopasowuje się do
        rezyduów).</li>
        <li>Wynik to ważona suma wszystkich modeli (zwykle płytkich drzew — "słabych uczniów").</li>
        <li>Cel: <b>redukcja obciążenia (bias)</b> — z prostych modeli buduje bardzo dokładny.</li>
        <li>Przykłady: <b>AdaBoost</b>, <b>Gradient Boosting</b>, <b>XGBoost</b>,
        <b>LightGBM</b>, <b>CatBoost</b>.</li>
      </ul>
      <p><b>Porównanie:</b> bagging — równoległy, odporny na szum i przeuczenie, łatwy do
      zrównoleglenia; boosting — sekwencyjny, zwykle dokładniejszy, ale wrażliwszy na szum
      i wymagający starannego strojenia. Trzecią techniką zespołową jest <b>stacking</b> —
      meta-model uczy się łączyć predykcje różnych modeli.</p>
    `
  },
  {
    id: 38,
    pytanie: "Co to jest boxplot?",
    odpowiedz: `
      <p><b>Boxplot</b> (wykres pudełkowy, wykres ramka-wąsy) to wykres podsumowujący rozkład
      zmiennej za pomocą pięciu statystyk pozycyjnych:</p>
      <ul>
        <li><b>Pudełko</b> — rozciąga się od <b>Q1</b> (pierwszy kwartyl, 25%) do <b>Q3</b>
        (trzeci kwartyl, 75%); jego wysokość to <b>rozstęp międzykwartylowy IQR</b>,
        zawierający środkowe 50% danych.</li>
        <li><b>Linia w pudełku</b> — <b>mediana</b> (Q2, 50%).</li>
        <li><b>Wąsy</b> — sięgają do najdalszych obserwacji mieszczących się w granicach
        <code>Q1 − 1.5·IQR</code> i <code>Q3 + 1.5·IQR</code>.</li>
        <li><b>Punkty poza wąsami</b> — <b>wartości odstające</b> (outliery).</li>
      </ul>
      <p><b>Co można z niego odczytać:</b></p>
      <ul>
        <li>położenie (mediana) i rozproszenie danych (IQR, długość wąsów),</li>
        <li><b>skośność</b> rozkładu — mediana przesunięta w pudełku, nierówne wąsy,</li>
        <li>obecność wartości odstających,</li>
        <li>przy kilku pudełkach obok siebie — wygodne <b>porównanie grup</b>
        (np. rozkład pensji w działach firmy).</li>
      </ul>
      <p>Powszechnie używany w eksploracyjnej analizie danych (EDA), m.in. do wykrywania
      outlierów przed treningiem modelu. W Pythonie: <code>plt.boxplot()</code>,
      <code>sns.boxplot()</code>.</p>
    `
  },
  {
    id: 39,
    pytanie: "Omów Prawo Moore'a.",
    odpowiedz: `
      <p><b>Prawo Moore'a</b> — empiryczna obserwacja Gordona Moore'a (współzałożyciela Intela,
      1965, doprecyzowana 1975): <b>liczba tranzystorów w układzie scalonym podwaja się
      mniej więcej co dwa lata</b> przy zbliżonym koszcie produkcji. Potocznie rozszerza się
      je na wykładniczy wzrost mocy obliczeniowej i spadek kosztu obliczeń.</p>
      <ul>
        <li>To <b>nie jest prawo fizyki</b>, lecz obserwacja trendu, która stała się
        samospełniającą się prognozą — branża planowała pod nią swoje "roadmapy".</li>
        <li>Napędzało rozwój informatyki przez ~50 lat: od układów z tysiącami tranzystorów
        do dziesiątek miliardów.</li>
      </ul>
      <p><b>Ograniczenia i spowolnienie:</b></p>
      <ul>
        <li>bariery fizyczne — rozmiary tranzystorów bliskie granic atomowych, prądy upływu,
        efekty kwantowe,</li>
        <li>bariera cieplna — koniec skalowania Dennarda (~2005): częstotliwości zegara
        przestały rosnąć,</li>
        <li>gwałtownie rosnące koszty fabryk i litografii (EUV).</li>
      </ul>
      <p><b>Konsekwencje dla informatyki:</b> skoro pojedynczy rdzeń przestał przyspieszać,
      rozwój poszedł w <b>wielordzeniowość i równoległość</b> (stąd znaczenie OpenMP, MPI),
      <b>akceleratory specjalizowane</b> (GPU, TPU — kluczowe dla uczenia głębokiego),
      architektury 3D (chiplety, stacking) oraz optymalizację oprogramowania.</p>
    `
  },
  {
    id: 40,
    pytanie: "Co to jest chaos deterministyczny?",
    odpowiedz: `
      <p><b>Chaos deterministyczny</b> to zachowanie układów dynamicznych, które są w pełni
      <b>deterministyczne</b> (brak losowości — przyszłość jednoznacznie wynika z równań
      i stanu początkowego), a mimo to ich zachowanie jest w praktyce
      <b>nieprzewidywalne w dłuższym horyzoncie</b> i wygląda na losowe.</p>
      <p><b>Cechy charakterystyczne:</b></p>
      <ul>
        <li><b>Wrażliwość na warunki początkowe</b> ("efekt motyla") — dwie trajektorie
        startujące z niemal identycznych stanów rozbiegają się <b>wykładniczo</b>
        (mierzy to dodatni wykładnik Lapunowa). Ponieważ warunków początkowych nigdy nie
        znamy idealnie, długoterminowa prognoza jest niemożliwa.</li>
        <li><b>Nieliniowość</b> — chaos występuje tylko w układach nieliniowych.</li>
        <li><b>Ograniczoność i aperiodyczność</b> — trajektorie nie uciekają do
        nieskończoności, ale też nigdy się dokładnie nie powtarzają; w przestrzeni fazowej
        tworzą <b>dziwne atraktory</b> o strukturze fraktalnej (np. atraktor Lorenza).</li>
      </ul>
      <p><b>Klasyczne przykłady:</b></p>
      <ul>
        <li><b>układ Lorenza</b> — uproszczony model konwekcji w atmosferze (stąd granica
        wiarygodnej prognozy pogody to ok. 2 tygodnie),</li>
        <li><b>odwzorowanie logistyczne</b> <code>x(n+1) = r·x(n)·(1−x(n))</code> — prosty
        model populacji, który przy wzroście parametru r przechodzi przez podwajanie okresu
        do chaosu,</li>
        <li>podwójne wahadło, trzy ciała w grawitacji, rynki finansowe, rytm serca.</li>
      </ul>
      <p><b>Sedno:</b> determinizm nie oznacza przewidywalności — proste równania mogą
      generować bardzo złożone zachowanie.</p>
    `
  },
  {
    id: 41,
    pytanie: "Przedstawić i omówić budowę perceptronu. Gdzie przechowywana jest wiedza?",
    odpowiedz: `
      <p><b>Perceptron</b> (Rosenblatt, 1958) to najprostszy model sztucznego neuronu —
      liniowy klasyfikator binarny. <b>Budowa:</b></p>
      <ul>
        <li><b>Wejścia</b> x1…xn — cechy obserwacji.</li>
        <li><b>Wagi</b> w1…wn — po jednej na każde wejście; określają, jak mocno dana cecha
        wpływa na wynik.</li>
        <li><b>Bias</b> (próg) b — przesuwa granicę decyzyjną.</li>
        <li><b>Sumator</b> — liczy sumę ważoną: <code>z = w1·x1 + … + wn·xn + b</code>.</li>
        <li><b>Funkcja aktywacji</b> — w klasycznym perceptronie skokowa:
        wyjście 1, gdy z &gt; 0, inaczej 0.</li>
      </ul>
      <p><b>Uczenie</b> (reguła perceptronu): dla każdej próbki porównuje się predykcję
      z etykietą i przy błędzie koryguje wagi:
      <code>w := w + η·(y − ŷ)·x</code>, gdzie η to współczynnik uczenia. Twierdzenie
      o zbieżności gwarantuje, że dla danych <b>liniowo separowalnych</b> algorytm znajdzie
      rozwiązanie; dla nieseparowalnych (np. problem XOR — słynne ograniczenie wykazane
      przez Minsky'ego i Paperta) pojedynczy perceptron nie działa — potrzeba sieci
      wielowarstwowej z nieliniowymi aktywacjami.</p>
      <p><b>Gdzie jest wiedza?</b> Cała nauczona wiedza perceptronu (i każdej sieci neuronowej)
      jest przechowywana <b>w wagach połączeń i biasach</b> — to jedyne parametry, które
      zmieniają się podczas uczenia. Wagi definiują położenie hiperpłaszczyzny decyzyjnej;
      w sieciach wielowarstwowych rozproszona po milionach wag wiedza koduje coraz bardziej
      złożone reprezentacje danych.</p>
    `
  },
  {
    id: 42,
    pytanie: "Omówić algorytm regresji liniowej. Czy jest to przykład uczenia nadzorowanego, czy nienadzorowanego? Dlaczego?",
    odpowiedz: `
      <p><b>Regresja liniowa</b> modeluje zależność między cechami a ciągłą zmienną wyjściową
      jako funkcję liniową: <code>ŷ = b0 + b1·x1 + … + bn·xn</code>
      (jedna cecha — prosta; wiele cech — hiperpłaszczyzna).</p>
      <p><b>Jak znajduje się współczynniki:</b> minimalizuje się sumę kwadratów błędów
      (różnic między wartościami rzeczywistymi a przewidywanymi) — <b>metoda najmniejszych
      kwadratów</b>. Rozwiązanie uzyskuje się:</p>
      <ul>
        <li><b>analitycznie</b> — wzorem macierzowym (równania normalne):
        <code>b = (XᵀX)⁻¹Xᵀy</code>, dokładne, ale kosztowne dla wielu cech,</li>
        <li><b>iteracyjnie</b> — metodą gradientu prostego, stosowaną przy dużych danych.</li>
      </ul>
      <p>Jakość dopasowania ocenia się m.in. współczynnikiem <b>R²</b> oraz błędami RMSE/MAE.
      Główne założenia: liniowość zależności, niezależność błędów, stała wariancja reszt
      (homoscedastyczność), normalność reszt, brak silnej współliniowości cech.</p>
      <p><b>To uczenie NADZOROWANE.</b> Dlaczego:</p>
      <ul>
        <li>trening wymaga danych z <b>etykietami</b> — dla każdej obserwacji znamy prawdziwą
        wartość y (np. rzeczywistą cenę mieszkania),</li>
        <li>model uczy się przez <b>porównywanie swoich predykcji z poprawnymi
        odpowiedziami</b> i minimalizowanie błędu — czyli jest "nadzorowany" przez znane
        wyniki,</li>
        <li>celem jest przewidywanie y dla nowych danych — a to definicja zadania
        nadzorowanego (konkretnie: <b>regresji</b>, bo wyjście jest ciągłe).</li>
      </ul>
      <p>W uczeniu nienadzorowanym etykiet nie ma — model szuka struktury danych
      (np. grupowanie), czego regresja liniowa nie robi.</p>
    `
  },
  {
    id: 43,
    pytanie: "Na czym polega strategia uczenia one-versus-all? W przypadku jakich problemów jest ona stosowana?",
    odpowiedz: `
      <p><b>One-versus-all (OvA / one-vs-rest, OvR)</b> to strategia sprowadzania
      <b>klasyfikacji wieloklasowej</b> do serii problemów binarnych. Stosuje się ją, gdy mamy
      K klas, a algorytm z natury rozróżnia tylko dwie (np. regresja logistyczna, SVM,
      perceptron).</p>
      <p><b>Działanie:</b></p>
      <ol>
        <li>Dla K klas trenuje się <b>K osobnych klasyfikatorów binarnych</b> — każdy uczy się
        odróżniać jedną klasę ("pozytywną") od wszystkich pozostałych zebranych razem
        ("negatywnych"). Np. dla cyfr 0–9: klasyfikator "0 vs reszta", "1 vs reszta", …,
        "9 vs reszta".</li>
        <li>Przy predykcji nową obserwację ocenia <b>każdy</b> z K klasyfikatorów, zwracając
        pewność (score / prawdopodobieństwo) przynależności do swojej klasy.</li>
        <li>Wybiera się klasę, której klasyfikator dał <b>najwyższą pewność</b>.</li>
      </ol>
      <p><b>Zalety:</b> prostota, tylko K modeli (mało w porównaniu z alternatywami), każdy
      model uczy się na całym zbiorze. <b>Wady:</b> każdy klasyfikator widzi mocno
      niezbalansowane dane (jedna klasa vs wszystkie inne), a pewności różnych modeli nie
      zawsze są porównywalne.</p>
      <p><b>Alternatywa — one-versus-one (OvO):</b> osobny klasyfikator dla każdej pary klas —
      K·(K−1)/2 modeli, wybór przez głosowanie; tak działa wieloklasowość w klasycznym SVM.</p>
      <p><b>Kiedy stosowana:</b> we wszystkich problemach wieloklasowych rozwiązywanych
      klasyfikatorami binarnymi — rozpoznawanie cyfr i liter, kategoryzacja tekstów,
      rozpoznawanie obiektów. W scikit-learn: <code>OneVsRestClassifier</code> (regresja
      logistyczna używa OvR domyślnie w wariancie wieloklasowym).</p>
    `
  },
  {
    id: 44,
    pytanie: "Przedstawić metodę gradientu prostego. Jakie są jej założenia? W jakim celu się ją stosuje?",
    odpowiedz: `
      <p><b>Gradient prosty</b> (gradient descent) to iteracyjna metoda znajdowania
      <b>minimum funkcji</b>. Idea: gradient wskazuje kierunek najszybszego wzrostu funkcji,
      więc poruszając się <b>w kierunku przeciwnym</b>, schodzimy w dół — jak schodzenie
      ze wzgórza we mgle, zawsze w stronę największego spadku.</p>
      <p><b>Algorytm:</b></p>
      <ol>
        <li>Wybierz punkt startowy (np. losowe parametry θ).</li>
        <li>Policz gradient funkcji kosztu ∇J(θ) w bieżącym punkcie.</li>
        <li>Zrób krok pod prąd gradientu: <code>θ := θ − η·∇J(θ)</code>,
        gdzie <b>η to współczynnik uczenia</b> (learning rate).</li>
        <li>Powtarzaj aż do zbieżności (gradient bliski zeru / brak poprawy).</li>
      </ol>
      <p><b>Założenia i warunki:</b></p>
      <ul>
        <li>funkcja musi być <b>różniczkowalna</b> (da się policzyć gradient),</li>
        <li>gwarancję znalezienia minimum globalnego daje tylko funkcja <b>wypukła</b>
        (np. koszt regresji liniowej); dla niewypukłych (sieci neuronowe) metoda może
        utknąć w minimum lokalnym lub punkcie siodłowym,</li>
        <li>krytyczny jest dobór η: za mały — bardzo wolna zbieżność, za duży — przeskakiwanie
        minimum i rozbieganie się,</li>
        <li>cechy powinny być przeskalowane — przyspiesza to zbieżność.</li>
      </ul>
      <p><b>Warianty:</b> <b>batch</b> (gradient z całego zbioru — dokładny, wolny),
      <b>stochastyczny SGD</b> (z jednej próbki — szybki, szumny),
      <b>mini-batch</b> (kompromis, standard w praktyce); ulepszenia: momentum, RMSprop,
      <b>Adam</b>.</p>
      <p><b>Cel stosowania:</b> to podstawowy sposób <b>uczenia modeli ML</b> — minimalizacja
      funkcji kosztu, czyli dopasowanie parametrów regresji liniowej i logistycznej oraz
      wag sieci neuronowych (w połączeniu z propagacją wsteczną), zwłaszcza gdy rozwiązanie
      analityczne nie istnieje lub jest zbyt kosztowne.</p>
    `
  },
  {
    id: 45,
    pytanie: "Wymienić przynajmniej 5 wzorców projektowych GoF. Wybrać i scharakteryzować 2 z nich. Jakie problemy dzięki nim są rozwiązywane?",
    odpowiedz: `
      <p><b>Przykładowe wzorce GoF</b> (Gang of Four, książka "Design Patterns" 1994):</p>
      <ul>
        <li>kreacyjne: <b>Singleton</b>, <b>Factory Method</b>, Abstract Factory, <b>Builder</b>,
        Prototype,</li>
        <li>strukturalne: <b>Adapter</b>, <b>Dekorator</b>, Fasada, Kompozyt, Proxy,</li>
        <li>behawioralne: <b>Obserwator</b>, <b>Strategia</b>, Template Method, Iterator,
        Command, State.</li>
      </ul>
      <p><b>1. Singleton</b> (kreacyjny) — gwarantuje, że klasa ma <b>dokładnie jedną
      instancję</b> i daje globalny punkt dostępu do niej. Realizacja: prywatny konstruktor
      + statyczna metoda <code>getInstance()</code> zwracająca jedyny egzemplarz (tworzony
      leniwie; w środowisku wielowątkowym z synchronizacją).
      <br><b>Rozwiązywany problem:</b> zasoby, które muszą być wspólne i jedyne — konfiguracja
      aplikacji, pula połączeń do bazy, logger. Zapobiega konfliktom i marnowaniu zasobów
      przy wielu instancjach. (Uwaga: nadużywany utrudnia testowanie — bywa krytykowany.)</p>
      <p><b>2. Obserwator</b> (behawioralny) — definiuje relację <b>jeden-do-wielu</b>: obiekt
      obserwowany (subject) przechowuje listę obserwatorów i <b>automatycznie powiadamia ich
      o każdej zmianie stanu</b> (wywołując ich metodę <code>update()</code>). Obserwatorzy
      mogą się rejestrować i wyrejestrowywać w locie.
      <br><b>Rozwiązywany problem:</b> luźne powiązanie źródła zdarzeń z reagującymi na nie
      obiektami — nadawca nie musi znać odbiorców. To fundament systemów zdarzeń GUI
      (kliknięcia przycisków), wzorca MVC (widoki obserwują model), powiadomień
      i architektur publish-subscribe.</p>
      <p><b>Po co wzorce w ogóle:</b> to sprawdzone, nazwane rozwiązania powtarzających się
      problemów projektowych — dają wspólny język zespołu, zmniejszają sprzężenie kodu
      i ułatwiają jego rozszerzanie oraz utrzymanie.</p>
    `
  },
  {
    id: 46,
    pytanie: "Czym różni się proces od wątku? Wyjaśnić oba pojęcia i podać główne różnice.",
    odpowiedz: `
      <p><b>Proces</b> to wykonujący się program wraz z przydzielonymi zasobami: <b>własną,
      izolowaną przestrzenią adresową</b>, otwartymi plikami, gniazdami itd. System operacyjny
      tworzy go, planuje i chroni przed innymi procesami.</p>
      <p><b>Wątek</b> to jednostka wykonania <b>wewnątrz procesu</b> — najmniejsza jednostka
      planowana przez system. Proces ma co najmniej jeden wątek; wątki tego samego procesu
      <b>współdzielą pamięć</b> (kod, dane, sterta), a własne mają tylko stos, rejestry
      i licznik rozkazów.</p>
      <p><b>Główne różnice:</b></p>
      <ul>
        <li><b>Pamięć:</b> procesy — osobne przestrzenie adresowe (izolacja);
        wątki — wspólna pamięć procesu.</li>
        <li><b>Komunikacja:</b> między procesami wymaga mechanizmów IPC (potoki, gniazda,
        pamięć współdzielona, kolejki) — wolniejsza; między wątkami — bezpośrednio przez
        wspólne zmienne — szybka, ale wymaga <b>synchronizacji</b> (mutexy, semafory),
        bo grożą wyścigi (race conditions) i zakleszczenia.</li>
        <li><b>Koszt:</b> utworzenie procesu i przełączanie kontekstu między procesami jest
        drogie; wątki są "lekkie" — tworzenie i przełączanie dużo tańsze.</li>
        <li><b>Odporność na błędy:</b> awaria procesu nie rusza innych procesów;
        błąd jednego wątku może wywrócić cały proces.</li>
      </ul>
      <p><b>Przykład:</b> przeglądarka trzyma każdą kartę w osobnym <b>procesie</b>
      (izolacja — awaria karty nie zabija reszty), a wewnątrz karty <b>wątki</b> równolegle
      renderują stronę, pobierają dane i obsługują interfejs.
      W Pythonie uwaga na <b>GIL</b>: wątki nie dają prawdziwej równoległości CPU — do
      obliczeń używa się <code>multiprocessing</code>.</p>
    `
  },
  {
    id: 47,
    pytanie: "Różnice pomiędzy relacyjną i nierelacyjną bazą danych. Przykłady zastosowań obu typów baz danych.",
    odpowiedz: `
      <p><b>Relacyjne (SQL):</b> dane w tabelach (wiersze/kolumny) połączonych relacjami przez
      klucze; <b>sztywny, z góry zdefiniowany schemat</b>; język zapytań SQL z JOIN-ami;
      transakcje <b>ACID</b> (atomowość, spójność, izolacja, trwałość); skalowanie głównie
      <b>pionowe</b> (mocniejszy serwer). Przykłady: PostgreSQL, MySQL, Oracle, SQL Server.</p>
      <p><b>Nierelacyjne (NoSQL):</b> różne modele danych — dokumentowe (MongoDB),
      klucz-wartość (Redis), kolumnowe (Cassandra), grafowe (Neo4j); <b>elastyczny schemat</b>
      (dokumenty mogą się różnić strukturą); skalowanie <b>poziome</b> (dokładanie węzłów,
      sharding); zwykle model <b>BASE</b> — spójność ostateczna zamiast pełnego ACID
      (kompromis opisany twierdzeniem CAP).</p>
      <p><b>Najważniejsze różnice w skrócie:</b></p>
      <ul>
        <li>schemat: sztywny vs elastyczny,</li>
        <li>spójność: silna (ACID) vs ostateczna (BASE),</li>
        <li>skalowanie: pionowe vs poziome,</li>
        <li>zapytania: standardowy SQL i złożone JOIN-y vs API/języki specyficzne,
        dane często denormalizowane.</li>
      </ul>
      <p><b>Zastosowania relacyjnych:</b> systemy bankowe i finansowe (wymagane transakcje),
      ERP/CRM, sklepy internetowe (zamówienia, płatności), magazyny — wszędzie tam, gdzie
      dane są ustrukturyzowane, a spójność krytyczna.</p>
      <p><b>Zastosowania NoSQL:</b> media społecznościowe i aplikacje o ogromnej skali,
      cache i sesje (Redis), katalogi produktów o zmiennych atrybutach (MongoDB),
      dane IoT i logi (Cassandra), rekomendacje i sieci powiązań (Neo4j), Big Data.</p>
      <p>W praktyce systemy często łączą oba typy (persistence poliglotyczna) —
      np. PostgreSQL do zamówień + Redis do cache'a.</p>
    `
  },
  {
    id: 48,
    pytanie: "Opisać algorytm analizy głównych składowych (PCA). Na czym polega i kiedy się go stosuje?",
    odpowiedz: `
      <p><b>PCA</b> (Principal Component Analysis) to metoda <b>redukcji wymiarowości</b>:
      przekształca skorelowane cechy w nowy, mniejszy zestaw nieskorelowanych zmiennych —
      <b>głównych składowych</b> — zachowując jak najwięcej informacji (wariancji) z danych.</p>
      <p><b>Idea:</b> pierwsza składowa to kierunek w przestrzeni cech, wzdłuż którego dane
      mają <b>największą wariancję</b>; druga — największą wariancję spośród kierunków
      prostopadłych do pierwszej, itd. Odrzucając składowe o małej wariancji, rzutujemy dane
      na mniej wymiarów z minimalną stratą informacji.</p>
      <p><b>Kroki algorytmu:</b></p>
      <ol>
        <li><b>Standaryzacja</b> danych (średnia 0, odchylenie 1) — konieczna, bo PCA jest
        wrażliwe na skalę cech.</li>
        <li>Wyznaczenie <b>macierzy kowariancji</b> cech.</li>
        <li>Obliczenie jej <b>wartości i wektorów własnych</b> (w praktyce przez SVD) —
        wektory własne to kierunki składowych, wartości własne to ich wariancje.</li>
        <li>Posortowanie składowych malejąco po wariancji i wybór k pierwszych
        (np. tylu, by wyjaśniały 95% wariancji — pomaga wykres osypiska).</li>
        <li><b>Rzutowanie</b> danych na wybrane składowe → nowy zbiór o k wymiarach.</li>
      </ol>
      <p><b>Kiedy się stosuje:</b></p>
      <ul>
        <li><b>redukcja wymiarowości</b> przed treningiem — mniej cech = szybszy trening,
        mniejsze przeuczenie, walka z przekleństwem wymiarowości,</li>
        <li><b>wizualizacja</b> danych wielowymiarowych w 2D/3D,</li>
        <li><b>usuwanie współliniowości</b> — składowe są nieskorelowane,</li>
        <li>odszumianie danych, kompresja (np. obrazów).</li>
      </ul>
      <p><b>Ograniczenia:</b> wychwytuje tylko zależności <b>liniowe</b> (nieliniowe: kernel
      PCA, t-SNE, UMAP), nowe składowe trudno interpretować, to metoda nienadzorowana —
      nie patrzy na etykiety, więc maksymalna wariancja nie zawsze oznacza najlepszą
      separację klas.</p>
    `
  },
  {
    id: 49,
    pytanie: "Konteneryzacja a wirtualizacja. Opisz różnice i podaj przykłady technologii.",
    odpowiedz: `
      <p>Obie techniki izolują aplikacje od siebie i od sprzętu, ale na różnym poziomie:</p>
      <p><b>Wirtualizacja</b> — <b>hipernadzorca</b> (hypervisor) tworzy pełne <b>maszyny
      wirtualne</b>, z których każda ma własny, kompletny system operacyjny (jądro, sterowniki)
      i zwirtualizowany sprzęt.</p>
      <ul>
        <li>technologie: <b>VMware</b>, <b>VirtualBox</b>, <b>Hyper-V</b>, <b>KVM</b>;
        hipernadzorcy typu 1 (na sprzęcie: ESXi, Hyper-V) i typu 2 (na systemie: VirtualBox),</li>
        <li>cechy: silna izolacja, możliwość różnych systemów na jednym hoście
        (Linux na Windows), ale duży narzut — każda VM to gigabajty i minuty startu.</li>
      </ul>
      <p><b>Konteneryzacja</b> — kontenery <b>współdzielą jądro systemu hosta</b>, a izolowane
      są na poziomie systemu operacyjnego (przestrzenie nazw i cgroups w Linuksie). Kontener
      zawiera tylko aplikację i jej zależności (biblioteki, runtime).</p>
      <ul>
        <li>technologie: <b>Docker</b>, Podman, containerd; orkiestracja: <b>Kubernetes</b>,
        Docker Compose/Swarm,</li>
        <li>cechy: lekkość (megabajty), start w sekundy, duża gęstość na jednym hoście,
        przenośność obrazów ("działa u mnie" znika), ale słabsza izolacja
        (wspólne jądro) i naturalnie tylko system zgodny z jądrem hosta.</li>
      </ul>
      <p><b>Kluczowa różnica:</b> VM wirtualizuje <b>sprzęt</b> i niesie cały OS;
      kontener wirtualizuje <b>system operacyjny</b> i niesie tylko aplikację.</p>
      <p><b>Zastosowania:</b> wirtualizacja — konsolidacja serwerów, chmura (IaaS), środowiska
      wymagające silnej izolacji lub różnych OS; konteneryzacja — mikroserwisy, CI/CD,
      skalowalne wdrożenia (Kubernetes), pakowanie środowisk ML. W praktyce łączy się oba:
      kontenery działają wewnątrz maszyn wirtualnych w chmurze.</p>
    `
  },
  {
    id: 50,
    pytanie: "Proszę wyjaśnić na czym polega uczenie zespołowe?",
    odpowiedz: `
      <p><b>Uczenie zespołowe</b> (ensemble learning) polega na <b>łączeniu predykcji wielu
      modeli</b> w jedną wspólną decyzję — zespół zwykle osiąga lepszą dokładność i stabilność
      niż najlepszy pojedynczy model. To zasada "mądrości tłumu": jeśli modele są w miarę
      trafne i <b>popełniają różne błędy</b> (są zróżnicowane), ich błędy się uśredniają.</p>
      <p><b>Sposoby łączenia predykcji:</b> głosowanie większościowe lub ważone (klasyfikacja),
      uśrednianie (regresja), albo osobny model uczący się łączyć wyniki.</p>
      <p><b>Główne techniki:</b></p>
      <ul>
        <li><b>Bagging</b> — wiele modeli trenowanych <b>równolegle</b> na różnych próbkach
        bootstrapowych; redukuje <b>wariancję</b> (przeuczenie).
        Przykład: <b>las losowy</b>.</li>
        <li><b>Boosting</b> — modele trenowane <b>sekwencyjnie</b>, każdy kolejny poprawia
        błędy poprzedników; redukuje <b>obciążenie</b> (bias).
        Przykłady: AdaBoost, <b>XGBoost</b>, LightGBM.</li>
        <li><b>Stacking</b> — predykcje różnych modeli (np. SVM + las + sieć) stają się
        wejściem dla <b>meta-modelu</b>, który uczy się je optymalnie łączyć.</li>
        <li><b>Voting</b> — proste głosowanie kilku różnych, niezależnie wytrenowanych
        klasyfikatorów.</li>
      </ul>
      <p><b>Warunek skuteczności:</b> różnorodność modeli — osiągana przez różne próbki danych
      (bagging), różne podzbiory cech (las losowy), różne algorytmy (stacking) lub różne wagi
      próbek (boosting).</p>
      <p><b>Zalety:</b> wyższa dokładność, odporność na przeuczenie i szum — zespoły wygrywają
      większość konkursów na danych tabelarycznych. <b>Wady:</b> większy koszt obliczeniowy
      i gorsza interpretowalność niż pojedynczy model.</p>
    `
  }
];
