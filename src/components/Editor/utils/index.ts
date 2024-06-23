import { BlockMap, ContentBlock, ContentState, EditorState } from 'draft-js';

export function getSelectionInlineStyle(editorState: EditorState) {
  const currentSelection = editorState.getSelection();
  if (currentSelection.isCollapsed()) {
    const inlineStyles: { [key: string]: boolean } = {};
    const styleList = editorState.getCurrentInlineStyle().toList().toJS();
    if (styleList) {
      [
        'BOLD',
        'ITALIC',
        'UNDERLINE',
        'STRIKETHROUGH',
        'CODE',
        'SUPERSCRIPT',
        'SUBSCRIPT',
      ].forEach((style) => {
        inlineStyles[style] = styleList.indexOf(style) >= 0;
      });
      return inlineStyles;
    }
  }
  const start = currentSelection.getStartOffset();
  const end = currentSelection.getEndOffset();
  const selectedBlocks = getSelectedBlocksList(editorState);
  if (selectedBlocks.size > 0) {
    const inlineStyles: { [key: string]: boolean } = {
      BOLD: true,
      ITALIC: true,
      UNDERLINE: true,
      STRIKETHROUGH: true,
      CODE: true,
      SUPERSCRIPT: true,
      SUBSCRIPT: true,
    };
    for (let i = 0; i < selectedBlocks.size; i += 1) {
      let blockStart = i === 0 ? start : 0;
      let blockEnd =
        i === selectedBlocks.size - 1
          ? end
          : selectedBlocks.get(i).getText().length;
      if (blockStart === blockEnd && blockStart === 0) {
        blockStart = 1;
        blockEnd = 2;
      } else if (blockStart === blockEnd) {
        blockStart -= 1;
      }
      for (let j = blockStart; j < blockEnd; j += 1) {
        const inlineStylesAtOffset = selectedBlocks.get(i).getInlineStyleAt(j);
        [
          'BOLD',
          'ITALIC',
          'UNDERLINE',
          'STRIKETHROUGH',
          'CODE',
          'SUPERSCRIPT',
          'SUBSCRIPT',
        ].forEach((style) => {
          inlineStyles[style] =
            inlineStyles[style] && inlineStylesAtOffset.get(style) === style;
        });
      }
    }
    return inlineStyles;
  }
  return {};
}

export function getSelectedBlocksList(editorState: EditorState) {
  return getSelectedBlocksMap(editorState).toList();
}
/**
 * Function returns collection of currently selected blocks.
 */
export function getSelectedBlocksMap(editorState: EditorState) {
  const selectionState = editorState.getSelection();
  const contentState = editorState.getCurrentContent();
  const startKey = selectionState.getStartKey();
  const endKey = selectionState.getEndKey();
  const blockMap = contentState.getBlockMap();
  return blockMap
    .toSeq()
    .skipUntil((_, k) => k === startKey)
    .takeUntil((_, k) => k === endKey)
    .concat([[endKey, blockMap.get(endKey)]]);
}

/**
 * If all currently selected blocks are of same type the function will return their type,
 * Else it will return empty string.
 */
export function getSelectedBlocksType(editorState: EditorState) {
  const blocks = getSelectedBlocksList(editorState);
  const hasMultipleBlockTypes = blocks.some(
    (block) => block?.getType() !== blocks.get(0).getType()
  );
  if (!hasMultipleBlockTypes) {
    return blocks.get(0).getType();
  }
  return undefined;
}

const customInlineStylesMap: {
  [styleName: string]: React.CSSProperties;
} = {
  CODE: {
    fontFamily: 'monospace',
    wordWrap: 'break-word',
    background: '#f1f1f1',
    borderRadius: 3,
    padding: '1px 3px',
  },
  SUPERSCRIPT: {
    fontSize: 11,
    position: 'relative',
    top: -8,
    display: 'inline-flex',
  },
  SUBSCRIPT: {
    fontSize: 11,
    position: 'relative',
    bottom: -8,
    display: 'inline-flex',
  },
};

export const getCustomStyleMap = () => ({
  CODE: customInlineStylesMap.CODE,
  SUPERSCRIPT: customInlineStylesMap.SUPERSCRIPT,
  SUBSCRIPT: customInlineStylesMap.SUBSCRIPT,
});

/**
 * Function will check various conditions for changing depth and will accordingly
 * either call function changeBlocksDepth or just return the call.
 */
export function changeDepth(
  editorState: EditorState,
  adjustment: number,
  maxDepth: number
) {
  const selection = editorState.getSelection();
  let key;
  if (selection.getIsBackward()) {
    key = selection.getFocusKey();
  } else {
    key = selection.getAnchorKey();
  }
  const content = editorState.getCurrentContent();
  const block = content.getBlockForKey(key);
  const type = block.getType();
  if (type !== 'unordered-list-item' && type !== 'ordered-list-item') {
    return editorState;
  }
  const blockAbove = content.getBlockBefore(key);
  if (!blockAbove) {
    return editorState;
  }
  const typeAbove = blockAbove.getType();
  if (typeAbove !== type) {
    return editorState;
  }
  const depth = block.getDepth();
  if (adjustment === 1 && depth === maxDepth) {
    return editorState;
  }
  const adjustedMaxDepth = Math.min(blockAbove.getDepth() + 1, maxDepth);
  const withAdjustment = changeBlocksDepth(
    editorState,
    adjustment,
    adjustedMaxDepth
  );
  return EditorState.push(
    editorState,
    withAdjustment as ContentState,
    'adjust-depth'
  );
}

/**
 * Function to change depth of block(s).
 */
function changeBlocksDepth(
  editorState: EditorState,
  adjustment: number,
  maxDepth: number
) {
  const selectionState = editorState.getSelection();
  const contentState = editorState.getCurrentContent();
  let blockMap = contentState.getBlockMap();
  const blocks = getSelectedBlocksMap(editorState).map((block) => {
    let depth = block!.getDepth() + adjustment;
    depth = Math.max(0, Math.min(depth, maxDepth));
    return block!.set('depth', depth);
  });
  blockMap = blockMap.merge(blocks as BlockMap);
  return contentState.merge({
    blockMap,
    selectionBefore: selectionState,
    selectionAfter: selectionState,
  });
}

/**
 * Function returns the first selected block.
 */
export function getSelectedBlock(editorState: EditorState) {
  if (editorState) {
    return getSelectedBlocksList(editorState).get(0);
  }
  return undefined;
}

/**
 * Function to check if a block is of type list.
 */
export function isListBlock(block: ContentBlock) {
  if (block) {
    const blockType = block.getType();
    return (
      blockType === 'unordered-list-item' || blockType === 'ordered-list-item'
    );
  }
  return false;
}

/**
 * Function returns the block just before the selected block.
 */
export function getBlockBeforeSelectedBlock(editorState: EditorState) {
  if (editorState) {
    const selectedBlock = getSelectedBlock(editorState);
    const contentState = editorState.getCurrentContent();
    const blockList = contentState.getBlockMap().toSeq().toList();
    let previousIndex = 0;
    blockList.forEach((block, index) => {
      if (block?.get('key') === selectedBlock?.get('key')) {
        previousIndex = (index as number) - 1;
      }
    });
    if (previousIndex > -1) {
      return blockList.get(previousIndex);
    }
  }
  return undefined;
}
