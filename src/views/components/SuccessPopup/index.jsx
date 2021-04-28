import React, { useContext, useEffect, useState } from 'react'
import { FormattedMessage, injectIntl } from 'react-intl'
import RIGHT from '../../../assets/image/popup/right.png'
import './index.less'

const PoolsSuccess = (props) => {
  const { intl, pool, dispatch } = props

  const onClose = () => {
    dispatch({
      type: 'HANDLE_WALLET_MODAL',
      payload: null,
    })
  }

  return (
    <>
      <div className='pools_slippage modal'>
        <div className='modal__box'>
          <form className='form-app' action='/'>
            <div className='form-app__inner deposit'>
              <img src={RIGHT} className='pools_slippage_success_img' />
              <h1 className='form-app__title h3 pools_slippage_success_title'>
                <FormattedMessage id='warLBP6' />
              </h1>
              <a
                className='pools_slippage_success_text'
                href="https://app.uniswap.org/#/swap?outputCurrency=0xd714d91A169127e11D8FAb3665d72E8b7ef9Dbe2"
                target="_blank"
                style={{
                  opacity: 1,
                }}
              >
                <FormattedMessage id='warLBP7' />
              </a>
              <div className='form-app__submit form-app__submit--row'>
                <button
                  className='btn btn--outline btn--medium'
                  type='button'
                  onClick={onClose}
                >
                  <FormattedMessage id='poolText22' />
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default injectIntl(PoolsSuccess)
