"use strict";
// Exporting a function named 'random' that generates a random string of a given length.
Object.defineProperty(exports, "__esModule", { value: true });
exports.random = random;
function random(len) {
    let options = "abcdefghijklmnopqrstuvwxyz";
    let length = options.length;
    let ans = "";
    for (let i = 0; i < len; i++) {
        ans += options[Math.floor(Math.random() * length)];
    }
    return ans;
}
