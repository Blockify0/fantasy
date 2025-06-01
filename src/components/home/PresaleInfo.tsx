import { useLanguage } from '../../context/LanguageContext';
import { translations } from '../../translations/languages';
import ProgressBar from './ProgressBar';

interface PresaleInfoProps {
  info: {
    raised: string;
    total: string;
    progress: number;
    price: string;
  };
}

const PresaleInfo = ({ info }: PresaleInfoProps) => {
  const { selectedLanguageCode } = useLanguage();
  const t = translations[selectedLanguageCode] || translations.en;

  return (
    <>
      <div className="my-3 text-sm text-center text-black w-full flex items-center justify-between">
        <span className="uppercase">{t.usdtRaised}:</span>
        <p className="m-0">
          <span className="font-normal">${info.raised}</span>
          <span className="font-normal"> / ${info.total}</span>
        </p>
      </div>

      <ProgressBar progress={info.progress} label="UNTIL PRICE RISE" />

      <p className="w-full text-center mb-2 text-sm text-custom-red font-medium mt-3 relative before:absolute before:content-[''] before:left-0 before:top-1/2 before:h-px before:w-1/5 before:bg-black after:absolute after:content-[''] after:right-0 after:top-1/2 after:h-px after:w-1/5 after:bg-black">
        1 $FEPE = ${info.price}
      </p>
    </>
  );
};

export default PresaleInfo; 