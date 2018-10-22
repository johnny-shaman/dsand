/*
  global
    _
    $
    RTCSessionDescription
    RTCPeerConnection
    body
    iframe
    env
*/
const PvP = (term = {}, ...role) => {
  _($.role).draw({
    pvpLoadFrame (e) {
      _($.from).draw({pvp: new PvP(term, role)});
    }
  });

  _($.pack).draw({
    pvpLoadFrame (t) {
      t.$();
    }
  });

  body.$(
    iframe
    .class("pvpLoadFrame")
    .$(`${env.https ? "https" : "http"}://${env.here}`)
    .css({
      width: "1px",
      height: "1px",
      display: "block",
      border: "none"
    })
    .on("load")
  );

  const PvP = _(function (term, role) {
    _(this).draw({
      rtc: new RTCPeerConnection({
        iceServers: [
          {url: "stun:stun.l.google.com:19302"},
          {url: "stun:stun3.l.google.com:19302"}
        ]
      }),
      way: new WebSocket($.wsuri),
      role: role.length === 0 ? ["establish"] : role,
    })
    .$(
      p => _(p.rtc)
      .been
      .addEventListener("icecandidate", p)
      .addEventListener("datachannel",  p)
    )
    .$(
      p => p.way.addEventListener("message", p)
    );
  })
  .annex({
    message: {
      configurable: true,
      value (e) {
        _(e.data.json._)
        .$(
          d => d
          ? this.createAnswer(d)
          : this.createOffer()
        );
      }
    },
    createOffer () {
      _(this.rtc)
      .been
      .createDataChannel("talk")
      .addEventListener("open", this)
      .to
      .$(
        async r => _(await r.createOffer())
        .$(
          v => r.setLocalDescription(
            new RTCSessionDescription(v)
          ), err => err
        )
      );
    },
    createAnswer (data) {
      _(this.rtc)
      .been
      .setRemoteDescription(
        new RTCSessionDescription(data)
      )
      .to
      .$(
        async r => _(await r.createAnswer())
        .$
      )
      (r => {
        r;
        r.createAnswer().then(v => r.setLocalDescription(
          new RTCSessionDescription(v)
        ), err => err);
      });
    },
    icecandidate: {
      configurable: true,
      value (e) {
        e.candidate && _(this.rtc).$(
          r => this.way.send(_(r.localDescription).cast(term).json)
        );
      }
    },
    open: {
      configurable: true,
      value (e) {
        this.rtc.removeEventListener("open", this);
        this.establish(e.target);
      }
    },
    datachannel: {
      configurable: true,
      value (e) {
        this.establish(e.channel);
      }
    },
    establish: {
      configurable: true,
      value (c) {
        _(this.way)
        .been
        .removeEventListener("message", this)
        .close();
        _(this.rtc)
        .been
        .removeEventListener("icecandidate", this)
        .removeEventListener("datachannel",  this);
        _($)
        .set(
          $(
            _(c)
            .define({
              say : {
                configurable: true,
                value (s) {
                  return _(this).been.send(_(s).by._ === String ? s : _(s).json)._;
                }
              }
            })
            ._
          )
          .n,
          "pvp"
        );
        this.role.each(k => $.role[k](c));
        delete $.role.pvpLoader;
        delete $.pack.pvpLoader;
        delete $.from.pvp;
      }
    },
    handleEvent:{
      configurable: true,
      value (e) {
        this[e.type](e);
      }
    }
  })._;
};
