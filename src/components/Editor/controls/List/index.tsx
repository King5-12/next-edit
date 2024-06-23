import classnames from 'classnames';
import { RichUtils } from 'draft-js';
import Image from 'next/image';

import { ControlComProps } from '..';
import {
  getBlockBeforeSelectedBlock,
  getSelectedBlock,
  isListBlock,
} from '../../utils';
import { useEffect, useMemo, useState } from 'react';
import { ControlType, ListType } from '../../defaulToolbar';
export default function List({
  onChange,
  editorState,
  config,
}: ControlComProps<ControlType.list>) {
  const [currentBlock, setCurrentBlock] = useState(() =>
    editorState ? getSelectedBlock(editorState) : undefined
  );
  const setListStyle = (item: ListType) => {
    if (item === ListType.unordered) {
      toggleBlockType('unordered-list-item');
    } else if (item === ListType.ordered) {
      toggleBlockType('ordered-list-item');
    }
  };

  const toggleBlockType = (blockType: string) => {
    const newState = RichUtils.toggleBlockType(editorState, blockType);
    newState && onChange(newState);
  };

  useEffect(() => {
    setCurrentBlock(getSelectedBlock(editorState));
  }, [editorState]);

  const listType = useMemo(() => {
    let listType = '';
    if (currentBlock?.get('type') === 'unordered-list-item') {
      listType = 'unordered';
    } else if (currentBlock?.get('type') === 'ordered-list-item') {
      listType = 'ordered';
    }
    return listType;
  }, [currentBlock]);

  const isIndentDisabled = () => {
    const previousBlock = getBlockBeforeSelectedBlock(editorState);
    if (
      !previousBlock ||
      !isListBlock(currentBlock!) ||
      previousBlock.get('type') !== currentBlock!.get('type') ||
      previousBlock.get('depth') < currentBlock!.get('depth')
    ) {
      return true;
    }
    return false;
  };
  const isOutdentDisabled = () => {
    return (
      !currentBlock ||
      !isListBlock(currentBlock) ||
      currentBlock.get('depth') <= 0
    );
  };

  return (
    <div className='flex'>
      {(config.options as ListType[]).map((item, index) => {
        return (
          <button
            className={classnames(
              'mr-10 flex items-center justify-center h-30 w-30 hover:shadow-1px',
              {
                'shadow-1px-inset': listType === item,
              }
            )}
            onClick={() => {
              setListStyle(item);
            }}
            key={index}
            title={config[item].title}
          >
            <Image alt='' src={config[item].icon} />
          </button>
        );
      })}
    </div>
  );
}
