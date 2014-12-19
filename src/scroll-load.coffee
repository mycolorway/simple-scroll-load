
class ScrollLoad extends SimpleModule

  @i18n:
    "zh-CN":
      loading: "正在加载中..."
      nomore: "后面没有了"
    "en":
      loading: "loading..."
      nomore: "There's no more results behind"

  opts:
    el: null
    url: ""
    params: {}
    method: "GET"
    container: "body"
    heightOffset: 10

  _init: ->
    @target = $(this)
    @el = $(@opts.el)
    throw new Error "simple-scroll-load: el option is invalid" if @el.length == 0
    @container = $(@opts.container)
    throw new Error "simple-scroll-load: container option is invalid" if @container.length == 0

    @target.off '.scrollLoad'
    @container.data('scroll-load','enabled')
    @loadContent()
    @_bind()

  _bind: ->
    $(window).on 'scroll', (event) =>
      if @container.data('scroll-load') is 'enabled'
        @loadContent()
      else
        event.stopPropagation()

    @target.on 'appendData.scrollLoad',(e,data) ->
      @container.append(data)

  loadContent: ->
    @trigger('resetOpts.scrollLoad')
    mayLoadContent = $(window).scrollTop()+@opts.heightOffset >= $(document).height() - $(window).height()
    if mayLoadContent
      request = $.ajax
        url: @opts.url
        type: @opts.method
        data: @opts.params
        success: (data) =>
          @renderData(data)
        error: (jqXHR, textStatus, errorMsg) ->
          alert('Error:' + errorMsg)
        beforeSend: =>
          @beforeLoad()
      @checkScroll(request)

  beforeLoad: ->
    unless @el.hasClass('loading')
      @el.addClass('loading').text(@_t 'loading').fadeIn(200)

  renderData: (result) ->
    try
      $items =  $('<div/>').append($.trim(result)).children()
    catch e
      $items = ''
    if result and result.length > 0
      @target.trigger('appendData.scrollLoad',[$items])
      

  checkScroll: (request) ->
    if request
      request.done (result) =>
        result = $.trim result
        if result
          @el.fadeOut(200).removeClass('loading').text('')
          @target.trigger('resetOpts.scrollLoad')
          @checkScroll()
        else
          @el.addClass('nomore').text(@_t 'nomore').fadeIn(200)
          @container.data('scroll-load','disabled')

scrollLoad = (opts) ->
  new ScrollLoad(opts)
