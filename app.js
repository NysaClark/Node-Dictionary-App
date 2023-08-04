const https = require("https");

function getDef(term) {
  try {
    // Request Data
    const request = https.get(
      `https://dictionaryapi.com/api/v3/references/sd4/json/${term}?key=de3ce04b-c814-4a54-b961-89135a01f693`,
      (response) => {
        let body = ""
        // Read Data
        response.on("data", (data) => {
            body += data.toString();
        })

        response.on("end", () => {
            // Parse The Data
            const definition = JSON.parse(body);
            // Print the Data
            console.log(definition[0].shortdef)
        })
      }
    );
      request.on("error", (error) => console.error(error.message));
  } catch (error) {
    console.error(error.message);
  }
}

const query = process.argv.slice(2);
query.forEach(getDef)
