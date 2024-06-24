'use client';

import React, { useRef, useState, useImperativeHandle } from 'react';
import {
  Editor,
  EditorState,
  RawDraftContentState,
  convertToRaw,
} from 'draft-js';

import defaultToolbar from './defaulToolbar';
import { getCustomStyleMap } from './utils';
import Controls from './controls';

/**
 * 基于draftjs开发的富文本编辑器组件
 * 目前支持的功能有：加粗、斜体、下划线、删除线、无序列表、有序列表、引用、代码块、撤销、重做
 * @param onChange 编辑器内容改变时的回调函数
 *
 */

type EditComponentProp = {
  onChange: (e: RawDraftContentState) => void;
};
const EditComponent = ({ onChange }: EditComponentProp, ref: any) => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const currentContent = useRef('');

  const editorRef = useRef<Editor>(null);

  const handleEditorChange = (e: EditorState) => {
    setEditorState(e);
    try {
      const content = JSON.stringify(convertToRaw(e.getCurrentContent()));
      if (content === currentContent.current) return;
      currentContent.current = content;
      onChange(JSON.parse(content));
    } catch (error) {
      console.error(error);
    }
  };

  const controlProps = {
    onChange: handleEditorChange,
    editorState,
  };

  const getStyleMap = () => ({
    ...getCustomStyleMap(),
  });

  useImperativeHandle(ref, () => ({
    getNewEditorState() {
      return editorState;
    },
    setEditorState(e: EditorState) {
      setEditorState(e);
    },
  }));
  return (
    <div className='bg-white shadow-md  h-full p-12 rounded-lg flex flex-col'>
      <div
        className='border flex p-10 mb-20 border-gray-200 border-solid flex-wrap rounded-lg'
        onMouseDown={(e) => {
          e.preventDefault();
        }}
      >
        {defaultToolbar.options.map((opt: ControlType, index: number) => {
          const Control = Controls[opt];
          const config = defaultToolbar[opt];

          return (
            <Control key={index} {...controlProps} config={config as any} />
          );
        })}
      </div>
      <div
        className='placeholder:rdw-editor-main w-full border border-solid min-h-300 p-6 border-gray-200 rounded-lg h-full'
        onClick={() => {
          setTimeout(() => {
            editorRef.current?.focus();
          });
        }}
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
};

export default React.forwardRef(EditComponent);
