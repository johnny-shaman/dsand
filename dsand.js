((apex) => {
  const $ = _(function (n) {
    return _.upto(
      _(n).pipe($['@Event'], $['@Inherit'])._,
      {
        n: {
          configurable: true,
          get () {
            return n instanceof Event
            ? n.target
            : n;
          }
        },
        raw: {
          configurable: true,
          get () {
            return n;
          }
        }
      }
    );
  })
  .define({
    dsand: {
      configurable: true,
      value: '0.8.18'
    },
    $: {
      configurable: true,
      value (s) {
        return $(document.createElement(s));
      }
    },
    _: {
      configurable: true,
      value (...s) {
        return _(document.querySelectorAll(...s))
        .pipe(
          l => l.length === 1
          ? $(l[0])
          : _.sure(l).map($)
        );
      }
    },
    data: {
      configurable: true,
      value: {}
    },
    role: {
      configurable: true,
      value: {}
    },
    pack: {
      configurable: true,
      value: {}
    },
    names: {
      configurable: true,
      value: new Set()
    },
    on: {
      configurable: true,
      value (e) {
        $(e)
        .loop(
          t => (
            t.raw.type === 'dragstart' && t.raw.dataTransfer.setData(
              'text',
              JSON.stringify(_.put(t.get('name, value'), {text: t.inner}))
            ),
            t.raw.type === 'dragover' && t.drop(v => v && t.strict),
            t.wait(
              w => w == null
              ? $.soon(e, _.sure(t.n.classList))
              : $.wait(e, w, _.sure(t.n.classList))
            )
          )
        );
      }
    },
    soon: {
      configurable: true,
      value (e, a) {
        a.forEach(
          k => _($['@role'](e, k)).pipe(
            o => $['@pack'](e, k, o)
          )._
        );
      }
    },
    wait: {
      configurable: true,
      value (e, w, a) {
        $(e).loop(
          t => t.get('beat') && _(t.get('beat')).toObject._.includes(e.type)
          ? (
            t.timer(setTimeout(() => t.once(e.type), w)),
            $.soon(e, a)
          )
          : (
            t.timer(clearTimeout),
            t.timer(setTimeout(() => $.soon(e, a), w))
          )
        );
      }
    },
    byId: {
      configurable: true,
      value (...k) {
        return k.flatMap(k => k.split(_.xCs)).length === 1
        ? $(document.getElementById(k.pop()))
        : _(k)
        .fMap(k => k.split(_.xCs))
        .map(
          document.getElementById,
          $
        )._;
      }
    },
    byClass: {
      configurable: true,
      value (...k) {
        return k.flatMap(k => k.split(_.xCs)).length === 1
        ? _.sure(document.getElementsByClassName(k.pop())).map($)
        : _(k)
        .fMap(
          k => k.split(_.xCs),
          k => _.sure(document.getElementsByClassName(k)),
          $
        )._;
      }
    },
    byName: {
      configurable: true,
      value (...k) {
        return k.flatMap(k => k.split(_.xCs)).length === 1
        ? _.sure(document.getElementsByName(k.pop())).map($)
        : _(k)
        .fMap(
          k => k.split(_.xCs),
          k => _.sure(document.getElementsByName(k)),
          $
        )._;
      }
    },
    '@Event': {
      configurable: true,
      value (n) {
        return n instanceof Event ? n.target : n
      }
    },
    '@Inherit': {
      configurable: true,
      value (n) {
        switch (true) {
          default : {
            return $.prototype
          }
          case n instanceof NodeList: {
            return $['#'].Inputs;
          }
          case n instanceof Element:
          switch (n.type) {
            case 'radio': case 'checkbox': {
              return $['#'].Checker;
            }
            default: switch (n.tagName) {
              case 'IMG': case 'VIDEO': case 'AUDIO': case 'IFRAME': case 'SCRIPT': {
                return $['#'].Media;
              }
              case 'UL': case 'OL': {
                return $['#'].List;
              }
              case 'TEXTAREA': {
                return $['#'].INPUT;
              }
              default: switch (true) {
                case $['#'][n.tagName] == null: {
                  return $['#'].Element;
                }
                default: {
                  return $['#'][n.tagName];
                }
              }
            }
          }
        }
      }
    },
    '@role': {
      configurable: true,
      value (e, k) {
        return _($)
        .get(`role.${k}`)
        .pipe(
          m => typeof m === 'function'
          ? m(e, $(e)['@look'])
          : _(m).call(e.type)(e, $(e)['@look'])._
        )._;
      }
    },
    '@pack': {
      configurable: true,
      value (e, k, d) {
        return _($)
        .get(`pack.${k}`)
        .pipe(
          m => typeof m === 'function'
          ? m(e, d)
          : _(m).call(e.type)(e, d)._
        )._;
      }
    },
    '@@': {
      configurable: true,
      value (n, s) {
        return n[s] == null
        ? `dataset.${s}`
        : s
      }
    },
    env: {
      configurable: true,
      value: {
        get ssl () {
          return location.protocol === 'https:'
        },
        get protocol () {
          return location.protocol
        },
        get here () {
          return location.hostname
        },
        get host () {
          return location.host;
        },
        get PORT () {
          return location.port === '' ? 80 : _(location.port).toObject._
        },
        get port () {
          return $.env.PORT;
        },
        get path () {
          return location.pathname;
        },
        get uri () {
          return location.href;
        },
        get language () {
          return navigator.language
        }
      }
    }
  })
  .implements({
    it: {
      configurable: true,
      get () {
        return this.n
      }
    },
    loop: {
      configurable: true,
      value (...f) {
        return _(this).loop(...f)._;
      }
    },
    pipe: {
      configurable: true,
      value (...f) {
        return _(this).pipe(...f)._;
      }
    },
    get: {
      configurable: true,
      value (s) {
        return _(this.n).get(s)._;
      }
    },
    set: {
      configurable: true,
      value (k) {
        return v => this.loop(
          ({n}) => v == null
          ? _(n).cut(k)
          : _(n).set(k)(v)
        );
      }
    },
    put: {
      configurable: true,
      value (o) {
        return this.loop(
          ({n}) => _(n).take(o)._
        );
      }
    },
    mend: {
      configurable: true,
      value (...s) {
        return (...f) => this.loop(
          ({n}) => _(n).mend(...s)(...f)
        );
      }
    },
    refer: {
      configurable: true,
      value (...s) {
        return (...f) => this.loop(
          t => _.pipe(...f)(t.get(...s))
        );
      }
    },
    RorS: {
      configurable: true,
      value (s) {
        return (
          o => typeof o === 'function'
          ? this.refer(s)(o)
          : this.set(s)(o)
        );
      }
    },
    data: {
      configurable: true,
      get () {
        return this.RorS('bind');
      }
    },
    '@look': {
      configurable: true,
      get () {
        return typeof this.get('bind') === 'string'
        ? _($.data).get(this.get('bind'))._
        : this.get('bind');
      }
    },
    class: {
      configurable: true,
      value (...s) {
        return this.mend('classList')(
          v => v == null
          ? s.flatMap(s => s.split(_.xCs))
          : _(v).toggle(...s.flatMap(s => s.split(_.xCs)))._
        );
      }
    },
    wait: {
      configurable: true,
      get () {
        return this.RorS('wait');
      }
    },
    timer: {
      configurable: true,
      get () {
        return this.RorS('timer');
      }
    },
    on: {
      configurable: true,
      value (...s) {
        return this.loop(
          ({n}) => s
          .flatMap(s => s.split(_.xCs))
          .forEach(
            v => n.addEventListener.call(n, v, $.on)
          )
        );
      }
    },
    off: {
      configurable: true,
      value (...s) {
        return this.loop(
          ({n}) => s
          .flatMap(s => s.split(_.xCs))
          .forEach(
            v => n.removeEventListener.call(n, v, $.on)
          )
        );
      }
    },
    once: {
      configurable: true,
      value (...s) {
        return this.loop(
          ({n}) => s
          .flatMap(s => s.split(_.xCs))
          .forEach(
            v => n.addEventListener.call(n, v, $.on, {once: true})
          )
        );
      }
    },
    beat: {
      configurable: true,
      value (...s) {
        return this.mend('beat')(
          v => v == null
          ? s.flatMap(s => s.split(_.xCs))
          : _(v).toObject.toggle(...s.flatMap(s => s.split(_.xCs)))._
        )
        .once(...s);
      }
    },
    strict: {
      configurable: true,
      get () {
        return this.loop(t => t.raw.preventDefault());
      }
    },
    silent: {
      configurable: true,
      get () {
        return this.loop(t => t.raw.stopPropagation());
      }
    },
    specialize: {
      configurable: true,
      get () {
        return this.loop(t => t.strict.silent);
      }
    }
  })
  ._;

  _.put($, {'#': {
    Element: _.upto($.prototype, {
      get: {
        configurable: true,
        value (...s) {
          return this.pipe(
            ({n}) => _(s.flatMap(s => s.split(_.xCs))).pipe(
              a => a.length === 1
              ? _(n).get($['@@'](n, a[0])).toObject._
              : a.reduce((p, s) => _.put(p, {[s]: _(n).get($['@@'](n, a[0])).toObject._}), {})
            )._
          );
        }
      },
      set: {
        configurable: true,
        value (k) {
          return v => this.loop(
            ({n}) => v == null
            ? (n.removeAttribute(k), n.removeAttribute(`data-${k}`))
            : _(n).set($['@@'](n, k))(v)
          );
        }
      },
      put: {
        configurable: true,
        value (o) {
          return this.loop(
            t => _(o)
            .each(
              (k, v) => t.set(k)(v)
            )
          );
        }
      },
      mend: {
        configurable: true,
        value (s) {
          return (...f) => this.set(s)(_.pipe(...f)(this.get(s)));
        }
      },
      id: {
        configurable: true,
        get () {
          return this.RorS('id');
        }
      },
      class: {
        configurable: true,
        value (...s) {
          return this.loop(
            ({n}) => s.flatMap(s => s.split(_.xCs)).forEach(v => n.classList.toggle(v))
          );
        }
      },
      name: {
        configurable: true,
        value (v) {
          return ($.names.add(v), this.RorS('name')(v));
        }
      },
      title: {
        configurable: true,
        get () {
          return this.RorS('title');
        }
      },
      type: {
        configurable: true,
        get () {
          return this.RorS('type');
        }
      },
      drag: {
        configurable: true,
        get () {
          return this.RorS('draggable');
        }
      },
      drop: {
        configurable: true,
        get () {
          return this.RorS('dropzone');
        }
      },
      on: {
        configurable: true,
        value (...s) {
          return this.loop(
            t => (
              _(s.flatMap(s => s.split(_.xCs)))
              .Been
              .includes('dragstart')(v => v && this.drag(true))
              .includes('drop')(v => v && this.drop(true)),
              $.prototype.on.call(t, ...s)
            )
          );
        }
      },
      off: {
        configurable: true,
        value (...s) {
          return this.loop(
            t => (
              _(s.flatMap(s => s.split(_.xCs)))
              .Been
              .includes('dragstart')(v => v && this.drag())
              .includes('drop')(v => v && this.drop()),
              $.prototype.off.call(t, ...s)
            )
          );
        }
      },
      once: {
        configurable: true,
        value (...s) {
          return this.loop(
              t => (
                _(s.flatMap(s => s.split(_.xCs)))
                .Been
                .includes('dragstart')(v => v && this.drag(v))
                .includes('drop')(v => v && this.drop(v)),
                $.prototype.once.call(t, ...s)
              )
          );
        }
      },
      css: {
        configurable: true,
        value (o) {
          return this.loop(({n}) => _(n.style).put(o));
        }
      },
      style: {
        configurable: true,
        get () {
          return this.css;
        }
      },
      morph: {
        configurable: true,
        value (s) {
          return (...f) => this.loop(({n}) => _(n.style).mend(s)(...f));
        }
      },
      real: {
        configurable: true,
        get () {
          return document.getComputedStyle(this.n);
        }
      },
      $: {
        configurable: true,
        value (...c) {
          return this.loop(
            ({n}) => c[0] == null
            ? n.remove()
            : (
              n => _.sure(n.children).forEach(e => e.remove()),
              n.innerText = '',
              n.append(...c.map(v => v instanceof $ ? v.n : v))
            )
          );
        }
      },
      append: {
        configurable: true,
        value (...c) {
          return this.loop(
            ({n}) => c[0] == null
            ? n.remove()
            : n.append(...c.map(v => v instanceof $ ? v.n : v))
          );
        }
      },
      pick: {
        get () {
          return $(this.n.children[0]);
        }
      },
      inner: {
        configurable: true,
        get () {
          return this.n.childElementCount > 0
          ? _.sure(this.n.children).map($)
          : this.n.innerText;
        }
      },
      outer: {
        configurable: true,
        get () {
          return $(this.n.parentNode);
        }
      },
      now: {
        configurable: true,
        value (s) {
          return this.loop(
            ({n}) => typeof s === 'function'
            ? _(n).mend('innerText')(s)
            : _(n).set('innerText')(s)
          );
        }
      },
      next: {
        configurable: true,
        get () {
          return this.n.nextSibling ? $(this.n.nextSibling) : null;
        }
      },
      back: {
        configurable: true,
        get () {
          return this.n.previousSibling ? $(this.n.previousSibling) : null;
        }
      }
    }),
    Inputs: _.upto($.prototype, {
      each: {
        configurable: true,
        value (...f) {
          return this.loop(({raw}) => raw.forEach(n => _.pipe(f)($(n))));
        }
      },
      get: {
        configurable: true,
        get () {
          return this.pipe(
            t => _.sure(t.raw)
            .filter(n => n.checked)
            .map(n => _(n.value).toObject._),
            a => a.length === 1 ? a.pop() : a
          );
        }
      },
      set: {
        configurable: true,
        value (...s) {
          return this.loop(
            t => t.raw.forEach(
              n => $(n).set('checked')(
                s.flatMap(
                  s => typeof s === 'string' ? s.split(_.xCs) : _(s).toJSON._
                )
                .includes(n.value)
              )
            )
          );
        }
      },
      refer: {
        configurable: true,
        value (...f) {
          return this.loop(
            t => _.pipe(...f)(t.get)
          );
        }
      },
      now: {
        configurable: true,
        value (...s) {
          return this.loop(
            t => typeof s[0] === 'function'
            ? t.refer(...s)
            : t.set(...s)
          );
        }
      }
    })
  }});

  _.put($['#'], {TABLE: _.upto($['#'].Element, {
    $: {
      configurable: true,
      value (...e) {
        return this.loop(
          ({n}) => _(
            n.getElementsByTagName('tbody').length === 0
            ? n.createTBody.call(n)
            : n.getElementsByTagName('tbody')[0]
          )
          .loop(
            t => e.forEach(
              (v, r) => t.rows.length <= r
              ? $(t.insertRow()).put({r}).$(r, ...v)
              : $(t.rows[r]).put({r}).$(r, ...v)
            )
          )
        );
      }
    },
    caption: {
      configurable: true,
      value (...v) {
        return this.loop(
          ({n}) => $(n.createCaption.call(n)).$(...v)
        );
      }
    },
    cHead: {
      configurable: true,
      value (...v) {
        return this.loop(
          ({n}) => $(n.createTHead().insertRow()).head(...v)
        );
      }
    },
    rHead: {
      configurable: true,
      value (...v) {
        return this.loop(
          ({n}) => _(n.getElementsByTagName('tbody')[0] || n.createTBody.call(n)).loop(
            t => v.forEach(v => $(t.insertRow()).head(v))
          )
        );
      }
    },
    cFoot: {
      configurable: true,
      value (...v) {
        return this.loop(
          ({n}) => $(n.createTFoot.call(n).insertRow()).foot(...v)
        );
      }
    },
    row: {
      configurable: true,
      get () {
        return _.sure(this.n.rows).map($);
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
        return _(this.cell).rotate._;
      }
    },
    each: {
      configurable: true,
      value (f, ...v) {
        return this.loop(t => _(t.row).each(r => r.each(f, ...v)));
      }
    }
  })});

  _.put($['#'], {TR: _.upto($['#'].Element, {
    $: {
      configurable: true,
      value (r, ...a) {
        return this.loop(({n}) => a.forEach(
          (v, c) => $(n.insertCell.call(n)).put({r, c}).$(v)
        ));
      }
    },
    head: {
      configurable: true,
      value (...a) {
        return this.loop(
          t => a.forEach(
            v => $['#'].Element.append.call(t, $(document.createElement('th')).$(v))
          )
        );
      }
    },
    foot: {
      configurable: true,
      value (...a) {
        return this.loop(
          ({n}) => a.forEach(v => $(n.insertCell.call(n)).$(v))
        );
      }
    },
    cell: {
      configurable: true,
      get () {
        return _.sure(this.n.cells).map($);
      }
    },
    each: {
      configurable: true,
      value (f, ...v) {
        return this.loop(t => _(t.cell).each(c => f(c, ...v)));
      }
    }
  })});

  _.put($['#'], {TD: _.upto($['#'].Element, {
    r: {
      configurable: true,
      get () {
        return this.get('r');
      }
    },
    c: {
      configurable: true,
      get () {
        return this.get('c');
      }
    },
    rSpan: {
      configurable: true,
      get () {
        return this.RorS('rowspan');
      }
    },
    cSpan: {
      configurable: true,
      get () {
        return this.RorS('colspan');
      }
    }
  })});

  _.put($['#'], {List: _.upto($['#'].Element, {
    each: {
      configurable: true,
      value (f) {
        return this.loop(t => _(t.inner).each(f));
      }
    },
    $: {
      configurable: true,
      value (...a) {
        return this.loop(t => $['#'].Element.$.call(t, ..._(a).fold(
          (p, c) => {
            switch (c.it ? c.it.tagName : c.tagName) {
              case 'UL': case 'OL': return p.pushR(li.$(p.popR._, c));
              case 'LI': return p.pushR(c)
              default: return p.pushR(li.$(c))
            }
          },
          _([])
        )._._));
      }
    }
  })});

  _.put($['#'], {A: _.upto($['#'].Element, {
    href: {
      configurable: true,
      get () {
        return this.RorS('href');
      }
    }
  })});

  _.put($['#'], {Media: _.upto($['#'].Element, {
    $: {
      configurable: true,
      value (v) {
        return this.loop(
          t => v == null ? $['#'].Element.$.call(t, v) : t.src(v)
        );
      }
    },
    src: {
      configurable: true,
      get () {
        return this.RorS('src');
      }
    },
    alt: {
      configurable: true,
      get () {
        return this.RorS('alt');
      }
    },
    async: {
      configurable: true,
      get () {
        return this.set('async');
      }
    },
    defer: {
      configurable: true,
      get () {
        return this.set('defer');
      }
    },
    now: {
      configurable: true,
      get () {
        return this.src;
      }
    }
  })});

  _.put($['#'], {INPUT: _.upto($['#'].Element, {
    $: {
      configurable: true,
      value (v) {
        return this.loop(
          t => v === undefined
          ? $['#'].Element.$.call(t, v)
          : t.now(v)
        );
      }
    },
    value: {
      configurable: true,
      get () {
        return this.RorS('value');
      }
    },
    placeholder: {
      configurable: true,
      get () {
        return this.RorS('placeholder');
      }
    },
    autocomplete: {
      configurable: true,
      value (v) {
        return this.RorS('autocomplete')(
          typeof v === 'string'
          ? v
          : (
            v
            ? 'on'
            : 'off'
          )
        );
      }
    },
    min: {
      configurable: true,
      get () {
        return this.RorS('min');
      }
    },
    max: {
      configurable: true,
      get () {
        return this.RorS('max');
      }
    },
    step: {
      configurable: true,
      get () {
        return this.RorS('step');
      }
    },
    form: {
      configurable: true,
      get () {
        return this.RorS('form');
      }
    },
    list: {
      configurable: true,
      value (v) {
        return this.loop(t => t.n.setAttribute('list', v));
      }
    },
    disable: {
      configurable: true,
      get () {
        return this.RorS('disabled')('');
      }
    },
    enable: {
      configurable: true,
      get () {
        return this.RorS('disabled')();
      }
    },
    autofocus: {
      configurable: true,
      get () {
        return this.set('autofocus')('');
      }
    },
    writable: {
      configurable: true,
      value (b) {
        return this.set('readOnly')(!b);
      }
    },
    now: {
      configurable: true,
      get () {
        return this.value;
      }
    }
  })});

  _.put($['#'], {Checker: _.upto($['#'].INPUT, {
    check: {
      configurable: true,
      get () {
        return this.RorS('checked');
      }
    },
    now: {
      configurable: true,
      get () {
        return this.check;
      }
    }
  })});

  _.put($['#'], {SELECT: _.upto($['#'].INPUT, {
    $: {
      configurable: true,
      value (o) {
        return _(o).pipe(
          o => _.isArray(o)
          ? o.map(
            v => v.constructor === Option ? v : new Option(v, v)
          )
          : _.entries(o).map(
            ([k, v]) => _.isObject(v)
            ? optgroup.label(k).$(v)
            : new Option(k, v)
          ),
          a => $['#'].Element.$.call(this, ...a)
        )._;
      }
    },
    select: {
      configurable: true,
      get () {
        return this.value;
      }
    },
    multiple: {
      configurable: true,
      get () {
        return this.RorS('multiple');
      }
    },
    size: {
      configurable: true,
      get () {
        return this.RorS('size');
      }
    },
    now: {
      configurable: true,
      get () {
        return this.value;
      }
    }
  })});

  _.put($['#'], {OPTGROUP: _.upto($['#'].Element, {
    $: {
      configurable: true,
      value (o) {
        return _(o).pipe(
          o => _.isArray(o)
          ? o.map(
            v => v.constructor === Option ? v : new Option(v, v)
          )
          : _.entries(o).map(
            ([k, v]) => new Option(k, v)
          ),
          a => $['#'].Element.$.call(this, ...a)
        )._;
      }
    },
    label: {
      configurable: true,
      get () {
        return this.RorS('label');
      }
    },
    disable: {
      configurable: true,
      get () {
        return this.RorS('disabled')('');
      }
    },
    enable: {
      configurable: true,
      get () {
        return this.RorS('disabled')();
      }
    }
  })});

  _.put($['#'], {DATALIST: _.upto($['#'].Element, {
    $: {
      configurable: true,
      value (...n) {
        return $['#'].Element.$.call(this, ...n.map(
          v => v.constructor === Option ? v : new Option(v, v)
        ));
      }
    }
  })});

  _.put($['#'], {FIELDSET: _.upto($['#'].Element, {
    form: {
      configurable: true,
      get () {
        return this.RorS('form');
      }
    },
    disable: {
      configurable: true,
      get () {
        return this.RorS('disabled')('');
      }
    },
    enable: {
      configurable: true,
      get () {
        return this.RorS('disabled')();
      }
    }
  })});

  _.put($['#'], {FORM: _.upto($['#'].Element, {
    take: {
      configurable: true,
      get () {
        return _.sure($.names)
        .reduce(
          (p, k) => (this.pipe(
            ({n}) => n[k] == null || $(n[k]).now(v => _.put(p, {[k]: v}))
          ), p),
          {}
        );
      }
    },
    give: {
      configurable: true,
      value (o) {
        return this.loop(
          ({n}) => _(o).each(
            (k, v) => $(n[k]).now(v)
          )
        );
      }
    },
    method: {
      configurable: true,
      get () {
        return this.RorS('method');
      }
    },
    action: {
      configurable: true,
      get () {
        return this.RorS('action');
      }
    }
  })});

  _.defines(apex, {
    $html: {
      configurable: true,
      get () {
        return $(document.documentElement);
      }
    },
    $head: {
      configurable: true,
      get () {
        return $(document.head);
      }
    },
    $body: {
      configurable: true,
      get () {
        return $(document.body);
      }
    },
    env: {
      configurable: true,
      get () {
        return $.env;
      }
    },
    imports: {
      configurable: true,
      value: (...imports) => this.loop(
        () => imports.forEach(
          v => body.$(script.$(v).async(true).defer(true))
        )
      )
    },
    script:   {value: s => $(document.createElement('script')).src(s)},
    article:  {get: () => $(document.createElement('article'))},
    div:      {get: () => $(document.createElement('div'))},
    section:  {get: () => $(document.createElement('section'))},
    nav:      {get: () => $(document.createElement('nav'))},
    main:     {get: () => $(document.createElement('main'))},
    aside:    {get: () => $(document.createElement('aside'))},
    header:   {get: () => $(document.createElement('header'))},
    footer:   {get: () => $(document.createElement('footer'))},
    h1:       {get: () => $(document.createElement('h1'))},
    h2:       {get: () => $(document.createElement('h2'))},
    h3:       {get: () => $(document.createElement('h3'))},
    h4:       {get: () => $(document.createElement('h4'))},
    h5:       {get: () => $(document.createElement('h5'))},
    h6:       {get: () => $(document.createElement('h6'))},
    p:        {get: () => $(document.createElement('p'))},
    br:       {get: () => $(document.createElement('br'))},
    table:    {get: () => $(document.createElement('table'))},
    ul:       {get: () => $(document.createElement('ul'))},
    ol:       {get: () => $(document.createElement('ol'))},
    li:       {get: () => $(document.createElement('li'))},
    dl:       {get: () => $(document.createElement('dl'))},
    dt:       {get: () => $(document.createElement('dt'))},
    dd:       {get: () => $(document.createElement('dd'))},
    form:     {get: () => $(document.createElement('form'))},
    fieldset: {get: () => $(document.createElement('fieldset'))},
    legend:   {get: () => $(document.createElement('legend'))},
    datalist: {get: () => $(document.createElement('datalist'))},
    label:    {get: () => $(document.createElement('label'))},
    input:    {get: () => $(document.createElement('input'))},
    radio:    {get: () => input.type('radio')},
    checkbox: {get: () => input.type('checkbox')},
    radios:   {value: n => o => _.entries(o).map(([k, v]) => label.$(
      radio.name(n).value(v),
      _.isArray(o) ? v : k
    ))},
    checks:   {value: n => o => _.entries(o).map(([k, v]) => label.$(
      checkbox.name(n).value(v),
      _.isArray(o) ? v : k
    ))},
    check:    {value: (n, s) => label.$(
      checkbox.name(n),
      (s || n)
    )},
    field:    {value: l => (...e) => fieldset.$(legend.$(l), ...e)},
    autoText: {value: s => (...l) => [text.autocomplete(true).name(s).list(s), datalist.id(s).$(...l.flat())]},
    range:    {get: () => input.type('range')},
    text:     {get: () => input.type('text')},
    date:     {get: () => input.type('date')},
    month:    {get: () => input.type('month')},
    week:     {get: () => input.type('week')},
    time:     {get: () => input.type('time')},
    datetime: {get: () => input.type('datetime-local')},
    mail:     {get: () => input.type('email')},
    url:      {get: () => input.type('url')},
    tel:      {get: () => input.type('tel')},
    number:   {get: () => input.type('namber')},
    file:     {get: () => input.type('file')},
    password: {get: () => input.type('password')},
    search:   {get: () => input.type('search')},
    textarea: {get: () => $(document.createElement('textarea'))},
    select:   {get: () => $(document.createElement('select'))},
    button:   {get: () => $(document.createElement('button'))},
    img:      {get: () => $(document.createElement('img'))},
    video:    {get: () => $(document.createElement('video'))},
    audio:    {get: () => $(document.createElement('audio'))},
    area:     {get: () => $(document.createElement('area'))},
    map:      {get: () => $(document.createElement('map'))},
    canvas:   {get: () => $(document.createElement('canvas'))},
    iframe:   {get: () => $(document.createElement('iframe'))},
    option:   {get: () => $(document.createElement('option'))},
    optgroup: {get: () => $(document.createElement('optgroup'))},
    a:        {get: () => $(document.createElement('a'))},
    em:       {get: () => $(document.createElement('em'))},
    strong:   {get: () => $(document.createElement('strong'))},
    span:     {get: () => $(document.createElement('span'))}
  });

  apex.$ = $;
})(window);
