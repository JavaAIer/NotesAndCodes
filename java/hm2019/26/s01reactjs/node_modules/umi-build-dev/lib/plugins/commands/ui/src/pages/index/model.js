"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

window.send = function () {
  alert(`[Error] send not ready.`);
};

const fns = [];

window.socketReady = fn => {
  fns.push(fn);
};

var _default = {
  state: {},
  subscriptions: {
    sockjs({
      dispatch
    }) {
      const sock = new window.SockJS('/umiui');

      function send(type, payload) {
        sock.send(JSON.stringify({
          type,
          payload
        }));
      }

      window.send = send;

      sock.onopen = () => {
        fns.forEach(fn => {
          fn();
        });

        window.socketReady = fn => {
          fn();
        };
      };

      sock.onmessage = e => {
        console.log('[RECEIVED FROM SERVER]', e.data);

        const _JSON$parse = JSON.parse(e.data),
              type = _JSON$parse.type,
              payload = _JSON$parse.payload;

        dispatch({
          type,
          payload
        });
      };

      sock.onclose = () => {
        console.log('close');
      };
    }

  }
};
exports.default = _default;