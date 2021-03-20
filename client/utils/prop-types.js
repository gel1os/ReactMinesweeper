import PropTypes from 'prop-types';
import { BEGINNER, NORMAL, EXPERT, gameStatuses } from 'client/utils/constants';

export const complexityPropType = PropTypes.oneOf([BEGINNER, NORMAL, EXPERT]).isRequired;

export const gameStatusPropType = PropTypes.oneOf(Object.values(gameStatuses)).isRequired;