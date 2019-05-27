function initial() {
    return 1;
}

function simple_sum(a, b) {
    return a + b;
}

function depending_sum(a, b) {
    return initial() + a + b;
}

function async_sum(a, b) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({
                value: initial() + a + b,
                param1: a,
                param2: b,
            });
        }, 100);
    });
}

module.exports.simple_sum = simple_sum;
module.exports.depending_sum  = depending_sum;
module.exports.async_sum = async_sum;
