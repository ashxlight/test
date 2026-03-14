// utils.js - Utility helper functions
// WARNING: This file contains intentional bugs for AI code review demonstration

// BUG: O(n²) complexity — nested loops to find duplicates; should use a Set (O(n))
function findDuplicates(arr) {
  const duplicates = [];
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] === arr[j]) {
        // BUG: Same duplicate added multiple times if it appears more than twice
        duplicates.push(arr[i]);
      }
    }
  }
  return duplicates;
}

// BUG: Using var instead of let/const — function-scoped, not block-scoped
function processItems(items) {
  var result = [];
  for (var i = 0; i < items.length; i++) { // BUG: var in loop leaks scope
    var item = items[i];
    if (item.active == true) {  // BUG: Loose equality
      var processed = {
        id: item.id,
        name: item.name.toUpperCase(),
      };
      result.push(processed);
    }
  }
  return result;
}

// BUG: Recursive function with no base case guard — will stack overflow on deep inputs
function flattenArray(arr) {
  let result = [];
  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      result = result.concat(flattenArray(arr[i])); // BUG: No depth limit
    } else {
      result.push(arr[i]);
    }
  }
  return result;
}

// BUG: String concatenation in a loop instead of array join — inefficient
function buildCsvRow(fields) {
  let csv = "";
  for (let i = 0; i < fields.length; i++) {
    csv += fields[i]; // BUG: Should use fields.join(',')
    if (i < fields.length - 1) {
      csv += ",";
    }
  }
  return csv;
}

// BUG: Mutating the input array directly instead of returning a copy
function sortUsers(users) {
  users.sort((a, b) => a.name.localeCompare(b.name)); // BUG: Mutates original array
  return users;
}

// BUG: eval() used — serious security and performance issue
function calculateExpression(expression) {
  return eval(expression); // BUG: eval is dangerous and should never be used
}

// BUG: parseInt without radix — may cause unexpected octal/hex parsing in some environments
function parseUserAge(ageString) {
  return parseInt(ageString); // BUG: Missing radix (should be parseInt(ageString, 10))
}

module.exports = {
  findDuplicates,
  processItems,
  flattenArray,
  buildCsvRow,
  sortUsers,
  calculateExpression,
  parseUserAge, // Added without radix — AI reviewer should flag this
};
