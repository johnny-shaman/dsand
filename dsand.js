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

(() => {
  const $ = _(function (n) {
    return _(
      (n.tagName !== undefined && $[n.tagName]) ?
      $[n.tagName].prototype :
      $.prototype
    )
    .create({
      n: {
        configurable: true,
        writable: true,
        value: n
      }
    })._;
  })
  .descript({
    _: {
      configurable: true,
      value (o) {
        return _(this).$(
          t => _(o)
          .exist("#", ".")
          .$(a => a.forEach(k => _(o).draw(t[k](o[k]))))
          .drop(o)
          .$(
            p => _(p)
            .exist("id", "name", "class")
            .$(a => a.forEach(
              k => o[k].split(" ")
              .filter(v => !$[`${k}List`].includes(v))
              .forEach($[`${k}List`].push.bind($[`${k}List`]))
          )))
          .give(t.n.setAttribute.bind(t.n))
        )._;
      }
    },
    css: {
      configurable: true,
      value (o) {
        _(this.n.style).draw(o);
        return this;
      }
    },
    "#": {
      configurable: true,
      value (id) {
        return {id};
      }
    },
    ".": {
      configurable: true,
      value (v) {
        return {"class": v};
      }
    },
    on: {
      configurable: true,
      value (d, ...a) {
        a.length !== 0
        ? a.forEach(
          v => this.n.addEventListener.call(this.n, v, d)
        )
        : _(d).keys._.forEach(
          k => this.n.addEventListener.call(this.n, k, d)
        );
        return this;
      }
    },
    off: {
      configurable: true,
      value (d, ...a) {
        a.length !== 0
        ? a.forEach(
          v => this.n.removeEventListener.call(this.n, v, d)
        )
        : _(d).keys._.forEach(
          k => this.n.removeEventListener.call(this.n, k, d)
        );
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
    }
  })
  .$(c => _(c).draw({
    version: "dsand@0.0.1",
    $: s => $(document.createElement(s)),
    _ : s => $(document.querySelector(s)),
    __ : s => $(document.querySelectorAll(s)),
    "idList":     [],
    "classList":  [],
    "nameList":   [],
    TABLE: _(c).fork(function(){}).descript({
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
        get () {
          return new Proxy ([], {
            get (t, k) {
              Array
              .from(this.n.rows)
              .forEach(r => t.push($(r.n.cells[k])));
              return t;
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
    TR: _(c).fork(function(){}).descript({
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
    TD: _(c).fork(function(){}).descript({each: {
      configurable: true,
      value (f, ...v) {
        return f(this.n.children, ...v);
      }
    }})._,
    UL: _(c).fork(function(){}).descript({$: {
      configurable: true,
      value (a) {
        $.prototype.$.call(this, ...a.map(
          v => v.constructor === Array ? ul.$(v) : li.$(v)
        ));
        return this;
      }
    }})._,
    OL: _(c).fork(function(){}).descript({$: {
      configurable: true,
      value (a) {
        $.prototype.$.call(this, ...a.map(v => v.constructor === Array ? ol.$(v) : li.$(v)));
        return this;
      }
    }})._,
    SELECT: _(c).fork(function(){}).descript({
      $: {
        configurable: true,
        value (n) {
          _(
            n.constructor === Object
            ? _(n).keys._.map(k => (
              n[k].constructor === Array || n[k].constructor === Object
              ? optgroup._({label: k}).$(n[k])
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
          v = void 0;
        }
      }
    })._,
    OPTGROUP: _(c).fork(function(){}).descript({$: {
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
    }})._,
    INPUT: _(c).fork(function(){}).descript({
      $: {
        configurable: true,
        value (v) {
          return _(this).$(o => v === undefined ? $.prototype.$.call(o.n, v) : o.now = v)._;
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
          v = void 0;
        }
      }
    })._,
    TEXTAREA: _(c).fork(function(){}).descript({
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
          v = void 0;
        }
      }
    })._,
    FORM: _(c).fork(function(){}).descript({
      now: {
        configurable: true,
        get () {
          return $.nameList.reduce(
            (p, c) => p.draw({
              [c]: this.n[c].type === "checkbox" ? this.n[c].checked : this.n[c].value.json._
            }),
            _({})
          );
        }
      }
    })._,
    IMG: _(c).fork(function(){}).descript({
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
          return this.src;
        },
        set (v) {
          this.src = v;
          v = void 0;
        }
      }
    })._
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
    radio:   {get: () => input._({type: "radio"})},
    radios:   {value: (name, o) => _(o).keys._.map(
      k => label.$(
        radio._({name, value: o[k]}),
        o.constructor === Array ? o[k] : k
      )
    )},
    checkbox:  {get: () => input._({type: "checkbox"})},
    range:   {get: () => input._({type: "range"})},
    text:    {get: () => input._({type: "text"})},
    date:    {get: () => input._({type: "date"})},
    number:   {get: () => input._({type: "namber"})},
    file:    {get: () => input._({type: "file"})},
    password:  {get: () => input._({type: "password"})},
    textarea:  {get: () => $(document.createElement("textarea"))},
    select:   {get: () => $(document.createElement("select"))},
    button:   {get: () => $(document.createElement("button"))},
    img:    {get: () => $(document.createElement("img"))},
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