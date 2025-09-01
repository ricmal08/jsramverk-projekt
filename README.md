# SSR Editor

Konfiguration:

1. Skapade en .env-fil för att konfigurera PORT för att möjliggöra kommandot *npm app.mjs*
    1. *felkod*: *Example app listening on port undefined*
2. Körde sudo apt install sqlite3  för att kunna göra en reset av databasen via bashskriptet då *documents-tabellen*  verkade saknas i databasen.
    1. *felkod: SQLITE_ERROR: no such table: documents*
    2. *felkod:*sqlite3: command not found*
3. Modifiering av app.get i app.mjs då den ursprungliga funktionen får sidan att krascha då det inte finns något dokument i databasen med det *doc.title*, vilket gör att funktionen getOne returnerar undefined eller null.
    1. *felkod: Cannot read properties of undefined (reading 'title')*
