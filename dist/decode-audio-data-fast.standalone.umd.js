(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.DADF = {}));
}(this, (function (exports) { 'use strict';

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function createCommonjsModule(fn, basedir, module) {
		return module = {
		  path: basedir,
		  exports: {},
		  require: function (path, base) {
	      return commonjsRequire(path, (base === undefined || base === null) ? module.path : base);
	    }
		}, fn(module, module.exports), module.exports;
	}

	function commonjsRequire () {
		throw new Error('Dynamic requires are not currently supported by @rollup/plugin-commonjs');
	}

	var lib = createCommonjsModule(function (module, exports) {
	//     mp3-parser/lib v0.3.0

	//     https://github.com/biril/mp3-parser
	//     Licensed and freely distributed under the MIT License
	//     Copyright (c) 2013-2016 Alex Lambiris

	// ----

	/* jshint browser:true */
	/* global exports:false, define:false */
	(function (globalObject, createModule) {

	    // Global `exports` object signifies CommonJS enviroments with `module.exports`, e.g. Node
	    { return createModule(exports); }
	}(commonjsGlobal, function (lib) {

	    // Produce octet's binary representation as a string
	    var octetToBinRep = (function () {
	        var b = []; // The binary representation
	        return function (octet) {
	            b[0] = ((octet & 128) === 128 ? "1" : "0");
	            b[1] = ((octet & 64)  === 64  ? "1" : "0");
	            b[2] = ((octet & 32)  === 32  ? "1" : "0");
	            b[3] = ((octet & 16)  === 16  ? "1" : "0");
	            b[4] = ((octet & 8)   === 8   ? "1" : "0");
	            b[5] = ((octet & 4)   === 4   ? "1" : "0");
	            b[6] = ((octet & 2)   === 2   ? "1" : "0");
	            b[7] = ((octet & 1)   === 1   ? "1" : "0");
	            return b.join("");
	        };
	    }());

	    // Get the number of bytes in a frame given its `bitrate`, `samplingRate` and `padding`.
	    //  Based on [magic formula](http://mpgedit.org/mpgedit/mpeg_format/mpeghdr.htm)
	    lib.getFrameByteLength = function (kbitrate, samplingRate, padding, mpegVersion, layerVersion) {
	        var sampleLength = lib.sampleLengthMap[mpegVersion][layerVersion];
	        var paddingSize = padding ? (layerVersion === "11" ? 4 : 1) : 0;
	        var byteRate = kbitrate * 1000 / 8;
	        return Math.floor((sampleLength * byteRate / samplingRate) + paddingSize);
	    };

	    lib.getXingOffset = function (mpegVersion, channelMode) {
	        var mono = channelMode === "11";
	        if (mpegVersion === "11") { // mpeg1
	            return mono ? 21 : 36;
	        } else {
	            return mono ? 13 : 21;
	        }
	    };

	    //
	    lib.v1l1Bitrates = {
	        "0000": "free",
	        "0001": 32,
	        "0010": 64,
	        "0011": 96,
	        "0100": 128,
	        "0101": 160,
	        "0110": 192,
	        "0111": 224,
	        "1000": 256,
	        "1001": 288,
	        "1010": 320,
	        "1011": 352,
	        "1100": 384,
	        "1101": 416,
	        "1110": 448,
	        "1111": "bad"
	    };

	    //
	    lib.v1l2Bitrates = {
	        "0000": "free",
	        "0001": 32,
	        "0010": 48,
	        "0011": 56,
	        "0100": 64,
	        "0101": 80,
	        "0110": 96,
	        "0111": 112,
	        "1000": 128,
	        "1001": 160,
	        "1010": 192,
	        "1011": 224,
	        "1100": 256,
	        "1101": 320,
	        "1110": 384,
	        "1111": "bad"
	    };

	    //
	    lib.v1l3Bitrates = {
	        "0000": "free",
	        "0001": 32,
	        "0010": 40,
	        "0011": 48,
	        "0100": 56,
	        "0101": 64,
	        "0110": 80,
	        "0111": 96,
	        "1000": 112,
	        "1001": 128,
	        "1010": 160,
	        "1011": 192,
	        "1100": 224,
	        "1101": 256,
	        "1110": 320,
	        "1111": "bad"
	    };

	    //
	    lib.v2l1Bitrates = {
	        "0000": "free",
	        "0001": 32,
	        "0010": 48,
	        "0011": 56,
	        "0100": 64,
	        "0101": 80,
	        "0110": 96,
	        "0111": 112,
	        "1000": 128,
	        "1001": 144,
	        "1010": 160,
	        "1011": 176,
	        "1100": 192,
	        "1101": 224,
	        "1110": 256,
	        "1111": "bad"
	    };

	    //
	    lib.v2l2Bitrates = {
	        "0000": "free",
	        "0001": 8,
	        "0010": 16,
	        "0011": 24,
	        "0100": 32,
	        "0101": 40,
	        "0110": 48,
	        "0111": 56,
	        "1000": 64,
	        "1001": 80,
	        "1010": 96,
	        "1011": 112,
	        "1100": 128,
	        "1101": 144,
	        "1110": 160,
	        "1111": "bad"
	    };
	    lib.v2l3Bitrates = lib.v2l2Bitrates;

	    //
	    lib.v1SamplingRates = {
	        "00": 44100,
	        "01": 48000,
	        "10": 32000,
	        "11": "reserved"
	    };

	    //
	    lib.v2SamplingRates = {
	        "00": 22050,
	        "01": 24000,
	        "10": 16000,
	        "11": "reserved"
	    };

	    //
	    lib.v25SamplingRates = {
	        "00": 11025,
	        "01": 12000,
	        "10": 8000,
	        "11": "reserved"
	    };

	    //
	    lib.channelModes = {
	        "00": "Stereo",
	        "01": "Joint stereo (Stereo)",
	        "10": "Dual channel (Stereo)",
	        "11": "Single channel (Mono)"
	    };

	    //
	    lib.mpegVersionDescription = {
	        "00": "MPEG Version 2.5 (unofficial)",
	        "01": "reserved",
	        "10": "MPEG Version 2 (ISO/IEC 13818-3)",
	        "11": "MPEG Version 1 (ISO/IEC 11172-3)"
	    };

	    //
	    lib.layerDescription = {
	        "00": "reserved",
	        "01": "Layer III",
	        "10": "Layer II",
	        "11": "Layer I"
	    };

	    //
	    lib.bitrateMap = {
	        "11": {
	            "01": lib.v1l3Bitrates,
	            "10": lib.v1l2Bitrates,
	            "11": lib.v1l1Bitrates
	        },
	        "10": {
	            "01": lib.v2l3Bitrates,
	            "10": lib.v2l2Bitrates,
	            "11": lib.v2l1Bitrates
	        }
	    };

	    //
	    lib.samplingRateMap = {
	        "00": lib.v25SamplingRates,
	        "10": lib.v2SamplingRates,
	        "11": lib.v1SamplingRates
	    };

	    //
	    lib.v1SampleLengths = {
	        "01": 1152,
	        "10": 1152,
	        "11": 384
	    };

	    //
	    lib.v2SampleLengths = {
	        "01": 576,
	        "10": 1152,
	        "11": 384
	    };

	    //
	    lib.sampleLengthMap = {
	        "01": lib.v2SampleLengths,
	        "10": lib.v2SampleLengths,
	        "11": lib.v1SampleLengths
	    };

	    // Convert the given string `str` to an array of words (octet pairs). If all characters in the
	    //  given string are within the ISO/IEC 8859-1 subset then the returned array may safely be
	    //  interpreted as an array of values in the [0, 255] range, where each value requires a single
	    //  octet to be represented. Otherwise it should be interpreted as an array of values in the
	    //  [0, 65.535] range, where each value requires a word (octet pair) to be represented.
	    //
	    // Not meant to be used with UTF-16 strings that contain chars outside the BMP. See
	    //  [charCodeAt on MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/charCodeAt)
	    lib.wordSeqFromStr = function (str) {
	        for (var i = str.length - 1, seq = []; i >= 0; --i) {
	            seq[i] = str.charCodeAt(i);
	        }
	        return seq;
	    };

	    // Common character sequences converted to byte arrays
	    lib.seq = {
	        id3: lib.wordSeqFromStr("ID3"),
	        xing: lib.wordSeqFromStr("Xing"),
	        info: lib.wordSeqFromStr("Info")
	    };

	    // A handy no-op to reuse
	    lib.noOp = function () {};

	    // Decode a [synchsafe](http://en.wikipedia.org/wiki/Synchsafe) value. Synchsafes are used in
	    //  ID3 tags, instead of regular ints, to avoid the unintended introduction of bogus
	    //  frame-syncs. Note that the spec requires that syncsafe be always stored in big-endian order
	    //  (Implementation shamefully lifted from relevant wikipedia article)
	    lib.unsynchsafe = function (value) {
	        var out = 0;
	        var mask = 0x7F000000;

	        while (mask) {
	            out >>= 1;
	            out |= value & mask;
	            mask >>= 8;
	        }

	        return out;
	    };

	    // Get a value indicating whether given DataView `view` contains the `seq` sequence (array
	    //  of octets) at `offset` index. Note that no check is performed for the adequate length of
	    //  given view as this should be carried out by the caller
	    lib.isSeq = function (seq, view, offset) {
	        for (var i = seq.length - 1; i >= 0; i--) {
	            if (seq[i] !== view.getUint8(offset + i)) { return false; }
	        }
	        return true;
	    };

	    // Get a value indicating whether given DataView `view` contains the `str` string
	    //  at `offset` index. The view is parsed as an array of 8bit single-byte coded characters
	    //  (i.e. ISO/IEC 8859-1, _non_ Unicode). Will return the string itself if it does, false
	    //  otherwise. Note that no check is performed for the adequate length of given view as
	    //  this should be carried out be the caller as part of the section-parsing process
	    /*
	    isStr = function (str, view, offset) {
	        return isSeq(lib.wordSeqFromStr(str), view, offset) ? str : false;
	    };
	    */

	    // Locate first occurrence of sequence `seq` (an array of octets) in DataView `view`.
	    //  Search starts at given `offset` and ends after `length` octets. Will return the
	    //  absolute offset of sequence if found, -1 otherwise
	    lib.locateSeq = function (seq, view, offset, length) {
	        for (var i = 0, l = length - seq.length + 1; i < l; ++i) {
	            if (lib.isSeq(seq, view, offset + i)) { return offset + i; }
	        }
	        return -1;
	    };

	    lib.locateStrTrm = {
	        // Locate the first occurrence of non-Unicode null-terminator (i.e. a single zeroed-out
	        //  octet) in DataView `view`. Search starts at given `offset` and ends after `length`
	        //  octets. Will return the absolute offset of sequence if found, -1 otherwise
	        iso: function (view, offset, length) {
	            return lib.locateSeq([0], view, offset, length);
	        },

	        // Locate the first occurrence of Unicode null-terminator (i.e. a sequence of two
	        //  zeroed-out octets) in DataView `view`. Search starts at given `offset` and ends after
	        //  `length` octets. Will return the absolute offset of sequence if found, -1 otherwise
	        ucs: function (view, offset, length) {
	            var trmOffset = lib.locateSeq([0, 0], view, offset, length);
	            if (trmOffset === -1) { return -1; }
	            if ((trmOffset - offset) % 2 !== 0) { ++trmOffset; }
	            return trmOffset;
	        }
	    };

	    lib.readStr = {
	        // Parse DataView `view` begining at `offset` index and return a string built from
	        //  `length` octets. The view is parsed as an array of 8bit single-byte coded characters
	        //  (i.e. ISO/IEC 8859-1, _non_ Unicode). Will essentially return the string comprised of
	        //  octets [offset, offset + length). Note that no check is performed for the adequate
	        //  length of given view as this should be carried out be the caller as part of the
	        //  section-parsing process
	        iso: function (view, offset, length) {
	            return String.fromCharCode.apply(null, new Uint8Array(view.buffer, offset, length));
	        },

	        // UCS-2 (ISO/IEC 10646-1:1993, UCS-2) version of `readStr`. UCS-2 is the fixed-width
	        //  two-byte subset of Unicode that can only express values inside the Basic Multilingual
	        //  Plane (BMP). Note that this method is generally unsuitable for parsing non-trivial
	        //  UTF-16 strings which may contain surrogate pairs. [This is only marginally related
	        //  though as, according to ID3v2, all Unicode strings should be UCS-2.] Further info:
	        //
	        //  * [How to convert ArrayBuffer to and from String](http://updates.html5rocks.com/2012/06/How-to-convert-ArrayBuffer-to-and-from-String)
	        //  * [The encoding spec](http://encoding.spec.whatwg.org/)
	        //  * [stringencoding shim](https://code.google.com/p/stringencoding/)
	        //
	        // About the BOM: The current implementation will check for and remove the leading BOM from
	        //  the given view to avoid invisible characters that mess up the resulting strings. MDN's
	        //  documentation for [fromCharCode](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/String/fromCharCode)
	        //  suggests that it can correctly convert UCS-2 buffers to strings. And indeed, tests
	        //  performed with UCS-2 LE encoded frames indicate that it does. However, no tests have
	        //  been made for UCS-2 BE. (Kid3, the ID3v2 Tag generator used for tests at the time of
	        //  this writing, goes totally weird when switched to BE)
	        ucs: function (view, offset, length) {
	            // Tweak offset to remove the BOM (LE: FF FE / BE: FE FF)
	            if (view.getUint16(offset) === 0xFFFE || view.getUint16(offset) === 0xFEFF) {
	                offset += 2;
	                length -= 2;
	            }

	            var buffer = view.buffer;

	            // When offset happens to be an even number of octets, the array-buffer may be wrapped
	            //  in a Uint16Array. In the event that it's _not_, an actual copy has to be made
	            // (Note that Node <= 0.8 as well as IE <= 10 lack an ArrayBuffer#slice. TODO: shim it)
	            if (offset % 2 === 1) {
	                buffer = buffer.slice(offset, offset + length);
	                offset = 0;
	            }

	            return String.fromCharCode.apply(null, new Uint16Array(buffer, offset, length / 2));
	        }
	    };

	    lib.readTrmStr = {
	        // Similar to `readStr.iso` but will check for a null-terminator determining the end of the
	        //  string. The returned string will be of _at most_ `length` octets
	        iso: function (view, offset, length) {
	            var trmOffset = lib.locateStrTrm.iso(view, offset, length);
	            if (trmOffset !== -1) { length = trmOffset - offset; }
	            return lib.readStr.iso(view, offset, length);
	        },

	        // Similar to `readStr.ucs` but will check for a null-terminator determining the end of the
	        //  string. The returned string will be of _at most_ `length` octets
	        ucs: function (view, offset, length) {
	            var trmOffset = lib.locateStrTrm.ucs(view, offset, length);
	            if (trmOffset !== -1) { length = trmOffset - offset; }
	            return lib.readStr.ucs(view, offset, length);
	        }
	    };

	    // ### Read a Frame Header
	    //
	    // Read header of frame located at `offset` of DataView `view`. Returns null in the event
	    //  that no frame header is found at `offset`
	    lib.readFrameHeader = function (view, offset) {
	        offset || (offset = 0);

	        // There should be more than 4 octets ahead
	        if (view.byteLength - offset <= 4) { return null; }

	        // Header's first (out of four) octet: `11111111`: Frame sync (all bits must be set)
	        var b1 = view.getUint8(offset);
	        if (b1 !== 255) { return null; }

	        // Header's second (out of four) octet: `111xxxxx`
	        //
	        // * `111.....`: Rest of frame sync (all bits must be set)
	        // * `...BB...`: MPEG Audio version ID (11 -> MPEG Version 1 (ISO/IEC 11172-3))
	        // * `.....CC.`: Layer description (01 -> Layer III)
	        // * `.......1`: Protection bit (1 = Not protected)

	        // Require the three most significant bits to be `111` (>= 224)
	        var b2 = view.getUint8(offset + 1);
	        if (b2 < 224) { return null; }

	        var mpegVersion = octetToBinRep(b2).substr(3, 2);
	        var layerVersion = octetToBinRep(b2).substr(5, 2);

	        //
	        var header = {
	            _section: { type: "frameHeader", byteLength: 4, offset: offset },
	            mpegAudioVersionBits: mpegVersion,
	            mpegAudioVersion: lib.mpegVersionDescription[mpegVersion],
	            layerDescriptionBits: layerVersion,
	            layerDescription: lib.layerDescription[layerVersion],
	            isProtected: b2 & 1, // Just check if last bit is set
	        };
	        header.protectionBit = header.isProtected ? "1" : "0";

	        if (header.mpegAudioVersion === "reserved") { return null; }
	        if (header.layerDescription === "reserved") { return null; }

	        // Header's third (out of four) octet: `EEEEFFGH`
	        //
	        // * `EEEE....`: Bitrate index. 1111 is invalid, everything else is accepted
	        // * `....FF..`: Sampling rate, 00=44100, 01=48000, 10=32000, 11=reserved
	        // * `......G.`: Padding bit, 0=frame not padded, 1=frame padded
	        // * `.......H`: Private bit. This is informative
	        var b3 = view.getUint8(offset + 2);
	        b3 = octetToBinRep(b3);
	        header.bitrateBits = b3.substr(0, 4);
	        header.bitrate = lib.bitrateMap[mpegVersion][layerVersion][header.bitrateBits];
	        if (header.bitrate === "bad") { return null; }

	        header.samplingRateBits = b3.substr(4, 2);
	        header.samplingRate = lib.samplingRateMap[mpegVersion][header.samplingRateBits];
	        if (header.samplingRate === "reserved") { return null; }

	        header.frameIsPaddedBit = b3.substr(6, 1);
	        header.frameIsPadded = header.frameIsPaddedBit === "1";
	        header.framePadding = header.frameIsPadded ? 1 : 0;

	        header.privateBit = b3.substr(7, 1);

	        // Header's fourth (out of four) octet: `IIJJKLMM`
	        //
	        // * `II......`: Channel mode
	        // * `..JJ....`: Mode extension (only if joint stereo)
	        // * `....K...`: Copyright
	        // * `.....L..`: Original
	        // * `......MM`: Emphasis
	        var b4 = view.getUint8(offset + 3);
	        header.channelModeBits = octetToBinRep(b4).substr(0, 2);
	        header.channelMode = lib.channelModes[header.channelModeBits];

	        return header;
	    };

	    // ### Read a Frame
	    //
	    // Read frame located at `offset` of DataView `view`. Will acquire the frame header (see
	    //  `readFrameHeader`) plus some basic information about the frame - notably the frame's length
	    //  in bytes. If `requireNextFrame` is set, the presence of a _next_ valid frame will be
	    //  required for _this_ frame to be regarded as valid. Returns null in the event that no frame
	    //  is found at `offset`
	    lib.readFrame = function (view, offset, requireNextFrame) {
	        offset || (offset = 0);

	        var frame = {
	            _section: { type: "frame", offset: offset },
	            header: lib.readFrameHeader(view, offset)
	        };

	        var head = frame.header; // Convenience shortcut

	        // Frame should always begin with a valid header
	        if (!head) { return null; }

	        frame._section.sampleLength =
	            lib.sampleLengthMap[head.mpegAudioVersionBits][head.layerDescriptionBits];

	        //
	        frame._section.byteLength = lib.getFrameByteLength(head.bitrate, head.samplingRate,
	            head.framePadding, head.mpegAudioVersionBits, head.layerDescriptionBits);
	        frame._section.nextFrameIndex = offset + frame._section.byteLength;

	        // No "Xing" or "Info" identifier should be present - this would indicate that this
	        //  is in fact a Xing tag masquerading as a frame
	        var xingOffset = lib.getXingOffset(head.mpegAudioVersionBits, head.channelModeBits);
	        if (lib.isSeq(lib.seq.xing, view, offset + xingOffset) ||
	            lib.isSeq(lib.seq.info, view, offset + xingOffset)) {
	            return null;
	        }

	        // If a next frame is required then the data at `frame._section.nextFrameIndex` should be
	        //  a valid frame header
	        if (requireNextFrame && !lib.readFrameHeader(view, frame._section.nextFrameIndex)) {
	            return null;
	        }

	        return frame;
	    };
	}));
	});

	var id3v2 = createCommonjsModule(function (module, exports) {
	//     mp3-parser/id3v2 v0.3.0

	//     https://github.com/biril/mp3-parser
	//     Licensed and freely distributed under the MIT License
	//     Copyright (c) 2013-2016 Alex Lambiris

	// ----

	/* jshint browser:true */
	/* global exports:false, define:false, require:false */
	(function (globalObject, createModule) {

	    // Global `exports` object signifies CommonJS enviroments with `module.exports`, e.g. Node
	    {
	        return createModule(exports, lib);
	    }
	}(commonjsGlobal, function (mp3Id3v2Parser, lib) {

	    //
	    var id3v2TagFrameNames = {
	        AENC: "Audio encryption",
	        APIC: "Attached picture",
	        CHAP: "Chapter",
	        COMM: "Comments",
	        COMR: "Commercial frame",
	        ENCR: "Encryption method registration",
	        EQUA: "Equalization",
	        ETCO: "Event timing codes",
	        GEOB: "General encapsulated object",
	        GRID: "Group identification registration",
	        IPLS: "Involved people list",
	        LINK: "Linked information",
	        MCDI: "Music CD identifier",
	        MLLT: "MPEG location lookup table",
	        OWNE: "Ownership frame",
	        PRIV: "Private frame",
	        PCNT: "Play counter",
	        POPM: "Popularimeter",
	        POSS: "Position synchronisation frame",
	        RBUF: "Recommended buffer size",
	        RVAD: "Relative volume adjustment",
	        RVRB: "Reverb",
	        SYLT: "Synchronized lyric/text",
	        SYTC: "Synchronized tempo codes",
	        TALB: "Album/Movie/Show title",
	        TBPM: "BPM (beats per minute)",
	        TCOM: "Composer",
	        TCON: "Content type",
	        TCOP: "Copyright message",
	        TDAT: "Date",
	        TDLY: "Playlist delay",
	        TENC: "Encoded by",
	        TEXT: "Lyricist/Text writer",
	        TFLT: "File type",
	        TIME: "Time",
	        TIT1: "Content group description",
	        TIT2: "Title/songname/content description",
	        TIT3: "Subtitle/Description refinement",
	        TKEY: "Initial key",
	        TLAN: "Language(s)",
	        TLEN: "Length",
	        TMED: "Media type",
	        TOAL: "Original album/movie/show title",
	        TOFN: "Original filename",
	        TOLY: "Original lyricist(s)/text writer(s)",
	        TOPE: "Original artist(s)/performer(s)",
	        TORY: "Original release year",
	        TOWN: "File owner/licensee",
	        TPE1: "Lead performer(s)/Soloist(s)",
	        TPE2: "Band/orchestra/accompaniment",
	        TPE3: "Conductor/performer refinement",
	        TPE4: "Interpreted, remixed, or otherwise modified by",
	        TPOS: "Part of a set",
	        TPUB: "Publisher",
	        TRCK: "Track number/Position in set",
	        TRDA: "Recording dates",
	        TRSN: "Internet radio station name",
	        TRSO: "Internet radio station owner",
	        TSIZ: "Size",
	        TSRC: "ISRC (international standard recording code)",
	        TSSE: "Software/Hardware and settings used for encoding",
	        TYER: "Year",
	        TXXX: "User defined text information frame",
	        UFID: "Unique file identifier",
	        USER: "Terms of use",
	        USLT: "Unsychronized lyric/text transcription",
	        WCOM: "Commercial information",
	        WCOP: "Copyright/Legal information",
	        WOAF: "Official audio file webpage",
	        WOAR: "Official artist/performer webpage",
	        WOAS: "Official audio source webpage",
	        WORS: "Official internet radio station homepage",
	        WPAY: "Payment",
	        WPUB: "Publishers official webpage",
	        WXXX: "User defined URL link frame"
	    };

	    //
	    var readFrameContent = {};

	    // Read the content of a
	    //  [text-information frame](http://id3.org/id3v2.3.0#Text_information_frames). These are
	    //  common and contain info such as artist and album. There may only be one text info frame
	    //  of its kind in a tag. If the textstring is followed by a termination (00) all the
	    //  following information should be ignored and not be displayed. All text frame
	    //  identifiers begin with "T". Only text frame identifiers begin with "T", with the
	    //  exception of the "TXXX" frame
	    //
	    // * Encoding:    a single octet where 0 = ISO-8859-1, 1 = UCS-2
	    // * Information: a text string according to encoding
	    readFrameContent.T = function (view, offset, length) {
	        var content = { encoding: view.getUint8(offset) };
	        content.value = lib.readStr[content.encoding === 0 ? "iso" : "ucs"](
	            view, offset + 1, length - 1);
	        return content;
	    };

	    // Read the content of a
	    //  [user-defined text-information frame](http://id3.org/id3v2.3.0#User_defined_text_information_frame).
	    //  Intended for one-string text information concerning the audiofile in a similar way to
	    //  the other "T"-frames. The frame body consists of a description of the string,
	    //  represented as a terminated string, followed by the actual string. There may be more
	    //  than one "TXXX" frame in each tag, but only one with the same description
	    //
	    // * Encoding:    a single octet where 0 = ISO-8859-1, 1 = UCS-2
	    // * Description: a text string according to encoding (followed by 00 (00))
	    // * Value:       a text string according to encoding
	    readFrameContent.TXXX = function  (view, offset, length) {
	        // The content to be returned
	        var content = { encoding: view.getUint8(offset) };

	        // Encoding + null term. = at least 2 octets
	        if (length < 2) {
	            return content; // Inadequate length!
	        }

	        // Encoding and content beginning (description field)
	        var enc = content.encoding === 0 ? "iso" : "ucs";
	        var offsetBeg = offset + 1;

	        // Locate the the null terminator seperating description and URL
	        var offsetTrm = lib.locateStrTrm[enc](view, offsetBeg, length - 4);
	        if (offsetTrm === -1) {
	            return content; // Not found!
	        }

	        // Read description and value data into content
	        content.description = lib.readStr[enc](view, offsetBeg, offsetTrm - offsetBeg);
	        offsetTrm += enc === "ucs" ? 2 : 1; // Move past terminating sequence
	        content.value = lib.readStr[enc](view, offsetTrm, offset + length - offsetTrm);

	        return content;
	    };

	    // Read the content of a
	    //  [URL-link frame](http://id3.org/id3v2.3.0#URL_link_frames). There may only be one
	    //  URL link frame of its kind in a tag, except when stated otherwise in the frame
	    //  description. If the textstring is followed by a termination (00) all the following
	    //  information should be ignored and not be displayed. All URL link frame identifiers
	    //  begins with "W". Only URL link frame identifiers begins with "W"
	    //
	    // * URL: a text string
	    readFrameContent.W = function (view, offset, length) {
	        return { value: lib.readStr.iso(view, offset, length) };
	    };

	    // Read the content of a
	    //  [user-defined URL-link frame](http://id3.org/id3v2.3.0#User_defined_URL_link_frame).
	    //  Intended for URL links concerning the audiofile in a similar way to the other
	    //  "W"-frames. The frame body consists of a description of the string, represented as a
	    //  terminated string, followed by the actual URL. The URL is always encoded with
	    //  ISO-8859-1. There may be more than one "WXXX" frame in each tag, but only one with the
	    //  same description
	    //
	    // * Encoding:    a single octet where 0 = ISO-8859-1, 1 = UCS-2
	    // * Description: a text string according to encoding (followed by 00 (00))
	    // * URL:         a text string
	    readFrameContent.WXXX = function (view, offset, length) {
	        // The content to be returned
	        var content = { encoding: view.getUint8(offset) };

	        // Encoding + null term. = at least 2 octets
	        if (length < 2) {
	            return content; // Inadequate length!
	        }

	        // Encoding and content beginning (description field)
	        var enc = content.encoding === 0 ? "iso" : "ucs";
	        var offsetBeg = offset + 1;

	        // Locate the the null terminator seperating description and URL
	        var offsetTrm = lib.locateStrTrm[enc](view, offsetBeg, length - 4);
	        if (offsetTrm === -1) {
	            return content; // Not found!
	        }

	        // Read description and value data into content
	        content.description = lib.readStr[enc](view, offsetBeg, offsetTrm - offsetBeg);
	        offsetTrm += enc === "ucs" ? 2 : 1; // Move past terminating sequence
	        content.value = lib.readStr.iso(view, offsetTrm, offset + length - offsetTrm);

	        return content;
	    };

	    // Read the content of a [comment frame](http://id3.org/id3v2.3.0#Comments).
	    //  Intended for any kind of full text information that does not fit in any other frame.
	    //  Consists of a frame header followed by encoding, language and content descriptors and
	    //  ends with the actual comment as a text string. Newline characters are allowed in the
	    //  comment text string. There may be more than one comment frame in each tag, but only one
	    //  with the same language and content descriptor. [Note that the structure of comment
	    //  frames is identical to that of USLT frames - `readFrameContentComm` will handle both.]
	    //
	    // * Encoding:    a single octet where 0 = ISO-8859-1, 1 = UCS-2
	    // * Language:    3 digit (octet) lang-code (ISO-639-2)
	    // * Short descr: a text string according to encoding (followed by 00 (00))
	    // * Actual text: a text string according to encoding
	    readFrameContent.COMM = function (view, offset, length) {
	        // The content to be returned
	        var content = { encoding: view.getUint8(offset) };

	        // Encoding + language + null term. = at least 5 octets
	        if (length < 5) {
	            return content; // Inadequate length!
	        }

	        // Encoding and content beggining (short description field)
	        var enc = content.encoding === 0 ? "iso" : "ucs";
	        var offsetBeg = offset + 4;

	        // Read the language field - 3 octets at most
	        content.language = lib.readTrmStr.iso(view, offset + 1, 3);

	        // Locate the the null terminator seperating description and text
	        var offsetTrm = lib.locateStrTrm[enc](view, offsetBeg, length - 4);
	        if (offsetTrm === -1) {
	            return content; // Not found!
	        }

	        // Read short description and text data into content
	        content.description = lib.readStr[enc](view, offsetBeg, offsetTrm - offsetBeg);
	        offsetTrm += enc === "ucs" ? 2 : 1; // Move past terminating sequence
	        content.text = lib.readStr[enc](view, offsetTrm, offset + length - offsetTrm);

	        return content;
	    };

	    // Read the content of a
	    //  [unique file identifier frame](http://id3.org/id3v2.3.0#Unique_file_identifier). Allows
	    //  identification of the audio file by means of some database that may contain more
	    //  information relevant to the content. Begins with a URL containing an email address, or
	    //  a link to a location where an email address can be found that belongs to the
	    //  organisation responsible for this specific database implementation. The 'Owner
	    //  identifier' must be non-empty (more than just a termination) and is followed by the
	    //  actual identifier, which may be up to 64 bytes. There may be more than one "UFID" frame
	    //  in a tag, but only one with the same 'Owner identifier'. Note that this frame is very
	    //  similar to the "PRIV" frame
	    //
	    // * Owner identifier: a text string (followed by 00)
	    // * Identifier:       up to 64 bytes of binary data
	    readFrameContent.UFID = function (view, offset, length) {
	        // Read up to the first null terminator to get the owner-identifier
	        var ownerIdentifier = lib.readTrmStr.iso(view, offset, length);

	        // Figure out the identifier based on frame length vs owner-identifier length
	        var identifier = new DataView(view.buffer, offset + ownerIdentifier.length + 1,
	            length - ownerIdentifier.length - 1);

	        return { ownerIdentifier: ownerIdentifier, identifier: identifier };
	    };

	    // Read the content of an
	    //  [involved people list frame](http://id3.org/id3v2.3.0#Involved_people_list). Contains
	    //  names of those involved - those contributing to the audio file - and how they were
	    //  involved. The body simply contains the first 'involvement' as a terminated string, directly
	    //  followed by the first 'involvee' as a terminated string, followed by a second terminated
	    //  involvement string and so on. However, in the current implementation the frame's content is
	    //  parsed as a collection of strings without any semantics attached. There may only be one
	    //  "IPLS" frame in each tag
	    //
	    // * Encoding:            a single octet where 0 = ISO-8859-1, 1 = UCS-2
	    // * People list strings: a series of strings, e.g. string 00 (00) string 00 (00) ..
	    readFrameContent.IPLS = function (view, offset, length) {
	        // The content to be returned
	        var content = { encoding: view.getUint8(offset), values: [] };

	        // Encoding and content beginning (people list - specifically, first 'involvement' string)
	        var enc = content.encoding === 0 ? "iso" : "ucs";
	        var offsetBeg = offset + 1;

	        // Index of null-terminator found within people list (seperates involvement / involvee)
	        var offsetNextStrTrm;

	        while (offsetBeg < offset + length) {
	            // We expect all strings within the people list to be null terminated ..
	            offsetNextStrTrm = lib.locateStrTrm[enc](view, offsetBeg, length - (offsetBeg - offset));

	            // .. except _perhaps_ the last one. In this case fix the offset at the frame's end
	            if (offsetNextStrTrm === -1) {
	                offsetNextStrTrm = offset + length;
	            }

	            content.values.push(lib.readStr[enc](view, offsetBeg, offsetNextStrTrm - offsetBeg));
	            offsetBeg = offsetNextStrTrm + (enc === "ucs" ? 2 : 1);
	        }

	        return content;
	    };

	    // Read the content of a [terms of use frame](http://id3.org/id3v2.3.0#Terms_of_use_frame).
	    //  Contains a description of the terms of use and ownership of the file. Newlines are
	    //  allowed in the text. There may only be one "USER" frame in a tag.
	    //
	    // * Encoding:    a single octet where 0 = ISO-8859-1, 1 = UCS-2
	    // * Language:    3 digit (octet) lang-code (ISO-639-2)
	    // * Actual text: a text string according to encoding
	    readFrameContent.USER = function (view, offset, length) {
	        // The content to be returned
	        var content = { encoding: view.getUint8(offset) };

	        // Encoding + language + null term. = at least 5 octets
	        if (length < 5) {
	            return content; // Inadequate length!
	        }

	        // Read the language field - 3 octets at most
	        content.language = lib.readTrmStr.iso(view, offset + 1, 3);

	        // Read the text field
	        var offsetBeg = offset + 4;
	        var enc = content.encoding === 0 ? "iso" : "ucs";
	        content.text = lib.readStr[enc](view, offsetBeg, offset + length - offsetBeg);

	        return content;
	    };

	    // Read the content of a
	    //  [private frame](http://id3.org/id3v2.3.0#Private_frame). Contains binary data that does
	    //  no fit into the other frames. Begins with a URL containing an email address, or
	    //  a link to a location where an email address can be found. The 'Owner identifier' must
	    //  be non-empty (more than just a termination) and is followed by the actual data. There
	    //  may be more than one "PRIV" frame in a tag, but only with different contents. Note that
	    //  this frame is very similar to the "UFID" frame
	    //
	    // * Owner identifier: a text string (followed by 00)
	    // * private data:     binary data (of unbounded length)
	    readFrameContent.PRIV = function (view, offset, length) {
	        // Read up to the first null terminator to get the owner-identifier
	        var ownerIdentifier = lib.readTrmStr.iso(view, offset, length);

	        // Figure out the private data based on frame length vs owner-identifier length
	        var privateData = new DataView(view.buffer, offset + ownerIdentifier.length + 1,
	            length - ownerIdentifier.length - 1);

	        return { ownerIdentifier: ownerIdentifier, privateData: privateData };
	    };

	    // Read the content of a [play counter](http://id3.org/id3v2.3.0#Play_counter). A counter
	    //  of the number of times a file has been played. There may only be one "PCNT" frame in a
	    //  tag. [According to the standard, "When the counter reaches all one's, one byte is
	    //  inserted in front of the counter thus making the counter eight bits bigger." This is
	    //  not currently taken into account]
	    //
	    // * Counter: 4 octets (at least ..)
	    readFrameContent.PCNT = function (view, offset, length) {
	        // The counter must be at least 4 octets long to begin with
	        if (length < 4) {
	            return {}; // Inadequate length!
	        }

	        // Assume the counter is always exactly 4 octets ..
	        return { counter: view.getUint32(offset) };
	    };

	    // Read the content of a [popularimeter](http://id3.org/id3v2.3.0#Popularimeter). Intended
	    //  as a measure for the file's popularity, it contains a user's email address, one rating
	    //  octet and a four octer play counter, intended to be increased with one for every time
	    //  the file is played. If no personal counter is wanted it may be omitted. [As is the case
	    //  for the "PCNT" frame, according to the standard, "When the counter reaches all one's,
	    //  one byte is inserted in front of the counter thus making the counter eight bits
	    //  bigger." This is not currently taken into account]. There may be more than one "POPM"
	    //  frame in each tag, but only one with the same email address
	    //
	    // * Email to user: a text string (followed by 00)
	    // * Rating:        a single octet, values in 0-255 (0 = unknown, 1 = worst, 255 = best)
	    // * Counter:       4 octets (at least ..)
	    readFrameContent.POPM = function (view, offset, length) {
	        var content = {
	                email: lib.readTrmStr.iso(view, offset, length)
	            };

	        // rating offset
	        offset += content.email.length + 1;

	        // email str term + rating + counter = at least 6 octets
	        if (length < 6) {
	            return content; // Inadequate length!
	        }

	        content.rating = view.getUint8(offset);

	        // Assume the counter is always exactly 4 octets ..
	        content.counter = view.getUint32(offset + 1);

	        return content;
	    };

	    // Read the content of an [attached picture](http://id3.org/id3v2.3.0#Attached_picture).
	    //  Contains a picture directly related to the audio file. In the event that the MIME media
	    //  type name is omitted, "image/" will be implied. The description has a maximum length of
	    //  64 characters, but may be empty. There may be several pictures attached to one file,
	    //  each in their individual "APIC" frame, but only one with the same content descriptor.
	    //  There may only be one picture with the picture type declared as picture type $01 and
	    //  $02 respectively.
	    //
	    // * Encoding:     a single octet where 0 = ISO-8859-1, 1 = UCS-2
	    // * MIME Type:    a text string (followed by 00) - MIME type and subtype of image
	    // * Picture type: a single octet, values in 0-255: a type-id as given by the standard
	    // * Description:  a text string according to encoding (followed by 00 (00))
	    // * Picture data: binary data (of unbounded length)
	    readFrameContent.APIC = function (view, offset, length) {
	        // The content to be returned
	        var content = { encoding: view.getUint8(offset) };

	        // Encoding + MIME type string term + pic type octet + descr. string term = min 4 octets
	        if (length < 4) {
	            return content; // Inadequate length!
	        }

	        // Encoding and offsets of content beginning / null-terminator
	        var enc = content.encoding === 0 ? "iso" : "ucs";
	        var offsetBeg, offsetTrm;

	        // Locate the the null terminator seperating MIME type and picture type
	        offsetBeg = offset + 1; // After the encoding octet
	        offsetTrm = lib.locateStrTrm.iso(view, offsetBeg, length - 1);
	        if (offsetTrm === -1) {
	            return content; // Not found!
	        }

	        // Read MIME type
	        content.mimeType = lib.readStr.iso(view, offsetBeg, offsetTrm - offsetBeg);

	        // Read picture type
	        offsetBeg = offsetTrm + 1;
	        content.pictureType = view.getUint8(offsetBeg);

	        // Locate the the null terminator seperating description and picture data
	        offsetBeg += 1;
	        offsetTrm = lib.locateStrTrm[enc](view, offsetBeg, offset + length - offsetBeg);
	        if (offsetTrm === -1) {
	            return content; // Not found!
	        }

	        // Read description
	        content.description = lib.readStr[enc](view, offsetBeg, offsetTrm - offsetBeg);

	        // Read picture data
	        offsetBeg = offsetTrm + (enc === "ucs" ? 2 : 1);
	        content.pictureData = new DataView(view.buffer, offsetBeg, offset + length - offsetBeg);

	        return content;
	    };

	    // Read the chapter tag according to the ID3v2 Chapter Frame Addendum (http://id3.org/id3v2-chapters-1.0)
	    //  The frame contains subframes, typically TIT2, and possibly additional frames
	    //
	    // * Id:            string identifier of the chapter
	    // * Start time:    4 octets specifying the start of the chapter in milliseconds
	    // * End time:      4 octets specifying the end of the chapter in milliseconds
	    // * Start offset:  4 octets specifying the start of the chapter in bytes
	    // * End offset:    4 octets specifying the end of the chapter in bytes
	    // * Frames:        nested id3v2 frames
	    readFrameContent.CHAP = function (view, offset, length) {
	        // The content to be returned
	        var content = { encoding: view.getUint8(offset) };

	        // Locate the the null terminator between id and start time
	        var offsetTrm = lib.locateStrTrm.iso(view, offset, length - 1);

	        if (offsetTrm === -1) {
	            return content; // Not found!
	        }

	        // Read id
	        content.id = lib.readStr.iso(view, offset, offsetTrm - offset);

	        // Read start time
	        content.startTime = view.getUint32(offsetTrm + 1);

	        // Read end time
	        content.endTime = view.getUint32(offsetTrm + 5);

	        // Read start offset
	        content.startOffset = view.getUint32(offsetTrm + 9);

	        // Read end offset
	        content.endOffset = view.getUint32(offsetTrm + 13);

	        var offsetSubFrames = offsetTrm + 17;
	        content.frames = [];
	        while (offsetSubFrames < offset + length) {
	            var subFrame = mp3Id3v2Parser.readId3v2TagFrame(view, offsetSubFrames);
	            content.frames.push(subFrame);
	            offsetSubFrames += subFrame.header.size + 10;
	        }

	        return content;
	    };

	    // ### Read an ID3v2 Tag Frame
	    //
	    // Read [ID3v2 Tag frame](http://id3.org/id3v2.3.0#Declared_ID3v2_frames) located at `offset`
	    //  of DataView `view`. Returns null in the event that no tag-frame is found at `offset`
	    mp3Id3v2Parser.readId3v2TagFrame = function (view, offset) {
	        // All frames consist of a frame header followed by one or more fields containing the actual
	        // information. The frame header is 10 octets long and laid out as `IIIISSSSFF`, where
	        //
	        // * `IIII......`: Frame id (four characters)
	        // * `....SSSS..`: Size (frame size excluding frame header = frame size - 10)
	        // * `........FF`: Flags
	        var frame = {
	            header: {
	                id: lib.readStr.iso(view, offset, 4),
	                size: view.getUint32(offset + 4),
	                flagsOctet1: view.getUint8(offset + 8),
	                flagsOctet2: view.getUint8(offset + 9)
	            }
	        };

	        // An ID3v2 tag frame must have a length of at least 1 octet, excluding the header
	        if (frame.header.size < 1) { return frame; }

	        // A function to read the frame's content
	        var readContent = (function (read, id) { // jscs:disable requirePaddingNewLinesBeforeLineComments
	            // User-defined text-information frames
	            if (id === "TXXX") { return read.TXXX; }
	            // Text-information frames
	            if (id.charAt(0) === "T") { return read.T; }
	            // User-defined URL-link frames
	            if (id === "WXXX") { return read.WXXX; }
	            // URL-link frames
	            if (id.charAt(0) === "W") { return read.W; }
	            // Comment frames or Unsychronised lyrics/text transcription frames
	            if (id === "COMM" || id === "USLT") { return read.COMM; }
	            // For any other frame such as UFID, IPLS, USER, etc, return the reader function
	            //  that's named after the frame. Return a 'no-op reader' (which just returns
	            //  `undefined` as the frame's content) if no implementation found for given frame
	            return read[id] || lib.noOp;
	        }(readFrameContent, frame.header.id)); // jscs-enable requirePaddingNewLinesBeforeLineComments

	        // Store frame's friendly name
	        frame.name = id3v2TagFrameNames[frame.header.id];

	        // Read frame's content
	        frame.content = readContent(view, offset + 10, frame.header.size);

	        return frame;
	    };

	    // ### Read the ID3v2 Tag
	    //
	    // Read [ID3v2 Tag](http://id3.org/id3v2.3.0) located at `offset` of DataView `view`. Returns
	    //  null in the event that no tag is found at `offset`
	    mp3Id3v2Parser.readId3v2Tag = function (view, offset) {
	        offset || (offset = 0);

	        // The ID3v2 tag header, which should be the first information in the file, is 10 octets
	        //  long and laid out as `IIIVVFSSSS`, where
	        //
	        // * `III.......`: id, always "ID3" (0x49/73, 0x44/68, 0x33/51)
	        // * `...VV.....`: version (major version + revision number)
	        // * `.....F....`: flags: abc00000. a:unsynchronisation, b:extended header, c:experimental
	        // * `......SSSS`: tag's size as a synchsafe integer

	        // There should be at least 10 bytes ahead
	        if (view.byteLength - offset < 10) { return null; }

	        // The 'ID3' identifier is expected at given offset
	        if (!lib.isSeq(lib.seq.id3, view, offset)) { return null; }

	        //
	        var flagsOctet = view.getUint8(offset + 5);

	        //
	        var tag = {
	            _section: { type: "ID3v2", offset: offset },
	            header: {
	                majorVersion: view.getUint8(offset + 3),
	                minorRevision: view.getUint8(offset + 4),
	                flagsOctet: flagsOctet,
	                unsynchronisationFlag: (flagsOctet & 128) === 128,
	                extendedHeaderFlag: (flagsOctet & 64) === 64,
	                experimentalIndicatorFlag: (flagsOctet & 32) === 32,
	                size: lib.unsynchsafe(view.getUint32(offset + 6))
	            },
	            frames: []
	        };

	        // The size as expressed in the header is the size of the complete tag after
	        //  unsychronisation, including padding, excluding the header but not excluding the
	        //  extended header (total tag size - 10)
	        tag._section.byteLength = tag.header.size + 10;

	        // Index of octet following tag's last octet: The tag spans [offset, tagEnd)
	        //  (including the first 10 header octets)
	        var tagEnd = offset + tag._section.byteLength;

	        // TODO: Process extended header if present. The presence of an extended header will affect
	        //  the offset. Currently, it is asummed that no extended header is present so the offset
	        //  is fixed at 10 octets
	        // if (tag.header.extendedHeaderFlag) { /* TODO */ }

	        // Go on to read individual frames but only if the tag version is v2.3. This is the only
	        //  version currently supported
	        if (tag.header.majorVersion !== 3) { return tag; }

	        // To store frames as they're discovered while paring the tag
	        var frame;

	        // Move offset past the end of the tag header to start reading tag frames
	        offset += 10;
	        while (offset < tagEnd) {
	            // Locating a frame with a zeroed out id indicates that all valid frames have already
	            //  been parsed. It's all dead space hereon so practically we're done
	            if (view.getUint32(offset) === 0) { break; }

	            frame = mp3Id3v2Parser.readId3v2TagFrame(view, offset);

	            // Couldn't parse this frame so bail out
	            if (!frame) { break; }

	            tag.frames.push(frame);
	            offset += frame.header.size + 10;
	        }

	        return tag;
	    };
	}));
	});

	var xing = createCommonjsModule(function (module, exports) {
	//     mp3-parser/xing v0.3.0

	//     https://github.com/biril/mp3-parser
	//     Licensed and freely distributed under the MIT License
	//     Copyright (c) 2013-2016 Alex Lambiris

	// ----

	/* jshint browser:true */
	/* global exports:false, define:false, require:false */
	(function (globalObject, createModule) {

	    // Global `exports` object signifies CommonJS enviroments with `module.exports`, e.g. Node
	    {
	        return createModule(exports, lib);
	    }
	}(commonjsGlobal, function (xingParser, lib) {

	    // ### Read the Xing Tag
	    //
	    // Read [Xing / Lame Tag](http://gabriel.mp3-tech.org/mp3infotag.html) located at `offset` of
	    //  DataView `view`. Returns null in the event that no frame is found at `offset`
	    xingParser.readXingTag = function (view, offset) {
	        offset || (offset = 0);

	        var tag = {
	            _section: { type: "Xing", offset: offset },
	            header: lib.readFrameHeader(view, offset)
	        };

	        var head = tag.header; // Convenience shortcut

	        // The Xing tag should begin with a valid frame header
	        if (!head) { return null; }

	        var xingOffset = offset +
	            lib.getXingOffset(head.mpegAudioVersionBits, head.channelModeBits);

	        // There should be at least 'offset' (header) + 4 ("Xing"/"Info") octets ahead
	        if (view.byteLength < xingOffset + 4) { return null; }

	        // A "Xing" or "Info" identifier should be present
	        tag.identifier = (lib.isSeq(lib.seq.xing, view, xingOffset) && "Xing") ||
	            (lib.isSeq(lib.seq.info, view, xingOffset) && "Info");
	        if (!tag.identifier) { return null; }

	        //
	        tag._section.byteLength = lib.getFrameByteLength(head.bitrate, head.samplingRate,
	            head.framePadding, head.mpegAudioVersionBits, head.layerDescriptionBits);
	        tag._section.nextFrameIndex = offset + tag._section.byteLength;

	        return tag;
	    };
	}));
	});

	var main = createCommonjsModule(function (module, exports) {
	//     mp3-parser v0.3.0

	//     https://github.com/biril/mp3-parser
	//     Licensed and freely distributed under the MIT License
	//     Copyright (c) 2013-2016 Alex Lambiris

	// ----

	/* jshint browser:true */
	/* global exports:false, define:false, require:false */
	(function (globalObject, createModule) {

	    // Global `exports` object signifies CommonJS enviroments with `module.exports`, e.g. Node
	    {
	        return createModule(exports, lib, id3v2,
	            xing);
	    }
	}(commonjsGlobal, function (mp3Parser, lib, id3v2Parser, xingParser) {

	    // ### TL;DR
	    //
	    // The parser exposes a collection of `read____` methods, each dedicated to reading a specific
	    //  section of the mp3 file. The current implementation includes `readFrameHeader`, `readFrame`,
	    //  `readId3v2Tag` and `readXingTag`. Each of these accepts a DataView-wrapped ArrayBuffer,
	    //  which should contain the actual mp3 data, and optionally an offset into the buffer.
	    //
	    // All methods return a description of the section read in the form of a hash containing
	    //  key-value pairs relevant to the section. For example the hash returned from
	    //  `readFrameHeader` always contains an `mpegAudioVersion` key of value "MPEG Version 1
	    //  (ISO/IEC 11172-3)" and a `layerDescription` key of value "Layer III". A description will
	    //  always have a `_section` hash with `type`, `byteLength` and `offset` keys:
	    //
	    //  * `type`: "frame", "frameHeader", "Xing" or "ID3"
	    //  * `byteLenfth`: Size of the section in bytes
	    //  * `offset`: Buffer offset at which this section resides

	    // ----

	    // ### Read a Frame Header
	    //
	    // Read and return description of header of frame located at `offset` of DataView `view`.
	    //  Returns `null` in the event that no frame header is found at `offset`
	    mp3Parser.readFrameHeader = function (view, offset) {
	        return lib.readFrameHeader(view, offset);
	    };

	    // ### Read a Frame
	    //
	    // Read and return description of frame located at `offset` of DataView `view`. Includes the
	    //  frame header description (see `readFrameHeader`) plus some basic information about the
	    //  frame - notably the frame's length in bytes. If `requireNextFrame` is set, the presence of
	    //  a _next_ valid frame will be required for _this_ frame to be regarded as valid. Returns
	    //  null in the event that no frame is found at `offset`
	    mp3Parser.readFrame = function (view, offset, requireNextFrame) {
	        return lib.readFrame(view, offset, requireNextFrame);
	    };

	    // ### Read the Last Frame
	    //
	    // Locate and return description of the very last valid frame in given DataView `view`. The
	    //  search is carried out in reverse, from given `offset` (or the very last octet if `offset`
	    //  is ommitted) to the first octet in the view. If `requireNextFrame` is set, the presence
	    //  of a next valid frame will be required for any found frame to be regarded as valid (causing
	    //  the method to essentially return the next-to-last frame on success). Returns `null` in the
	    //  event that no frame is found at `offset`
	    mp3Parser.readLastFrame = function (view, offset, requireNextFrame) {
	        offset || (offset = view.byteLength - 1);

	        var lastFrame = null;

	        for (; offset >= 0; --offset) {
	            if (view.getUint8(offset) === 255) {
	                // Located a candidate frame as 255 is a possible frame-sync byte
	                lastFrame = mp3Parser.readFrame(view, offset, requireNextFrame);
	                if (lastFrame) { return lastFrame; }
	            }
	        }

	        return null;
	    };

	    // ### Read the ID3v2 Tag
	    //
	    // Read and return description of [ID3v2 Tag](http://id3.org/id3v2.3.0) located at `offset` of
	    //  DataView `view`. (This will include any and all
	    //  [currently supported ID3v2 frames](https://github.com/biril/mp3-parser/wiki) located within
	    //  the tag). Returns `null` in the event that no tag is found at `offset`
	    mp3Parser.readId3v2Tag = function (view, offset) {
	        return id3v2Parser.readId3v2Tag(view, offset);
	    };

	    // ### Read the Xing Tag
	    //
	    // Read and return description of
	    //  [Xing / Lame Tag](http://gabriel.mp3-tech.org/mp3infotag.html) located at `offset` of
	    //  DataView `view`. Returns `null` in the event that no frame is found at `offset`
	    mp3Parser.readXingTag = function (view, offset) {
	        return xingParser.readXingTag(view, offset);
	    };

	    // ### Read all Tags up to First Frame
	    // Read and return descriptions of all tags found up to (and including) the very first frame.
	    //  Returns an array of sections which may include a description of a located ID3V2 tag, a
	    //  description of located Xing / Lame tag and a description of the a located first frame
	    //  ( See [this](http://www.rengels.de/computer/mp3tags.html) and
	    //  [this](http://stackoverflow.com/a/5013505) )
	    mp3Parser.readTags = function (view, offset) {
	        offset || (offset = 0);

	        var sections = [];
	        var section = null;
	        var isFirstFrameFound = false;
	        var bufferLength = view.byteLength;

	        var readers = [mp3Parser.readId3v2Tag, mp3Parser.readXingTag, mp3Parser.readFrame];
	        var numOfReaders = readers.length;

	        // While we haven't located the first frame, pick the next offset ..
	        for (; offset < bufferLength && !isFirstFrameFound; ++offset) {
	            // .. and try out each of the 'readers' on it
	            for (var i = 0; i < numOfReaders; ++i) {
	                section = readers[i](view, offset);

	                // If one of the readers successfully parses a section ..
	                if (section) {
	                    // .. store it ..
	                    sections.push(section);

	                    // .. and push the offset to the very end of end of that section. This way,
	                    //  we avoid iterating over offsets which definately aren't the begining of
	                    //  some section (they're part of the located section)
	                    offset += section._section.byteLength;

	                    // If the section we just parsed is a frame then we've actually located the
	                    //  first frame. Break out of the readers-loop making sure to set
	                    //  isFirstFrameFound (so that we also exit the outer loop)
	                    if (section._section.type === "frame") {
	                        isFirstFrameFound = true;
	                        break;
	                    }

	                    // The section is _not_ the first frame. So, having pushed the offset
	                    //  appropriately, retry all readers
	                    i = -1;
	                }
	            }
	        }

	        return sections;
	    };
	}));
	});

	const CHUNK_MAX_SIZE = 1000 * 1000;
	const DEFAULT_CONCURRENCY = 4;
	const CONCURRENCY =
	  ((typeof navigator !== 'undefined' && navigator.hardwareConcurrency) || 1) > 2
	    ? navigator.hardwareConcurrency
	    : DEFAULT_CONCURRENCY;

	/**
	 * Creates a new ArrayBuffer out of two Uint8Arrays
	 *
	 * @private
	 * @param   {Uint8Array}  baseUint8Array  first Uint8Array.
	 * @param   {Uint8Array}  buffer          second Uint8Array.
	 * @return  {ArrayBuffer}                  The new ArrayBuffer
	 */
	function makeChunk(array1, array2) {
	  const tmp = new Uint8Array(array1.byteLength + array2.byteLength);
	  tmp.set(array1, 0);
	  tmp.set(array2, array1.byteLength);
	  return tmp.buffer;
	}

	function makeSaveChunk(chunkArrayBuffers, tagsUInt8Array, sourceUInt8Array) {
	  return function saveChunk(chunk) {
	    chunkArrayBuffers.push(
	      makeChunk(
	        tagsUInt8Array,
	        sourceUInt8Array.subarray(
	          chunk.frames[0]._section.offset,
	          chunk.frames[chunk.frames.length - 1]._section.offset +
	            chunk.frames[chunk.frames.length - 1]._section.byteLength
	        )
	      )
	    );
	  };
	}

	function emptyChunk(chunk) {
	  chunk.byteLength = 0;
	  chunk.frames.length = 0;
	}

	function addChunkFrame(chunk, frame) {
	  chunk.byteLength = chunk.byteLength + frame._section.byteLength;
	  chunk.frames.push(frame);
	}

	const asyncWorker = (source, items, fn, output) => async () => {
	  let next;
	  while ((next = items.pop())) {
	    output[source.get(next)] = await fn(next);
	  }
	};

	function getArrayBuffer(file) {
	  return new Promise((resolve) => {
	    let fileReader = new FileReader();
	    fileReader.onloadend = () => {
	      resolve(fileReader.result);
	    };
	    fileReader.readAsArrayBuffer(file);
	  });
	}

	// Use a promise wrapper on top of event based syntax
	// for browsers (Safari) which do not support promise-based syntax.
	function decodeArrayBuffer(audioCtx, arrayBuffer) {
	  return new Promise(audioCtx.decodeAudioData.bind(audioCtx, arrayBuffer));
	}

	async function getFileAudioBuffer(file, audioCtx, options = {}) {
	  /* Copyright (c) 2019, Timothée 'Tim' Pillard, @ziir @tpillard - ISC */

	  const { native = false, concurrency = CONCURRENCY } = options;

	  const arrayBuffer = await getArrayBuffer(file);

	  if (native) {
	    return decodeArrayBuffer(audioCtx, arrayBuffer);
	  }

	  const safari = !!window.webkitAudioContext;
	  if (safari) {
	    return getFileAudioBuffer(file, audioCtx, { native: true });
	  }

	  const view = new DataView(arrayBuffer);

	  const tags = main.readTags(view);
	  const firstFrame = tags.pop();
	  const uInt8Array = new Uint8Array(arrayBuffer);
	  const tagsUInt8Array = uInt8Array.subarray(0, firstFrame._section.offset);
	  const chunkArrayBuffers = [];
	  const saveChunk = makeSaveChunk(
	    chunkArrayBuffers,
	    tagsUInt8Array,
	    uInt8Array
	  );
	  let chunk = { byteLength: 0, frames: [] };
	  let next = firstFrame._section.offset + firstFrame._section.byteLength;
	  while (next) {
	    const frame = main.readFrame(view, next);
	    next = frame && frame._section.nextFrameIndex;

	    if (frame) {
	      const chunkEnd =
	        chunk && chunk.byteLength + frame._section.byteLength >= CHUNK_MAX_SIZE;
	      if (chunkEnd) {
	        saveChunk(chunk);
	        emptyChunk(chunk);
	      }

	      addChunkFrame(chunk, frame);
	    }

	    if (chunk && (!frame || !next)) {
	      saveChunk(chunk);
	    }
	  }

	  const workers = [];
	  const source = new Map(chunkArrayBuffers.map((chunk, idx) => [chunk, idx]));
	  const audioBuffers = new Array(chunkArrayBuffers.length);
	  const decode = decodeArrayBuffer.bind(null, audioCtx);

	  for (let i = 0; i < Math.min(concurrency, source.size); i++) {
	    workers.push(
	      asyncWorker(source, chunkArrayBuffers, decode, audioBuffers)()
	    );
	  }
	  await Promise.all(workers);

	  const { numberOfChannels, sampleRate } = audioBuffers[0];
	  let length = audioBuffers.reduce((acc, current) => acc + current.length, 0);

	  const audioBuffer = audioCtx.createBuffer(
	    numberOfChannels,
	    length,
	    sampleRate
	  );

	  for (let j = 0; j < numberOfChannels; j++) {
	    const channelData = audioBuffer.getChannelData(j);
	    let offset = 0;
	    for (let i = 0; i < audioBuffers.length; i++) {
	      channelData.set(audioBuffers[i].getChannelData(j), offset);
	      offset += audioBuffers[i].length;
	    }
	  }

	  return audioBuffer;
	}

	exports.getFileAudioBuffer = getFileAudioBuffer;

	Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=decode-audio-data-fast.standalone.umd.js.map
