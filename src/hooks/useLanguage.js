import { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import persianLang from '../language/persian.json';
import englishLang from '../language/english.json';
import { getLang } from '../language/language';

const useLanguage = () => {
  const { language } = useSelector(({ main }) => main);
  const [languageOption, setLanguageOption] = useState(getLang(language));

  const handleSelectLang = () => {
    if (language === 'persian') {
      setLanguageOption(persianLang);
    } else if (language === 'english') {
      setLanguageOption(englishLang);
    }
  };

  useEffect(() => {
    handleSelectLang();
  }, []);

  useEffect(() => {
    handleSelectLang();
  }, [language]);

  return languageOption;
};

export default useLanguage;
