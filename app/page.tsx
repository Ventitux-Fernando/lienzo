'use client';
import React, { useState } from 'react';
import FilerobotImageEditor, {
  TABS,
  TOOLS,
} from 'react-filerobot-image-editor';

import dynamic from 'next/dynamic';

import { useSearchParams } from 'next/navigation';

const ImageEditor = dynamic(() => import('./components/ImageEditor'),  {
   loading: () => <p>Loading...</p>,
    ssr: false
});


function App( ) {

const searchParams = useSearchParams();

const newParam = searchParams.get('exporter');

localStorage.setItem('dataExporter', newParam as string);

  
  return (
    <div style={{ color: 'black' }}>
      <ImageEditor />
    </div>
  );
  
}


export default App;
