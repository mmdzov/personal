import { Routes as Switch, Route } from 'react-router-dom';
import Blog from './components/Blog/Blog';
import BlogAdd from './components/Blog/BlogAdd';
import BlogPost from './components/Blog/BlogPost';
import Chat from './components/Chat/Chat';
import ChatList from './components/Chat/ChatList';
import Home from './components/Home/Home';
import Notification from './components/Notification/Notification';
import PrivateRoute from './components/PrivateRoute';
import Tags from './components/Tags/Tags';
import Layout from './layout/Layout';

const Routes = () => {
  return (
    <Switch>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="blog" element={<Blog />} />
        <Route path="blog/:post" caseSensitive element={<BlogPost />} />
        <Route path="tags" caseSensitive element={<Tags />} />
        <Route path="tags/:tag" caseSensitive element={<Tags />} />

        {/* //!need admin access */}
        <Route
          path="/addpost"
          caseSensitive
          element={
            <PrivateRoute>
              <BlogAdd />
            </PrivateRoute>
          }
        />
        <Route
          path="/editpost"
          caseSensitive
          element={
            <PrivateRoute>
              <BlogAdd />
            </PrivateRoute>
          }
        />
      </Route>

      <Route
        path="chat"
        caseSensitive
        element={
          <PrivateRoute>
            <Chat />
          </PrivateRoute>
        }
      />
      <Route
        path="notification"
        caseSensitive
        element={
          <PrivateRoute>
            <Notification />
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
