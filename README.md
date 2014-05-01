using-promises
==============

Examples of using promises with Node.JS

* '''q-parallel.js'''. Starts an specified number of functions in parallel, waits until are resolved, and finish execution.
* '''q-sequential.js'''. Starts an specified number of functions, one by one, next function starts only when previous function has end.
* '''q-sequential-group-parallel.js'''. Execute an specified number of functions, but only an specified number of them in parallel, when a group of executed promises ends, starts the next group.
