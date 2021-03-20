import {listScores, addScore, listProductivity, getHtml} from '../use-cases';
import makeGetScores from './get-score';
import makePostScore from './post-score';
import makeGetProductivity from './get-productivity';
import makeRenderer from './renderer';

const getScores = makeGetScores({listScores});
const postScore = makePostScore({addScore});
const getProductivity = makeGetProductivity({listProductivity});
const renderer = makeRenderer({getHtml});

export {getScores, postScore, getProductivity, renderer};