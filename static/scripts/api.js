// Helper functions
const fetch = require('node-fetch');

async function getDetailData(allEndpoints) {
    return Promise.all(
        await allEndpoints.map(async singleEndpoint => {
            let dataResponse = await fetch(singleEndpoint)
            return jsonData = await dataResponse.json()
        })
    )
};

module.exports = { getDetailData };

// Array combiner function