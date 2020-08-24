async function fetchSample(url) {
  const fetchPromise = fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'audio/mpeg; charset=utf-8',
    },
  });

  try {
    const response = await fetchPromise;
    if (response) {
      if (response.status !== 200) {
        const error = new Error('Unable to fetch slice');
        error.response = response;
        throw error;
      }
    }

    const blob = await response.blob();
    const filename = response.headers;
    return new File([blob], url);
  } catch (err) {
    console.error({ err });
    throw err;
  }
}

function getArrayBuffer(file) {
  return new Promise((resolve) => {
    let fileReader = new FileReader();
    fileReader.onloadend = () => {
      resolve(fileReader.result);
    };
    fileReader.readAsArrayBuffer(file);
  });
}

window.fetchSample = fetchSample;
window.getArrayBuffer = getArrayBuffer;
