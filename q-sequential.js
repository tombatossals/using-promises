var Q = require('q');

const NUMBER = 5;

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
        console.log("Finished " + number + ".");
        df.resolve(number);
    }, 3000);

    return df.promise;
}

var values = arrayOfNumbers(NUMBER);

var chainPromises = function(promises) {
    var first = promises[0];
    promises = promises.splice(1);
    console.log("Starting " + first + "...");
    return promises.reduce(function(previous, item) {
        return previous.then(function(value) {
            console.log("Starting " + item + "...");
            return waitFn(item);
        });
    }, waitFn(first));
};

chainPromises(values).then(function(res) {
    console.log("done.");
});
