import { Container } from './Home.styled';
import Resume from '../Resume/Resume';
import { Helmet } from 'react-helmet';

const Home = () => {
  return (
    <Container className="">
      <Helmet>
        <title>خانه | Personal</title>
        {/* <meta name="description" content='' /> */}
      </Helmet>
      {/* <h3>Welcome</h3> */}
      <Resume />
    </Container>
  );
};

export default Home;
