# $(dsand).$()
## $(dsand) is a pure javascript Render with [\_(losand).\_](https://www.npmjs.com/package/losand)
## Usage

### html
~~~html
<script src="https://cdn.jsdelivr.net/npm/losand@1.1.0/losand.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/dsand@0.2.0/dsand.min.js"></script>
<!--if you use about webRTC on losand.pvp-->
<script src="https://cdn.jsdelivr.net/npm/dsand@0.2.0/pvp.js"></script>
~~~

~~~javascript
//$.from is state modeling and presence on emutable data relation
_($.from).draw({
  countUp : (function* () {
    let y = 0;
    while (true) {
      yield ++y;
    }
  })()
});

//$.role reforming data structure functions that name have Elemnent.class
_($.role).draw({
  sample (t) {
    alert(`${t.deed.next().value} time(s) clicked!`);
  },
  getData (e) {
    alert(_($.id.myForm.get).json)
  }
});

//$.pack rendering functions that name have Elemnent.class
_($.pack).draw({
  sample (t) {
    t.seem("once more!");
  }
});

//start initial rendering
body
.id("view")
.class("wrapper")
.$(
  header.id("head").class("wrapper")
  .$(
    h1.$("Hello _(losand)._").css({margin: "16px"}),
    h2.$("Untouchable Any Directly").css({margin: "16px"})
  )
  .css({
    margin: "0, auto"
  }),
  article
  .id("today")
  .class("wrapper article")
  .$(

    //h1
    h1.$("_(losand) wrapping a value").css({
      margin: "8px",
      padding:"8px",
      borderBottom: "1px solid #888888"
    }),

    //paragraph
    p.$("losand wrapping a value on monad and like to Usage here"),

    //link
    p.$(a.href("https://github.com/johnny-shaman/losand/blob/master/README.md").$("readme on github")),

    //img
    p.$(img.$("https://www.google.co.jp/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png")),

    //button & clicks
    p.$(button.from("countUp").class("sample").on("click").$("click me")),

    //table
    table.$([
      [1,2,3],
      [4,5,6],
      [7,8,9]
    ]),

    //ul, ol
    ul.$([
      "総則",
      [
        "本会の目的は、…",
        [
          "この…",
          "この…"
        ],
        "総則は以下の…",
        [
          "この総則は…",
          "この総則の…"
        ]
      ],
      "分則１",
      [
        "本会は、…",
        "本会にて…は以下に定める",
        [
          "この…",
          "この…"
        ],
        "本会は、以下の…",
        [
          "この総則は…",
          "この総則の…"
        ]
      ],
      "分則２",
      [
        "本会にて…は以下に定める",
        [
          "この…",
          "この…"
        ],
        "本会は、…",
        "本会は、以下の…",
        [
          "この総則は…",
          "この総則の…"
        ]
      ],
    ]),

    //input
    form.id("myForm").$(
      select.name("tSelect1").$({test: 0, test1: 1}), br,
      select.name("tSelect2").$([3,4,5,6,7]), br,
      select.name("tSelect3").$({
        testgrp: {
          test: 0,
          test1: 1
        },
        testgrp1:
        [3,4,5,6,7]
      }), br,
      label.$(checkbox.name("tCheck1"), "test"),
      label.$(checkbox.name("tCheck2"), "test1"),
      ...radios("tRadio1",[1,2,3]), br,
      ...radios("tRadio2",{test1: 1, test2: 2}), br,
      button.class("getData").$("Get FormData").on("click")
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

//querySelector
$.id.today.$(p.$("append"));

//remove Selected Query
$.id.today.$();

//formdata to js Object
$.id.myForm.cast
~~~