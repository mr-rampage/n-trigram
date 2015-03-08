(function() {
  var module = namespace('trigram.helpers');
  var matchWords = "(?:\\S+\\s*?)";

  function getWordMatchRegex(numberOfWords, atStart) {
    var regex = matchWords;
    regex += "{" + numberOfWords + "}";
    regex = (atStart ? "^" + regex : regex + "$");
    return regex;
  };

  function extractWords(input, numberOfWords, atStart) {
    var exp = getWordMatchRegex(numberOfWords, atStart);
    var regex = new RegExp(exp);
    var match = regex.exec(input);
    return (match ? match[0].trim() : null);
  }

  function removeWords(input, numberOfWords, atStart) {
    var exp = getWordMatchRegex(numberOfWords, atStart);
    var regex = new RegExp(exp);
    return input.replace(regex, '').trim();
  }

  module.extractWords = extractWords;
  module.removeWords = removeWords;

})();
