import React, { useEffect } from 'react'
import './index.less'
import { withRouter } from 'react-router'
import { useActiveWeb3React } from '../../../hooks'
import ConnectWalletFailedPopup from '../../components/ConnectWalletFailedPopup'
import ConnectWalletSuccessPopup from '../../components/ConnectWalletSuccessPopup'
import ChangeNetworkPopup from '../../components/ChangeNetworkPopup'
import Menumask from '../../components/menumask'
import LBPPopup from '../../components/LBPPopup'
import SuccessPopup from '../../components/SuccessPopup'
import WalletConnect from '../../components/account/WalletConnect'
import LoadingPopup from '../../components/LoadingPopup'
import { connect } from 'react-redux'
import WalletModalPopup from '../../components/account/WalletModalPopup'
import WalletChangePopup from '../../components/account/WalletChangePopup'
import SwitchNetWorkPopup from '../../components/SwitchNetworkPopup'
import {SWITCH_NETWORK_POPUP} from '../../../const'
import {useConnectWallet} from "../../../utils";

// if (window.ethereum) {
//   window.ethereum.on('networkChanged', () => {
//     // 链改了，刷新网页
//     window.location.reload()
//   })
// }

const InitPage = (props) => {
  const { dispatch } = props
  const { token_allocation, currency_allocation } = props.connectPools
  const { active, chainId, account } = useActiveWeb3React()
  const connectWallet = useConnectWallet()
  useEffect(() => {
    dispatch({ type: 'CHANGE_NETWORK_FLAG', payload: false })
    // 如果链接钱包成功后，不是白名单情况 && 在 connectWallet 页面时，弹框提示
    if (
      active &&
      currency_allocation - 0 == 0 &&
      currency_allocation.length > 0 &&
      props.location.pathname === '/investment'
    ) {
      dispatch({ type: 'CONNECT_WALLET_FAILED_FLAG', payload: true })
    } else {
      dispatch({ type: 'CONNECT_WALLET_FAILED_FLAG', payload: false })
    }

    // 如果链接钱包成功后，在 connectWallet 页面时，展示余额信息 弹框提示
    if (
      active &&
      currency_allocation - 0 !== 0 &&
      token_allocation == 0 &&
      props.location.pathname === '/investment'
    ) {
      dispatch({ type: 'CONNECT_WALLET_SUCCESS_FLAG', payload: true })
    } else {
      dispatch({ type: 'CONNECT_WALLET_SUCCESS_FLAG', payload: false })
    }

    if (props.location.pathname.toLowerCase().indexOf('lbp') == -1) {
      dispatch({ type: 'HANDLE_WALLET_MODAL', payload: null })
    }
  }, [
    active,
    token_allocation,
    props.popupLoadingFlag,
    currency_allocation,
    props.location,
    props.slippage,
  ])

  // useEffect(() => {
  //   props.location.pathname === '/' &&
  //     dispatch({ type: 'CHANGE_NETWORK_FLAG', payload: false })
  // }, [props.location])
  return (
    <>
      {props.showMenuMaskModal && (
        <Menumask
          onClick={() => {
            dispatch({ type: 'HANDLE_SHOW_MENUMASK_MODAL', payload: true })
          }}
        />
      )}

      {/*loading */}
      {active && props.popupLoadingFlag && props.location.pathname !== '/' && (
        <div className='init_page_box'>
          <div className='connect_wallet_popup'>
            <LoadingPopup />
          </div>
        </div>
      )}
      {/* 连接错误弹框 */}
      {props.changeNetworkFlag && (
        <div
          className='init_page_box'
          style={{ top: props.location.pathname == '/burn' && '0' }}
        >
          <div className='connect_wallet_popup'>
            <ChangeNetworkPopup
                {...props}
                onClose={() =>
                    dispatch({
                      type: 'CHANGE_NETWORK_FLAG',
                      walletModal: null,
                    })
                }
            />
          </div>
        </div>
      )}
      {/* 登录成功后判断用户是否是白名单 */}
      {props.connectWalletFailedFlag && (
        <div className='init_page_box'>
          <div className='connect_wallet_popup'>
            <ConnectWalletFailedPopup />
          </div>
        </div>
      )}
      {/* 登录后弹框展示🐟额 */}
      {props.connectWalletSuccessFlag && (
        <div className='init_page_box'>
          <div className='connect_wallet_popup'>
            <ConnectWalletSuccessPopup />
          </div>
        </div>
      )}

      {props.walletModal === 'slippage' && (
        <div className='init_page_box'>
          <div className='connect_wallet_popup'>
            <LBPPopup />
          </div>
        </div>
      )}
      {props.walletModal === 'slippageSuccess' && (
        <div className='init_page_box'>
          <div className='connect_wallet_popup'>
            <SuccessPopup />
          </div>
        </div>
      )}
      {/* 链接钱包 || 切换钱包*/}
      {(props.walletModal === 'walletConnect' || props.walletModal === 'changeWalletConnect') && (
        <div className='init_page_box'>
          <WalletConnect
              onClose={() =>
                  dispatch({
                    type: 'HANDLE_WALLET_MODAL',
                    walletModal: null,
                  })
              }
          />
        </div>
      )}
      {/* 退出钱包 */}
      {props.walletModal === 'smallWalletConnect' && (
        <div className='init_page_box'>
          <WalletModalPopup />
        </div>
      )}

      {props.switchNetworkPopup && (
          <div className='init_page_box'>
            <SwitchNetWorkPopup
                onClose={() =>
                    dispatch({
                      type: SWITCH_NETWORK_POPUP,
                      payload: false,
                    })
                }
            />
          </div>
      )}

      {/* 切换钱包 */}
      {/*{props.walletModal === 'changeWalletConnect' && (*/}
      {/*  <div className='init_page_box'>*/}
      {/*    <WalletChangePopup />*/}
      {/*  </div>*/}
      {/*)}*/}
    </>
  )
}

export default connect((store) => ({
  connectPools: store.pools.connectPools,
  changeNetworkFlag: store.popup.changeNetworkFlag,
  connectWalletFailedFlag: store.popup.connectWalletFailedFlag,
  connectWalletSuccessFlag: store.popup.connectWalletSuccessFlag,
  popupLoadingFlag: store.popup.popupLoadingFlag,
  showMenuMaskModal: store.menu.showMenuMaskModal,
  walletModal: store.popup.walletModal,
  switchNetworkPopup: store.popup.switchNetworkPopup
}))(withRouter(InitPage))
