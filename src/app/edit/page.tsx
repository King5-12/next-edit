'use client';
import { ClientOnly } from '@/components/ClientOnly';
import Editor from '@/components/Editor/index';

export default function EditPage() {
  return (
    <div className='min-h-screen p-24 flex'>
      <div className='w-3/5 mr-20'>
        <ClientOnly>
          <Editor
            onChange={(e) => {
              console.log(e);
            }}
          />
        </ClientOnly>
      </div>
      <div className='w-1/5 bg-white shadow-md rounded min-h-400 p-6'></div>
    </div>
  );
}
