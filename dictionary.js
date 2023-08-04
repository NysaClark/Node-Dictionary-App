const https = require("https");
const http = require("http")

// Print the data
function printFact(defObj) {
  console.log(
    `${defObj.word}: ${defObj.meanings[0].definitions[0].definition}`
  );
}

function printError(error) {
  console.error(error.message);
}

function getDef(word) {
  try {
    const request = https.get(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`,
      (response) => {
        if (response.statusCode == 200) {
          let body = "";
          // Read the data
          response.on("data", (data) => {
            body += data.toString();
          });
          response.on("end", () => {
            try {
              // Parse the data
              let defObj = JSON.parse(body)[0];
              printFact(defObj);
            } catch (error) {
              // Word is not in the dictionary API
              printError(error);
            }
          });
        } else {
          // Error occured while requesting
          let message = `There was an error while searching for ${word} (${http.STATUS_CODES[response.statusCode]})`
          const statusCodeError = new Error(message)
          printError(statusCodeError)
        }
      }
    );

    // Address not found error
    request.on("error", (error) => printError(error));
  } catch (error) {
    // Invalid URL error
    printError(error);
  }
}

// process object
const words = process.argv.slice(2);
words.forEach(getDef);
