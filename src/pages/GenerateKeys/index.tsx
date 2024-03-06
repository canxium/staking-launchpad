// Import libraries
import React, { useEffect, useState, useMemo } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import styled from 'styled-components';
import BigNumber from 'bignumber.js';
import { CheckBox } from 'grommet';
import { FormattedMessage, useIntl } from 'react-intl';
import { toChecksumAddress } from 'ethereumjs-util';
// Components
import { Instructions } from './Instructions';
import { NumberInput } from './NumberInput';
import { WorkflowPageTemplate } from '../../components/WorkflowPage/WorkflowPageTemplate';
import { Alert } from '../../components/Alert';
import { Button } from '../../components/Button';
import { Heading } from '../../components/Heading';
import { Link } from '../../components/Link';
import { Paper } from '../../components/Paper';
import { Text } from '../../components/Text';
// Store management
import {
  DispatchWorkflowUpdateType,
  updateWorkflow,
  WorkflowStep,
} from '../../store/actions/workflowActions';
import { StoreState } from '../../store/reducers';
// Utilities
import {
  IS_MAINNET,
  PRICE_PER_VALIDATOR,
  TICKER_NAME,
} from '../../utils/envVars';
import { routeToCorrectWorkflowStep } from '../../utils/RouteToCorrectWorkflowStep';
// Images
import instructions1 from '../../static/instructions_1.svg';
import instructions2 from '../../static/instructions_2.svg';
// Routes
import { routesEnum } from '../../Routes';

export enum operatingSystem {
  'MAC',
  'LINUX',
  'WINDOWS',
}

const osMapping: { [os: number]: 'mac' | 'linux' | 'windows' } = {
  [operatingSystem.MAC]: 'mac',
  [operatingSystem.LINUX]: 'linux',
  [operatingSystem.WINDOWS]: 'windows',
};

export enum keysTool {
  'CLI',
  'GUI',
  'CLISOURCE',
}

const Highlight = styled.span`
  background: ${p => p.theme.green.medium};
`;

const InstructionImgContainer = styled.div`
  height: 250px;
  margin: 64px;
  border-radius: 4px;
  display: flex;
  justify-content: center;
`;

const NumValidatorContainer = styled.div`
  display: flex;
  margin-top: 20px;
  gap: 50px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 30px;
  gap: 10px;
`;

// Prop definitions
interface OwnProps {}
interface StateProps {
  workflow: WorkflowStep;
}
interface DispatchProps {
  dispatchWorkflowUpdate: DispatchWorkflowUpdateType;
}
type Props = StateProps & DispatchProps & OwnProps;

