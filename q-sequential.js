var Q = require('q');

const NUMBER = 5;

var waitFn = function(number) {
    var df = Q.defer();
    setTimeout(function() {
        console.log("Finished " + number + ".");
        df.resolve(number);
    }, 3000);

    return df.promise;
}

var values = [ 0, 1, 2, 3, 4, 5 ];

var chainPromises = function(promises) {
    var first = promises[0];
    promises = promises.splice(1);
    return promises.reduce(function(previous, item) {
        return previous.then(function(value) {
            console.log("Starting " + item + "...");
            return waitFn(item);
        });
    }, Q(first));
};

chainPromises(values).then(function(res) {
    console.log("done.");
});
