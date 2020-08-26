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
