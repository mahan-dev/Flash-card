# Architecture:

Single page app:

index.html

- container for app

app.js:

- state: cards[]
- functions:
  - addCard()
  - renderCards()
  - flipCard()
  - markLearned()

Data flow:
UI -> JS State -> localStorage -> UI

style.css

- styles for app
