# decode-audio-data-fast

Decode audio file data **in the browser** from a [File](https://developer.mozilla.org/en-US/docs/Web/API/File)/[Blob](https://developer.mozilla.org/en-US/docs/Web/API/Blob) into a [AudioBuffer](https://developer.mozilla.org/en-US/docs/Web/API/AudioBuffer) using [AudioContext.decodeAudioData()](https://developer.mozilla.org/en-US/docs/Web/API/BaseAudioContext/decodeAudioData).

This package was originally created and is used in [soundcut](https://github.com/soundcut/app).

## Why use this over native `AudioContext.decodeAudioData()` ?

`AudioContext.decodeAudioData()`is *slow* and *does not work for large files*.
By splitting the source into chunks and decoding these in parallel, `decode-audio-data-fast` works around the native API's limitations.

## Benchmarks 

*FIXME*

Quick tests performed on my own devices (ThinkPad X280 & Pixel 3).

Test file is a 13MB 320kbps CBR MP3 export of https://www.youtube.com/watch?v=BigolJfoANw

### Native

- Firefox Mobile: 13100ms
- Chrome Mobile: 1500ms

- Firefox Desktop: 3700ms
- Chrome Desktop: 2100ms

### decode-audio-data-fast

- Firefox Mobile: 7900ms
- Chrome Mobile: 800ms

- Firefox Desktop: 1700ms
- Chrome Desktop: 1000ms

## Usage

```sh
npm i --save @soundcut/decode-audio-data-fast
```

```js
const getFileAudioBuffer = require('@soundcut/decode-audio-data-fast');

async function decodeFileAudioData(file) {
  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  return await getFileAudioBuffer(file, audioCtx);
}
```


## Are there other alternatives ?

[Yes](https://github.com/audiojs/audio-decode). However, it appears `decode-audio-data-fast` is **twice as fast**.

## Supported formats

At the moment, `decode-audio-data-fast` only supports `mp3` files that can be read through [mp3-parser](https://github.com/biril/mp3-parser).

## Browser support

*FIXME*
