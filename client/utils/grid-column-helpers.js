import {complexities} from './constants';

export const formatDate = (dateStr) => Intl.DateTimeFormat('en-GB', {
  day: 'numeric',
  month: 'short',
  year: 'numeric'
}).format(new Date(dateStr));

export const formatTime = (seconds) => {
  if (seconds < 60) {
    return seconds + ' s';
  }

  const minutes = Math.floor(seconds / 60);
  const modulo = seconds % 60;

  return `${minutes} min${modulo ? ` ${modulo} s` : ''}`
};