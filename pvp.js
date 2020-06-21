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
      s => s == null ? env.uri : s,
      s => s.split('/'),
      a => {switch (a[0]) {
        case 'https:': return _(a).omitL.pushL('wss:')._;
        case 'http'  : return _(a).omitL.pushL('ws:')._;
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
              new RTCSessionDescription(await p.createAnswer())
            )
          )
          : _($(e).look).loop(
            o => $(p.createDataChannel('pvp')).class('pvp').once('open'),
            async o => o.localDescription || o.setLocalDescription(
              new RTCSessionDescription(await p.createOffer())
            )
          )
        ));
      },
      icecandidate (e) {
        e.candidate && $(e).look.send(_($(e).it.localDescription).put(term).toJson._);
      },
      datachannel (e) {
        $(e.channel).class('pvp').once('open');
      }
    },
    pvp (pvp) {
      _($).put({pvp});
      _($.data).loop(d => (
        $(d.sock).off('message'),
        $(d.rtc).off('icecandidate', 'datachannel')
      )).delete('sock', 'rtc');
      _($.role).delete('rtc', 'pvp');
    }
  })
);
