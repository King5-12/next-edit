'use client';
import Assistant from '@/components/Assistant';
import { ClientOnly } from '@/components/ClientOnly';
import Editor from '@/components/Editor/index';
import useRequest from '@/hooks/useRequest';
import { getActions } from '@/setvices';
import { RawDraftContentState } from 'draft-js';
import { useState } from 'react';

// 编辑器页面，仅在浏览器端渲染
export default function EditPage() {
  const [contentState, setContentState] = useState<RawDraftContentState>();

  const {
    data: tipList,
    loading: tipLoading,
    run: runGetAction,
  } = useRequest(getActions, {
    manual: true,
    debounceInterval: 1000,
    initialData: [],
  });

  return (
    <div className='min-h-screen p-24 flex justify-center'>
      <ClientOnly>
        <div className='w-3/5 mr-20'>
          <Editor
            onChange={(e) => {
              if (
                e.blocks.length > 0 &&
                e.blocks.some((item) => {
                  item.text.trim().length > 0;
                })
              ) {
                setContentState(e);
                runGetAction(e);
              }
            }}
          />
        </div>
        <div className='w-1/5 flex rounded min-h-400 p-6'>
          <Assistant
            tipList={tipList}
            loading={tipLoading}
            contentState={contentState}
          />
        </div>
      </ClientOnly>
    </div>
  );
}
