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

const PvP = (term = {}) => (uri) => (...ice) => {
  _($.data).put({
    pvpMsg: (
      $(new WebSocket(
        uri
        ? uri
        : _(env.uri.sprit("/")).lift(a => 
          a.popL === "https:"
          ? a.pushL("wss:")
          : a.pushL("ws:")
        )._.join("/"))
      )
      .class("pvpMsg")
      .mark("rtc")
      .on("message")
      .n
    ),
    rtc: (
      _({iceServers: (
        ice.length === 0
        ? ice.push(
          {url: "stun:stun.l.google.com:19302"},
          {url: "stun:stun3.l.google.com:19302"}
        )
        : ice
      )})
      .endo(o => new RTCPeerConnection(o))
      .endo($)
      .been
      .class(
        "pvpICE",
        "pvpDCE"
      )
      .mark("pvpMsg")
      .on(
        "icecandidate",
        "datachannel"
      )
      ._
      .n
    )
  });
  _($.role).put({
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
        _($).put({pvp}),
        _($.data).use(d => (
          $(d.pvpMsg).off("message"),
          $(d.rtc).off("icecandidate", "datachannel")
        )).delete("pvpMsg", "rtc"),
        _($.role).delete("pvpMsg", "pvpICE", "pvpLoadFrame", "pvpDCE")
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
};
