(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define('simple-scroll-load', ["jquery",
      "simple-module"], function ($, SimpleModule) {
      return (root.returnExportsGlobal = factory($, SimpleModule));
    });
  } else if (typeof exports === 'object') {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like enviroments that support module.exports,
    // like Node.
    module.exports = factory(require("jquery"),
      require("simple-module"));
  } else {
    root.simple = root.simple || {};
    root.simple['scrollLoad'] = factory(jQuery,
      SimpleModule);
  }
}(this, function ($, SimpleModule) {

var ScrollLoad, scrollLoad,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

ScrollLoad = (function(_super) {
  __extends(ScrollLoad, _super);

  function ScrollLoad() {
    return ScrollLoad.__super__.constructor.apply(this, arguments);
  }

  ScrollLoad.i18n = {
    "zh-CN": {
      loading: "正在加载中...",
      nomore: "后面没有了"
    },
    "en": {
      loading: "loading...",
      nomore: "There's no more results behind"
    }
  };

  ScrollLoad.prototype.opts = {
    el: null,
    url: "",
    params: {},
    method: "GET",
    container: "body",
    heightOffset: 10
  };

  ScrollLoad.prototype._init = function() {
    this.target = $(this);
    this.el = $(this.opts.el);
    if (this.el.length === 0) {
      throw new Error("simple-scroll-load: el option is invalid");
    }
    this.container = $(this.opts.container);
    if (this.container.length === 0) {
      throw new Error("simple-scroll-load: container option is invalid");
    }
    this.target.off('.scrollLoad');
    this.container.data('scroll-load', 'enabled');
    this.loadContent();
    return this._bind();
  };

  ScrollLoad.prototype._bind = function() {
    $(window).on('scroll', (function(_this) {
      return function(event) {
        if (_this.container.data('scroll-load') === 'enabled') {
          return _this.loadContent();
        } else {
          return event.stopPropagation();
        }
      };
    })(this));
    return this.target.on('appendData.scrollLoad', function(e, data) {
      return this.container.append(data);
    });
  };

  ScrollLoad.prototype.loadContent = function() {
    var mayLoadContent, request;
    this.trigger('resetOpts.scrollLoad');
    mayLoadContent = $(window).scrollTop() + this.opts.heightOffset >= $(document).height() - $(window).height();
    if (mayLoadContent) {
      request = $.ajax({
        url: this.opts.url,
        type: this.opts.method,
        data: this.opts.params,
        success: (function(_this) {
          return function(data) {
            return _this.renderData(data);
          };
        })(this),
        error: function(jqXHR, textStatus, errorMsg) {
          return alert('Error:' + errorMsg);
        },
        beforeSend: (function(_this) {
          return function() {
            return _this.beforeLoad();
          };
        })(this)
      });
      return this.checkScroll(request);
    }
  };

  ScrollLoad.prototype.beforeLoad = function() {
    if (!this.el.hasClass('loading')) {
      return this.el.addClass('loading').text(this._t('loading')).fadeIn(200);
    }
  };

  ScrollLoad.prototype.renderData = function(result) {
    var $items, e;
    try {
      $items = $('<div/>').append($.trim(result)).children();
    } catch (_error) {
      e = _error;
      $items = '';
    }
    if (result && result.length > 0) {
      return this.target.trigger('appendData.scrollLoad', [$items]);
    }
  };

  ScrollLoad.prototype.checkScroll = function(request) {
    if (request) {
      return request.done((function(_this) {
        return function(result) {
          result = $.trim(result);
          if (result) {
            _this.el.fadeOut(200).removeClass('loading').text('');
            _this.target.trigger('resetOpts.scrollLoad');
            return _this.checkScroll();
          } else {
            _this.el.addClass('nomore').text(_this._t('nomore')).fadeIn(200);
            return _this.container.data('scroll-load', 'disabled');
          }
        };
      })(this));
    }
  };

  return ScrollLoad;

})(SimpleModule);

scrollLoad = function(opts) {
  return new ScrollLoad(opts);
};

return scrollLoad;

}));

