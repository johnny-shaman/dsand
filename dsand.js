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
        value: n
      }
    })
    ._;
  })
  .annex({
    id: {
      configurable: true,
      value (id) {
        return _(this).$(t => (_($._id).set(true, id), _(t.n).draw({id})))._;
      }
    },
    "class": {
      configurable: true,
      value (...s) {
        return _(this).$(
          t => (_($._class).draw(_(s).turn._), _(t.n).draw({"class": s.join(" ")}))
        )._;
      }
    },
    name: {
      configurable: true,
      value (name) {
        return _(this).$(t => (_($._name).set(true, name), _(t.n).draw({name})))._;
      }
    },
    "#": {
      configurable: true,
      get () {
        return this.id;
      }
    },
    ".": {
      configurable: true,
      get () {
        return this.class;
      }
    },
    css: {
      configurable: true,
      value (o) {
        return _(this).$(t => _(t.n.style).draw(o.css))._;
      }
    },
    style: {
      configurable: true,
      value (o) {
        return _(this).$(t => _(t.n.style).draw(o.style))._;
      }
    },
    item: {
      configurable: true,
      value (o) {
        return _(o).draw(_(o.item).keys.bind(
          a => a.reduce((p, c) => p.draw({[`item${c}`]: o.item[c]}), _({}))
        )._);
      }
    },
    from: {
      configurable: true,
      value (s) {
        return _(this).$(t => _(t.n.dataset).draw({from: s}))._;
      }
    },
    deed: {
      configurable: true,
      get () {
        return $.from[this.n.dataset.from];
      }
    },
    on: {
      configurable: true,
      value (...a) {
        a.forEach(v => this.n.addEventListener.call(this.n, v, $.on));
        return this;
      }
    },
    off: {
      configurable: true,
      value (...a) {
        a.forEach(v => this.n.removeEventListener.call(this.n, v, $.on));
        return this;
      }
    },
    once: {
      configurable: true,
      value (...a) {
        a.forEach(v => this.addEventListener.call(this.n, v, $.once));
        return this;
      }
    },
    "@once": {
      configurable: true,
      value (...a) {
        a.forEach(v => this.removeEventListener.call(this.n, v, $.once));
        return this;
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
        return $(this.n.children);
      }
    },
    each: {
      configurable: true,
      value (f, ...v) {
        _(this.n.children).list._.forEach(vv => f($(vv), ...v));
        return this;
      }
    },
    now: {
      configurable: true,
      get () {
        return this.n.innerText;
      },
      set (v) {
        return this.n.innerText = v;
      }
    },
    seem: {
      configurable: true,
      value (v) {
        this.now = v;
        return this;
      }
    }
  })
  .$(c => _(c).draw({
    version: "dsand@0.0.9",
    $: s => $(document.createElement(s)),
    _id:    {},
    _class: {},
    _name:  {},
    from:   {},
    role:   {},
    pack:   {},
    uri: `${location.protocol}//${location.hostname}/`,
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
          ? _(t).get("class")
          : _(t).get("role")
        )
        .map(s => s.split(" "))
      )
      .$(
        a => a.each(k => ($.pack[k] && $.pack[k](e.target), $.role[k](e)))
      );
    },
    once (e) {
      $.on(e);
      $(e.target)["@off"](e.type);
    },
    TABLE: _(c).fork(function(){}).annex({
      $: {
        configurable: true,
        value (n) {
          n.each(v => $(this.n.insertRow.call(this.n)).$(v));
          return this;
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
          return new Proxy (this.n.rows, {
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
      now: {
        configurable: true,
        get () {
          return this.n.value.json;
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
        value (s) {
          return _(this).$(t => _(t.n).draw({type: s}))._;
        }
      },
      now: {
        configurable: true,
        get () {
          return _(this).map(o => (
            (o.n.type === "checkbox" || o.n.type === "radio") ? o.n.checked : o.n.value
          ))._;
        },
        set (v) {
          _(this).$(o => (
            (o.n.type === "checkbox" || o.n.type === "radio") ? o.n.checked = v : o.n.value = v
          ));
          v = undefined;
          return true;
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
      now: {
        configurable: true,
        get () {
          return this.n.value;
        },
        set (v) {
          this.n.value = v;
          v = undefined;
          return true;
        }
      }
    })._,
    FORM: _(c).fork(function(){}).annex({
      get: {
        configurable: true,
        get () {
          return _($._name).keys._
          .reduce(
            (p, c) => p.draw({
              [c]: this.n[c].type === "checkbox" ? this.n[c].checked : this.n[c].value.json._
            }),
            _($._name)
          );
        }
      }
    })._,
    A: _(c).fork(function(){}).annex({
      href: {
        configurable: true,
        value (s) {
          return _(this).$(t => _(t.n).draw({s}))._;
        }
      },
    })._,
    media: _(c).fork(function(){}).annex({
      $: {
        configurable: true,
        value (v) {
          v === undefined ? $.prototype.$.call(this, v) : this.now = v;
          return this;
        }
      },
      now: {
        configurable: true,
        get () {
          return this.n.src;
        },
        set (v) {
          this.n.src = v;
          v = undefined;
          return true;
        }
      }
    })._
  }))
  .$(c => _(c).draw({
    IMG: _(c.media).fork(function () {})._,
    VIDEO: _(c.media).fork(function () {})._,
    AUDIO: _(c.media).fork(function () {})._,
    IFRAME: _(c.media).fork(function () {})._,
  }))._;

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
    env: {
      get https () {
        return location.protocol === "https:";
      },
      get here () {
        return location.hostname;
      },
      get port () {
        return location.port;
      },
      get path () {
        return location.pathname;
      }
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
        radio.name(name).$(o[k]),
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