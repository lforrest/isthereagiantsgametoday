# Is there a Giants game today?

## Getting the code

To get a local copy of the current code, clone it using git:

    $ git clone git://github.com/lforrest/isthereagiantsgametoday.git isthereagiantsgametoday

    $ cd isthereagiantsgametoday

## Running the code

The index.html file represents the main page that you see at https://isthereagiantsgametoday.com/.

Chrome and other browsers generally don't allow loading the json file when access the index file via the file:/// protocol (aka, if you open index.html directly, it won't work).  (You can try, but if you open the web inspector / Javascript console, you'll likely see the error: `XMLHttpRequest cannot load file:/// ... giants2012schedule.json. Origin null is not allowed by Access-Control-Allow-Origin.`.)

To get around this, you can use one of many [http static server one-liners](https://gist.github.com/willurd/5720255) - just pick whatever language you already have installed and then run that corresponding line in the root directory of this project, then navigate to http://localhost:8000/

## Contributing

isthereagiantsgametoday.com is a community-driven project, so contributors are always welcome. Simply fork our repo and contribute away. Good starting places for picking a bug are the TODOs listed below.

and of course our open Github issues:

    https://github.com/lforrest/isthereagiantsgametoday/issues

For better consistency and long-term stability, please do look around the code and try to follow our conventions. More information about the contributor process can be found on the contributor wiki page.

If you don't want to hack on the project or have little spare time, you still can help! Just open http://isthereagiantsgametoday.com report any issues you see.

Our Github contributors so far:

    https://github.com/lforrest/isthereagiantsgametoday/contributors

You can add your name to it! :)

## TODOs

* Offline support
* Fun daily messages and graphics
