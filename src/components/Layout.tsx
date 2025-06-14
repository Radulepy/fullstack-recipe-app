import React from 'react';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="container">
      <header className="my-4">
        <h1 className="text-center">AI-Powered Recipe Finder</h1>
      </header>
      <main>{children}</main>
      <footer className="text-center my-4">
        <p>&copy; {new Date().getFullYear()} Recipe Finder. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Layout;