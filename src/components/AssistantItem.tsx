import { RawDraftContentState } from 'draft-js';

export default function AssistantItem({
  tip,
  contentState,
}: {
  tip: EditItem;
  contentState: RawDraftContentState;
}) {
  if (tip.type === 'inline') {
    const editLine = contentState.blocks.find((item) => item.key === tip.key);
    const startIndex = tip.inlineEdit!.start;
    const endIndex = tip.inlineEdit!.end;
    if (typeof startIndex === 'undefined' || typeof endIndex === 'undefined') {
      return '';
    }
    const beforeText = editLine?.text.slice(startIndex - 11, startIndex);
    const afterText = editLine?.text.slice(endIndex + 1, endIndex + 11);
    const innerText = editLine?.text.slice(startIndex, endIndex);
    console.log('beforeText', beforeText);
    console.log('afterText', afterText);
    console.log('innerText', innerText);
    const getInlineText = () => {
      switch (tip.inlineEdit?.type) {
        case 'delete':
          return (
            <div className='flex flex-col p-6'>
              <div className='text-sm'>
                &ldquo;{beforeText}
                <span className='line-through decoration-red-600 '>
                  {' ' + innerText + ' '}
                </span>
                {afterText}&ldquo;
              </div>
              <div className='text-red-500'> 删除 {innerText}</div>
            </div>
          );

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
    return <div>{getInlineText()}</div>;
  } else if (tip.type === 'blockType') {
    return (
      <div className='bg-white shadow-md w-full h-100 flex justify-center items-center rounded-lg text-xl'></div>
    );
  }
  return <div></div>;
}
