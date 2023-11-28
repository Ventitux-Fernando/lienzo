'use client';
import React, { useState } from 'react';
import FilerobotImageEditor, {
  TABS,
  TOOLS,
} from 'react-filerobot-image-editor';

import dynamic from 'next/dynamic';

const ImageEditor = dynamic(() => import('./components/ImageEditor'),  {
   loading: () => <p>Loading...</p>,
    ssr: false
});

function App() {

  return (
    <div style={{ color: 'black' }}>
      <ImageEditor />
    </div>
  );
  
}

export default App;
