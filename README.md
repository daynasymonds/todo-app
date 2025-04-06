# ToDo List App

An app to allow users to easily add, modify, and remove tasks.

```bash
$ docker compose up
$ npm test
$ npm run dev
```

## local postgres

```bash
# To connect
psql -h localhost -U admin -d app_db

# To bootstrap
psql -h localhost -U admin -d app_db -f sql/bootstrap.sql

# To backup
pg_dump -h localhost -U admin -d app_db -f sql/backup.sql
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


See [system design](design.md) for details.

To do:
* aria labels
* tests

* handle completed items list
    * if no completed items exist, "completed items" sections should not show
* handle many todo cards
    * a dashboard should allow to create a new todo card
    * existing todo cards should be presented in a section below
    * clicking on a todo card should present the card in front of other content.
* reset password functionality
* oauth login
* cleanup, comments, lint
* tests