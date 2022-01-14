import { useSelector } from 'react-redux';
import { Outlet } from 'react-router';
import Navigation from '../components/Navigation/Navigation';

const Layout = ({ navigation = true }) => {
  const { language } = useSelector(({ main }) => main);

  return (
    <div className="" style={{ direction: language === 'persian' ? 'rtl' : 'ltr' }}>
      {navigation ? <Navigation /> : null}
      <Outlet />
    </div>
  );
};

export default Layout;
