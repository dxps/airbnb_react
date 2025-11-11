import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { APITester } from './APITester';
import './index.css';

import logo from './logo.svg';
import reactLogo from './react.svg';
import ThemeProvider from './components/ThemeProvider';
import Devbar from './components/Devbar/Devbar';
import HomePage from './pages/HomePage';

export function App() {
  return (
    <ThemeProvider>
      <>
        <div className='fixed top-0 bottom-0 left-0'>
          <Devbar />
        </div>
        <div className='ml-[550px]'>
          <HomePage />
        </div>
      </>
    </ThemeProvider>
  );
}

export default App;
