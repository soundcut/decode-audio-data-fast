async function test(which, what) {
  const start = performance.now();

  const ret = await what();

  const end = performance.now();
  const out = { case: which, duration: `${end - start}`, length: ret.length };
  console.table(out);
  return out;
}

async function run() {
  const file = await fetchSample('../samples/1.mp3');

  await test('native AudioContext.decodeAudioData()', async () => {
    const audioCtx = new window.AudioContext();
    const arrayBuffer = await getArrayBuffer(file);
    return audioCtx.decodeAudioData(arrayBuffer);
  });

  const concurrencies = [undefined, 4];
  for (concurrency of concurrencies) {
    await test(`decode-audio-data-fast - concurrency = ${
      concurrency || 'auto'
    }`, async () => {
      const audioCtx = new window.AudioContext();
      return DADF.getFileAudioBuffer(file, audioCtx, { concurrency });
    });
  }
}

run();
