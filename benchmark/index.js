function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function bench(which, runs, what) {
  const results = [];
  for (run of Array.from(new Array(runs), (_, i) => i + 1)) {
    const result = await test(which, what);
    console.debug(`Run number: ${run}, done.`, result);
    results.push(result);
  }

  const out = {
    which,
    runs,
    average:
      results.reduce((acc, result) => acc + result.duration, 0) /
      results.length,
  };
  console.table(out);
  return out;
}

async function test(which, what) {
  const start = performance.now();

  const ret = await what();

  const end = performance.now();
  const out = { case: which, duration: end - start, length: ret.length };
  return out;
}

async function run() {
  const file = await fetchSample('../samples/1.mp3');

  await delay(10000);

  const runs = 100;

  const witness = await bench(
    'native AudioContext.decodeAudioData()',
    runs,
    async () => {
      const audioCtx = new window.AudioContext();
      const arrayBuffer = await getArrayBuffer(file);
      return audioCtx.decodeAudioData(arrayBuffer);
    }
  );

  const conccurrencies = [undefined, 2, 4, 6];
  const results = [];

  for (concurrency of conccurrencies) {
    const result = await bench(
      `decode-audio-data-fast - concurrency=${
        concurrency || `auto (${navigator.hardwareConcurrency})`
      }`,
      runs,
      () => {
        const audioCtx = new window.AudioContext();
        return DADF.getFileAudioBuffer(file, audioCtx, {
          concurrency,
        });
      }
    );
    results.push(result);
  }

  const fastest = results.reduce(
    (acc, next) => (acc.average > next.average ? next : acc),
    witness
  );

  console.info('Fastest:', fastest);
}

run();
