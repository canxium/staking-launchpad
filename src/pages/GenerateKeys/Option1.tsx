import React from 'react';
import styled from 'styled-components';
import { FormattedMessage, useIntl } from 'react-intl';
import { Heading } from '../../components/Heading';
import { Text } from '../../components/Text';
import { Link } from '../../components/Link';
import { Alert } from '../../components/Alert';
import { Button } from '../../components/Button';
import githubScreenshot from '../../static/docker.png';
import dockerImage from '../../static/docker-image.png';
import runImage from '../../static/staking-run.png';
import keyImage from '../../static/validator_keys.png';
import keystoreImage from '../../static/keystore-files.png';

const GithubScreenshot = styled.img.attrs({ src: githubScreenshot })`
  max-width: 925px;
  width: 100%;
`;

const DockerImage = styled.img.attrs({ src: dockerImage })`
  max-width: 925px;
  width: 100%;
`;

const RunImage = styled.img.attrs({ src: runImage })`
  max-width: 925px;
  width: 100%;
`;

const KeysImage = styled.img.attrs({ src: keyImage })`
  max-width: 925px;
  width: 100%;
`;

const KeysStoreImage = styled.img.attrs({ src: keystoreImage })`
  max-width: 925px;
  width: 100%;
`;

export const Option1 = () => {
  const { formatMessage } = useIntl();
  return (
    <div className="mt30">
      <Heading level={2} size="small" color="blueMedium" className="mb20">
        <FormattedMessage defaultMessage="Download Docker app" />
      </Heading>
      <Text weight={500}>
        <FormattedMessage defaultMessage="Step 1: Download and install the docker app for your operating system" />
      </Text>
      <Link
        isTextLink={false}
        to="https://www.docker.com/products/docker-desktop/"
        className="my40"
      >
        <Button
          className="flex"
          rainbow
          label={formatMessage({ defaultMessage: 'Download from Docker.com' })}
        />
      </Link>

      <GithubScreenshot />

      <Text weight={500} className="mt20">
        <FormattedMessage defaultMessage="Step 2: Pull docker image: canxium/staking-deposit-cli" />
      </Text>

      <DockerImage />

      <Text weight={500} className="mt20">
        <FormattedMessage defaultMessage="Step 3: Start the docker cli" />
      </Text>
      <Alert className="my20" variant="info">
        <FormattedMessage defaultMessage="For security, we recommend you disconnect from the internet to complete this step." />
      </Alert>
      <ul>
        <li>
          <FormattedMessage defaultMessage="Fill in all information as below" />
          <RunImage />
        </li>
        <li>
          <FormattedMessage
            defaultMessage="Write down the mnemonic in a safe place, Write it down on paper and keep it carefully."
            values={{
              deposit: (
                <code>
                  <FormattedMessage defaultMessage="deposit" />
                </code>
              ),
            }}
            description="{deposit} = 'deposit' styled as code"
          />
          <KeysImage />
        </li>
        <li>
          <FormattedMessage defaultMessage="Your deposit-data*.json and keystore-*.json can be found at the host path" />
          <KeysStoreImage />
        </li>
      </ul>
    </div>
  );
};
