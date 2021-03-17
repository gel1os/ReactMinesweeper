import React from 'react';

const getIcon = ({win, finished, paused}, pressed) => {
  if (pressed) {
    return {
      src: 'icons/surprised.svg',
      alt: 'surprised emoji',
    }
  }

  if (paused) {
    return {
      src: 'icons/sleeping.svg',
      alt: 'sleeping emoji',
    }
  }

  if (win) {
    return {
      src: 'icons/cool.svg',
      alt: 'cool emoji in sunglasses',
    }
  }

  if (finished && !win) {
    return {
      src: 'icons/frown.svg',
      alt: 'frown',
    }
  }

  return {
    src: 'icons/smile.svg',
    alt: 'smiling emoji'
  }
};

const Emoji = ({gameState, pressed}) => {
  const icon = getIcon(gameState, pressed);
  return <img src={icon.src} alt={icon.alt}/>
}

export default Emoji;