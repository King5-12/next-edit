'use client';

import { EditorState, RichUtils } from 'draft-js';
import Image from 'next/image';
import classnames from 'classnames';
import { useEffect, useState } from 'react';

import { getSelectionInlineStyle } from '../../utils';
import { ControlComProps } from '..';
import { ControlType, InlineType } from '../../defaulToolbar';

//内联样式控制
export default function Inline({
  onChange,
  editorState,
  config,
}: ControlComProps<ControlType.inline>) {
  const changeKeys = (style: { [key: string]: boolean }) => {
    if (style) {
      const st: { [key: string]: boolean } = {};
      for (const key in style) {
        // eslint-disable-line no-restricted-syntax
        if ({}.hasOwnProperty.call(style, key)) {
          st[key === 'CODE' ? 'monospace' : key.toLowerCase()] = style[key];
        }
      }
      return st;
    }
    return undefined;
  };

  const [currentStyles, setCurrentStyles] = useState(() =>
    editorState ? changeKeys(getSelectionInlineStyle(editorState)) : {}
  );

  const toggleInlineStyle = (style: InlineType) => {
    const newStyle =
      style === InlineType.monospace ? 'CODE' : style.toUpperCase();
    let newState = RichUtils.toggleInlineStyle(editorState, newStyle);
    if (newState) {
      onChange(newState);
    }
  };

  useEffect(() => {
    setCurrentStyles(changeKeys(getSelectionInlineStyle(editorState)));
  }, [editorState]);

  return (
    <div className='flex'>
      {config.options.map((style: InlineType, index: number) => {
        return (
          <button
            className={classnames(
              'mr-10 flex items-center justify-center h-30 w-30 hover:shadow-1px',
              {
                'shadow-1px-inset':
                  currentStyles?.[style.toLowerCase()] === true ||
                  (style.toLowerCase() === 'MONOSPACE' && currentStyles?.CODE),
              }
            )}
            onClick={() => {
              toggleInlineStyle(style);
            }}
            key={index}
            title={config[style].title}
          >
            <Image alt='' src={config[style].icon} />
          </button>
        );
      })}
    </div>
  );
}
