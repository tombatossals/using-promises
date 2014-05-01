var Q = require('q');

const NUMBER = 5;

var waitFn = function(number) {
    var df = Q.defer();
    setTimeout(function() {
        console.log("done " + number + ".");
        df.resolve(true);
    }, 3000);

    return df.promise;
}

var promises = [];
for (var i =0; i< NUMBER; i++) {
    console.log("Starting " + i + "...");
    promises.push(waitFn(i));
}

Q.all(promises).then(function(res) {
    console.log("end.");
});
