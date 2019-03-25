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

_($).set([], "pvp");

const prepare = (term = {}) => (uri = env.uri) => (...ice) => _($).lift(
  {
  pvpMsg: (
    $(
      _(uri.split("/"))
      .endo(
        ([p, ...s]) => new WebSocket(_(s).use(s => s.unshift(
          p === "https:"
          ? "wss:"
          : "ws:"
        )
      )._.join("/")))._
    )
    .class("pvpMsg")
    .mark("rtc")
    .on("message")
    .n
  ),
  rtc: (
    $(new RTCPeerConnection({
      iceServers: (
        ice.length === 0
        ? ice.push(
          {url: "stun:stun.l.google.com:19302"},
          {url: "stun:stun3.l.google.com:19302"}
        )
        : ice
      )
    }))
    .class(
      "pvpICE",
      "pvpDCE"
    )
    .mark("pvpMsg")
    .on(
      "icecandidate",
      "datachannel"
    ).n
  )
})
  pvpMsg (e) {
    _(e.data)
    .json
    .use(
      d => (
        d
        ? _($(e).look)
        .been
        .setRemoteDescription(new RTCSessionDescription(d))
        .to
        .use(async p => p.localDescription || _(await p.createAnswer()).use(
            v => p.setLocalDescription(new RTCSessionDescription(v))
          )
        )
        : _($(e).look)
        .use(p => _($).put({
          pvp: (
            $(p.createDataChannel("pvp"))
            .class("pvpDCE")
            .on("open")
            .n
          )
        }))
        .use(async p => p.localDescription || _(await p.createOffer()).use(
          v => p.setLocalDescription(new RTCSessionDescription(v))
        ))
      )
    );
  },
  pvpICE (e) {
    e.candidate && $(e).look.send(_($(e).n.localDescription).put(term).json._);
  },
  pvpDCE (e) {
    _(
      e.channel
      ? e.channel
      : (
        e.target.constructor === RTCPeerConnection
        ? null
        : e.target
      )
    )
    .use(pvp => (
      $(pvp).class("pvpDCE").off("open"),
      _($.role.pvpCE).use(p => _.is_(p) === Function ? p(pvp) : pvp),
      _($.pvp).pushR(pvp),
      _($.data)
      .use(d => (
        $(d.pvpMsg).off("message"),
        $(d.rtc).off("icecandidate", "datachannel")
      ))
      .delete("pvpMsg", "rtc"),
    ));
  }
});

  uri !== env.uri
  ? (
    _($.pack).use(p => _(p).put({
      pvpLoadFrame (t) {
        t.$();
        delete p.pvpLoadFrame;
      }
    })),
    body.$(
      iframe
      .$(uri)
      .css({
        width: "1px",
        height: "1px",
        display: "block",
        border: "none"
      })
      .class("pvpLoadFrame")
      .on("load")
    )
  )
  : $.role.pvpLoadFrame();
