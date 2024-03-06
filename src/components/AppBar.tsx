import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { FormattedMessage, useIntl } from 'react-intl';
import styled from 'styled-components';
import { Box, DropButton } from 'grommet';
import { Menu, FormDown } from 'grommet-icons';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import EthDiamond from '../static/icon.png';
import { web3ReactInterface } from '../pages/ConnectWallet';
import {
  AllowedELNetworks,
  NetworkChainId,
} from '../pages/ConnectWallet/web3Utils';
import { Dot } from './Dot';
import { Link } from './Link';
import { Text } from './Text';
import { routesEnum } from '../Routes';
import { Heading } from './Heading';
import { IS_MAINNET, NETWORK_NAME } from '../utils/envVars';
import { trimString } from '../utils/trimString';
import useIntlNetworkName from '../hooks/useIntlNetworkName';
import useMobileCheck from '../hooks/useMobileCheck';

const HomeLink = styled(Link)`
  margin-inline-end: 30px;
  display: flex;
  gap: 5px;
`;

const RainbowBackground = styled(Box)`
  background-image: ${p => `linear-gradient(to right, ${p.theme.rainbow})`};
`;

const EthLogo = styled.img`
  height: 40px;
  width: 40px;
`;

const NetworkText = styled.div`
  padding: 5px 8px;
  border: 1px solid;
  font-weight: 400;
  font-size: 16px;
  text-align: center;
  display: flex;
  justify-content: center;
  width: 100%;
  border-radius: 4px;
  &:hover {
    border-radius: 4px;
    box-shadow: 0px 8px 17px rgba(0, 0, 0, 0.15);
    background-image: ${p => `linear-gradient(to right, ${p.theme.rainbow})`};
    transition: transform 0.1s;
    transform: scale(1.02);
  }
`;

const NavBarLinks = styled.div`
  display: flex;
  gap: 20px;
  @media only screen and (max-width: 1080px) {
    .secondary-link {
      display: none;
    }
  }
`;

const ValidatorDropdown = styled(DropButton)`
  padding: 12px 8px;
  font-weight: 300;
  display: flex;
  align-items: center;
  border: none;
  :hover {
    border: none;
    box-shadow: none;
  }
`;

const DotBox = styled(Box)`
  display: flex;
  margin-bottom: 20px;
  gap: 10px;
`;

const DotDropdownBox = styled(Box)`
  display: flex;
  margin-inline-end: 20px;
  gap: 10px;
`;

const DotDropdown = styled(DropButton)`
  display: flex;
  align-items: center;
  border: none;
  padding: 0;
  margin: 0;
  :hover {
    transition: transform 0.2s;
    transform: scale(1.1);
  }
`;

const DropdownLink = styled(Link)`
  :hover {
    text-decoration: underline;
  }
`;

const Card = styled.div``;

const NetworkInfo = styled.div`
  background: ${p => p.theme.gray.light};
  padding: 32px;
`;

const NavLinksRight = styled.div`
  display: flex;
  align-items: center;
`;

const BarLinkText = styled(Heading)`
  :not(.no-padding) {
    padding: 0 12px;
    white-space: nowrap;
  }
  display: flex;
  justify-content: center;
  flex-direction: column;
  font-weight: ${(p: { active?: boolean }) => (p.active ? 'bold' : 300)};
`;

