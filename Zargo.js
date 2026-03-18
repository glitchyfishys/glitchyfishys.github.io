function predictableRandom(x) {
  let start = Math.pow(x % 97, 4.3) * 232344573;
  const a = 15485863;
  const b = 521791;
  start = (start * a) % b;
  for (let i = 0; i < (x * x) % 90 + 90; i++) {
    start = (start * a) % b;
  }
  return start / b;
}

function randomSymbol() {
  return String.fromCharCode(Math.floor(Math.random() * 50) + 192);
}

function wordShift(list, noBuffer = false) {
  const len = list.length;
  const tick = Math.floor(Date.now() / 500) % (len * 5);
  const mod5 = ((Date.now() / 500) % (len * 5)) % 5;
  const largeTick = Math.floor(tick / 5);
  let v = list[largeTick];
  // Blend with adjacent words, in such a way that mod5 being 0 or 5 corresponds with a 0.5 blend parameter
  if (mod5 < 0.6) {
    v = this.blendWords(list[(largeTick + list.length - 1) % list.length], list[largeTick], (mod5 + 0.6) / 1.2);
  } else if (mod5 > 4.4) {
    v = this.blendWords(list[largeTick], list[(largeTick + 1) % list.length], (mod5 - 4.4) / 1.2);
  }
  v = this.randomCrossWords(v, 0.1 * Math.pow(mod5 - 2.5, 4) - 0.6);
  if (noBuffer) return v;
  const maxWordLen = Math.max(...list.map(x => x.length));
  const bufferSpace = (maxWordLen - v.length) / 2;
  // Buffer the result with ALT+255 on either side to prevent the ui from twitching.
  // Spaces do not work due to being automatically collapsed, and css fixing this causes other issues.
  return "&#160".repeat(Math.ceil(bufferSpace)) + v + "&#160".repeat(Math.floor(bufferSpace));
}

function wordCycle(list, noBuffer = false) {
  const len = list.length;
  const tick = Math.floor(Date.now() / 500) % (len * 5);
  const mod5 = ((Date.now() / 500) % (len * 5)) % 5;
  const largeTick = Math.floor(tick / 5);
  let v = list[largeTick];
  // Blend with adjacent words, in such a way that mod5 being 0 or 5 corresponds with a 0.5 blend parameter
  if (mod5 < 0.6) {
    v = this.blendWords(list[(largeTick + list.length - 1) % list.length], list[largeTick], (mod5 + 0.6) / 1.2);
  } else if (mod5 > 4.4) {
    v = this.blendWords(list[largeTick], list[(largeTick + 1) % list.length], (mod5 - 4.4) / 1.2);
  }
  v = this.randomCrossWords(v, 0.1 * Math.pow(mod5 - 2.5, 4) - 0.6);
  if (noBuffer) return v;
  const maxWordLen = Math.max(...list.map(x => x.length));
  const bufferSpace = (maxWordLen - v.length) / 2;
  // Buffer the result with ALT+255 on either side to prevent the ui from twitching.
  // Spaces do not work due to being automatically collapsed, and css fixing this causes other issues.
  return "&#160".repeat(Math.ceil(bufferSpace)) + v + "&#160".repeat(Math.floor(bufferSpace));
}

  // Note that while frac may appear to specify the proportion of letters randomized, it may end up being slightly less
  // depending on the specific string length and random output sometimes giving outputs which aren't coprime
function randomCrossWords(str, frac = 0.7) {
  if (frac <= 0) return str;
  const x = str.split("");
  for (let i = 0; i < x.length * frac; i++) {
    const randomIndex = Math.floor(predictableRandom(Math.floor(Date.now() / 500) % 964372 + 1.618 * i) * x.length);
    x[randomIndex] = randomSymbol();
  }
  return x.join("");
}
  
  // This should only be used on words which will end up being completely randomized, because the unscrambled appearance
  // of the output may look bad. Blends two strings together to produce a string of intermediate length, taking a
  // specifed fraction (param, 0 to 1) from the first word and the rest (1 - param) from the second
function blendWords(first, second, param) {
  if (param <= 0) return first;
  if (param >= 1) return second;
  return first.substring(0, first.length * (1 - param)) +
    second.substring(second.length * (1 - param), second.length);
}
