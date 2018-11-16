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
  _($.role).draw({
    pvpLoadFrame (e) {
      _($.data).draw({
        pvpMsg: (
          $(
            _(uri.split("/"))
            .map(
              ([p, ...s]) => new WebSocket(_(s).$(s => s.unshift(
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
      });
    },
    pvpMsg (e) {
      _(e.data.json._)
      .$(
        d => (
          d
          ? _($(e).look)
          .been
          .setRemoteDescription(new RTCSessionDescription(d))
          .to
          .$(async p => p.localDescription || _(await p.createAnswer()).$(
              v => p.setLocalDescription(new RTCSessionDescription(v))
            )
          )
          : _($(e).look)
          .$(p => _($).draw({
            pvp: (
              $(p.createDataChannel("pvp"))
              .class("pvpDCE")
              .on("open")
              .n
            )
          }))
          .$(async p => p.localDescription || _(await p.createOffer()).$(
            v => p.setLocalDescription(new RTCSessionDescription(v))
          ))
        )
      );
    },
    pvpICE (e) {
      e.candidate && $(e).look.send(_($(e).n.localDescription).draw(term).json);
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
      .$(pvp => (
        _($.role.onPvP)
        .$(p => _(p).by._ === Function ? p(pvp) : pvp),
        _($).draw({pvp}),
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
        )),
        _($.role)
        .$(r => (
          delete r.pvpMsg,
          delete r.pvpICE,
          delete r.pvpLoadFrame,
          delete r.pvpDCE
        ))
      ));
    }
  });

  uri !== env.uri
  ? (
    _($.pack).$(p => _(p).draw({
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
