'use client';

import React, { useState } from 'react';
import FilerobotImageEditor, {
  TABS,
  TOOLS,
} from 'react-filerobot-image-editor';



function ImageEditor() {

   const [isImgEditorShown, setIsImgEditorShown] = useState(true);
  const [imageSource, setImageSource] = useState('blank-white-background.jpg');
  const [newImageSource, setNewImageSource] = useState('');
  const [uploadedDesignState, setUploadedDesignState] = useState(null);

  const closeImgEditor = () => {
    setIsImgEditorShown(false);
  };

  const handleInputChange = (e: any) => {
    setNewImageSource(e.target.value);
  };

  const handleSubmit = () => {
    setImageSource(newImageSource);
  };

  const handleFileUpload = (e: any) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event: any) => {
      const content = event.target.result;
      try {
        const parsedJson = JSON.parse(content);
        setUploadedDesignState(parsedJson);
      } catch (error) {
        console.error('Error parsing JSON file', error);
      }
    };

    reader.readAsText(file);
  };
  

  return (
    <div style={{ color: 'black' }}>
     
      <div style={{ height: 'calc(100vh - 50px)' }}>
        <FilerobotImageEditor
          theme={{
            typography: {
              fontFamily: 'Roboto',
            },
          }}
          // @ts-ignore
          loadableDesignState={uploadedDesignState}
          source={imageSource}
          onSave={(editedImageObject, designState) => {
           
            let imga64 = editedImageObject['imageBase64']; 
            const id =  localStorage.getItem('dataExporter');
            // console.log(imga64)
            if(imga64 )
              {
                const byteCharacters = atob(imga64.split(',')[1]);
                const byteNumbers = new Array(byteCharacters.length);
                for (let i = 0; i < byteCharacters.length; i++) {
                  byteNumbers[i] = byteCharacters.charCodeAt(i);
                }
                const byteArray = new Uint8Array(byteNumbers);
                const blob = new Blob([byteArray], { type: `${editedImageObject['mimeType']}` });
                const formData = new FormData();
                const headers = new Headers();
                headers.append('Access-Control-Allow-Origin', '*'); // Reemplaza con tu dominio
                headers.append('Content-Type', 'multipart/form-data'); // Tipo de contenido del FormData
                
                formData.append('imageFile', blob, 'designState.jpg');
                if(id)
                  {
                   formData.append('id', id);
                 }
                
                fetch('http://127.0.0.1:8000/api/lienzo/edit', {
                headers: {
                    "Access-Control-Allow-Origin":"*"
                  },
                  method: 'POST',
                  body: formData
                })
                .then(response => {
                  // Manejar la respuesta del backend
                 
                  const a = document.createElement('a');
                  a.href = 'http://localhost:3000/acl/';
                  a.click();
                })
                .catch(error => {
                  // Manejar errores
                  console.error('Error al enviar la imagen al backend:', error);
                });

              }
            

            
          }}
          onClose={closeImgEditor}
          annotationsCommon={{
            fill: '#ff0000',
          }}
          Text={{ text: 'Filerobot...' }}
          Rotate={{ angle: 90, componentType: 'slider' }}
          Crop={{
            presetsItems: [
              {
                titleKey: 'classicTv',
                descriptionKey: '4:3',
                ratio: 4 / 3,
              },
              {
                titleKey: 'cinemascope',
                descriptionKey: '21:9',
                ratio: 21 / 9,
              },
            ],
            presetsFolders: [
              {
                titleKey: 'socialMedia',
                groups: [
                  {
                    titleKey: 'facebook',
                    items: [
                      {
                        titleKey: 'profile',
                        width: 180,
                        height: 180,
                        descriptionKey: 'fbProfileSize',
                      },
                      {
                        titleKey: 'coverPhoto',
                        width: 820,
                        height: 312,
                        descriptionKey: 'fbCoverPhotoSize',
                      },
                    ],
                  },
                ],
              },
            ],
          }}
          tabsIds={[TABS.ADJUST, TABS.ANNOTATE, TABS.WATERMARK]}
          defaultTabId={TABS.ANNOTATE}
          defaultToolId={TOOLS.TEXT}
          savingPixelRatio={0}
          previewPixelRatio={0}
        />
      </div>
    </div>
  );
}

export default ImageEditor;