const _AppBar = ({ location }: RouteComponentProps) => {
  const {
    active: walletConnected,
    account,
    chainId,
  }: web3ReactInterface = useWeb3React<Web3Provider>();
  const { locale } = useIntl();
  const { executionLayerName, consensusLayerName } = useIntlNetworkName();
  let network;
  let networkAllowed = false;

  if (chainId) {
    network = NetworkChainId[chainId];
    networkAllowed = AllowedELNetworks.includes(network);
  }

  const pathname: string = React.useMemo(() => location.pathname, [
    location.pathname,
  ]);

  const mobile = useMobileCheck('1080px');
  const dropAlignInline = React.useMemo(
    () => (locale === 'ar' ? 'left' : 'right'),
    [locale]
  );
  return (
    <RainbowBackground
      tag="header"
      direction="row"
      align="center"
      justify="between"
      pad={{ start: 'medium', end: 'small', vertical: 'small' }}
      elevation="medium"
      style={{ zIndex: 1 }}
    >
      <NavBarLinks>
        <HomeLink to={routesEnum.landingPage}>
          <EthLogo src={EthDiamond} alt="eth-diamond" />
          {!mobile && (
            <div className="flex flex-column center">
              <BarLinkText
                active={pathname === routesEnum.landingPage}
                level={4}
                margin="none"
                className="bar-link-text no-padding"
              >
                <Text>
                  <FormattedMessage
                    defaultMessage="Staking Launchpad {network}"
                    values={{
                      network: IS_MAINNET ? '' : `(${NETWORK_NAME})`,
                    }}
                    description="{network} inserts the testnet name, only if on the testnet"
                  />
                </Text>
              </BarLinkText>
            </div>
          )}
        </HomeLink>

        <Link
          to={routesEnum.acknowledgementPage}
          className="secondary-link" // RTL
        >
          <BarLinkText
            level={4}
            margin="none"
            className="bar-link-text"
            active={pathname === routesEnum.acknowledgementPage}
          >
            <FormattedMessage defaultMessage="Deposit" />
          </BarLinkText>
        </Link>
        <Link to={routesEnum.checklistPage} className="secondary-link">
          <BarLinkText
            level={4}
            margin="none"
            className="bar-link-text"
            active={pathname === routesEnum.checklistPage}
          >
            <FormattedMessage defaultMessage="Checklist" />
          </BarLinkText>
        </Link>
        <Link to={routesEnum.FaqPage} className="secondary-link">
          <BarLinkText
            level={4}
            margin="none"
            className="bar-link-text"
            active={pathname === routesEnum.FaqPage}
          >
            <FormattedMessage defaultMessage="FAQ" />
          </BarLinkText>
        </Link>
        <Link to={routesEnum.topUpPage} className="secondary-link">
          <BarLinkText
            level={4}
            margin="none"
            className="bar-link-text"
            active={pathname === routesEnum.topUpPage}
          >
            <FormattedMessage defaultMessage="Top Up" />
          </BarLinkText>
        </Link>
        <Link to={routesEnum.withdrawals} className="mx10 secondary-link">
          <BarLinkText
            level={4}
            margin="none"
            className="bar-link-text"
            active={pathname === routesEnum.withdrawals}
          >
            <FormattedMessage defaultMessage="Withdrawals" />
          </BarLinkText>
        </Link>
      </NavBarLinks>
      <NavLinksRight>
        {mobile && (
          <ValidatorDropdown
            className="secondary-link"
            label={<Menu color="black" />}
            dropAlign={{ top: 'bottom', right: dropAlignInline }}
            dropContent={
              <Card>
                <NetworkInfo>
                  {walletConnected && (
                    <DotBox>
                      <Dot success={networkAllowed} error={!networkAllowed} />
                      <Text size="small" color="blueDark">
                        {trimString(account as string, 10)}
                      </Text>
                    </DotBox>
                  )}
                  <span>
                    <FormattedMessage defaultMessage="Launchpad network:" />{' '}
                    <b>{consensusLayerName}</b>
                  </span>
                  <Text className="mt20">
                    <em>
                      <FormattedMessage defaultMessage="Visit this site on desktop to become a validator." />
                    </em>
                  </Text>
                </NetworkInfo>
                <Box pad="large" className="mt0">
                  <DropdownLink to={routesEnum.FaqPage}>
                    <FormattedMessage defaultMessage="FAQ" />
                  </DropdownLink>
                  <DropdownLink to={routesEnum.checklistPage}>
                    <FormattedMessage defaultMessage="Staker checklist" />
                  </DropdownLink>
                  <DropdownLink to={routesEnum.withdrawals}>
                    <FormattedMessage defaultMessage="Withdrawals" />
                  </DropdownLink>
                  <DropdownLink to={routesEnum.languagesPage}>
                    <FormattedMessage defaultMessage="Languages" />
                  </DropdownLink>
                  <Text className="my20">
                    <b>
                      <FormattedMessage defaultMessage="Execution clients" />
                    </b>
                  </Text>
                  <DropdownLink to={routesEnum.besu}>Besu</DropdownLink>
                  <DropdownLink to={routesEnum.erigon}>Erigon</DropdownLink>
                  <DropdownLink to={routesEnum.geth}>Geth</DropdownLink>
                  <DropdownLink to={routesEnum.nethermind}>
                    Nethermind
                  </DropdownLink>
                  <Text className="my20">
                    <b>
                      <FormattedMessage defaultMessage="Consensus clients" />
                    </b>
                  </Text>
                  <DropdownLink to={routesEnum.lighthouse}>
                    Lighthouse
                  </DropdownLink>
                  <DropdownLink to={routesEnum.lodestar}>Lodestar</DropdownLink>
                  <DropdownLink to={routesEnum.nimbus}>Nimbus</DropdownLink>
                  <DropdownLink to={routesEnum.prysm}>Prysm</DropdownLink>
                  <DropdownLink to={routesEnum.teku}>Teku</DropdownLink>
                </Box>
              </Card>
            }
          />
        )}
        {!mobile && (
          <ValidatorDropdown
            className="secondary-link"
            label={
              <NetworkText>
                {NETWORK_NAME}
                <FormDown />
              </NetworkText>
            }
            dropAlign={{ top: 'bottom', right: dropAlignInline }}
            dropContent={
              <Card>
                <Box pad="small" className="mt0">
                  {!IS_MAINNET && (
                    <Text className="mb10">
                      <FormattedMessage defaultMessage="This is a test network ⚠️" />
                    </Text>
                  )}
                </Box>
              </Card>
            }
          />
        )}
        {!mobile && walletConnected && (
          <DotDropdownBox>
            {networkAllowed ? (
              <DotDropdown
                className="secondary-link"
                label={<Dot success={networkAllowed} error={!networkAllowed} />}
                dropAlign={{ top: 'bottom', right: dropAlignInline }}
                dropContent={
                  <Box pad="small">
                    <Text>
                      <FormattedMessage defaultMessage="Your wallet is connected to the right network!" />
                    </Text>
                  </Box>
                }
              />
            ) : (
              <DotDropdown
                className="secondary-link"
                label={<Dot error={!networkAllowed} />}
                dropAlign={{ top: 'bottom', right: dropAlignInline }}
                dropContent={
                  <Box pad="small">
                    <Text>
                      <FormattedMessage
                        defaultMessage="Your wallet should be set to {executionLayerName} to use this launchpad."
                        values={{ executionLayerName }}
                      />
                    </Text>
                  </Box>
                }
              />
            )}
            <Text size="small" color="blueDark">
              {trimString(account as string, 10)}
            </Text>
          </DotDropdownBox>
        )}
      </NavLinksRight>
    </RainbowBackground>
  );
};

export const AppBar = withRouter(_AppBar);
