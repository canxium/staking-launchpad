import React from 'react';
import { FormattedMessage } from 'react-intl';
import { keysTool } from './index';
import { Paper } from '../../components/Paper';
import { Option1 } from './Option1';
import { Heading } from '../../components/Heading';

interface Props {
  validatorCount: number | string;
  withdrawalAddress: string;
  os: 'mac' | 'linux' | 'windows';
  chosenTool: keysTool;
  setChosenTool: (tool: keysTool) => void;
}

export const Instructions = () => {
  return (
    <Paper className="mt20" style={{ animation: 'fadeIn 1s' }}>
      <Heading level={2} size="small" color="blueMedium">
        <FormattedMessage defaultMessage="Generate your keys" />
      </Heading>
      <div>
        <Option1 />
      </div>
    </Paper>
  );
};
