async function foo() {
  return "Yeah, I'm successful!"
}
foo().then(data => console.log(data));
// "Yeah, I'm successful!"

async function foo() {
  throw new Error("Oops, something gets wrong!");
}

foo().catch(err => console.log(err));
// Error: Oops, something gets wrong!