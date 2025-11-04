function tri(numbers, order) {
    if (order === "asc") {
        return numbers.sort((a, b) => a - b);
    } else if (order === "desc") {
        return numbers.sort((a, b) => b - a);
    }
    return numbers;
}

console.log(tri([5, 2, 9, 1, 5, 6], "asc"));
// =
//   [1, 2, 5, 5, 6, 9] 
console.log(tri([5, 2, 9, 1, 5, 6], "desc"));
// =
//  [9, 6, 5, 5, 2, 1]