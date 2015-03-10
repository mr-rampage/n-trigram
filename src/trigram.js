(function() {
  var module = namespace('trigram');
  var matchWords = "(?:\\S+\\s*?)";

  function getWordMatchRegex(numberOfWords, fromStart) {
    var exp = matchWords;
    exp += "{" + numberOfWords + "}";
    exp = (fromStart ? "^" + exp : exp + "$");
    return new RegExp(exp);
  };

  function extractWords(input, numberOfWords, fromStart) {
    var regex = getWordMatchRegex(numberOfWords, fromStart);
    var match = regex.exec(input);
    return (match ? match[0].trim() : null);
  }

  function removeWords(input, numberOfWords, fromStart) {
    var regex = getWordMatchRegex(numberOfWords, fromStart);
    return input.replace(regex, '').trim();
  }

  function getNthWord(input, index, fromStart) {
    var regex = getWordMatchRegex(index + 1, fromStart);
    var match = regex.exec(input);
    if (match) {
      var parts = match[0].trim().split(/\s+/);
      return parts[index];
    }
    return null;
  }

  function randInt(maxInteger) {
    return Math.floor(Math.random() * maxInteger);
  }

  function createMap(input, trigramSize) {
    var map = {};

    if (input && input.length > 0) {
      var key = null;
      var value = null;

      do {
        value = getNthWord(input, trigramSize, true);
        if (value) {
          key = extractWords(input, trigramSize, true);
          map[key] = map[key] || [];
          if (map[key].indexOf(value) < 0) {
            map[key].push(value);
          }
          input = removeWords(input, 1, true);
        }
      } while (key && value);
    }

    return map;
  }

  function generate(seed, map, trigramSize, maxWords) {
    if (maxWords < 1 || seed.length === 0 || map === {}) return "";
    var story = seed;
    var key = "";
    do {
      key = extractWords(story, trigramSize, false);
      if (map[key]) {
        var words = map[key];
        var word = words[randInt(words.length)];
        story += " " + word;
      }
    } while(maxWords-- && map[key]);

    return story;
  }

  module.extractWords = extractWords;
  module.removeWords = removeWords;
  module.map = createMap;
  module.generate = generate;

})();
