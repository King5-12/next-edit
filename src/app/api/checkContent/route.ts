import { RawDraftContentState } from 'draft-js';
import { NextResponse, type NextRequest } from 'next/server';

enum EditType {
  inline = 'inline',
  blockType = 'blockType',
}
enum BlockType {
  Normal = 'Normal',
  H1 = 'H1',
  H2 = 'H2',
  H3 = 'H3',
  H4 = 'H4',
  H5 = 'H5',
  H6 = 'H6',
  Blockquote = 'Blockquote',
  Code = 'Code',
}
export async function POST(req: NextRequest) {
  const data: RawDraftContentState = await req.json();

  const modifyTip: EditItem[] = [];

  for (let i = 0; i < data.blocks.length; i++) {
    const nowData = data.blocks[i];
    if (nowData.text.indexOf('死') >= 0) {
      const index = nowData.text.indexOf('死');
      modifyTip.push({
        key: nowData.key,
        type: EditType.inline,
        inlineEdit: {
          start: index,
          end: index + 1,
          type: 'delete',
        },
      });
    }

    if (i === 2) {
      modifyTip.push({
        key: nowData.key,
        type: EditType.blockType,
        blockEdit: {
          type: BlockType.H1,
        },
      });
    }
  }

  await sleep(2000);

  return NextResponse.json({
    message: 'Hello, world!',
    data: modifyTip,
    status: 200,
  });
}

const sleep = async (e: number) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(1);
    }, e);
  });
};
