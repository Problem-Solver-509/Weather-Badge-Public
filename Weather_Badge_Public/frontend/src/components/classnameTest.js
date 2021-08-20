import React from 'react';
import Classnames from 'classnames'
import '../Rose.css';



const Banner = ({ active, children, disabled }) => (
  <div
    className={classNames({
      banner: true,
      large: true,
      active: active,
      disabled: disabled
    })}
  >
    {children}
  </div>
);