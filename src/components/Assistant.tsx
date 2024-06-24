import { memo } from 'react';
import { RawDraftContentState } from 'draft-js';
import { Spin } from 'antd';

import AssistantItem from './AssistantItem';

//功能区组件
export default memo(function Assistant({
  loading,
  tipList,
  contentState,
}: {
  loading: boolean;
  tipList: EditItem[];
  contentState: RawDraftContentState | undefined;
}) {
  return (
    <div className='w-full'>
      <div className=' mb-10 pb-10 text-gray-600 text-2xl'>
        &gt;&gt;&nbsp;&nbsp;Assistant
      </div>
      {loading ? (
        <div className='bg-white shadow-md w-full h-100 flex justify-center items-center rounded-lg'>
          <Spin tip='Loading' />
        </div>
      ) : (
        <>
          {tipList.length ? (
            <div className='flex justify-center py-20 px-5 w-full flex-col'>
              {tipList
                .filter((item) =>
                  contentState?.blocks.find(
                    (blockItem) => blockItem.key === item.key
                  )
                )
                .map((item: EditItem, key) => {
                  return (
                    <div
                      key={item.key}
                      className='border my-10 bg-white shadow-md w-full rounded-lg relative hover:bg-gray-100'
                    >
                      <div className='h-10 w-5 bg-red-600 rounded-r-full rounded-l-none border absolute top-15'></div>
                      <AssistantItem
                        tip={item}
                        contentState={contentState as RawDraftContentState}
                      />
                    </div>
                  );
                })}
            </div>
          ) : (
            <div className='bg-white shadow-md w-full h-100 flex justify-center items-center rounded-lg text-xl'>
              暂无提示
            </div>
          )}
        </>
      )}
    </div>
  );
});
