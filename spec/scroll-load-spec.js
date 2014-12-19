(function() {
  describe('Simple scroll-load', function() {
    var content, opts;
    opts = {
      el: '#scroll-load',
      container: '#content'
    };
    content = $("<section id=\"content\">\n  <li><p>This is a paragraph</p></li>\n  <li><p>This is a paragraph</p></li>\n  <li><p>This is a paragraph</p></li>\n</section>\n<div id=\"scroll-load\"></div>");
    beforeEach(function() {
      return content.appendTo('body');
    });
    it('should scroll-load exit when init', function() {
      simple.scrollLoad(opts);
      return expect($(opts.container).data('scroll-load')).toBe('enabled');
    });
    return it('should throw an exception when opts is not provided', function() {
      var testException;
      testException = function() {
        return simple.scrollLoad();
      };
      return expect(testException).toThrow();
    });
  });

}).call(this);
