import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import {complexities} from 'client/utils/constants';
import {complexityPropType} from 'client/utils/prop-types';

const ComplexityTabs = ({changeComplexity, complexity}) => {
  return (
    <div className="complexity">
      {complexities.map(compl =>
        <div
          key={compl.label}
          className={classNames('complexity__item', {selected: complexity === compl.value})}
          onClick={() => changeComplexity(compl.value)}
        >
          {compl.label}
        </div>
      )}
    </div>
  );
};

ComplexityTabs.propTypes = {
  complexity: complexityPropType,
  changeComplexity: PropTypes.func.isRequired,
};

export default ComplexityTabs;