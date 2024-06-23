import { EditorState, RichUtils } from 'draft-js';
import classnames from 'classnames';
import { useEffect, useState } from 'react';
import { getSelectedBlocksType } from '../../utils';
import { ControlComProps } from '..';
import { BlockType, ControlType } from '../../defaulToolbar';

const blocksTypes = [
  { label: BlockType['Normal'], style: 'unstyled' },
  { label: BlockType['H1'], style: 'header-one' },
  { label: BlockType['H2'], style: 'header-two' },
  { label: BlockType['H3'], style: 'header-three' },
  { label: BlockType['H4'], style: 'header-four' },
  { label: BlockType['H5'], style: 'header-five' },
  { label: BlockType['H6'], style: 'header-six' },
  { label: BlockType['Blockquote'], style: 'blockquote' },
  { label: BlockType['Code'], style: 'code-block' },
];

// 块级样式按钮
export default function BlockTypeCom({
  onChange,
  editorState,
}: ControlComProps<ControlType.blockType>) {
  const [currentBlockType, setCurrentBlockType] = useState(() =>
    editorState ? getSelectedBlocksType(editorState) : 'unstyled'
  );
  const toggleBlockType = (blockType: BlockType) => {
    const blockTypeValue = blocksTypes.find(
      (item) => item.label === blockType
    )!.style;

    const newState = RichUtils.toggleBlockType(editorState, blockTypeValue);

    newState && onChange(newState);
  };

  useEffect(() => {
    setCurrentBlockType(getSelectedBlocksType(editorState));
  }, [editorState]);

  const blockType = blocksTypes.find((bt) => bt.style === currentBlockType);

  return (
    <div className='flex'>
      {blocksTypes.map((item, index) => {
        return (
          <button
            className={classnames(
              'mr-10 border flex items-center justify-center p-5 hover:shadow-1px',
              {
                'shadow-1px-inset': blockType?.label === item.label,
              }
            )}
            onClick={() => {
              toggleBlockType(item.label);
            }}
            key={index}
            title={item.label}
          >
            <span>{item.label}</span>
          </button>
        );
      })}
    </div>
  );
}
