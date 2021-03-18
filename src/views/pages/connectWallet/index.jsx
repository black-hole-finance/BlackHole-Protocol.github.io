import React, { useContext, useEffect, useState } from 'react'
import cs from 'classnames'
import { FormattedMessage } from 'react-intl'
import './index.less'
import { injected } from '../../../connectors'
import { useWeb3React, UnsupportedChainIdError } from '@web3-react/core'
import { useActiveWeb3React } from '../../../hooks'
import ConnectWalletFailedPopup from '../../components/ConnectWalletFailedPopup'
import ConnectWalletSuccessPopup from '../../components/ConnectWalletSuccessPopup'

const ConnectWallet = () => {
  const { activate } = useWeb3React()
  const { active, chainId } = useActiveWeb3React()
  const connectWalletClick = () => {
    activate(injected, (e) => {}, true)
      .then(console.log)
      .catch((e) => {
        if (e instanceof UnsupportedChainIdError) {
          // 重新调起小狐狸
          console.log(e instanceof UnsupportedChainIdError, '----------')
        }
      })
  }
  return (
    <>
      <div className='connect_wallet_box'>
        {!active && (
          <div className='content'>
            <div className='connect_wallet_box_content'>
              <div>
                <h2 className='connect_wallet_box_title'>
                  <FormattedMessage id='connect_wallet_text_1' />
                </h2>
                <p className='connect_wallet_box_text'>
                  <FormattedMessage id='connect_wallet_text_2' />
                </p>
              </div>
              <div className='connect_wallet_box_btn'>
                <a
                  onClick={(e) => {
                    connectWalletClick(e)
                  }}
                >
                  <FormattedMessage id='connect_wallet_text_3' />
                </a>
              </div>
            </div>
          </div>
        )}
        {/* <div className='connect_wallet_popup'> */}
        {/* 登录成功后判断用户是否是白名单 */}
        {/* <ConnectWalletFailedPopup /> */}
        {/* 登录后弹框展示🐟额 */}
        {/* <ConnectWalletSuccessPopup /> */}
        {/* </div> */}
      </div>
    </>
  )
}

export default ConnectWallet
