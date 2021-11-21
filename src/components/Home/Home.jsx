import { Container } from './Home.styled';
import Resume from '../Resume/Resume';
import Navigation from '../Navigation/Navigation';

const Home = () => {
  return (
    <Container className="">
      {/* <h3>Welcome</h3> */}
      <Navigation />
      <Resume />
    </Container>
  );
};

export default Home;
