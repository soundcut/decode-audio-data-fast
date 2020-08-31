async function run() {
  const file = await fetchSample('../samples/1.mp3');

  await test('native AudioContext.decodeAudioData()', async () => {
    const audioCtx = new window.AudioContext();
    const arrayBuffer = await getArrayBuffer(file);
    return audioCtx.decodeAudioData(arrayBuffer);
  });

  await test(`decode-audio-data-fast - native`, () => {
    const audioCtx = new window.AudioContext();
    return DADF.getFileAudioBuffer(file, audioCtx, { native: true });
  });

  await test(`decode-audio-data-fast - webkitAudioContext -> Safari -> native`, async () => {
    window.webkitAudioContext = {};

    const audioCtx = new window.AudioContext();
    const buffer = await DADF.getFileAudioBuffer(file, audioCtx);

    delete window.webkitAudioContext;
    return buffer;
  });

  const concurrencies = [undefined, 4];
  for (concurrency of concurrencies) {
    await test(`decode-audio-data-fast - concurrency = ${
      concurrency || 'auto'
    }`, () => {
      const audioCtx = new window.AudioContext();
      return DADF.getFileAudioBuffer(file, audioCtx, { concurrency });
    });
  }
}

run();
