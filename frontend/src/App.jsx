import './App.css';
import { Outlet } from 'react-router-dom';

// componentes
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Message from './components/layout/Message';
import Profile from './components/pages/User/Profile';

// context
import { UserProvider } from './context/UserContext';

function App() {
  return (
    <UserProvider> 
      <div className='App'>
        <Navbar />
        <Message />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </UserProvider>
  );
}

export default App;
