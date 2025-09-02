# SSR Editor

Konfiguration:

1. Installerade npm via npm install
2. Skapade en .env-fil för att konfigurera PORT för att möjliggöra kommandot *npm app.mjs*
    1. *felkod*: *Example app listening on port undefined*
3. Körde sudo apt install sqlite3  för att kunna göra en reset av databasen via bashskriptet då *documents-tabellen*  verkade saknas i databasen.
    1. *felkod: SQLITE_ERROR: no such table: documents*
    2. *felkod:*sqlite3: command not found*
4. Modifiering av app.get i app.mjs då den ursprungliga funktionen får sidan att krascha då det inte finns något dokument i databasen med det *doc.title*, vilket gör att funktionen getOne returnerar undefined eller null.
    1. *felkod: Cannot read properties of undefined (reading 'title')*
5. För detta projekt har vi valt att använda oss av frontend ramverket React.

Arbetssätt och beslutsvägar: pull-requests/Code-review.

Vi har beslutat att prioritera funktionalitet framför felhantering. Detta innehär att vår utgångspunkt under arbetsprocessen kommer att vara att implementera kod enligt basfall och modifierar koden när vi identifierar behov för ytterligare lager av felhantering under felsökningen i samband med pull-request. Vårt ledord är "kort och konkret", och med detta arbetssätt tror vi att vi kan minska risken för att felhanteringen blir för komplex allterftersom lager byggs på.

Vi har även beslutat att en pull-request kommer att ske vid slutförandet av varje feature i en ny branch. Diskussionsunderlaget kommer då utgå ifrån vårt ledord.

