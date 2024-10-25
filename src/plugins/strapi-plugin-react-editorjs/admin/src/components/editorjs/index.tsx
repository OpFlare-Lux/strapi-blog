import React, { useState, useCallback, FC } from 'react';
import EditorJs from 'react-editor-js';
import customTools from '../../config/customTools';
import customToolsHandler from '../../config/customTools';
import MediaLibComponent from '../medialib/component';

interface editorJsTemplate {
  name?: string;
  value?: object;
  onChange?: () => void;
}

const Editor: FC<editorJsTemplate> = ({ onChange, name, value }) => {
  const [editorInstance, setEditorInstance] = useState<EditorJS>(false);
  const [mediaLibBlockIndex, setMediaLibBlockIndex] = useState<number>(-1);
  const [isMediaLibOpen, setIsMediaLibOpen] = useState<boolean>(false);
  const handleToggleMediaLib = () => setIsMediaLibOpen((prev) => !prev);
  const [imageComponent, setImageComponent] = useState<object>(undefined);
  const [imageCaptionComponent, setImageCaptionComponent] = useState<object>(undefined);
  const [componentFieldName, setComponentFieldName] = useState<string>('src');
  const [blockApi, setBlockApi] = useState<object>(undefined);

  const handleMediaLibChange = useCallback((data) => {

    if (imageComponent && data.length) {
      imageComponent[componentFieldName] = data[0]['url'];
      imageComponent['alt'] = data[0]['alt'];
      imageComponent['caption'] = data[0]['caption'];
    }
    if (imageCaptionComponent && data.length) {
      imageCaptionComponent['innerText'] = data[0]['caption'];
    }
    blockApi.dispatchChange();
    setImageComponent(undefined);
    setImageCaptionComponent(undefined);
    mediaLibToggleFunc();
  }, [imageComponent, editorInstance]);

  const mediaLibToggleFunc = useCallback((idx, imageComponent, blockAPI, fieldName, imageCaptionComponent) => {
    if (idx || idx === 0) {
      setMediaLibBlockIndex(idx);
    }
    if (imageComponent) {
      setImageComponent(imageComponent);
    }
    if (imageCaptionComponent) {
      setImageCaptionComponent(imageCaptionComponent);
    }
    if (blockAPI) {
      setBlockApi(blockAPI);
    }

    if (fieldName) {
      setComponentFieldName(fieldName);
    }
    setIsMediaLibOpen((prev) => !prev);
  }, []);

  return (
    <>
      <div style={{ border: `1px solid rgb(227, 233, 243)`, borderRadius: `2px`, marginTop: `4px` }}>
        <EditorJs
          onReady={(api) => {
            if(value && JSON.parse(value).blocks.length) {
              api.blocks.render(JSON.parse(value))
            }
            document.querySelector('[data-tool="image"]').remove()
          }}
          onChange={(api, newData) => {
            if (!newData.blocks.length) {
              newData = null;
              onChange({ target: { name, value: newData } });
            } else {
              onChange({ target: { name, value: JSON.stringify(newData) } });
            }
          }}
          tools={{...customTools, ...customToolsHandler(mediaLibToggleFunc)}}
          instanceRef={instance => setEditorInstance(instance)}
        />
      </div>
      <MediaLibComponent
        isOpen={isMediaLibOpen}
        onToggle={handleToggleMediaLib}
        onChange={handleMediaLibChange}
        editor={editorInstance}
      />
    </>
  );
};

export default Editor;
