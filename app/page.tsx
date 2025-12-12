import { refresh, revalidatePath } from 'next/cache';
import { Suspense } from 'react';

export default function Home() {
  return (
    <div className="p-4">
      <div className="flex gap-2">
        <div className="border p-2">
          <p className="text-sm uppercase text-gray-500">Cached component</p>
          <CachedComponent />
        </div>

        <div className="border p-2">
          <p className="text-sm uppercase text-gray-500">Dynamic component</p>
          <Suspense fallback="Loading...">
            <DynamicComponent />
          </Suspense>
        </div>
      </div>

      <div className="mt-8 flex gap-4">
        <form
          action={async () => {
            'use server';
            revalidatePath('/');
          }}
        >
          {/* ✅ Refreshes CachedComponent and DynamicComponent */}
          <button className="bg-black text-white px-2 py-1">
            revalidatePath
          </button>
        </form>
        <form
          action={async () => {
            'use server';
            console.log('refresh');
            refresh();
          }}
        >
          {/* ✅ Locally only refreshes DynamicComponent. */}
          {/* ❌ When deployed to Vercel refreshes both CachedComponent and DynamicComponent */}
          <button className="bg-black text-white px-2 py-1">refresh</button>
        </form>
      </div>
    </div>
  );
}

async function CachedComponent() {
  'use cache';
  const data = await fetchRandomNumber();
  return <div>{data}</div>;
}

async function DynamicComponent() {
  const data = await fetchRandomNumber();
  return <div>{data}</div>;
}

async function fetchRandomNumber() {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return Math.floor(Math.random() * 100);
}
