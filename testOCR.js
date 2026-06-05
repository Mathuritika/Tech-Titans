const extractText = require("./ocr");

async function test() {

  const text = await extractText(
    "./uploads/1780427956829-Big Data Distributed Processing Exam Notes.pdf"
  );

  console.log(text);

}

test();
