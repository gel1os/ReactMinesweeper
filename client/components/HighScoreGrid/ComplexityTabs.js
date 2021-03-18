import React from 'react';
import classNames from 'classnames';

import {complexities} from 'client/utils/constants';

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
  )
}

export default ComplexityTabs;