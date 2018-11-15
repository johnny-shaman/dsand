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

const PvP = (
  term = {},
  uri = env.uri
) => (
  ...iceServers
) => {
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
  );

  _($.pack).draw(p => ({
    pvpLoadFrame (t) {
      t.$();
      delete p.pvpLoadFrame;
    }
  }));

  _($.role).draw(r => ({
    pvpLoadFrame (e) {
      _($.data).draw(d => ({
        pvpMsg: (
          $(
            _(uri.split("/"))
            .map(
              ([p, ...s]) => new WebSocket(s.unshift(
                p === "https"
                ? "wss"
                : "ws"
              ).join("/"))
            )
            ._
          )
          .class("pvpMsg")
          .mark("rtc")
          .on("message")
          .n
        ),
        rtc: (
          $(new RTCPeerConnection({
            iceServers: (
              iceServers.length === 0
              ? _(iceServers).$(a => a.push(
                {url: "stun:stun.l.google.com:19302"},
                {url: "stun:stun3.l.google.com:19302"}
              ))._
              : iceServers.map(v => _(v).by._ === String ? {url: v} : v)
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
      }));
    },
    pvpMsg (e) {
      _(e.data.json._)
      .$(
        d => (
          d
          ? _($(e).look).been
          .setRemoteDescription(new RTCSessionDescription(d)).to
          .$(async p => _(await p.createAnswer()).$(
            v => p.setLocalDescription(new RTCSessionDescription(v)),
            err => err
          ))
          : _($(e).look)
          .$(p => $(p).off("datachannel").on("open")).been
          .createDataChannel("pvp").to
          .$(async p => _(await p.createOffer()).$(
            v => p.setLocalDescription(new RTCSessionDescription(v)),
            err => err
          ))
        )
      );
    },
    pvpICE (e) {
      e.candidate && $(e).look.send(_($(e).n.localDescription).cast(term).json);
    },
    pvpDCE (e) {
      _($.data)
      .$(d => (
        $(d.pvpMsg)
        .off("message"),
        delete d.pvpMsg
      ))
      .$(d => (
        $(d.rtc)
        .off("icecandidate", "datachannel", "open"),
        delete d.rtc
      ));
      _(
        e.channel
        ? e.channel
        : (
          e.target.constructor === RTCPeerConnection
          ? null
          : e.target
        )
      )
      .$(o => (
        _($.role.pvpEstablish)
        .$(p => _(p).by._ === Function ? p(o) : o)
        .$(pvp => _($).draw(() => {pvp}))
      ));
    }
  }));
};
