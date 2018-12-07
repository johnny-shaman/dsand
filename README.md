# $(dsand).$()
## $(dsand).$() is a pure javascript Render with [\_(losand).\_](https://www.npmjs.com/package/losand)
## Usage

### html
~~~html
<script src="https://cdn.jsdelivr.net/npm/losand@1.5.0/losand.js"></script>
<script src="https://cdn.jsdelivr.net/npm/dsand@0.6.3/dsand.js"></script>
<!--If you use about webRTC on losand.pvp-->
<script src="https://cdn.jsdelivr.net/npm/dsand@0.6.3/pvp.js"></script>
~~~

If You use WebRTC PvP get's [\_(losand.pvp).\_](https://www.npmjs.com/package/losand.pvp)

~~~javascript
//$.data is state modeling and presence on emutable data relation
_($.data).draw({
  countUp: (function*() {
    let y = 0;
    while (true) {
      yield ++y;
    }
  })(),
  example: {
    text: "Hello losand!"
  }
});

//$.role reforming data structure functions that name have Elemnent.class
_($.role).draw({
  sample (e) {
    return _($(e).look.next().value)
    .$(v => alert(`${v} time(s) clicked!`))
    ._;
  },
  ex1 : {
    click (e) {
      alert($(e).look.text);
    }
  },
  ex2 : {
    click (e) {
      alert($(e).want);
    }
  },
  ex3 (e) {
    alert($(e).look.text);
  },
  ex4 (e) {
    alert($(e).want);
  },
// can Assign eventType's Method's as you like it;
  getData: {
    click (e) {
      alert(_($.id.myForm.get).json);
    }
  }
});

//$.pack rendering functions that name have Elemnent.class
//e = event, d = $.role's return value
_($.pack).draw({
  sample (e, d) {
    $(e).seem(`once more! (${d})`);
  },
  ex1 : {
    click (e) {
      $(e).seem("Thank you!");
    }
  },
  ex2 (e) {
    $(e).seem("Thank you!");
  },
  ex3 (e) {
    $(e).seem("Thank you!");
  },
  ex4 : {
    click (e) {
      $(e).seem("Thank you!");
    }
  }
});

//start initial rendering
body
.id("view")
.class("wrapper")
.$(
  header
  .id("head")
  .class("wrapper")
  .$(
    h1.$("Hello _(losand)._").css({ margin: "16px" }),
    h2.$("Untouchable Any Directly").css({ margin: "16px" })
  )
  .css({
    margin: "0, auto"
  }),
  article
  .id("today")
  .class("wrapper", "article")
  .$(

    //h1
    h1.$("_(losand)._ wrapping a value").css({
      margin: "8px",
      padding: "8px",
      borderBottom: "1px solid #888888"
    }),

    //paragraph
    p.$("losand wrapping a value on monad and like to Usage here"),

    //link
    p.$(a.href("https://github.com/johnny-shaman/losand/blob/master/README.md").$("readme on github")),

    //img
    p.$(img.$("https://www.google.co.jp/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png")),

    // button & clicks
    // $.mark like QueryKeyword for $.data
    // $.role[$.class](e)
    // $.pack[$.class](e)
    p.$(button.mark("countUp").class("sample").on("click").$("click me")),
    // once is only one time handling
    p.$(button.mark("countUp").class("sample").once("click").$("It's can click")),
    // beat can handle on each time
    p.$(button.mark("countUp").class("sample").beat(3000, "click").$("click me")),
    // dull will be handle the event wait on it last time
    p.$(button.mark("countUp").class("sample").wait(3000).on("click").$("click me")),
    // distinate other way of data and methods
    p.$(button.mark("example, text").class("ex1").on("click").$("click please")),
    // distinate other way of data and methods
    p.$(button.mark("example", "text").class("ex2").on("click").$("click please")),
    // distinate other way of data and methods
    p.$(button.mark("example", "text").class("ex3").on("click").$("click please")),
    // distinate other way of data and methods
    p.$(button.mark("example, text").class("ex4").on("click").$("click please")),
    //table
    table.$([
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9]
    ]),

    //ul, ol
    ul.$([
      "総則", [
        "本会の目的は、…", [
          "この…",
          "この…"
        ],
        "総則は以下の…", [
          "この総則は…",
          "この総則の…"
        ]
      ],
      "分則１", [
        "本会は、…",
        "本会にて…は以下に定める", [
          "この…",
          "この…"
        ],
        "本会は、以下の…", [
          "この総則は…",
          "この総則の…"
        ]
      ],
      "分則２", [
        "本会にて…は以下に定める", [
          "この…",
          "この…"
        ],
        "本会は、…",
        "本会は、以下の…", [
          "この総則は…",
          "この総則の…"
        ]
      ],
    ]),

    //input
    form
    .id("myForm")
    .$(
      select.name("tSelect1").$({ test: 0, test1: 1 }), br,
      select.name("tSelect2").$([3, 4, 5, 6, 7]), br,
      select.name("tSelect3").$({
        testgrp: {
          test: 0,
          test1: 1
        },
        testgrp1: [3, 4, 5, 6, 7]
      }), br,
      check("tCheck1", "test").pick.class("test", "check").outer,
      check("tCheck2", "test1").pick.class("test", "check").outer, br,
      ...radios("tRadio1", [1, 2, 3]).map(r => r.pick.class("test", "radio").outer), br,
      ...radios("tRadio2", { test1: 1, test2: 2 }).map(
        r => r.pick.class("test", "radio").outer
      ), br,
      button.class("getData").on("click").$(
        "Get FormData"
      )
    )
    .set({
      tSelect1: 1,
      tSelect2: 7,
      tSelect3: 5,
      tCheck1: false,
      tCheck2: true,
      tRadio1: 3,
      tRadio2: 1
    })
  )
  );

//getElements
$.id.today;
$.class.wrapper[1]
$.name.tRadio1[0]

//select.firstChild
$.id.today.pick

//select.children
$.id.today.inner[1]

//select.parent
$.name.tRadio1[0].outer

//getRawElement or Node
$.id.today.get

//setRawElement's Attribute or Node
$.id.today.set("test", true);

//class is every togglable
$.class.wrapper[0].class("wrapper", "warp", "foooooYah");

//append
$.id.today.$(
  p.$("appended")
)

//Likely Backend window Item can use it
$(new WebSocket("http://sample.io/")).class("test").on("message");

//remove Selected Query
$.id.today.$();

//formdata to js Object
$.id.myForm.get

//imports
imports("http://sample.io/foo.js", "http://sample.io/bar.js", "http://sample.io/baz.js");
~~~

