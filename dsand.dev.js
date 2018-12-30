/*
  global
    _
    location
    fieldset
    datalist
    Option
    ul
    ol
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
    get: {
      configurable: true,
      get () {
        return this.n;
      }
    },
    set: {
      configurable: true,
      value (o) {
        return _(this).$(
          ({get}) => _(o).give(
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
        return _(this).$(t => _(t.n).draw({id}))._;
      }
    },
    title: {
      configurable: true,
      value (title) {
        return _(this).$(t => _(t.n).draw({title}))._;
      }
    },
    "class": {
      configurable: true,
      value (...s) {
        return _(this).$(
          t => _(
            t.n
          )
          .$(n => (
            n instanceof Element
            ? s.each(v => n.classList.toggle(v))
            : _(n).draw({
              role: (
                n.role === undefined
                ? s
                : _(s)
                .map(
                  a => a.map(v => n.role.includes(v) ? false: v).filter(v => v)
                )._
              )
            })
          ))
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
        return _(this).$(
          ({get}) => _(o).entries.$(a => a.reduce(
            (p, [k, v]) => p(`item${k}`, v),
            get.setAttribute
          ))
        )._;
      }
    },
    "@$set":{
      configurable: true,
      value (o) {
        return _(this).$(
          t => t.n instanceof Element
          ? (
            o.constructor === String
            ? delete t.n.dataset[o]
            : _(t.n.dataset).draw(o)
          )
          : (
            o.constructor === String
            ? delete t.n[o]
            : _(t.n).draw(o)
          )
        )._;
      }
    },
    "@$get":{
      configurable: true,
      value (k) {
        return _(this).map(
          t => t.n instanceof Element
          ? t.n.dataset[k] === undefined ? _(undefined) : t.n.dataset[k].json
          : t.n[k]
        )._;
      }
    },
    mark: {
      configurable: true,
      value (...s) {
        return _(this).$(t => t["@$set"]({"mark": s.join(", ")}))._;
      }
    },
    want: {
      configurable: true,
      get () {
        return this["@$get"]("mark").map(
          s => s.split(", ").reduce((p, c) => p[c], $.data)
        )._;
      }
    },
    look: {
      configurable: true,
      get () {
        return this["@$get"]("mark").map(
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
        return _(this).$(
          t => (
            a.includes("dragstart") && t.drag(true),
            a.each(v => t.n.addEventListener.call(t.n, v, $.on))
          )
        )._;
      }
    },
    off: {
      configurable: true,
      value (...a) {
        return _(this).$(
          t => (
            a.includes("dragstart") && t.drag(false),
            a.each(v => t.n.removeEventListener.call(t.n, v, $.on))
          )
        )._;
      }
    },
    once: {
      configurable: true,
      value (...a) {
        return _(this).$(
          t => (
            a.includes("drop") && t.n.addEventListener.call(
              t.n,
              "dragover",
              $.prevent,
            ),
            a.join(" ").includes("drag") && t.drag(true),
            a.each(v => t.n.addEventListener.call(t.n, v, $.on, {once: true}))
          )
        )._;
      }
    },
    beat: {
      configurable: true,
      value (...a) {
        return _(this).$(
          t => t["@$set"]({
            "beat": _(a).map(a => a.map(
              v => (
                t["@beat"]
                .map(b => b.includes(v))
                ._
                ? false
                : v
              )
            ).filter(v => v))
            .$(b => t.once(...b))
            ._
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
          t => _(t.n.classList).list.map(a => a.map(k => $.role[k]))
        )._;
      }
    },
    pack: {
      configurable: true,
      get () {
        return _(this).bind(
          t => _(t.n.classList).list.map(a => a.map(k => $.pack[k]))
        )._;
      }
    }
  })
  .$(c => _(c).draw({
    version: "0.6.9",
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
      .$(e => (
        e.type === "dragstart" || e.preventDefault(),
        e.stopPropagation()
      ))
      .get("target")
      .bind(
        t => (
          _(t).get("role")[""]
          ? _(t).get("classList").list
          : _(t).get("role")
        )
      )
      .$(
        a => $(e)["@wait"]._
        ? $.wait(e, a)
        : $.soon(e, a)
      );
    },
    soon (e, a) {
      a.each(k => $["@pack"](e, k, $["@role"](e, k)));
    },
    wait (e, a) {
      _($(e))
      .$(n => _(n["@wait"]._).$(
        m => (
          n["@beat"]
          .map(
            a => a.includes(e.type)
          )
          ._
          ? (
            n.timer(_(setTimeout(() => n.once(e.type), m))._),
            $.soon(e, a)
          )
          : (
            clearTimeout(n["@timer"]._),
            n.timer(_(setTimeout(() => $.soon(e, a), m))._)
          )
        )
      ));
    },
    TABLE: _(c).fork(function(){}).annex({
      $: {
        configurable: true,
        value (...n) {
          return _(this).$(
            t => _(
              t.n.rows.length === 0
              ? t.n.createTBody.call(t.n)
              : t.n.getElementsByTagName("tbody")[0]
            )
            .$(
              t => 
              n.each((v, r) => (
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
          return _(this).$(
            t => $(t.n.createCaption.call(t.n)).$(...v)
          )._;
        }
      },
      cHead: {
        configurable: true,
        value (...n) {
          return _(this).$(
            t => $(t.n.createTHead.call(t.n).insertRow()).head(...n)
          )._;
        }
      },
      rHead: {
        configurable: true,
        value (...n) {
          return _(this).$(
            t => _(t.n.createTBody.call(t.n)).$(
              t => n.each(v => $(t.insertRow()).head(v))
            )
          )._;
        }
      },
      cFoot: {
        configurable: true,
        value (...n) {
          return _(this).$(
            t => $(t.n.createTFoot.call(t.n).insertRow()).foot(...n)
          )._;
        }
      },
      row: {
        configurable: true,
        get () {
          return _(this.get.rows).list._.map(v => $(v));
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
          return _(this).$(t => t.row.each(r => r.each(f, ...v)))._;
        }
      }
    })._,
    TR: _(c).fork(function(){}).annex({
      $: {
        configurable: true,
        value (r, ...n) {
          return _(this)
          .$(t => n.each(
            (v, c) => $(t.n.insertCell.call(t.n))["@$set"]({r, c}).$(v)
          ))
          ._;
        }
      },
      head: {
        configurable: true,
        value (...n) {
          return _(this)
          .$(t => n.each(v => $.prototype.$.call(
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
          .$(t => n.each(v => $(this.n.insertCell.call(this.n)).$(v)))
          ._;
        }
      },
      cell: {
        configurable: true,
        get () {
          return _(this.get.cells).list._.map(v => $(v));
        }
      },
      each: {
        configurable: true,
        value (f, ...v) {
          return _(this).$(t => t.cell.each(c => f(c, ...v)))._;
        }
      }
    })._,
    TD: _(c).fork(function(){}).annex({
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
          $.prototype.$.call(this, ...a.map(
            v => v.constructor === Array ? ol.$(v) : li.$(v)
          ));
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
      value: {
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
        value (label) {
          return _(this).$(t => _(t.n).draw({label}))._;
        }
      }
    })._,
    DATALIST: _(c).fork(function(){}).annex({
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
    INPUT: _(c).fork(function(){}).annex({
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
      placeholder: {
        configurable: true,
        value (placeholder) {
          return _(this).$(t => _(t.n).draw({placeholder}))._;
        }
      },
      autocomplete: {
        configurable: true,
        value (autocomplete) {
          return _(this).$(t => _(t.n).draw(
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
          return _(this).$(t => _(t.n).draw({min}))._;
        }
      },
      max: {
        configurable: true,
        value (max) {
          return _(this).$(t => _(t.n).draw({max}))._;
        }
      },
      step: {
        configurable: true,
        value (step) {
          return _(this).$(t => _(t.n).draw({step}))._;
        }
      },
      form: {
        configurable: true,
        value (form) {
          return _(this).$(t => _(t.n).draw({form}))._;
        }
      },
      disable: {
        configurable: true,
        get () {
          return _(this).$(t => _(t.n).draw({disabled: true}))._;
        }
      },
      enable: {
        configurable: true,
        get () {
          return _(this).$(t => _(t.n).draw({disabled: false}))._;
        }
      },
      focus: {
        configurable: true,
        get () {
          return _(this).$(t => _(t.n).draw({autofocus: true}))._;
        }
      },
      writable: {
        configurable: true,
        get () {
          return _(this).$(t => _(t.n).draw({readonly: false}))._;
        }
      },
      readOnly: {
        configurable: true,
        get () {
          return _(this).$(t => _(t.n).draw({readonly: true}))._;
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
          return _(this).map(o => (
            (o.n.type === "checkbox" || o.n.type === "radio")
            ? o.n.checked
            : o.n.value
          ))._;
        },
        set (v) {
          return _(this).map(o => (
            (o.n.type === "checkbox" || o.n.type === "radio")
            ? o.n.checked = v
            : o.n.value = v
          ))._;
        }
      }
    })._,
    FORM: _(c).fork(function(){}).annex({
      field: {
        configurable: true,
        value (o) {
          return _(this).$(t => 
            _(o).entries._.each(([k, v]) => t.$(
              _(fieldset)
              .$(
                e => e.$(
                  v.key == null
                  ? k
                  : v.key, br,
                  ..._(v.item).map(
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
              .$(
                e => _(v.list).by._ === Array && e.$(
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
          return _($.names).list._
          .reduce(
            (p, k) => p.draw(this.n[k] ? {
              [k]: (
                _(this.n)
                .map(n => (
                  n[k].type === "checkbox"
                  ? n[k].checked
                  : n[k].value.json._
                ))
              )._
            }: undefined),
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
      },
      method: {
        configurable: true,
        value (method) {
          return _(this).$(t => _(t.n).draw({method}))._;
        }
      },
      action: {
        configurable: true,
        value (action) {
          return _(this).$(t => _(t.n).draw({action}))._;
        }
      },
      autocomplete: {
        configurable: true,
        value (autocomplete) {
          return _(this).$(t => _(t.n).draw(
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
  }))
  .$(c => (
    _([
      "IMG",
      "VIDEO",
      "AUDIO",
      "IFRAME",
      "SCRIPT"
    ]).$(a => a.reduce(
      (p, k) => p.draw({[k]: _(c.media).fork(function () {})._}),
      _(c)
    )),
    _(c).draw({"TEXTAREA": _(c.INPUT).fork(function () {})._})
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
          $.role[k]
          ? _($.role[k]).bind(m => (
            _(m).by._ === Object
            ? _(m)
            .keys
            .map(a => a.filter(k => k.toLowerCase() === e.type))
            .pick(m)
            .vals
            .get(0)
            .map(f => f(e))
            : _(m).map(f => f(e))
          ))._
          : $.role[k]
        );
      }
    },
    "@pack": {
      configurable: true,
      value (e, k, d) {
        $.pack[k]
        ? _($.pack[k]).bind(m => (
          _(m).by._ === Object
          ? _(m)
          .keys
          .map(a => a.filter(k => k.toLowerCase() === e.type))
          .pick(m)
          .vals
          .get(0)
          .map(f => f(e, d))
          : _(m).map(f => f(e, d))
        ))._
        :$.pack[k];
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
        uri : [location.protocol, "//", location.hostname, "/"].join(""),
        get  wsuri () {
          return [$.env["ws:"], "//", location.hostname, "/"].join("");
        },
        language : navigator.language
      }
    }
  })
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
    imports: {
      value: (...imports) => _($).$(
        $ => (
          _($.data).$(
            d => (
              d.imports
              ? imports.concat(d.imports)
              : _(d).draw({imports})
            )
          ),
          _($.role).draw({
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
    radios:   {value: (name, o) => _(o).entries._.map(
      ([k, v]) => label.$(
        radio.name(name).value(v),
        o.constructor === Array ? v : k
      )
    )},
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
