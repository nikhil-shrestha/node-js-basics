const sum = (a, b) => {
  if (a && b) {
    return a + b;
  }
  throw new Error("Invalid Arguments");
};

try {
  console.log(sum(1));
} catch (err) {
  console.log("Error Occurred!!");
  //   console.log(err);
}
// console.log(sum(1));
console.log("this works!!");
