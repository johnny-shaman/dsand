/*
  global
    _
    location
    Option
    ul
    ol
    li
    optgroup
    input
    label
    radio
    Event
    Element
*/

this._.lib === "losand" && (() => {
  "use strict";

  const $ = _(function (n) {
    return _(
      (n.tagName !== undefined && $[n.tagName] !== undefined)
      ? $[n.tagName].prototype
      : $.prototype
    )
    .create({
      n: {
        configurable: true,
        writable: true,
        value: (
          n instanceof Event
          ? n.target
          : n
        )
      }
    })
    ._;
  })
  .annex({
    end: {
      configurable: true,
      get () {
        return this.n;
      }
    },
    id: {
      configurable: true,
      value (id) {
        return _(this).$(t => _(t.n).draw({id}))._;
      }
    },
    "class": {
      configurable: true,
      value (...s) {
        return _(this).$(
          t => t.n.classList.add(...s)
        )._;
      }
    },
    name: {
      configurable: true,
      value (name) {
        return _(this).$(
          t => (_(t.n).draw({name}), $.names.add(name))
        )._;
      }
    },
    css: {
      configurable: true,
      value (o) {
        return _(this).$(t => _(t.n.style).draw(o))._;
      }
    },
    style: {
      configurable: true,
      value (o) {
        return _(this).$(t => _(t.n.style).draw(o))._;
      }
    },
    item: {
      configurable: true,
      value (o) {
        return _(o).draw(_(o.item).keys.bind(
          a => a.reduce((p, c) => p.draw({[`item${c}`]: o.item[c]}), _({}))
        ));
      }
    },
    "@$set":{
      configurable: true,
      value (k, s) {
        return _(this).$(
          t => t.n instanceof Element
          ? s === undefined
            ? delete t.n.dataset[k]
            : _(t.n.dataset).draw({[k]: s})
          : _(t.n).draw({[k]: s})
        )._;
      }
    },
    "@$get":{
      configurable: true,
      value (k) {
        return _(this).map(
          t => t.n instanceof Element
          ? t.n.dataset[k]
          : t.n[k]
        )._;
      }
    },
    mark: {
      configurable: true,
      value (s) {
        return this["@$set"]("mark", s);
      }
    },
    look: {
      configurable: true,
      get () {
        return $.data[this["@$get"]("mark")];
      }
    },
    on: {
      configurable: true,
      value (...a) {
        return _(this).$(
          t => a.each(v => t.n.addEventListener.call(t.n, v, $.on))
        )._;
      }
    },
    off: {
      configurable: true,
      value (...a) {
        return _(this).$(
          t => a.each(v => t.n.removeEventListener.call(t.n, v, $.on))
        )._;
      }
    },
    once: {
      configurable: true,
      value (...a) {
        return _(this).$(
          t => a.each(
            v => (
              t.n.addEventListener.call(t.n, v, $.on),
              t.n.addEventListener.call(t.n, v, $.prototype["@once"])
            )
          )
        )._;
      }
    },
    "@once": {
      configurable: true,
      value (e) {
        return _($(e)).$(
          t => (
            t.off.call(t, e.type, $.on),
            t.n.removeEventListener.call(t.n, e.type, $.prototype["@once"])
          )
        )._;
      }
    },
    beat: {
      configurable: true,
      value (m, ...a) {
        return _(this).$(
          t => (
            t.once(...a),
            t["@beat"](m, ...a)
          )
        )._;
      }
    },
    "@beat": {
      configurable: true,
      value (m, ...a) {
        return _(this).$(
          t => m && setTimeout(() => t.beat(m, ...a), m)
        )._;
      }
    },
    wait: {
      configurable: true,
      value (m) {
        return this["@$set"]("wait", m);
      }
    },
    "@wait": {
      configurable: true,
      get () {
        return this["@$get"]("wait");
      }
    },
    "@setTimer": {
      configurable: true,
      value (v) {
        return this["@$set"]("timer", v);
      }
    },
    "@getTimer": {
      configurable: true,
      get () {
        return this["@$get"]("timer");
      }
    },
    $: {
      configurable: true,
      value (...n) {
        n[0] !== undefined
        ? this.n.append.call(
          this.n, ...n.map(
            v => v instanceof $ ? v.n : v
          )
        )
        : this.n.remove.call(this.n);
        return this;
      }
    },
    pick: {
      configurable: true,
      get () {
        return this.n.children.length > 1
        ? $(this.n.children)
        : $(this.n.children[0]);
      }
    },
    outer: {
      configurable: true,
      get () {
        return $(this.n.parentNode);
      }
    },
    inner: {
      configurable: true,
      get () {
        return _(this.n.children).list._.map(c => $(c));
      }
    },
    now: {
      configurable: true,
      get () {
        return this.n.innerText;
      },
      set (v) {
        this.n.innerText = v;
        return true;
      }
    },
    seem: {
      configurable: true,
      value (v) {
        this.now = v;
        return this;
      }
    },
    role: {
      configurable: true,
      get () {
        return _(this).$(
          t => _(t.n.classList).list.$(
            a => a.each(k => $.role[k] && $.role[k](this.look))
          )
        )._;
      }
    },
    pack: {
      configurable: true,
      get () {
        return _(this).$(
          t => _(t.n.classList).list.$(
            a => a.each(k => $.pack[k] && $.pack[k](this))
          )
        )._;
      }
    }
  })
  .$(c => _(c).draw({
    version: "0.3.5",
    lib: "dsand",
    _: s => $(document.createElement(s)),
    $: (...s) => $(
      _(document.querySelectorAll(...s)).map(l => l.length === 1 ? l[0] : l)
    ),
    data: {},
    role: {},
    pack: {},
    names: new Set(),
    pvp: false,
    on (e) {
      _(e)
      .been
      .preventDefault()
      .stopPropagation()
      .to
      .get("target")
      .bind(
        t => (
          _(t).get("role")[""]
          ? _(t).get("classList").list
          : _(t).get("role")
        )
      )
      .$(
        a => $(e)["@wait"] === undefined
        ? $.soon(e, a)
        : $.wait(e, a)
      );
    },
    soon (e, a) {
      a.each(k => $["@pack"](e, k, $["@role"](e, k)));
    },
    wait (e, a) {
      _($(e)["@getTimer"]).$(t => clearTimeout(t.json._));
      _($(e)["@wait"]).$(
        m => $(e)["@setTimer"](_(setTimeout(() => $.soon(e, a), m.json._)).json)
      );
    },
    TABLE: _(c).fork(function(){}).annex({
      $: {
        configurable: true,
        value (n) {
          return _(this).$(
            t => n.each(
              v => $(this.n.insertRow.call(this.n)).$(v)
            )
          );
        }
      },
      cell: {
        configurable: true,
        get () {
          return new Proxy(this.n.rows, {
            get (r, y) {
              return new Proxy(r[y], {
                get (c, x) {
                  return $(c[x]);
                }
              });
            }
          });
        }
      },
      cols: {
        configurable: true,
        get () {
          return new Proxy(this.n.rows, {
            get (t, k) {
              return t.reduce((p, c) => p.push(c.cells[k]), []);
            }
          });
        }
      },
      each: {
        configurable: true,
        value (f, ...v) {
          return $(this.n.rows).each(f);
        }
      }
    })._,
    TR: _(c).fork(function(){}).annex({
      $: {
        configurable: true,
        value (n) {
          n.each(v => $(this.n.insertCell.call(this.n)).$(v));
          return this;
        }
      },
      each: {
        configurable: true,
        value (f, ...v) {
          return $(this.n.cells).each(f);
        }
      }
    })._,
    TD: _(c).fork(function(){}).annex({
      each: {
        configurable: true,
        value (f, ...v) {
          return f(this.n.children, ...v);
        }
      }
    })._,
    UL: _(c).fork(function(){}).annex({
      $: {
        configurable: true,
        value (a) {
          $.prototype.$.call(this, ...a.map(
            v => v.constructor === Array ? ul.$(v) : li.$(v)
          ));
          return this;
        }
      }
    })._,
    OL: _(c).fork(function(){}).annex({
      $: {
        configurable: true,
        value (a) {
          $.prototype.$.call(this, ...a.map(v => v.constructor === Array ? ol.$(v) : li.$(v)));
          return this;
        }
      }
    })._,
    SELECT: _(c).fork(function(){}).annex({
      $: {
        configurable: true,
        value (n) {
          _(
            n.constructor === Object
            ? _(n).keys._.map(k => (
              n[k].constructor === Array || n[k].constructor === Object
              ? optgroup.label(k).$(n[k])
              : new Option(k, n[k]))
            )
            : (
              n.constructor === Array
              ? n.map(v => v.constructor === Option ? v : new Option(v, v))
              : _(n).$(v => this.now = v).map(v => v === undefined && [])._
            )
          ).$(v => v.constructor === Array && $.prototype.$.call(this, ...v));
          return this;
        }
      },
      select: {
        configurable: true,
        value (value) {
          return _(this).$(t => _(t.n).draw({value}))._;
        }
      },
      now: {
        configurable: true,
        get () {
          return this.n.value.json._;
        },
        set (v) {
          this.n.value = v;
          v = undefined;
          return true;
        }
      }
    })._,
    OPTGROUP: _(c).fork(function(){}).annex({
      $: {
        configurable: true,
        value (n) {
          $.prototype.$.call(this, ...(
            n.constructor === Object
            ? _(n).keys._.map(k => new Option(k, n[k]))
            : n.map(
              v => v.constructor === Option ? v : new Option(v, v)
            )
          ));
          return this;
        }
      },
      label: {
        configurable: true,
        value (s) {
          return _(this).$(t => _(t.n).draw({label: s}))._;
        }
      }
    })._,
    INPUT: _(c).fork(function(){}).annex({
      $: {
        configurable: true,
        value (v) {
          return _(this).$(o => v === undefined ? $.prototype.$.call(o.n, v) : o.now = v)._;
        }
      },
      type: {
        configurable: true,
        value (type) {
          return _(this).$(t => _(t.n).draw({type}))._;
        }
      },
      value: {
        configurable: true,
        value (value) {
          return _(this).$(t => _(t.n).draw({value}))._;
        }
      },
      check: {
        configurable: true,
        value (checked) {
          return _(this).$(t => _(t.n).draw({checked}))._;
        }
      },
      shift: {
        configurable: true,
        value () {
          return this.check(!this.n.checked);
        }
      },
      now: {
        configurable: true,
        get () {
          return _(this).map(o => (
            (o.n.type === "checkbox" || o.n.type === "radio") ? o.n.checked : o.n.value
          ))._;
        }
      }
    })._,
    TEXTAREA: _(c).fork(function(){}).annex({
      $: {
        configurable: true,
        value (v) {
          v === undefined ? $.prototype.$.call(this, v) : this.now = v;
          return this;
        }
      },
      value: {
        configurable: true,
        value (value) {
          return _(this).$(t => _(t.n).draw({value}))._;
        }
      },
      now: {
        configurable: true,
        get () {
          return this.n.value;
        }
      }
    })._,
    FORM: _(c).fork(function(){}).annex({
      get: {
        configurable: true,
        get () {
          return _($.names).list._
          .reduce(
            (p, k) => p.draw({
              [k]: (
                _(this.n)
                .map(n => (
                  n[k].type === "checkbox"
                  ? n[k].checked
                  : n[k].value.json._
                ))
              )._
            }),
            _({})
          )
          .valid
          ._;
        }
      },
      set: {
        configurable: true,
        value (o) {
          return _(this)
          .$(
            t => _(o).entries._.each(
              ([k, v]) => (
                t.n[k].type === "checkbox"
                ? t.n[k].checked = o[k]
                : t.n[k].value = o[k]
              )
            )
          )._;
        }
      }
    })._,
    A: _(c).fork(function(){}).annex({
      href: {
        configurable: true,
        value (href) {
          return _(this).$(t => _(t.n).draw({href}))._;
        }
      }
    })._,
    media: _(c).fork(function(){}).annex({
      $: {
        configurable: true,
        value (v) {
          v === undefined ? $.prototype.$.call(this, v) : this.src(v);
          return this;
        }
      },
      src: {
        configurable: true,
        value (src) {
          return _(this).$(t => _(t.n).draw({src}))._;
        }
      },
      alt: {
        configurable: true,
        value (alt) {
          return _(this).$(t => _(t.n).draw({alt}))._;
        }
      },
      now: {
        configurable: true,
        get () {
          return this.n.src;
        }
      }
    })._
  })
  .define({
    id: {
      configurable: true,
      value: new Proxy (document, {
        get (t, k) {
          return $(t.getElementById(k));
        }
      })
    },
    "class": {
      configurable: true,
      value: new Proxy (document, {
        get (t, k) {
          return _(t.getElementsByClassName(k)).list._.map(n => $(n));
        }
      })
    },
    name: {
      configurable: true,
      value: new Proxy (document, {
        get (t, k) {
          return _(t.getElementsByName(k)).list._.map(n => $(n));
        }
      })
    },
    "@role": {
      configurable: true,
      value (e, k) {
        return (
          _($.role[k]).by._ === Function
          ? $.role[k](e)
          : $.role[k]
        );
      }
    },
    "@pack": {
      configurable: true,
      value (e, k, d) {
        return (
          _($.pack[k]).by._ === Function
          ? $.pack[k](e, d)
          : $.pack[k]
        );
      }
    },
    env: {
      configurable: true,
      value: {
        ssl: location.protocol === "https:",
        get "ws:" () {
          return location.protocol === "https:" ? "wss:" : "ws";
        },
        protocol: location.protocol,
        here: location.hostname,
        PORT: location.port === "" ? 80 : location.port.json._,
        get port () {
          return $.env.PORT;
        },
        path: location.pathname,
        uri : [location.protocol, "//", location.hostname, "/"].join(),
        get  wsuri () {
          return [$.env["ws:"], "//", location.hostname, "/"].join();
        }
      }
    }
  }))
  .$(c => _(c).draw({
    IMG: _(c.media).fork(function () {})._,
    VIDEO: _(c.media).fork(function () {})._,
    AUDIO: _(c.media).fork(function () {})._,
    IFRAME: _(c.media).fork(function () {})._
  }))
  ._;

  _(window)
  .draw({
    get html () {
      return document.documentElement;
    },
    get head () {
      return $(document.head);
    },
    get body () {
      return $(document.body);
    },
    get env () {
      return $.env;
    }
  })
  .define({
    article:  {get: () => $(document.createElement("article"))},
    div:    {get: () => $(document.createElement("div"))},
    section:  {get: () => $(document.createElement("section"))},
    nav:    {get: () => $(document.createElement("nav"))},
    aside:   {get: () => $(document.createElement("aside"))},
    header:   {get: () => $(document.createElement("header"))},
    footer:   {get: () => $(document.createElement("footer"))},
    h1:     {get: () => $(document.createElement("h1"))},
    h2:     {get: () => $(document.createElement("h2"))},
    h3:     {get: () => $(document.createElement("h3"))},
    h4:     {get: () => $(document.createElement("h4"))},
    h5:     {get: () => $(document.createElement("h5"))},
    h6:     {get: () => $(document.createElement("h6"))},
    p:     {get: () => $(document.createElement("p"))},
    br:     {get: () => $(document.createElement("br"))},
    table:   {get: () => $(document.createElement("table"))},
    ul:     {get: () => $(document.createElement("ul"))},
    ol:     {get: () => $(document.createElement("ol"))},
    li:     {get: () => $(document.createElement("li"))},
    dl:     {get: () => $(document.createElement("dl"))},
    dt:     {get: () => $(document.createElement("dt"))},
    dd:     {get: () => $(document.createElement("dd"))},
    form:    {get: () => $(document.createElement("form"))},
    label:   {get: () => $(document.createElement("label"))},
    input:   {get: () => $(document.createElement("input"))},
    radio:   {get: () => input.type("radio")},
    radios:   {value: (name, o) => _(o).keys._.map(
      k => label.$(
        radio.name(name).value(o[k]),
        o.constructor === Array ? o[k] : k
      )
    )},
    checkbox:  {get: () => input.type("checkbox")},
    range:   {get: () => input.type("range")},
    text:    {get: () => input.type("text")},
    date:    {get: () => input.type("date")},
    number:   {get: () => input.type("namber")},
    file:    {get: () => input.type("file")},
    password:  {get: () => input.type("password")},
    textarea:  {get: () => $(document.createElement("textarea"))},
    select:   {get: () => $(document.createElement("select"))},
    button:   {get: () => $(document.createElement("button"))},
    img:    {get: () => $(document.createElement("img"))},
    video:    {get: () => $(document.createElement("video"))},
    audio:    {get: () => $(document.createElement("audio"))},
    area:    {get: () => $(document.createElement("area"))},
    map:    {get: () => $(document.createElement("map"))},
    canvas:   {get: () => $(document.createElement("canvas"))},
    iframe:   {get: () => $(document.createElement("iframe"))},
    option:   {get: () => $(document.createElement("option"))},
    optgroup:  {get: () => $(document.createElement("optgroup"))},
    a:     {get: () => $(document.createElement("a"))},
    em:     {get: () => $(document.createElement("em"))},
    strong:   {get: () => $(document.createElement("strong"))},
    span:    {get: () => $(document.createElement("span"))}
  });

  this.$ = $;
})();
