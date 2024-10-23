import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import EditorJs from 'react-editor-js';
import requiredTools from './requiredTools';
// import customTools from '../../config/customTools';
import customToolsHandler from '../../config/customTools';

// import MediaLibAdapter from '../medialib/adapter'
import MediaLibComponent from '../medialib/component';
// import { MediaLib } from '../medialib/component';
import {changeFunc, getToggleFunc} from '../medialib/utils';

const Editor = ({ onChange, name, value }) => {

  const [editorInstance, setEditorInstance] = useState(false);
  const [mediaLibBlockIndex, setMediaLibBlockIndex] = useState(-1);
  const [isMediaLibOpen, setIsMediaLibOpen] = useState(false);
  const handleToggleMediaLib = () => setIsMediaLibOpen((prev) => !prev);
  const [imageComponent, setImageComponent] = useState(undefined);
  const [imageCaptionComponent, setImageCaptionComponent] = useState(undefined);
  const [componentFieldName, setComponentFieldName] = useState('src');
  const [blockApi, setBlockApi] = useState(undefined);

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
          tools={{...requiredTools, ...customToolsHandler(mediaLibToggleFunc)}}
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

Editor.propTypes = {
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
};

export default Editor;
