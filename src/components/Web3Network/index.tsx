import React from 'react'
import styled from 'styled-components'

import { useActiveWeb3React } from 'hooks'
import { useNetworkModalToggle } from '../../state/application/hooks'
import { NETWORK_ICON, NETWORK_LABEL } from '../../constants/networks'
import NetworkModal from '../NetworkModal'
import Card from 'components/Card'
import DropdownSVG from 'assets/svg/dropdown.svg'
import Row from 'components/Row'

const NetworkSwitchContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`

const NetworkCard = styled(Card)`
  position: relative;
  background-color: ${({ theme }) => theme.bg12};
  color: ${({ theme }) => theme.primary1};
  border-radius: 8px;
  padding: 10px 12px;
  border: 1px solid transparent;
  min-width: 272px;

  &:hover {
    text-decoration: none;
    border: 1px solid ${({ theme }) => theme.primary1};
    border-radius: 8px;
    cursor: pointer;
  }

  ${({ theme }) => theme.mediaWidth.upToSmall`
    margin: 0;
    margin-right: 0.5rem;
    width: initial;
    overflow: hidden;
    text-overflow: ellipsis;
    flex-shrink: 1;
  `};
`

const NetworkLabel = styled.div`
  white-space: nowrap;
  margin-right: 60px;
`

function Web3Network(): JSX.Element | null {
  const { chainId, library } = useActiveWeb3React()

  const toggleNetworkModal = useNetworkModalToggle()

  if (!chainId) return null

  return (
    <NetworkCard onClick={() => toggleNetworkModal()}>
      <NetworkSwitchContainer>
        <Row>
          <img
            src={NETWORK_ICON[chainId]}
            alt="Switch Network"
            style={{ width: 23, height: 23, marginRight: '12px' }}
          />
          <NetworkLabel>{NETWORK_LABEL[chainId]}</NetworkLabel>
        </Row>
        <img src={DropdownSVG} />
      </NetworkSwitchContainer>
      <NetworkModal isNotConnected={!(library && library.provider && library.provider.isMetaMask)} />
    </NetworkCard>
  )
}

export default Web3Network
