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
      <div>
        <input
          className='w-full max-w-xs h-10 px-3 mb-3 border border-gray-300 rounded-md'
          type="text"
          placeholder="Enter image source URL"
          value={newImageSource}
          onChange={handleInputChange}
        />
        <button
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
          onClick={handleSubmit}
        >
          Submit
        </button>
        <label htmlFor="file-upload" className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'>
          Upload JSON:
          <input
            id="file-upload"
            type="file"
            accept=".json"
            onChange={handleFileUpload}
            className="hidden"
          />
        </label>
      </div>
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
            console.log('saved', editedImageObject, designState);
            const blob = new Blob([JSON.stringify(designState)], { type: 'application/json' });
            const a = document.createElement('a');
            a.download = 'designState.json';
            a.href = URL.createObjectURL(blob);
            a.click();
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
