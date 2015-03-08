function namespace(namespaceString) {
  return namespaceString.split('.').reduce(
    function(container, identifier) {
      return container[identifier] = container[identifier] || {};
    }, window);
}
