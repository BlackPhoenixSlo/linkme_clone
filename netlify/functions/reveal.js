exports.handler = async function (event, context) {
    // 1. Get the Link ID from the query parameters
    const { id } = event.queryStringParameters;

    // 2. Define the "Database" of secrets (Mapping ID -> Real URL)
    // In a real app, this would come from a database.
    const secrets = {
        "1": "https://onlyfans.com/juliafilippo",
    };

    // 3. Look up the URL
    const realUrl = secrets[id];

    // 4. Return the result
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
