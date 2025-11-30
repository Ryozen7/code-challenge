// Provide 3 unique implementations of the following function in JavaScript.
// **Input**: `n` - any integer
// *Assuming this input will always produce a result lesser than `Number.MAX_SAFE_INTEGER`*.
// **Output**: `return` - summation to `n`, i.e. `sum_to_n(5) === 1 + 2 + 3 + 4 + 5 === 15`.
// Assume input can be negative integers

// Iterative Implementation
var sum_to_n_a = function(n) {
  let sum = 0;

  if (n > 0) {
    for (let i = 1; i <= n; i++) sum += i;
  } else {
    for (let i = -1; i >= n; i--) sum += i;
  }

  return sum;
}

// Recursive Implementation
var sum_to_n_b = function(n) {
  if (n === 0) return 0;
  if (n > 0) return n + sum_to_n_b(n - 1);
  else return n + sum_to_n_b(n + 1);
}

// Mathemarical Formula
var sum_to_n_c = function(n) {
  if (n >= 1) {
    return (n * (n + 1)) / 2;
  } else if (n <= -1) {
    return (n * (n - 1)) / 2;
  }
  return 0; // n === 0
};

// ***Logic Explanation and Comparison:
// The loop method works by adding numbers one by one,
//  which is easy to understand but becomes slow 
// when the number is very large. The recursive method 
// also adds numbers step by step, but it uses repeated
// function calls, which can crash if the number is too
// big, making it the least reliable. The formula method
// is the best because it instantly calculates the total
// using a simple math equation—no loops, no repeated 
// calls—so it’s the fastest, most efficient, and easiest 
// to maintain in real projects.