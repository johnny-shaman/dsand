# $(dsand).$()
## $(dsand).$() is a pure javascript Render with [white_cats](https://www.npmjs.com/package/white_cats)
## Usage

### html : white_cats@0.1.27 or later

~~~html
<script src="https://cdn.jsdelivr.net/npm/white_cats@0.1.54/cat.js"></script>
<script src="https://cdn.jsdelivr.net/npm/dsand@0.8.50/dsand.js"></script>
<!--If You Want to Get Peer to Peer Connection then you read it-->
<script src="https://cdn.jsdelivr.net/npm/dsand@0.8.50/pvp.js"></script>
~~~

Let's try on

[forAll on codepen](https://codepen.io/johnny_shaman/pen/EMNRKQ)

[pickup on codepen](https://codepen.io/johnny_shaman/pen/rNMpdXX)

[PvP chat on Glitch](https://glitch.com/~dsand-chat)

Support Drag and Drop on HTML5

If 'dragstart' handling then e.dataTransfer have e.target's number at parentNode's it.

~~~javascript
//$.data is state and IO modeling and presence on emutable data relation
_($.data).put({
  countUp: (function*() {
    let y = 0;
    while (true) {
      yield ++y;
    }
  })(),
  formData: {},
  drag: false,
  drop: false,
  /* tips on async
  async fetchTest () {
    return await fetch("http://www.example.io/")
  }
  */
});

//$.role reforming data structure functions that name have Elemnent.class
_($.role).put({
  sample (e, d) {
    // d is $(e).look that looking upto $.data[key_word]
    return _(d.next().value).loop(
      v => alert(`${v} time(s) clicked!`)
    )._;
  },
  // can Assign eventType's Method's as you like it;
  getData: {
    click (e, d) {
      $(e).strict;
      alert(_($.byId('myForm').take).give(d).toJSON._);
    }
  },
  dandTest: {
    dragstart (e) {
      _($.data).put({drag: {
        data: $(e).inner,
        node: $(e).it
      }});
    },
    drop (e) {
      _($.data).put({drop: {
        data: $(e).inner,
        node: $(e).it
      }});
      return $.data;
    },
    dragend (e) {
      _($.data).put({
        drag: false,
        drop: false
      });
    }
  },
  /*
  // can use async await
  async asyncEx (e, d) {
    return await d();
  },
  // also can use 
  asyncEx : {
    async click (e, d) {
      return await d();
    }
  }
  */
});

//$.pack rendering functions that name have Elemnent.class
//e = event, d = $.role's return value
_($.pack).put({
  sample (e, d) {
    $(e).$(`once more! (${d})`);
  },
  dandTest: {
    dragstart (e) {
      $(e).css({opacity: ".4"});
    },
    drop (e, {drag, drop}) {
      $(drag.node)
      .$(drop.data);
      $(drop.node)
      .$(drag.data);
    },
    dragend (e) {
      $(e).css({opacity: "1"});
    }
  }
  /*
  // can use async await
  async asyncEx (e, d) {
    $(e).$(await d);
  }
  // also can use 
  asyncEx : {
    async click (e) {
      $(e).$(await d);
    }
  }
  */
});

//start initial rendering
$body
.id("view")
.class("wrapper")
.set("myId")("myId") // set is setAttaribute value is null then removeAttribute.
.$(
  header
  .id("head")
  .class("wrapper")
  .$(
    h1.$("Hello _(white_cats)._").css({ margin: "16px" }),
    h2.$("Untouchable Any Directly").css({ margin: "16px" })
  )
  .css({
    margin: "0, auto"
  }),
  //nav
  nav
  .class("wrapper")
  .$(
    //paragraph
    p.$(
    //link
      a.href("https://github.com/johnny-shaman/white_cats/").$("White Cats")
    ).css({margin: "8px"}),
    //paragraph
    p.$(
    //link
      a.href("https://github.com/johnny-shaman/dsand/").$("dsand")
    ).css({margin: "8px"}),
  ).css({display: "flex"}),
  //main
  main
  .class("wrapper")
  .$(
    article
    .id("today")
    .class("wrapper article")
    .$(

      //h1
      h1.$("_(losand)._ wrapping a value").css({
        margin: "8px",
        padding: "8px",
        borderBottom: "1px solid #888888"
      }),

      //paragraph
      p.$("losand wrapping a value on monad and like to Usage here"),
      //img
      p.$(img.$("https://www.google.co.jp/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png")),

      // button & clicks
      // $.data : data-bindings
      // $.role[$.class](e)
      // $.pack[$.class](e, d: $.role's return data)
      // $.off can removeListener
      p.$(button.data("countUp").class("sample").on("click").$("click me")),
      // once is only one time handling
      p.$(button.data("countUp").class("sample").once("click").$("It's can click")),
      // beat can handle on each time and beat can toggle beat on off
      p.$(button.data("countUp").class("sample").wait(3000).beat("click").$("click me")),
      // lazy handle the event wait on it last time
      p.$(button.data("countUp").class("sample").wait(3000).on("click").$("click me")),
      //table
      table
      .caption("drag and drop Test")
      .$(
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9]
      )
      
      /*
      // new Table control method is ready!!!

      .insertR(index)([...], [...], ...) //insertRow
      .insertC(index)([...], [...], ...) //insertColumn
      
      //They are so likely to work insertRow and insertCell
      // Ex: index = -1 then Insert to Tail and
      //     index = 0  then Insert to Head
      
      .deleteR(start, end) //deleteRow
      .deleteC(start, end) //deleteColumn      
      
      */

      .each(
        e => (
          e
          .class("dandTest")
          .css({
            fontSize: "16px",
            minWidth: "32px",
            minheight: "32px",
            textAlign: "center",
            verticalAlign: "middle",
            border: "1px solid #000000"
          })
          .on("dragstart, dragover, dragend, drop")
        )
      ),
      //drag and drop test
      table
      .caption("Test Table")
      .cHead("rNum", "c1", "c2", "c3")
      .rHead("r1", "r2", "r3")
      .$(
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9]
      )
      .cFoot("rNum", "c1", "c2", "c3"),
      //ul, ol
      ul.$(
        "総則",
        ul.$(
          "本会の目的は、…",
          ul.$(
            "この…",
            "この…"
          ),
          "総則は以下の…",
          ul.$(
            "この総則は…",
            "この総則の…"
          )
        ),
        "分則１",
        ul.$(
          "本会は、…",
          li.class("intermediater").$(
            "本会にて…は以下に定める"
          ),
          ul.$(
            "この…",
            "この…"
          ),
          "本会は、以下の…",
          ul.$(
            "この総則は…",
            "この総則の…"
          )
        ),
        "分則２",
        ul.$(
          "本会にて…は以下に定める",
          ul.$(
            1234567,
            false
          ),
          "本会は、…",
          "本会は、以下の…",
          ul.$(
            "この総則は…",
            "この総則の…"
          )
        )
      )
      .each(i => i.class("test")),

      //input
      form
      .id("myForm")
      .$(
        field('t1')(
          select.name("tSelect1").$({test: 0, test1: 1}), br,
          select.name("tSelect2").$([3, 4, 5, 6, 7]), br,
          select.name("tSelect3").$({
            testgrp: {
              test: 0,
              test1: 1
            },
            testgrp1: [3, 4, 5, 6, 7]
          }), br,
          ...autoText('tText1')('icecream', 'soda', 'cola', 'coffee', 'tea'), br,
          text.name('tText2')
        ),
        field('t2')(
          check("tCheck1", "test"), check("tCheck2", "test1"), br,
          ...radios("tRadio1")([1, 2, 3]), br,
          ...radios("tRadio2")({ test1: 1, test2: 2 }), br,
          range.name('tRange').min(-50).max(50), br,
          button.data("formData").class("getData").$("Get FormData").on("click")
        )
      )
      .give({
        tSelect1: 1,
        tSelect2: 7,
        tSelect3: 5,
        tCheck1: false,
        tCheck2: true,
        tRadio1: 3,
        tRadio2: 1,
        tRange:  0
      })
    )
  )
);

//getElements
$.byId('today');
$.byClass('wrapper')[1]
$.byName('tRadio1')[0]

//select.firstChild
$.byId('today').pick

//select.children
$.byId('today').inner[1]

//select.parent
$.byName('tRadio1')[0].outer

//getRawElement or Node
$.byId('today').it

//getComputedStyle
$.byId('today').real

//setAttribute on Element or Node
$.byId('today').set('test')(true);

//get next Element
$.byId('myForm').next;

//get previous Element
$.byId('myForm').back;

//class is every togglable
$.byClass('wrapper')[0].class("wrapper", "warp", "foooooYah");

//append
$.byId('today').append(
  p.$("appended")
)

//Likely Backend window Item can use it
$(new WebSocket("http://sample.io/")).class("test").on("message");

//remove Selected Query
$.byId('myForm').$();

//formdata to js Object
$.byId('myForm').take

//imports
imports("http://sample.io/foo.js", "http://sample.io/bar.js", "http://sample.io/baz.js");
~~~
