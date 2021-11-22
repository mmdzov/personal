import { Outlet } from 'react-router';
import Navigation from '../components/Navigation/Navigation';

const Layout = ({ navigation = true }) => {
  return (
    <div className="">
      {navigation ? <Navigation /> : null}
      <Outlet />
    </div>
  );
};

export default Layout;
