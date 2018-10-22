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
    Node
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
    end: {
      configurable: true,
      get () {
        return this.n;
      }
    },
    id: {
      configurable: true,
      value (id) {
        return _(this).$(t => (_($.id).set(this, id), _(t.n).draw({id})))._;
      }
    },
    "class": {
      configurable: true,
      value (...s) {
        return _(this).$(
          t => (s.each(k => _($.class).draw({[k]: [this]}))
          , _(t.n).draw({"class": s.join(" ")}))
        )._;
      }
    },
    name: {
      configurable: true,
      value (name) {
        return _(this).$(
          t => (_($.name).set(this, name), _(t.n).draw({name}))
        )._;
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
    },
    role: {
      configurable: true,
      value () {
        return _(this).$(
          t => _(t.n.class).$(
            s => s.split(" ").each(k => $.role[k] && $.role[k](t))
          )
        )._;
      }
    },
    pack: {
      configurable: true,
      value () {
        return _(this).$(
          t => _(t.n.class).$(
            s => s.split(" ").each(k => $.pack[k] && $.pack[k](t))
          )
        )._;
      }
    }
  })
  .$(c => _(c).draw({
    version: "dsand@0.1.0",
    $: s => $(document.createElement(s)),
    from:   {},
    role:   {},
    pack:   {},
    pvp: false,
    uri: `${location.protocol}//${location.hostname}/`,
    wsuri: `${location.protocol === "https:" ? "wss:" : "ws:"}//${location.hostname}/`,
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
        a => a.each(k => $(e.target).role().pack())
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
      select: {
        configurable: true,
        value (value) {
          return _(this).$(t => _(t.n).draw({value}))._;
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
          return _($.name).keys._
          .reduce(
            (p, k) => p.draw({
              [k]: this.n[k].type === "checkbox" ? this.n[k].checked : this.n[k].value.json._
            }),
            _({})
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
      },
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
  }).define({
    "id": {
      configurable: true,
      value: new Proxy({}, {
        get (t, k, r) {
          return $(t[k]);
        },
        set (t, k, v, r) {
          t[k] = v.n instanceof Node ? v.n : v;
          return true;
        }
      })
    },
    "class": {
      configurable: true,
      value: new Proxy({}, {
        get (t, k, r) {
          return t[k].map(v => $(v));
        },
        set (t, k, v, r) {
          _(v.n instanceof Node ? v.n : v)
          .$(x => t[k] === undefined ? _(t).draw({[k]: x}) : t[k].push(x));
          return true;
        }
      })
    },
    "name":  {
      configurable: true,
      value: new Proxy({}, {
        get (t, k, r) {
          return $(t[k]);
        },
        set (t, k, v, r) {
          t[k] = v.n instanceof Node ? v.n : v;
          return true;
        }
      })
    }
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