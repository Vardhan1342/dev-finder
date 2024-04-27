"use client";
import { SessionProvider } from 'next-auth/react';
import {ReactNode} from 'react';
import { ThemeProvider } from './components/theme-provider';
import Header from './components/Header';

const Provider = ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) => {
  return (
    <SessionProvider>
    <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          
          {children}
        </ThemeProvider>
        </SessionProvider>
  );
}

export default Provider;
