import { useState, useMemo, useCallback, memo } from 'react';
import Timer from '../home/Timer';
import TokenTabs from '../home/TokenTabs';
import SwapInput from '../home/SwapInput';
import StakingReward from '../home/StakingReward';
import PresaleInfo from '../home/PresaleInfo';
import ConnectWalletModal from '../Modal/ConnectWalletModal';
import BuyBNBModal from '../Modal/BuyBNBModal';
import NeedWalletModal from '../Modal/NeedWalletModal';
import { useCountdown } from '../../hooks/useCountdown';
import { TOKENS } from '../../constants/tokens';
import type { SwapState } from '../../types';
import { translations } from '../../translations';
import type { Language } from '../../translations';
import { useLanguage } from '../../context/LanguageContext';

const HomeBanner = memo(() => {
  const [swapState, setSwapState] = useState<SwapState>({
    payAmount: '',
    receiveAmount: '',
    selectedToken: 'ETH'
  });

  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const [isBuyBNBModalOpen, setIsBuyBNBModalOpen] = useState(false);
  const [isNeedWalletModalOpen, setIsNeedWalletModalOpen] = useState(false);
  const [isBNBMode, setIsBNBMode] = useState(false);

  const countdown = useCountdown();
  const { selectedLanguageCode } = useLanguage();
  const t = translations[selectedLanguageCode as Language] || translations.en;

  const presaleInfo = useMemo(() => ({
    raised: '546,308.97',
    total: '851,721',
    progress: 62.8143,
    price: '0.000377'
  }), []);

  const handleTokenSelect = useCallback((token: string) => {
    setSwapState(prev => ({ ...prev, selectedToken: token }));
  }, []);

  const handlePayAmountChange = useCallback((value: string) => {
    setSwapState(prev => ({ ...prev, payAmount: value }));
  }, []);

  const handleReceiveAmountChange = useCallback((value: string) => {
    setSwapState(prev => ({ ...prev, receiveAmount: value }));
  }, []);

  const handleTokenSwitch = useCallback(() => {
    if (isBNBMode) {
      // Switch back to ETH
      setSwapState(prev => ({ ...prev, selectedToken: 'ETH' }));
      setIsBNBMode(false);
    } else {
      // Switch to BNB
      setSwapState(prev => ({ ...prev, selectedToken: 'BNB' }));
      setIsBNBMode(true);
    }
  }, [isBNBMode]);

  const handleBuyButtonClick = useCallback(() => {
    if (isBNBMode) {
      // If in BNB mode, switch back to ETH directly
      handleTokenSwitch();
    } else {
      // If in ETH mode, show the modal
      setIsBuyBNBModalOpen(true);
    }
  }, [isBNBMode, handleTokenSwitch]);

  return (
    <>
      <section id="home" className='relative overflow-y-hidden'>
        <div
          id="home"
          className="relative flex flex-col justify-between items-center bg-banner-mob bg-no-repeat bg-contain pt-[93px] pb-[60px] md:pt-[170px] 1520:pt-[90px] 1520:pb-[4px] md:bg-cover md:bg-center md:bg-[#76cdfc] md:bg-banner md:bg-no-repeat"
        >
          <div className="container relative flex flex-grow-[1] justify-around self-stretch">
            <div className="flex flex-col md:flex-row items-stretch gap-0 1600:gap-[100px] w-full">
              {/* Left Section */}
              <div className="w-full md:w-7/12 self-stretch">
                <div className="h-full relative flex flex-col justify-between items-center">
                  <img
                    src="/assets/images/webp/banner-logo.webp"
                    alt="logo"
                    className="w-full h-auto object-contain max-w-[603px] 1520:max-w-[720px]"
                  />
                  <div className="hidden lg:block relative mx-auto mb-[150px] after:absolute after:content-[''] after:rounded-[100%] after:bg-black after:left-0 after:right-0 after:bottom-[-5%] after:z-0 after:w-[280.335px] after:h-[81.205px] after:m-auto">
                    <img
                      src="/assets/images/gif/player.gif"
                      alt="player"
                      className="w-full h-full object-contain relative z-[1] hidden lg:block"
                    />
                  </div>
                </div>
              </div>

              {/* Right Section */}
              <div className="w-full md:w-5/12 self-stretch">
                {/* Mobile Player */}
                <div className="block lg:hidden max-[495px] h-auto mb-[150px] mx-auto relative after:absolute after:contet-[''] after:w-[280.335px] after:h-[81.205px] after:bg-black after:rounded-[100%] after:block after:left-0 after:right-0 after:bottom-[-5%] after:m-auto after:z-0">
                  <img src="/assets/images/gif/player.gif" alt="player" className="w-full relative z-[1]" />
                </div>

                <div className='relative'>
                  {/* Main Card */}
                  <div className="w-full self-center md:translate-x-[-70px] 1520:translate-x-0 px-[10px] sm: px-0">
                    <div className="w-full max-w-[450px] z-[1] mt-[170px] md:mt-0 mx-auto md:mx-0 md:ml-auto relative rounded-[32px] border-[3px] border-black bg-[#fff3] backdrop-blur-[200px]  md:bg-[#a9ffff] md:backdrop-blur-[100px] p-[18px_25px]">
                      {/* Header */}
                      <div className="w-full flex flex-col items-center justify-start text-center">
                        <h1
                          className="text-[19px] font-semibold mb-3 text-white bg-clip-text tracking-[3.5px] paint-order-stroke text-stroke-black text-stroke-2"
                          style={{
                            filter: 'drop-shadow(0px 0px 0px #000000) drop-shadow(0px 0px 0 #000000) drop-shadow(0px 0px 0 #000000) drop-shadow(0px 0px 0 #000000) drop-shadow(0px 0px 0 #000000) drop-shadow(0px 0px 0 #000000) drop-shadow(0px 3px 0 #000000)'
                          }}
                        >
                          {t.fantasyPepePresale}
                        </h1>

                        {/* Timer */}
                        <Timer {...countdown} />

                        {/* Presale Info */}
                        <PresaleInfo info={presaleInfo} />
                      </div>

                      {/* Token Price and Swap Section */}
                      <div className="mt-6">
                        {/* Token Tabs */}
                        <TokenTabs
                          selectedToken={swapState.selectedToken}
                          onTokenSelect={handleTokenSelect}
                        />

                        {/* Swap Section */}
                        <div className="mt-4 mb-2">
                          <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4 text-black">
                            <SwapInput
                              label={t.payWithETH}
                              value={swapState.payAmount}
                              onChange={handlePayAmountChange}
                              icon="/assets/images/svg-icons/ETH.svg"
                              showMax
                              selectedToken={swapState.selectedToken}
                            />
                            <SwapInput
                              label={t.receiveFEPE}
                              value={swapState.receiveAmount}
                              onChange={handleReceiveAmountChange}
                              icon="/assets/images/gif/footer-ball.gif"
                            />
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-stretch justify-center gap-2 mt-4">
                          <button
                            onClick={() => setIsWalletModalOpen(true)}
                            className="w-full min-h-[50px] text-[15px] font-normal rounded-[16px] flex justify-center items-center border-[3px] border-black min-w-[120px] bg-white text-black hover:bg-black hover:text-white transition-colors"
                          >
                            {t.connectWallet}
                          </button>
                          <button
                            onClick={handleBuyButtonClick}
                            className="w-full min-h-[50px] text-[15px] font-normal rounded-[16px] flex justify-center items-center border-[3px] border-black min-w-[120px] bg-white text-black hover:bg-black hover:text-white transition-colors"
                          >
                            <img
                              src={isBNBMode ? "/assets/images/svg-icons/ETH.svg" : "/assets/images/svg-icons/BNB.svg"}
                              alt={isBNBMode ? "eth" : "bnb"}
                              className="mr-2 w-8 h-8"
                            />
                            {isBNBMode ? t.buyWithETH : t.buyWithBNB}
                          </button>
                        </div>

                        {/* Wallet Link */}
                        <div className="m-2 pt-2 hidden w-full md:flex justify-center items-center aniBtn cursor-pointer">
                          <span
                            onClick={() => setIsNeedWalletModalOpen(true)}
                            className="inline-block text-black font-semibold flex justify-center text-sm underline"
                          >
                            {t.dontHaveWallet}
                          </span>
                        </div>

                        {/* Footer */}
                        <div className="mt-3 text-center">
                          <p className="text-sm text-center font-normal mb-0 text-black">
                            {t.poweredBy}{' '}
                            <a
                              href="https://web3paymentsolutions.io"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="hover:opacity-80 transition-opacity"
                            >
                              <img
                                src="/assets/images/svg-icons/W3P_Black.svg"
                                alt="powered-by"
                                className="inline-block h-[16px]"
                              />
                            </a>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Staking Reward */}
                  <StakingReward />
                </div>
              </div>
              {/* Referee Image */}
            </div>
            <img
              src="/assets/images/gif/refree-banner.gif"
              alt="refree"
              className="block 580:hidden lg:block absolute w-[282px] right-[-80px] bottom-[60vh] 2xl:w-[239px] 2xl:h-[239px] 2xl:right-[30px] 580:bottom-[-50px] z-[0]"
            />
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-3 mt-[40px] relative z-[2]">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="/assets/documents/whitepaper.pdf"
              className="text-[17px] md:text-[20px] uppercase rounded-[30px] border-[3px] border-black min-w-[170px]  md:min-w-[120px] flex justify-center item-center bg-custom-red pt-[14px] pb-[12px] px-[24px] hover:bg-custom-green hover:text-white transition-colors"
            >
              {t.whitepaper}
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://app.solidproof.io/projects/fantasy-pepe"
              className="text-[17px] md:text-[20px] uppercase rounded-[30px] border-[3px] border-black min-w-[170px] md:min-w-[120px] flex justify-center item-center bg-custom-red pt-[14px] pb-[12px] px-[24px] hover:bg-custom-green hover:text-white transition-colors"
            >
              {t.audit}
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://coinsult.net/projects/fepe/"
              className="text-[17px] md:text-[20px] uppercase rounded-[30px] border-[3px] border-black min-w-[170px]  md:min-w-[120px] flex justify-center item-center bg-custom-red pt-[14px] pb-[12px] px-[24px] hover:bg-custom-green hover:text-white transition-colors"
            >
              {t.audit2}
            </a>
          </div>
        </div>
        <img src="/assets/images/badge.png" alt="badge-img" className="block lg:hidden absolute bottom-0 left-[-5%] w-full max-w-[130px] rotate-[25deg]" />
        <img src="/assets/images/gif/how-to-buy-goal.gif" alt="goal-img" className="block 580:hidden absolute bottom-[4%] right-[-9%] w-full max-w-[295px]" />
      </section>


      {/* Connect Wallet Modal */}
      <ConnectWalletModal
        isOpen={isWalletModalOpen}
        onClose={() => setIsWalletModalOpen(false)}
      />

      {/* Buy BNB Modal */}
      <BuyBNBModal
        isOpen={isBuyBNBModalOpen}
        onClose={() => setIsBuyBNBModalOpen(false)}
        onTokenSwitch={handleTokenSwitch}
      />

      {/* Need Wallet Modal */}
      <NeedWalletModal
        isOpen={isNeedWalletModalOpen}
        onClose={() => setIsNeedWalletModalOpen(false)}
      />
    </>
  );
});

HomeBanner.displayName = 'HomeBanner';

export default HomeBanner;
