# iVysílání pro tvOS
Neoficiální klient iVysílání pro Apple TV umožňující sledování videoobsahu veřejnoprávní České televize. Postaven s použitím TVML a [atvjs](https://github.com/emadalam/atvjs) frameworku.

Problémy hlašte v Issues.

![Domácí obrazovka](img/homescreen.jpg)
![Živé vysílání](img/livechannels.jpg)
![Dle abecedy](img/letter.jpg)
![Epizody](img/episodes.jpg)
![Info](img/episodeinfo.jpg)
![Dle data](img/dates.jpg)
![Přehled dle data](img/date.jpg)

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

### Struktura
Projekt je rozdělený do 2 částí

- native: tato složka obsahuje Xcode projekt. Soubor AppDelegate.swift se stará o nastavení TVMLKit frameworku and spuštění JavaScriptové aplikace.
- web: tato složka obsahuje JavaScript a TVML zdrojové soubory potřebné pro kompilaci aplikace. Obsah složky web/public by měl běžet na webovém serveru, na který bude mít aplikace přístup.

