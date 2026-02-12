exports.handler = async function (event, context) {
    // 1. Get the Link ID and optional Tracking ID from the query parameters
    const { id, trackingId } = event.queryStringParameters;

    // 2. Load secrets from external JSON file
    // This allows n8n updates via Git without modifying code logic.
    const secrets = require('./secrets.json');

    // 3. Look up the URL
    let realUrl = secrets[id];

    // 4. Append Tracking ID if present (e.g. for OnlyFans)
    // Converts: https://onlyfans.com/juliafilippo -> https://onlyfans.com/juliafilippo/c123
    if (realUrl && trackingId) {
        // Remove trailing slash if present to avoid double slashes
        if (realUrl.endsWith('/')) {
            realUrl = realUrl.slice(0, -1);
        }
        realUrl += `/c${trackingId}`;
    }

    // 5. Return the result
    if (realUrl) {
        return {
            statusCode: 200,
            headers: {
                "Content-Type": "application/json",
                // Allow CORS if needed (e.g. for local testing specific ports)
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify({ realUrl: realUrl })
        };
    } else {
        return {
            statusCode: 404,
            body: JSON.stringify({ error: "Link not found" })
        };
    }
};
