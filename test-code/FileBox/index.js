const { FileBox } = require("file-box");
const { resolve } = require("path");
const { readFile } = require("fs/promises");

// const fileBox2 = FileBox.fromFile("/drink.gif");
// console.log(fileBox2);

const promise = readFile(resolve(__dirname, "drink.gif"));
async function fn() {
  const buffer = await promise;
  const fileBox = FileBox.fromBuffer(buffer, 'drink.gif')
//   const fileBox2 = await fileBox.toDataURL();
  const fileBox2 = await fileBox.toBase64();
  console.log(fileBox, fileBox2);
}
fn();
