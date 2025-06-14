import type { FC } from 'react';
import MenuButton from './home/MenuButton';
import { useState } from 'react';
import LanguageDropdown from './home/LanguageDropdown';
import { useWalletModal } from '../context/WalletModalContext';
import { translations } from '../translations/languages';
import { useLanguage } from '../context/LanguageContext';
import { Link } from 'react-router-dom';

interface HeaderProps {
  onMenuToggle: (isOpen: boolean) => void;
}

const Header: FC<HeaderProps> = ({ onMenuToggle }) => {
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const { selectedLanguageCode, setSelectedLanguageCode } = useLanguage();
  const { openWalletModal } = useWalletModal();

  const t = translations[selectedLanguageCode] || translations.en;

  return (
    <div
      className="fixed top:0 lg:top-[41px] left-0 right-0 transform-none overflow-y-visible w-full lg:h-auto rounded-none border:none border-t-[3px] lg:border-t-none lg:border-b-[3px] border-black bg-[#c2ffff] lg:bg-white/30 backdrop-blur-[100px] text-center z-[5] block py-[4px] px-[16px] lg:p-0
      2xl:top-[52%] 2xl:left-[7%] 2xl:right-auto 2xl:-translate-x-1/2 2xl:-translate-y-1/2 2xl:w-[167px] 2xl:h-[90vh] 2xl:py-[20px] 2xl:px-[6px] 2xl:overflow-y-auto 2xl:rounded-[32px] 2xl:border-[3px]"
    >
      <div className="mx-auto 2xl:container">
        <div className="flex flex-wrap justify-between lg:justify-around 2xl:justify-center items-center gap-[1vw] lg:pt-[5px]">
          <div>
            <Link to="/" title="home" className="cursor-pointer">
              <img src="/assets/images/svg-icons/footer-logo.svg" alt="Logo" className="w-[105px] h-[50px] lg:h-[64px]" />
            </Link>
          </div>

          <div className="hidden lg:flex flex-row items-center gap-4 2xl:gap-2 text-[18px] text-black 2xl:flex-col">
            <Link to="/en#about" title="about" className="py-[8px]">{t.about}</Link>
            <Link to="/en#media" title="media" className="py-[8px]">{t.media}</Link>
            <Link to="/en#tokenomics" title="tokenomics" className="py-[8px]">{t.tokenomics}</Link>
            <Link to="/en#roadmap" title="roadmap" className="py-[8px]">{t.roadmap}</Link>
            <Link to="/en#how-to-buy" title="how-to-buy" className="py-[8px] w-[7vw]">{t.howToBuy}</Link>
            <Link to="/en#faq" title="faq" className="py-[8px]">{t.faqs}</Link>
            <Link to="/en/staking" title="staking" className="py-[8px]">{t.staking}</Link>
          </div>

          <div className="flex flex-row justify-center items-center gap-[1vw] 2xl:flex-col">
            <Link
              onClick={openWalletModal}
              className="bg-custom-red text-[15px] text-white p-[5px_8px] min-w-[120px] border-[3px] border-black rounded-[16px] cursor-pointer hover:bg-custom-green hover:text-black transition-colors duration-500"
            >
              {t.buyFEPE}
            </Link>
            <div className="bg-transparent 2xl:p-[10px] rounded-[12px] transition-colors duration-300 ease-in-out relative">
              <div
                className="flex justify-center items-center cursor-pointer min-w-[50px]"
                onClick={() => setIsLanguageOpen(!isLanguageOpen)}
              >
                <div className="w-[24px] h-[24px] rounded-full overflow-hidden">
                  <img
                    src={`/assets/images/svg-icons/${selectedLanguageCode}.svg`}
                    alt="selected-flag"
                    className="w-full h-full object-cover"
                  />
                </div>
                <img src="/assets/images/svg-icons/arrow-down.svg" alt="dropdown" className="w-[14px] h-[22px] ml-1" />
              </div>
              <LanguageDropdown
                isOpen={isLanguageOpen}
                onClose={() => setIsLanguageOpen(false)}
                onLanguageSelect={(name, code) => {
                  setSelectedLanguage(name);
                  setSelectedLanguageCode(code);
                  setIsLanguageOpen(false);
                }}
              />
            </div>

            <span className="hidden lg:flex flex-row gap-2 justify-center 2xl:mt-4 2xl:flex-col">
              <a href="https://t.me/fantasy_pepe_official" target="_blank" rel="noopener noreferrer" className="m-auto">
                <img src="/assets/images/svg-icons/telegram.svg" alt="telegram" />
              </a>
              <a href="https://www.instagram.com/fantasypepe/" target="_blank" rel="noopener noreferrer" className="m-auto">
                <img src="/assets/images/svg-icons/instagram.svg" alt="insta" />
              </a>
              <a href="https://x.com/fantasy_pepe" target="_blank" rel="noopener noreferrer" className="m-auto">
                <img src="/assets/images/svg-icons/twitter.svg" alt="twitter" />
              </a>
            </span>
            <MenuButton onToggle={onMenuToggle} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
