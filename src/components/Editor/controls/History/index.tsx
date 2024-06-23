import classnames from 'classnames';
import Image from 'next/image';
import { EditorState } from 'draft-js';

import { ControlComProps } from '..';
import { useMemo } from 'react';
import { ControlType, HistoryType } from '../../defaulToolbar';

export default function History({
  onChange,
  editorState,
  config,
}: ControlComProps<ControlType.history>) {
  const toggleHistory = (action: HistoryType) => {
    const newState = EditorState[action](editorState);
    newState && onChange(newState);
  };

  const hasUndo = useMemo(() => {
    return editorState.getUndoStack().size;
  }, [editorState]);

  const hasRedo = useMemo(() => {
    return editorState.getRedoStack().size;
  }, [editorState]);
  return (
    <div className='flex'>
      {(config.options as HistoryType[]).map((item: HistoryType, index) => {
        return (
          <button
            className={classnames(
              'mr-10 flex items-center justify-center h-30 w-30 hover:shadow-1px',
              {
                'disabled:opacity-35':
                  (item === HistoryType.undo && hasUndo === 0) ||
                  (item === HistoryType.redo && hasRedo === 0),
              }
            )}
            onClick={() => {
              toggleHistory(item);
            }}
            key={index}
            title={config[item].title}
            disabled={
              (item === HistoryType.undo && hasUndo === 0) ||
              (item === HistoryType.redo && hasRedo === 0)
            }
          >
            <Image alt='' src={config[item].icon} />
          </button>
        );
      })}
    </div>
  );
}
