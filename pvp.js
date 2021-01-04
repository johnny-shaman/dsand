const PvP = (term = {}) => uri => (option = {iceServers: [{urls: 'stun:stun.l.google.com:19302'}]}) => _($).loop(
  $ => _($.data).put({
    sock: $(_(uri).pipe(
      s => s == null ? $.env.uri : (
        $body.append(
          iframe
          .src(s)
          .style({
            display: 'fixed',
            width: '1px',
            height:'1px',
            margin: '-100px -100px 0 0'
          })
          .$()),
        s),
      s => s.split('/'),
      a => {switch (a[0]) {
        case 'https:': return _(a).omitL.pushL('wss:/')._;
        case 'http:'  : return _(a).omitL.pushL('ws:/')._;
        default: return a;
      }},
      a => new WebSocket(a.join('/'))
    )._)
    .class('rtc')
    .data('rtc')
    .on('message')
    .it,

    rtc: $(new RTCPeerConnection(option))
    .class('rtc')
    .data('sock')
    .on(
      'icecandidate',
      'datachannel'
    )
    .it
  }),
  $ => _($.role).put({
    rtc: {
      message (e, o) {
        _(e.data).toObject.pipe(p => (
          p
          ? _(o).loop(
            o => o.setRemoteDescription(new RTCSessionDescription(p)),
            async o => o.localDescription || o.setLocalDescription(
              new RTCSessionDescription(await o.createAnswer())
            )
          )
          : _(o).loop(
            o => $(o.createDataChannel('pvp')).class('pvp').on('open'),
            async o => o.localDescription || o.setLocalDescription(
              new RTCSessionDescription(await o.createOffer())
            )
          )
        ));
      },
      icecandidate (e) {
        e.candidate && $(e).look.send(_($(e).it.localDescription).put(term).toJSON._);
      },
      datachannel ({channel}) {
        $(channel).class('pvp').on('open');
      }
    },
    pvp ({target}) {
      _($)
      .put({
        pvp: (
          $(target)
          .class('pvp hear')
          .on('message')
          .off('open')
          .it
        )
      })
      .loop(d => (
        $(d.data.sock).off('message'),
        $(d.data.rtc).off(
          'icecandidate',
          'datachannel'
        )
      ))
      .cut('data.sock')
      .cut('data.rtc')
      .cut('role.rtc')
      .cut('role.pvp');
    }
  })
);
