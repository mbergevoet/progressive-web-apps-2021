// Helper functions
const fetch = require('node-fetch');

// function getDetailData(allEndpoints) {

//     const resultArray = [];

//     allEndpoints.map(singleEndpoint => {
//         let result = singleEndpoint.forEach(async endpoint => {
//             let result = await fetch(endpoint)
//                 .then(async response => {
//                     let responseData = await response.json();
//                     // console.log("responseData", responseData);
//                     resultArray.push(responseData);
//                 });
//             return result
//         });
//         // console.log("result ", result);
//         return result
//     });
//     console.log("resultArray ", resultArray);
//     return resultArray;
// };

async function getDetailData(allEndpoints) {
    console.log(allEndpoints)
    let resultArray = [];
    await allEndpoints.forEach(async singleEndpoint => {
        let dataResponse = await fetch(singleEndpoint)
        const jsonData = dataResponse.json()
        resultArray.push(jsonData);
        // console.log(result)
    })
    // console.log(resultArray);
    console.log("regel 34", resultArray);
};

module.exports = { getDetailData };