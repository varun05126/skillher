import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './components/Navbar';
import AppRoutes from './routes/AppRoutes';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gradient-to-b from-purple-950 via-purple-900 to-black">
        <Navbar />
        <main className="flex-grow">
          <AppRoutes />
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;