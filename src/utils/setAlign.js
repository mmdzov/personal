const setAlign = (content) => {
  const result = /^[^a-z]/gi.test(content);
  return result ? 'right' : 'left';
};

export default setAlign;
