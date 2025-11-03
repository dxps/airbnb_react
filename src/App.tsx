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

export function App() {
  return (
    <ThemeProvider>
      <>
        <div className='fixed top-0 bottom-0 left-0'>
          <Devbar />
        </div>
        <div className='ml-[700px]'>
          <div className='flex h-screen flex-col items-center justify-center'>
            <h2>Let's build something great together</h2>
            <p className='text-muted-foreground'>
              Follow the steps on the left sidebar to start building
            </p>
          </div>
        </div>
      </>
      {/* <div className='relative z-10 container mx-auto p-8 text-center'>
        <div className='mb-8 flex items-center justify-center gap-8'>
          <img
            src={logo}
            alt='Bun Logo'
            className='h-36 scale-120 p-6 transition-all duration-300 hover:drop-shadow-[0_0_2em_#646cffaa]'
          />
          <img
            src={reactLogo}
            alt='React Logo'
            className='h-36 animate-[spin_20s_linear_infinite] p-6 transition-all duration-300 hover:drop-shadow-[0_0_2em_#61dafbaa]'
          />
        </div>
        <Card>
          <CardHeader className='gap-4'>
            <CardTitle className='text-3xl font-bold'>Bun + React</CardTitle>
            <CardDescription>
              Edit{' '}
              <code className='bg-muted rounded px-[0.3rem] py-[0.2rem] font-mono'>
                src/App.tsx
              </code>{' '}
              and save to test HMR
            </CardDescription>
          </CardHeader>
          <CardContent>
            <APITester />
          </CardContent>
        </Card>
      </div> */}
    </ThemeProvider>
  );
}

export default App;
