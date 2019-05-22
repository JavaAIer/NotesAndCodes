import React from 'react';
export function rootContainer(container) {
  var DvaContainer = require('@tmp/DvaContainer').default;

  return React.createElement(DvaContainer, null, container);
}