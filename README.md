# iVysílání pro tvOS
Neoficiální klient iVysílání pro Apple TV umožňující sledování videoobsahu veřejnoprávní České televize. Postaven s použitím TVML a [atvjs](https://github.com/emadalam/atvjs) frameworku.

Problémy hlašte v Issues.

Ukázka aplikace na YouTube: https://youtu.be/2osctVNAr7s <br>
<img src="http://marhycz.github.io/ivysilani_tvOS/img/homescreen.jpg" width="400"><img src="http://marhycz.github.io/ivysilani_tvOS/img/livechannels.jpg" width="400">
<img src="http://marhycz.github.io/ivysilani_tvOS/img/letter.jpg" width="400">
<img src="http://marhycz.github.io/ivysilani_tvOS/img/episodes.jpg" width="400">
<img src="http://marhycz.github.io/ivysilani_tvOS/img/episodeinfo.jpg" width="400">
<img src="http://marhycz.github.io/ivysilani_tvOS/img/dates.jpg" width="400">
<img src="http://marhycz.github.io/ivysilani_tvOS/img/date.jpg" width="400">

### Jak tedy aplikaci spustit?
Stačí zkompilovat projekt ve složce native v Xcode a poslat na Apple TV.

Javascriptovou část aplikace hostuji zde na githubu v gh-pages branch, tedy při případném updatu postačí vypnout/zapnout aplikaci na Apple TV.

Případně poslat soukromou zprávu na fórum http://www.xbmc-kodi.cz/prispevek-apple-tv-ivysilani-pro-tvos a pokud budu moct, přidám do TestFlightu.

<hr /> 

### Struktura
Projekt je rozdělený do 2 částí

- native: tato složka obsahuje Xcode projekt. Soubor AppDelegate.swift se stará o nastavení TVMLKit frameworku a spuštění JavaScriptové aplikace. Nativní část se měnit nebude, výhoda pro uživatele je tedy, že aplikaci bude muset zkompilovat jen jednou.

- web: tato složka obsahuje JavaScript a TVML zdrojové soubory potřebné pro kompilaci aplikace. Obsah složky web/public by měl běžet na webovém serveru, na který bude mít aplikace přístup.

### Jak začít s vývojem

Pokud máte nainstalovnaný [nodejs](https://nodejs.org/) a [npm](https://www.npmjs.com/) stačí následující příkazy ve složce s projektem:

```shell
$ npm install -g gulp                   # Install Gulp globally
$ npm install                           # Install dependencies
```

### Spuštění testovacího webserveru
Zkompiluje .js aplikaci a spustí výchozí webserver na portu 9001. Server hlídá změny a při každém uložení zdrojového souboru znovu překompiluje aplikaci.

```shell
$ npm start
```

