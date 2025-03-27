# ToDo List App

An app to allow users to easily add, modify, and remove tasks.

```bash
$ docker compose up
$ npm test
$ npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


See [system design](design.md) for details.

To do:
* aria labels
* tests
* better checkbox images
* handle completed items list
    * marking an item completed should remove it from the todo list and add it to the completed items list
    * if any completed items exist, a separate todo list should appear under a horizontal line of the todo list
    * marking a completed item as "not complete" should remove it from the completed list and add it to the todo list
    * a list title of "X Completed items" 
    * should be collapsible
* handle many todo cards
    * a dashboard should allow to create a new todo card
    * existing todo cards should be presented in a section below
    * clicking on a todo card should present the card in front of other content.