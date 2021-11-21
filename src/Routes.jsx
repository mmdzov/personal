import { Routes as Switch, Route } from 'react-router-dom';
import Blog from './components/Blog/Blog';
import BlogPost from './components/Blog/BlogPost';
import Chat from './components/Chat/Chat';
import ChatList from './components/Chat/ChatList';
import Home from './components/Home/Home';
import PrivateRoute from './components/PrivateRoute';
import Resume from './components/Resume/Resume';
import Layout from './layout/Layout';

const Routes = () => {
  return (
    <Switch>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="blog" element={<Blog />} />
        <Route path="blog/:post" caseSensitive element={<BlogPost />} />
      </Route>
      <Route path="personal" caseSensitive element={<Resume />} />
      <Route
        path="chat"
        caseSensitive
        element={
          <PrivateRoute>
            <Chat />
          </PrivateRoute>
        }
      />

      {/* //!need admin access */}
      <Route
        path="chatlist"
        caseSensitive
        element={
          <PrivateRoute>
            <ChatList />
          </PrivateRoute>
        }
      />
      <Route
        path="chat/:uid"
        caseSensitive
        element={
          <PrivateRoute>
            <Chat />
          </PrivateRoute>
        }
      />
    </Switch>
  );
};

export default Routes;
