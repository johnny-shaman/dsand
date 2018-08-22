/*
  global
  _
*/
(() => {
  "use strict";
  _.lib === "losand" && _(_).define({
    Listener: {
      configurable: true,
      value : _(function (o) {
        return _(o)
        .is(Object).bind(o => _(_.Listener.prototype).create().draw(o)).re
        .isnt(Object).bind(o => _(
          _(_.Listener.prototype).create().draw(_(o).from._)._
        ).create().draw(o)).re._;
      })
      .affix({
        handleEvent (e) {
          _(this[e.type])
          .is(Function)
          .$(f => f.call(this, e))
          .isnt(Function)
          .$(o => o[_(e.data)[""] ? o.type : e.data.emit].call(this, e))
          ._;
        },
        listenOn (a, d) {
          a.forEach(t => d.addEventListener(t, this, false));
          return this;
        },
        listenOff (a, d) {
          a.forEach(t => d.removeEventListener(t, this, false));
          return this;
        },
        on (d, ...a) {
          return a.length === 0
          ? _(this).keys.map(a => this.listenOn(a, d))._
          : _(a).$(a =>  this.listenOn(a, d))._;
        },
        off (d, ...a) {
          return a.length === 0
          ? _(this).keys.map(a => this.listenOff(a, d))._
          : _(a).$(a =>  this.listenOff(a, d))._;
        },
      })._
    },
  })
  .annex({
    listener: {
      configurable: true,
      get () {
        return this
        .isnt(Function).map(o => _.Listener(o)).re
        .is(Function).hybrid(_.Listener.prototype);
      }
    },
    on: {
      configurable: true,
      value (d, ...a) {
        this.from.from.isnt(_.Listener).listener;
        return this.$(t => t.on(d, ...a));
      }
    },
    off: {
      configurable: true,
      value(d, ...a) {
        this.from.from.isnt(_.Listener).listener;
        return this.$(t => t.off(d, ...a));
      }
    }
  });
})();