
# Browsing Data

Collect the natural behavior of different actions executed on the browser. This data can be downloaded as a CSV.
## Details

All of it is written in vanilla JS.\
Data is stored in localStorage.\
Extension permissions:
- tabs
## Intended Purpose

Use this data to implement human like behavior in bots interacting with websites.
## Actions Supported

- mousedown
- mouseup
- scrolling
- keydown
- keyup
- a mousedown immediately followed by a mouseup can be converted to a click
- two clicks in less than a 500ms interval can be condensed to a double click
## Read the CSV file

The file name is built like so:
- the type of data (detailed or condensed)
- the current date (day-month-date-year)
- the domain name

In the CSV file, the data presented varies depending on the action.

For a mousedown/mouseup:
- page title the action was executed on
- page url the action was executed on
- the type of action executed
- the action id
- the text content of the element hovered at the time of the action
- the x coordinate of the cursor
- the y coordinate of the cursor
- the timestamp in millisecond (JavaScript Date.now())

For a click:
- page title the action was executed on
- page url the action was executed on
- the type of action executed
- the action id
- the text content of the element hovered on mousedown
- the text content of the element hovered on mouseup
- the x coordinate of the cursor on mousedown
- the y coordinate of the cursor on mousedown
- the x coordinate of the cursor on mouseup
- the y coordinate of the cursor on mouseup
- the timestamp in millisecond (JavaScript Date.now()) of the mouseup action
- the click time in millisecond

For a double click:
- page title the action was executed on
- page url the action was executed on
- the type of action executed
- the first click id
- the second click id
- the text content of the element hovered on the first mouseup
- the text content of the element hovered on the second mouseup
- the x coordinate of the cursor on first mouseup
- the y coordinate of the cursor on first mouseup
- the x coordinate of the cursor on second mouseup
- the y coordinate of the cursor on second mouseup
- the timestamp in millisecond (JavaScript Date.now()) of the second mouseup action
- the sum of the two click times in millisecond

For a scroll:
- page title the action was executed on
- page url the action was executed on
- the type of action executed
- the action id
- the scroll direction
- the height scrolled in px
- the timestamp in millisecond (JavaScript Date.now()) at the end of the scroll

For a keydown/keyup
- page title the action was executed on
- page url the action was executed on
- the type of action executed
- the action id
- the timestamp in millisecond (JavaScript Date.now())
## Actions to come

- Key press (any)
## Contributing

Pointers on algorithm optimization when it comes to both speed and memory usage are greatly appreciated.
