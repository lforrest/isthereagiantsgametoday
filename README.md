# Is there a Giants game today?

## Getting the code

To get a local copy of the current code, clone it using git:

    $ git clone git://github.com/lforrest/isthereagiantsgametoday.git isthereagiantsgametoday

    $ cd isthereagiantsgametoday

## Running the code

1. Generate the schedule using `make build` or `python ./get_schedule.py`
2. Start a local http server using `make serve` or `python -m SimpleHTTPServer`
3. Point your browser to <http://localhost:8000>

## Cleaning up

The Makefile offers a `make clean` that will remove all json files from the data directory.

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
