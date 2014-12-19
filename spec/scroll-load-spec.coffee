  describe 'Simple scroll-load', ->
    opts =
        el: '#scroll-load'
        container: '#content'

    content = $("""
              <section id="content">
                <li><p>This is a paragraph</p></li>
                <li><p>This is a paragraph</p></li>
                <li><p>This is a paragraph</p></li>
              </section>
              <div id="scroll-load"></div>
      """)

    beforeEach ->
      content.appendTo 'body'

    it 'should scroll-load exit when init', ->
      simple.scrollLoad opts
      expect($(opts.container).data('scroll-load')).toBe('enabled')

    it 'should throw an exception when opts is not provided', ->
      testException = ->
        simple.scrollLoad()
      expect(testException).toThrow()
