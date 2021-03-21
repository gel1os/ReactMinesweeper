import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import { gameStatuses } from 'client/utils/constants';
import { gameStatusPropType } from 'client/utils/prop-types';

const icons = [{
  status: 'pressed',
  src: 'icons/surprised.svg',
  alt: 'surprised emoji',
}, {
  status: gameStatuses.paused,
  src: 'icons/sleeping.svg',
  alt: 'sleeping emoji',
}, {
  status: gameStatuses.win,
  src: 'icons/cool.svg',
  alt: 'cool emoji in sunglasses',
}, {
  status: gameStatuses.lose,
  src: 'icons/frown.svg',
  alt: 'frown',
}, {
  status: gameStatuses.not_started,
  src: 'icons/smile.svg',
  alt: 'smiling emoji'
  }, {
  status: gameStatuses.in_progress,
  src: 'icons/smile.svg',
  alt: 'smiling emoji'
}];

const Emoji = ({status, pressed}) => {
  status = pressed ? 'pressed' : status;

  return icons.map((icon) =>
    <img
      key={icon.status}
      src={icon.src}
      alt={icon.alt}
      className={cx({visible: status === icon.status})}
    />
  );
};

Emoji.propTypes = {
  status: gameStatusPropType,
  pressed: PropTypes.bool.isRequired,
};

export default Emoji;