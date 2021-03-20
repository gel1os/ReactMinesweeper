import React from 'react';
import PropTypes from 'prop-types';

import { gameStatuses } from 'client/utils/constants';
import { gameStatusPropType } from 'client/utils/prop-types';

const iconsToStatusMap = {
  pressed: {
    src: 'icons/surprised.svg',
    alt: 'surprised emoji',
  },
  [gameStatuses.paused]: {
    src: 'icons/sleeping.svg',
    alt: 'sleeping emoji',
  },
  [gameStatuses.win]: {
    src: 'icons/cool.svg',
    alt: 'cool emoji in sunglasses',
  },
  [gameStatuses.lose]: {
    src: 'icons/frown.svg',
    alt: 'frown',
  },
  [gameStatuses.not_started]: {
    src: 'icons/smile.svg',
    alt: 'smiling emoji'
  },
  [gameStatuses.in_progress]: {
    src: 'icons/smile.svg',
    alt: 'smiling emoji'
  }
};

const Emoji = ({status, pressed}) => {
  status = pressed ? 'pressed' : status;
  const icon = iconsToStatusMap[status];
  return <img src={icon.src} alt={icon.alt}/>;
};

Emoji.propTypes = {
  status: gameStatusPropType,
  pressed: PropTypes.bool.isRequired,
};

export default Emoji;