import { Container } from './Home.styled';
import Resume from '../Resume/Resume';
import { Helmet } from 'react-helmet';
import useLanguage from '../../hooks/useLanguage';

const Home = () => {
  const lang = useLanguage();
  return (
    <Container className="">
      <Helmet>
        <title>{`${lang?.pages?.home} | Personal`}</title>
        {/* <meta name="description" content='' /> */}
      </Helmet>
      {/* <h3>Welcome</h3> */}
      <Resume />
    </Container>
  );
};

export default Home;
