import { refresh, revalidatePath } from 'next/cache';
import { Suspense } from 'react';

export default function Home() {
  return (
    <div>
      <CachedComponent />
      <Suspense>
        <DynamicComponent />
      </Suspense>
      <form
        action={async () => {
          'use server';
          revalidatePath('/');
        }}
      >
        {/* ✅ Refreshes CachedComponent and DynamicComponent */}
        <button type="submit">revalidatePath</button>
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
        <button type="submit">refresh</button>
      </form>
    </div>
  );
}

async function CachedComponent() {
  'use cache';
  // cacheLife("days");
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
