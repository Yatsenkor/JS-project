const postData = async(URL, data) => {
    const res =  await fetch( URL, {
        method:'POST',
        headers:{'Content-type': 'application/json'},
        body: data
    });

    return await res.json();
};

async function getResource(url) {
    let res = await fetch(url);

    if (!res.ok) {
        throw new Error (` could not fetch ${url}, status ${res.status}`);
    }

    return await res.json();
}



export {postData};
export {getResource};