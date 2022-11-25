const envs = () => {
  const env = {
    baseUrl: 'http://localhost:4000',
  };

  if (process.env.REACT_APP_ENV === 'production') {
    env.baseUrl = 'https://mmdzov.com';
  }

  console.log(env)

  return env;
};

export default envs;
