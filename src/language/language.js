import persian from './persian.json';
import english from './english.json';

const langs = () => {
  return {
    persian,
    english,
  };
};

export const getLang = (name) => langs()[Object.keys(langs()).filter((item) => item === name)[0]];
