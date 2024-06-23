import inline from './Inline';
import blockType from './BlockType';
import list from './List';
import history from './History';

import { ControlType } from '../defaulToolbar';
import { EditorState } from 'draft-js';

export type ControlComProps = {
  onChange: (editorState: EditorState) => void;
  editorState: EditorState;
  config: { options?: string[] } & { [key: string]: any };
};

const Controls = {
  [ControlType.inline]: inline,
  [ControlType.blockType]: blockType,
  [ControlType.list]: list,
  [ControlType.history]: history,
};
export default Controls;
