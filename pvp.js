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

const PvP = (term = {}) => uri => (option = {iceServers: [{urls: 'stun:stun.l.google.com:19302'}]}) => _($).loop(
  $ => _($.data).put({
    sock: $(_(uri).pipe(
      s => s == null ? env.uri : (
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
        case 'https:': return _(a).omitL.pushL('wss:')._;
        case 'http:'  : return _(a).omitL.pushL('ws:')._;
        default: return a;
      }},
      a => new WebSocket(a.join(''))
    )._)
    .class('rtc')
    .mark('rtc')
    .on('message')
    .it,

    rtc: $(new RTCPeerConnection(option))
    .class('rtc')
    .mark('sock')
    .on(
      'icecandidate',
      'datachannel'
    )
    .it
  }),
  $ => _($.role).put({
    rtc: {
      message (e) {
        _(e.data).toObject.pipe(d => (
          d
          ? _($(e).look).loop(
            o => o.setRemoteDescription(new RTCSessionDescription(d)),
            async o => o.localDescription || o.setLocalDescription(
              new RTCSessionDescription(await o.createAnswer())
            )
          )
          : _($(e).look).loop(
            o => $(o.createDataChannel('pvp')).class('pvp').once('open'),
            async o => o.localDescription || o.setLocalDescription(
              new RTCSessionDescription(await o.createOffer())
            )
          )
        ));
      },
      icecandidate (e) {
        e.candidate && $(e).look.send(_($(e).it.localDescription).put(term).toJSON._);
      },
      datachannel (e) {
        _($).put({pvp: $(e.channel).class('hear').on('message').it})
      }
    },
    pvp (e) {
      _($).put({pvp: $(e.target).class('pvp hear').on('message').off('open').it});
      _($.data).loop(d => (
        $(d.sock).off('message'),
        $(d.rtc).off('icecandidate', 'datachannel')
      )).cut('sock', 'rtc');
      _($.role).cut('rtc', 'pvp');
    }
  })
);
