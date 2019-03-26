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

_($).put({pvp: []});

const PvP = (term = {}) => (uri) => (...ice) => {
  _($.data).put({
    pvpMsg: (
      $(new WebSocket(
        uri
        ? uri
        : _(env.uri.split("/")).lift(a => 
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
      $(new RTCPeerConnection({
        iceServers: _(ice).pushR(
          {urls: [
            "stun:stun.l.google.com:19302",
            "stun:stun3.l.google.com:19302"
          ]}
        )._
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
        _($.pvp).pushR(pvp),
        _($.data).use(d => (
          $(d.pvpMsg).off("message"),
          $(d.rtc).off("icecandidate", "datachannel")
        )).delete("pvpMsg", "rtc")
      ));
    }
  });
};
