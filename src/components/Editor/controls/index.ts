import inline from './Inline';
import blockType from './BlockType';
import list from './List';
import history from './History';

import { ControlType, DefaultToolbarType } from '../defaulToolbar';
import { EditorState } from 'draft-js';

export type ControlComProps<T extends ControlType> = {
  onChange: (editorState: EditorState) => void;
  editorState: EditorState;
  config: DefaultToolbarType[T];
};

const Controls = {
  [ControlType.inline]: inline,
  [ControlType.blockType]: blockType,
  [ControlType.list]: list,
  [ControlType.history]: history,
};
export default Controls;