const _GenerateKeysPage = ({
  dispatchWorkflowUpdate,
  workflow,
}: Props): JSX.Element => {
  const { formatMessage } = useIntl();
  const [validatorCount, setValidatorCount] = useState<number | string>(0);
  const [
    mnemonicAcknowledgementChecked,
    setMnemonicAcknowledgementChecked,
  ] = useState<boolean>(workflow > WorkflowStep.GENERATE_KEY_PAIRS);
  const [chosenOs] = useState<operatingSystem>(operatingSystem.LINUX);
  const [withdrawalAddress, setWithdrawalAddress] = useState<string>('');

  // Default to CLI on mainnet for now, once we have more confidence in it, switch to GUI as default.
  const defaultKeysTool = IS_MAINNET ? keysTool.CLI : keysTool.GUI;
  const [chosenTool, setChosenTool] = useState<keysTool>(defaultKeysTool);

  const onCheckboxClick = (e: any) => {
    setMnemonicAcknowledgementChecked(e.target.checked);
  };

  const isValidWithdrawalAddress = useMemo<boolean>(
    () => /^0x[0-9a-f]{40}$/i.test(withdrawalAddress),
    [withdrawalAddress]
  );

  useEffect(() => {
    if (!isValidWithdrawalAddress) return;
    setWithdrawalAddress(toChecksumAddress(withdrawalAddress));
  }, [isValidWithdrawalAddress, withdrawalAddress]);

  const handleSubmit = () => {
    if (workflow === WorkflowStep.GENERATE_KEY_PAIRS) {
      dispatchWorkflowUpdate(WorkflowStep.UPLOAD_VALIDATOR_FILE);
    }
  };

  if (workflow < WorkflowStep.GENERATE_KEY_PAIRS) {
    return routeToCorrectWorkflowStep(workflow);
  }

  return (
    <WorkflowPageTemplate
      title={formatMessage({ defaultMessage: 'Generate key pairs' })}
    >
      <Paper>
        <Heading level={2} size="small" color="blueMedium">
          <FormattedMessage defaultMessage="How many validators would you like to run?" />
        </Heading>
        <NumValidatorContainer>
          <div>
            <Text className="mb5">
              <FormattedMessage defaultMessage="Validators" />
            </Text>
            <NumberInput value={validatorCount} setValue={setValidatorCount} />
          </div>
          <div>
            <Text className="mb5">Cost</Text>
            <Text>
              {validatorCount === ''
                ? validatorCount
                : new BigNumber(validatorCount)
                    .times(new BigNumber(PRICE_PER_VALIDATOR))
                    .toFixed(1)
                    .toString()}{' '}
              {TICKER_NAME}
            </Text>
          </div>
        </NumValidatorContainer>
      </Paper>

      <Instructions
        validatorCount={validatorCount}
        withdrawalAddress={isValidWithdrawalAddress ? withdrawalAddress : ''}
        os={osMapping[chosenOs]}
        chosenTool={chosenTool}
        setChosenTool={setChosenTool}
      />

      <Paper className="mt20">
        <Heading level={2} size="small" color="blueMedium">
          <FormattedMessage defaultMessage="Save the key files and get the validator file ready" />
        </Heading>
        <Text className="mt20">
          {chosenTool === keysTool.GUI ? (
            <FormattedMessage
              defaultMessage="You should now have your mnemonic written down in a safe place and a
              keystore saved for each of your {validatorCount} validators. Please
              make sure you keep these safe, preferably offline. Your validator
              keystores should be available in the selected directory."
              values={{
                validatorCount: <span>{validatorCount}</span>,
              }}
            />
          ) : (
            <FormattedMessage
              defaultMessage="You should now have your mnemonic written down in a safe place and a
              keystore saved for each of your {validatorCount} validators. Please
              make sure you keep these safe, preferably offline. Your validator
              keystores should be available in the newly created
              {validatorKeys} directory."
              values={{
                validatorKeys: <Highlight>validator_keys</Highlight>,
                validatorCount: <span>{validatorCount}</span>,
              }}
            />
          )}
        </Text>
        <Alert variant="info" className="mt40 mb20">
          <FormattedMessage
            defaultMessage="You should see that you have one keystore per validator. This keystore
            contains your signing key, encrypted with your password."
          />
        </Alert>
        <InstructionImgContainer>
          <img src={instructions1} alt="" />
        </InstructionImgContainer>
        <Text>
          <FormattedMessage
            defaultMessage="The other file you just generated is
            {depositDataJson}. This file contains the
            public key(s) associated with your validator(s); You will need to
            upload this in the next step."
            values={{
              depositDataJson: <Highlight>deposit_data.json</Highlight>,
            }}
          />
        </Text>
        <InstructionImgContainer>
          <img src={instructions2} alt="" />
        </InstructionImgContainer>
        <Alert variant="error">
          <FormattedMessage
            defaultMessage="Warning: Do not store keys on multiple (backup) validator clients at once"
            description="Warns users to not run backup validators that have a live copy of their signing keys. Keys should only be on one validator machine at once."
          />
          <Link
            className="mt10"
            primary
            to="https://medium.com/prysmatic-labs/eth2-slashing-prevention-tips-f6faa5025f50"
          >
            <FormattedMessage defaultMessage="More on slashing prevention" />
          </Link>
        </Alert>
      </Paper>
      <Paper className="mt20">
        <CheckBox
          onChange={onCheckboxClick}
          checked={mnemonicAcknowledgementChecked}
          label={
            <Text>
              <FormattedMessage defaultMessage="I am keeping my key(s) safe and have written down my mnemonic phrase." />
            </Text>
          }
        />
      </Paper>

      <ButtonContainer>
        <Link to={routesEnum.acknowledgementPage}>
          <Button
            width={100}
            label={formatMessage({ defaultMessage: 'Back' })}
          />
        </Link>
        <Link to={routesEnum.uploadValidatorPage} onClick={handleSubmit}>
          <Button
            width={300}
            rainbow
            disabled={!mnemonicAcknowledgementChecked}
            label={formatMessage({ defaultMessage: 'Continue' })}
          />
        </Link>
      </ButtonContainer>
    </WorkflowPageTemplate>
  );
};

const mapStateToProps = ({ workflow }: StoreState): StateProps => ({
  workflow,
});
const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  dispatchWorkflowUpdate: (workflowStep: WorkflowStep) => {
    dispatch(updateWorkflow(workflowStep));
  },
});

export const GenerateKeysPage = connect<
  StateProps,
  DispatchProps,
  OwnProps,
  StoreState
>(
  mapStateToProps,
  mapDispatchToProps
)(_GenerateKeysPage);
