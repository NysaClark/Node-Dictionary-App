const https = require("https");

// Print the data
function printFact(factObj){
    console.log(factObj.data[0])
}

function getFact() {
  // Connect to the API URL (https://meowfacts.herokuapp.com/)
  const request = https.get("https://meowfacts.herokuapp.com/", (response) => {
    let body = "";
    // console.dir(response.statusCode);
    // Read the data
    response.on("data", (data) => {
      body += data.toString();
    });
    response.on("end", () => {
        // Parse the data
        let factObj = JSON.parse(body)
        printFact(factObj)
        // console.dir(JSON.parse(body))
    })
  });
  // Print the data
}
getFact();
