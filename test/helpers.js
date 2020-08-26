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
        const error = new Error('Unable to fetch sample');
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

async function test(which, what) {
  const start = performance.now();

  try {
    const ret = await what();

    const end = performance.now();
    const out = { case: which, duration: `${end - start}`, length: ret.length };
    console.table(out);
    return out;
  } catch (_err) {
    const msg = `Test failed > ${which} > ${_err.message.replace(
      'Error: ',
      ''
    )}`;
    const err = new Error();
    err.stack = [msg, ..._err.stack.split('\n').slice(1)].join('\n');
    throw err;
  }
}
