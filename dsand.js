/*
  global
    _
    location
    fieldset
    datalist
    Option
    li
    optgroup
    input
    label
    radio
    checkbox
    Event
    Element
    navigator
    script
    body
    br
*/

(() => {
  "use strict";

  const $ = _(function (n) {
    return _(
      (n.tagName !== undefined && $[n.tagName] !== undefined)
      ? $[n.tagName]
      : $.prototype
    )
    .create({
      n: {
        configurable: true,
        get () {
          return n instanceof Event
          ? n.target
          : n;
        }
      }
    })
    ._;
  })
  .fork
  .by
  .define({
    get: {
      configurable: true,
      get () {
        return this.n;
      }
    },
    set: {
      configurable: true,
      value (o) {
        return _(this).use(
          ({get}) => _(o).each(
            (k, v) => (
              v == null
              ? get.removeAttribute(k)
              : get.setAttribute(k, v)
            )
          )
        )._;
      }
    },
    id: {
      configurable: true,
      value (id) {
        return _(this).use(t => _(t.n).put({id}))._;
      }
    },
    title: {
      configurable: true,
      value (title) {
        return _(this).use(t => _(t.n).put({title}))._;
      }
    },
    "class": {
      configurable: true,
      value (...s) {
        return _(this).use(
          t => _(t.n).use(n => (
            n instanceof Element
            ? _(s).each(v => n.classList.toggle(v))
            : _(n).put({
              role: (
                n.role == null
                ? s
                : _(n.role).toggle(...s)._
              )
            })
          ))
        )._;
      }
    },
    name: {
      configurable: true,
      value (name) {
        return _(this).use(t => _(t.n).put({name}), $.names.add(name))._;
      }
    },
    css: {
      configurable: true,
      value (o) {
        return _(this).use(t => _(t.n.style).put(o))._;
      }
    },
    style: {
      configurable: true,
      value (o) {
        return _(this).use(t => _(t.n.style).put(o))._;
      }
    },
    item: {
      configurable: true,
      value (o) {
        return _(this).use(
          ({get}) => _(o).reduce(
            (p, k, v) => p(`item${k}`, v),
            get.setAttribute
          )
        )._;
      }
    },
    "@$set": {
      configurable: true,
      value (o) {
        return _(this).use(
          t => t.n instanceof Element
          ? (
            o.constructor === String
            ? delete t.n.dataset[o]
            : _(t.n.dataset).put(o)
          )
          : (
            o.constructor === String
            ? delete t.n[o]
            : _(t.n).put(o)
          )
        )._;
      }
    },
    "@$get": {
      configurable: true,
      value (k) {
        return _(this).flat(
          t => t.n instanceof Element
          ? _(t.n.dataset[k]).json
          : _(t.n[k])
        );
      }
    },
    mark: {
      configurable: true,
      value (...s) {
        return _(this).use(t => t["@$set"]({mark: s.join(", ")}))._;
      }
    },
    want: {
      configurable: true,
      get () {
        return this["@$get"]("mark").flat(
          s => _($.data).get(...s.split(", "))
        )._;
      }
    },
    look: {
      configurable: true,
      get () {
        return this["@$get"]("mark").endo(
          s => $.data[s.split(", ").shift()]
        )._;
      }
    },
    drag: {
      configurable: true,
      value (draggable) {
        return this.set({draggable});
      }
    },
    drop: {
      configurable: true,
      value (dropzone) {
        return this.set({dropzone});
      }
    },
    on: {
      configurable: true,
      value (...a) {
        return _(this).use(
          t => (
            a.includes("dragstart") && t.drag(true),
            _(a).each(v => t.n.addEventListener.call(t.n, v, $.on))
          )
        )._;
      }
    },
    off: {
      configurable: true,
      value (...a) {
        return _(this).use(
          t => (
            a.includes("dragstart") && t.drag(false),
            _(a).each(v => t.n.removeEventListener.call(t.n, v, $.on))
          )
        )._;
      }
    },
    once: {
      configurable: true,
      value (...a) {
        return _(this).use(
          t => (
            a.includes("dragstart") && t.drag(false),
            _(a).each(v => t.n.addEventListener.call(t.n, v, $.on, {once: true}))
          )
        )._;
      }
    },
    beat: {
      configurable: true,
      value (...a) {
        return _(this).use(
          t => t["@$set"]({
            beat: _(a).flat(a => (
              t["@beat"]._ == null
              ? _(a)
              : t["@beat"].endo(s => s.split(", ")).toggle(...a)
            )).use(b => t.once(...b))._.join(", ")
          })
        )._;
      }
    },
    "@beat": {
      configurable: true,
      get () {
        return this["@$get"]("beat");
      }
    },
    wait: {
      configurable: true,
      value (wait) {
        return this["@$set"]({wait});
      }
    },
    "@wait": {
      configurable: true,
      get () {
        return this["@$get"]("wait");
      }
    },
    timer: {
      configurable: true,
      value (timer) {
        return this["@$set"]({timer});
      }
    },
    "@timer": {
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
          this.n,
          ...n.map(
            (v, k) => (
              v instanceof $
              ? v["@$set"]("order", k).n
              : v
            )
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
        return _(this.n.children).list.map(c => $(c))._;
      }
    },
    back: {
      configurable: true,
      get () {
        return $(this.n.previousSibling);
      }
    },
    next: {
      configurable: true,
      get () {
        return $(this.n.previousSibling);
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
    real: {
      configurable: true,
      get () {
        return document.getComputedStyle(this.n);
      }
    },
    role: {
      configurable: true,
      get () {
        return _(this).bind(
          t => _(t.n.classList).list.map(a => a.map(k => $.role[k]))._
        )._;
      }
    },
    pack: {
      configurable: true,
      get () {
        return _(this).bind(
          t => _(t.n.classList).list.map(a => a.map(k => $.pack[k]))._
        )._;
      }
    }
  })
  .base
  .affix(c => c.put({
    _: s => $(document.createElement(s)),
    $: (...s) => $(
      _(document.querySelectorAll(...s)).map(l => l.length === 1 ? l[0] : l)
    ),
    data: {},
    role: {},
    pack: {},
    part: {},
    names: new Set(),
    pvp: false,
    on (e) {
      _(e)
      .use(e => (
        e.type === "dragstart"
        ? e.dataTransfer.setData("text", $(e)["@$get"]("order").toString())
        : (e.preventDefault(), e.stopPropagation())
      ))
      .get("target")
      .lift(
        t => (
          t.get("role")._ == null
          ? t.get("classList").list
          : t.get("role")
        )
      )
      .flat(
        a => $(e)["@wait"]._ == null
        ? $.soon(e, a)
        : $.wait(e, a)
      );
    },
    soon (e, a) {
      _(a).each(k => $["@pack"](e, k, $["@role"](e, k)));
    },
    wait (e, a) {
      _($(e))
      .use(n => _(n["@wait"]._).use(
        m => (
          n["@beat"].endo(a => a.includes(e.type))._
          ? (
            n.timer(setTimeout(() => n.once(e.type), m)),
            $.soon(e, a)
          )
          : (
            clearTimeout(n["@timer"]._),
            n.timer(_(setTimeout(() => $.soon(e, a), m))._)
          )
        )
      ));
    },
    TABLE: c.by.make({
      $: {
        configurable: true,
        value (...n) {
          return _(this).use(
            t => _(
              t.n.getElementsByTagName("tbody").length === 0
              ? t.n.createTBody.call(t.n)
              : t.n.getElementsByTagName("tbody")[0]
            )
            .use(
              t => 
              _(n).each((v, r) => (
                t.rows.length <= r
                ? $(t.insertRow())["@$set"]({r}).$(r, ...v)
                : $(t.rows[r])["@$set"]({r}).$(r, ...v)
              ))
            )
          )._;
        }
      },
      caption: {
        configurable: true,
        value (...v) {
          return _(this).use(
            t => $(t.n.createCaption.call(t.n)).$(...v)
          )._;
        }
      },
      cHead: {
        configurable: true,
        value (...n) {
          return _(this).use(
            t => $(t.n.createTHead.call(t.n).insertRow()).head(...n)
          )._;
        }
      },
      rHead: {
        configurable: true,
        value (...n) {
          return _(this).use(
            t => _(t.n.createTBody.call(t.n)).use(
              t => _(n).each(v => $(t.insertRow()).head(v))
            )
          )._;
        }
      },
      cFoot: {
        configurable: true,
        value (...n) {
          return _(this).use(
            t => $(t.n.createTFoot.call(t.n).insertRow()).foot(...n)
          )._;
        }
      },
      row: {
        configurable: true,
        get () {
          return _(this.get.rows).list.map(v => $(v))._;
        }
      },
      cell: {
        configurable: true,
        get () {
          return this.row.map(v => v.cell);
        }
      },
      cols: {
        configurable: true,
        get () {
          return new Proxy(this.row, {
            get (r, k) {
              return r.map(r => r.cell[k]);
            }
          });
        }
      },
      each: {
        configurable: true,
        value (f, ...v) {
          return _(this).use(t => _(t.row).each(r => r.each(f, ...v)))._;
        }
      }
    })._,
    TR: c.by.make({
      $: {
        configurable: true,
        value (r, ...n) {
          return _(this)
          .use(t => _(n).each(
            (v, c) => $(t.n.insertCell.call(t.n))["@$set"]({r, c}).$(v)
          ))
          ._;
        }
      },
      head: {
        configurable: true,
        value (...n) {
          return _(this)
          .use(t => _(n).each(v => $.prototype.$.call(
            t,
            $(document.createElement("th")).$(v)
          )))
          ._;
        }
      },
      foot: {
        configurable: true,
        value (...n) {
          return _(this)
          .use(t => _(n).each(v => $(this.n.insertCell.call(this.n)).$(v)))
          ._;
        }
      },
      cell: {
        configurable: true,
        get () {
          return _(this.get.cells).list.map(v => $(v))._;
        }
      },
      each: {
        configurable: true,
        value (f, ...v) {
          return _(this).use(t => _(t.cell).each(c => f(c, ...v)))._;
        }
      }
    })._,
    TD: c.by.make({
      r: {
        configurable: true,
        get () {
          return this["@$get"]("r")._;
        }
      },
      c: {
        configurable: true,
        get () {
          return this["@$get"]("c")._;
        }
      }
    })._,
    SELECT: c.by.make({
      $: {
        configurable: true,
        value (n) {
          _(
            n.constructor === Object
            ? _(n).keys.map(k => (
              n[k].constructor === Array || n[k].constructor === Object
              ? optgroup.label(k).$(n[k])
              : new Option(k, n[k]))
            )._
            : (
              n.constructor === Array
              ? n.map(v => v.constructor === Option ? v : new Option(v, v))
              : _(n).$(v => this.now = v).map(v => v === undefined && [])._
            )
          ).use(v => v.constructor === Array && $.prototype.$.call(this, ...v));
          return this;
        }
      },
      select: {
        configurable: true,
        value (value) {
          return _(this).use(t => _(t.n).put({value}))._;
        }
      },
      value: {
        configurable: true,
        value (value) {
          return _(this).use(t => _(t.n).put({value}))._;
        }
      },
      now: {
        configurable: true,
        get () {
          return _(this.n.value).json._;
        },
        set (v) {
          this.n.value = v;
          v = undefined;
          return true;
        }
      }
    })._,
    OPTGROUP: c.by.make({
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
        value (label) {
          return _(this).use(t => _(t.n).put({label}))._;
        }
      }
    })._,
    DATALIST: c.by.make({
      $: {
        configurable: true,
        value (...n) {
          $.prototype.$.call(this, ...n.map(
            v => v.constructor === Option ? v : new Option(v, v)
          ));
          return this;
        }
      }
    })._,
    INPUT: c.by.make({
      $: {
        configurable: true,
        value (v) {
          v === undefined ? $.prototype.$.call(this, v) : this.now = v;
          return this;
        }
      },
      type: {
        configurable: true,
        value (type) {
          return _(this).use(t => _(t.n).put({type}))._;
        }
      },
      value: {
        configurable: true,
        value (value) {
          return _(this).use(t => _(t.n).put({value}))._;
        }
      },
      check: {
        configurable: true,
        value (checked) {
          return _(this).use(t => _(t.n).put({checked}))._;
        }
      },
      placeholder: {
        configurable: true,
        value (placeholder) {
          return _(this).use(t => _(t.n).put({placeholder}))._;
        }
      },
      autocomplete: {
        configurable: true,
        value (autocomplete) {
          return _(this).use(t => _(t.n).put(
            autocomplete.constructor === String
            ? {autocomplete}
            : (
              autocomplete
              ? {autocomplete: "on"}
              : {autocomplete: "off"}
            )
          ))._;
        }
      },
      min: {
        configurable: true,
        value (min) {
          return _(this).use(t => _(t.n).put({min}))._;
        }
      },
      max: {
        configurable: true,
        value (max) {
          return _(this).use(t => _(t.n).put({max}))._;
        }
      },
      step: {
        configurable: true,
        value (step) {
          return _(this).use(t => _(t.n).put({step}))._;
        }
      },
      form: {
        configurable: true,
        value (form) {
          return _(this).use(t => _(t.n).put({form}))._;
        }
      },
      disable: {
        configurable: true,
        get () {
          return _(this).use(t => _(t.n).put({disabled: true}))._;
        }
      },
      enable: {
        configurable: true,
        get () {
          return _(this).use(t => _(t.n).put({disabled: false}))._;
        }
      },
      focus: {
        configurable: true,
        get () {
          return _(this).use(t => _(t.n).put({autofocus: true}))._;
        }
      },
      writable: {
        configurable: true,
        get () {
          return _(this).use(t => _(t.n).put({readonly: false}))._;
        }
      },
      readOnly: {
        configurable: true,
        get () {
          return _(this).use(t => _(t.n).put({readonly: true}))._;
        }
      },
      list: {
        configurable: true,
        value (list) {
          return this.set({list});
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
          return _(this).endo(o => (
            (o.n.type === "checkbox" || o.n.type === "radio")
            ? o.n.checked
            : o.n.value
          ))._;
        },
        set (v) {
          return _(this).endo(o => (
            (o.n.type === "checkbox" || o.n.type === "radio")
            ? o.n.checked = v
            : o.n.value = v
          ))._;
        }
      }
    })._,
    FORM: c.by.make({
      field: {
        configurable: true,
        value (o) {
          return _(this).use(t => 
            _(o).each((k, v) => t.$(
              _(fieldset)
              .use(
                e => e.$(
                  v.key == null
                  ? k
                  : v.key, br,
                  ..._(v.item).endo(
                    i => (
                      i instanceof $
                      ? [_(i).been.autocomplete(
                        v.list === undefined
                        ? "off"
                        : "on"
                      ).list(k).name(k)._]
                      : (
                        i.constructor === Function
                        ? [i(k)._].flat()
                        : i.map(e => e.name(k))
                      )
                    )
                  )._,
                )
              )
              .use(
                e => _.is_(v.list) === Array && e.$(
                  datalist.id(k).$(...v.list)
                )
              )
              ._
            ))
          )._;
        }
      },
      get: {
        configurable: true,
        get () {
          return _($.names).list.reduce(
            (p, k) => this.n[k]
            ? p.put({
              [k]: _(this.n).endo(n => (
                  n[k].type === "checkbox"
                  ? n[k].checked
                  : _(n[k].value).json._
                )
              )._
            })
            : p,
            _({})
          )._._;
        }
      },
      set: {
        configurable: true,
        value (o) {
          return _(this).use(
            t => _(o).sets.each(
              ([k, v]) => (
                t.n[k].type === "checkbox"
                ? t.n[k].checked = o[k]
                : t.n[k].value = o[k]
              )
            )
          )._;
        }
      },
      method: {
        configurable: true,
        value (method) {
          return _(this).use(t => _(t.n).put({method}))._;
        }
      },
      action: {
        configurable: true,
        value (action) {
          return _(this).use(t => _(t.n).put({action}))._;
        }
      },
      autocomplete: {
        configurable: true,
        value (autocomplete) {
          return _(this).use(t => _(t.n).put(
            autocomplete.constructor === String
            ? {autocomplete}
            : (
              autocomplete
              ? {autocomplete: "on"}
              : {autocomplete: "off"}
            )
          ))._;
        }
      },
      set$: {
        configurable: true,
        value (o) {
          return $.prototype.set.call(this, o);
        }
      }
    })._,
    A: c.by.make({
      href: {
        configurable: true,
        value (href) {
          return _(this).use(t => _(t.n).put({href}))._;
        }
      }
    })._,
    list: c.by.make({
      each: {
        configurable: true,
        value (f) {
          return _(this).use(t => _(t.inner).each(f))._;
        }
      },
      $: {
        configurable: true,
        value (...a) {
          $.prototype.$.call(
            this,
            ...a.map(v => v instanceof Object ? v : li.$(v))
          );
          return this;
        }
      }
    })._,
    media: c.by.make({
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
          return _(this).use(t => _(t.n).put({src}))._;
        }
      },
      alt: {
        configurable: true,
        value (alt) {
          return _(this).use(t => _(t.n).put({alt}))._;
        }
      },
      now: {
        configurable: true,
        get () {
          return this.n.src;
        }
      }
    })._,
  }))
  .base
  .affix(c => (
    _(["IMG", "VIDEO", "AUDIO", "IFRAME", "SCRIPT"])
    .reduce((p, k) => p.put({[k]: c._.media}), c),
    _(["UL", "OL"]).reduce((p, k) => p.put({[k]: c._.list}), c),
    c.put({"TEXTAREA": c.INPUT})
  ))
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
          return _(t.getElementsByClassName(k)).list.map(n => $(n))._;
        }
      })
    },
    name: {
      configurable: true,
      value: new Proxy (document, {
        get (t, k) {
          return _(t.getElementsByName(k)).list.map(n => $(n)._);
        }
      })
    },
    "@role": {
      configurable: true,
      value (e, k) {
        return _($.role[k]).lift(m => (
          m.is._ === Object
          ? m.get(e.type).endo(f => f(e))
          : m.endo(f => f(e))
        ))._;
      }
    },
    "@pack": {
      configurable: true,
      value (e, k, d) {
        return _($.pack[k]).lift(m => (
          m.is._ === Object
          ? m.get(e.type).endo(f => f(e, d))
          : m.endo(f => f(e, d))
        ))._;
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
        PORT: location.port === "" ? 80 : _(location.port).json._,
        get port () {
          return $.env.PORT;
        },
        path: location.pathname,
        uri : [location.protocol, "//", location.hostname, "/"].join(""),
        get  wsuri () {
          return [$.env["ws:"], "//", location.hostname, "/"].join("");
        },
        language : navigator.language
      }
    }
  })
  .$;

  _(window)
  .put({
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
    imports: {
      value: (...imports) => _($).use(
        $ => (
          _($.data).use(
            d => d.imports
            ? imports.concat(d.imports)
            : _(d).put({imports})
          ),
          _($.role).put({
            imported (e) {
              e && $(e).off("load");
              $.data.imports.length === 0
              ? delete $.role.imported
              : body.$(
                script($.data.imports.shift())
                .class("imported")
                .on("load")
              );
            }
          })
        )
      )._
      .role
      .imported()
    },
    script:   {value: s => $(document.createElement("script")).src(s)},
    article:  {get: () => $(document.createElement("article"))},
    div:      {get: () => $(document.createElement("div"))},
    section:  {get: () => $(document.createElement("section"))},
    nav:      {get: () => $(document.createElement("nav"))},
    main:     {get: () => $(document.createElement("main"))},
    aside:    {get: () => $(document.createElement("aside"))},
    header:   {get: () => $(document.createElement("header"))},
    footer:   {get: () => $(document.createElement("footer"))},
    h1:       {get: () => $(document.createElement("h1"))},
    h2:       {get: () => $(document.createElement("h2"))},
    h3:       {get: () => $(document.createElement("h3"))},
    h4:       {get: () => $(document.createElement("h4"))},
    h5:       {get: () => $(document.createElement("h5"))},
    h6:       {get: () => $(document.createElement("h6"))},
    p:        {get: () => $(document.createElement("p"))},
    br:       {get: () => $(document.createElement("br"))},
    table:    {get: () => $(document.createElement("table"))},
    ul:       {get: () => $(document.createElement("ul"))},
    ol:       {get: () => $(document.createElement("ol"))},
    li:       {get: () => $(document.createElement("li"))},
    dl:       {get: () => $(document.createElement("dl"))},
    dt:       {get: () => $(document.createElement("dt"))},
    dd:       {get: () => $(document.createElement("dd"))},
    form:     {get: () => $(document.createElement("form"))},
    fieldset: {get: () => $(document.createElement("fieldset"))},
    datalist: {get: () => $(document.createElement("datalist"))},
    label:    {get: () => $(document.createElement("label"))},
    input:    {get: () => $(document.createElement("input"))},
    radio:    {get: () => input.type("radio")},
    checkbox: {get: () => input.type("checkbox")},
    radios:   {value: (name, o) => _(o).sets.map(
      ([k, v]) => label.$(
        radio.name(name).value(v),
        _.is_(o) === Array ? v : k
      )
    )._},
    check: {value: (name, s) => label.$(
      checkbox.name(name),
      (s || name)
    )},
    range:    {get: () => input.type("range")},
    text:     {get: () => input.type("text")},
    date:     {get: () => input.type("date")},
    month:    {get: () => input.type("month")},
    week:     {get: () => input.type("week")},
    time:     {get: () => input.type("time")},
    datetime: {get: () => input.type("datetime-local")},
    mail:     {get: () => input.type("email")},
    url:      {get: () => input.type("url")},
    tel:      {get: () => input.type("tel")},
    number:   {get: () => input.type("namber")},
    file:     {get: () => input.type("file")},
    password: {get: () => input.type("password")},
    textarea: {get: () => $(document.createElement("textarea"))},
    select:   {get: () => $(document.createElement("select"))},
    button:   {get: () => $(document.createElement("button"))},
    img:      {get: () => $(document.createElement("img"))},
    video:    {get: () => $(document.createElement("video"))},
    audio:    {get: () => $(document.createElement("audio"))},
    area:     {get: () => $(document.createElement("area"))},
    map:      {get: () => $(document.createElement("map"))},
    canvas:   {get: () => $(document.createElement("canvas"))},
    iframe:   {get: () => $(document.createElement("iframe"))},
    option:   {get: () => $(document.createElement("option"))},
    optgroup: {get: () => $(document.createElement("optgroup"))},
    a:        {get: () => $(document.createElement("a"))},
    em:       {get: () => $(document.createElement("em"))},
    strong:   {get: () => $(document.createElement("strong"))},
    span:     {get: () => $(document.createElement("span"))}
  });

  this.$ = $;
})();
