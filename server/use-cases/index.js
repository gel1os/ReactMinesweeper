import minesweeperDb from '../data-access';
import makeListScore from './list-score';
import makeAddScore from './add-score';
import makeListProductivity from './list-productivity';
import {getHtml} from './get-html';

const listScores = makeListScore({minesweeperDb});
const addScore = makeAddScore({minesweeperDb});
const listProductivity = makeListProductivity({minesweeperDb});

export {
  listScores,
  addScore,
  listProductivity,
  getHtml
}