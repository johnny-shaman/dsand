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

const PvP = (term = {}) => (uri = env.uri) => (...ice) => {
  _($.role).put({
    pvpLoadFrame (e) {
      _($.data).put({
        pvpMsg: (
          $(
            _(uri.split("/"))
            .endo(
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
              ice.length === 0
              ? _(ice).$(a => a.push(
                {url: "stun:stun.l.google.com:19302"},
                {url: "stun:stun3.l.google.com:19302"}
              ))._
              : ice.map(url => _(url).by._ === String ? {url} : url)
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
        _($.role.pvpCE)
        .use(p => _.is_(p) === Function ? p(pvp) : pvp),
        _($).put({pvp}),
        _($.data)
        .use(d => (
          $(d.pvpMsg)
          .off("message"),
          delete d.pvpMsg
        ))
        .use(d => (
          $(d.rtc)
          .off("icecandidate", "datachannel"),
          delete d.rtc
        )),
        _($.role)
        .use(r => (
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
