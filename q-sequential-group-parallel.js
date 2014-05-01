var Q = require('q');

const NUMBER = 50;
const GROUPED = 5;

var arrayOfNumbers = function(num) {
    var res = [];
    for (var i=0; i< num; i++) {
        res.push(i);
    }

    return res;
};

var waitFn = function(number) {
    var df = Q.defer();
    setTimeout(function() {
        console.log("Finished promise " + number + ".");
        df.resolve(number);
    }, 3000);

    return df.promise;
}

var values = arrayOfNumbers(NUMBER);

var parallelPromises = function(values) {
    var df = Q.defer(),
        promises = [];

    for (var i in values) {
        console.log("Starting promise " + values[i]);
        promises.push(waitFn(values[i]));
    }

    Q.all(promises).then(function() {
        console.log("Ended group " + values);
        df.resolve();
    });

    return df.promise;
}

var chainPromises = function(promises) {
    var first = promises[0];
    promises = promises.splice(1);
    console.log("Starting group " + first + "...");
    return promises.reduce(function(previous, item) {
        return previous.then(function(value) {
            console.log("Starting group " + item + "...");
            return parallelPromises(item);
        });
    }, parallelPromises(first));
}

var chainGroupedPromises = function(values) {
    var df = Q.defer();
    var blocks = [];
    for (var i=0; i<values.length; i+=GROUPED) {
        var chunk = values.slice(i, i+GROUPED);
        blocks.push(chunk);
    }

    return chainPromises(blocks);
};

chainGroupedPromises(values).then(function(res) {
    console.log("done.");
});
