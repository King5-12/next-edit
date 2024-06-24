import { RawDraftContentState } from 'draft-js';

//功能区item组件
export default function AssistantItem({
  tip,
  contentState,
}: {
  tip: EditItem;
  contentState: RawDraftContentState;
}) {
  if (tip.type === 'inline') {
    const editLineIndex = contentState.blocks.findIndex(
      (item) => item.key === tip.key
    );
    const editLine = contentState.blocks[editLineIndex];
    const startIndex = tip.inlineEdit!.start;
    const endIndex = tip.inlineEdit!.end;
    if (typeof startIndex === 'undefined' || typeof endIndex === 'undefined') {
      return '';
    }
    const beforeText = editLine?.text.slice(startIndex - 11, startIndex);
    const afterText = editLine?.text.slice(endIndex, endIndex + 11);
    const innerText = editLine?.text.slice(startIndex, endIndex);
    const getInlineText = () => {
      switch (tip.inlineEdit?.type) {
        case 'delete':
          return (
            <div className='py-12 px-24 relative h-full'>
              <div className='text-sm '>第{editLineIndex + 1}段 </div>
              <div className='text-sm bg-gray-300 inline-block rounded-lg p-3'>
                &ldquo;{beforeText}
                <span className='line-through decoration-red-600 text-red-600'>
                  {' ' + innerText + ' '}
                </span>
                {afterText}&ldquo;
              </div>
              <div className='text-red-500'>
                删除段落中 &ldquo;{innerText}&ldquo; 字
              </div>
              <button
                className='absolute right-12 top-1/2 -translate-y-1/2 bg-green-800 text-white py-6 px-12 rounded-lg cursor-pointer hover:bg-green-600'
                onClick={() => {}}
              >
                应用
              </button>
            </div>
          );

        //todo
        case 'insert':
        case 'replace':
        case InlineType.bold:
        case InlineType.italic:
        case InlineType.underline:
        case InlineType.strikethrough:
        case InlineType.monospace:
        default:
      }
      return '';
    };
    return <div className='h-full'>{getInlineText()}</div>;
  } else if (tip.type === 'blockType') {
    const editLineIndex = contentState.blocks.findIndex(
      (item) => item.key === tip.key
    );
    const editLine = contentState.blocks[editLineIndex];
    return (
      <div className='w-full rounded-lg text-xl py-12 px-24 relative h-full'>
        <div className='text-sm'>第{editLineIndex + 1}段 </div>
        <div>
          <span>将第{editLineIndex + 1}段变为 </span>
          <span className=''>{tip.blockEdit?.type}</span>
          格式
        </div>
        <button
          className='absolute right-12 top-1/2 -translate-y-1/2 bg-green-800 text-white py-6 px-12 rounded-lg cursor-pointer hover:bg-green-600'
          onClick={() => {}}
        >
          应用
        </button>
      </div>
    );
  }
  return <div></div>;
}
