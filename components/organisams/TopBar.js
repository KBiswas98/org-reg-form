import React from 'react';
import Step from '../molecules/Step';

export default function TopBar({ seq = '-1,0,1' }) {
  return (
    <div className="row-gap topbar">
      <Step
        status={parseInt(seq.split(',')[0])}
        name={'Personal Details'}
        stepCount={1}
      />
      <Step
        status={parseInt(seq.split(',')[1])}
        name={'Company Details'}
        stepCount={2}
      />
      <Step
        status={parseInt(seq.split(',')[2])}
        name={'Email Verification'}
        stepCount={3}
      />
    </div>
  );
}
