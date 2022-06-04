function callByValue(value) {
  value = 10;
}
const value = 1;
console.log("before callByValue", value);
callByValue(value);
console.log("after callByValue", value);

function callByReference(ref) {
  ref.name = "wslee";
  ref.age = 29;
}
const ref = { name: "mslee" };
console.log("before callByRefernece", ref);
callByReference(ref);
console.log("after callByReference", ref);
