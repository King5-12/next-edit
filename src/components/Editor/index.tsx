'use client';

import { useRef, useState } from 'react';
import { Editor, EditorState } from 'draft-js';

import defaultToolbar from './defaulToolbar';
import Controls from './controls';
import { getCustomStyleMap } from './utils';

/**
 * 要展示的toolbar按钮
 *
 * @returns
 */

type EditComponentProp = {
  onChange: () => void;
};
export default function EditComponent({ onChange }: EditComponentProp) {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  // const [editorFocused, setEditorFocused] = useState(false);

  const editorRef = useRef<Editor>(null);

  const handleEditorChange = (e: EditorState) => {
    setEditorState(e);
  };

  // const afterChange = (e: EditorState) => {};

  // const handleBoldClick = () => {
  //   setEditorState(RichUtils.toggleInlineStyle(editorState, 'BOLD'));
  // };

  const controlProps = {
    onChange: handleEditorChange,
    editorState,
  };

  const getStyleMap = () => ({
    ...getCustomStyleMap(),
  });
  return (
    <div className='bg-white shadow-md rounded min-h-400 p-6'>
      <div
        className='border flex p-10 mb-12 border-gray-200 border-solid flex-wrap'
        onMouseDown={(e) => {
          e.preventDefault();
        }}
      >
        {defaultToolbar.options.map((opt, index) => {
          const Control = Controls[opt];
          const config = defaultToolbar[opt];

          return <Control key={index} {...controlProps} config={config} />;
        })}
      </div>
      <div
        className='placeholder:rdw-editor-main w-full border border-solid min-h-300 p-6 border-gray-200'
        onClick={() => {
          setTimeout(() => {
            editorRef.current?.focus();
          });
        }}
        // onFocus={() => {
        //   setEditorFocused(true);
        // }}
        // onBlur={() => {
        //   setEditorFocused(false);
        // }}
      >
        <Editor
          editorState={editorState}
          onChange={handleEditorChange}
          ref={editorRef}
          customStyleMap={getStyleMap()}
        />
      </div>
    </div>
  );
}
