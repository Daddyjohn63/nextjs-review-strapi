'use client';
import { Combobox } from '@headlessui/react';
import { useIsClient } from '@/lib/hooks';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

// const reviews = [
//   { slug: 'celeste-2', title: 'Celeste-2 update 2' },
//   { slug: 'hades-2018', title: 'Hades' },
//   { slug: 'fall-guys', title: 'Fall Guys: Ultimate Knockout' },
//   { slug: 'black-mesa', title: 'Black Mesa' },
//   { slug: 'disco-elysium', title: 'Disco Elysium' }
// ];

export default function SearchBox({ reviews }) {
  const router = useRouter();
  const isClient = useIsClient();
  const [query, setQuery] = useState('');

  const handleChange = review => {
    router.push(`/reviews/${review.slug}`);
    console.log('selected:', review);
  };

  // console.log('[SearchBox] isClient:', isClient);
  console.log('[SearchBox] query:', query);
  if (!isClient) {
    return null; //or ideally load an input field so that the user doesnt notice any difference as they wait for the component to load.
  }

  const filtered = reviews
    .filter(review => review.title.toLowerCase().includes(query.toLowerCase()))
    .slice(0, 5);

  return (
    <div className="relative w-48">
      <Combobox onChange={handleChange}>
        <Combobox.Input
          placeholder="Search…"
          value={query}
          onChange={event => setQuery(event.target.value)}
          className="border px-2 py-1 rounded w-full"
        />
        <Combobox.Options className="absolute bg-white py-1 w-full">
          {filtered.map(review => (
            <Combobox.Option key={review.slug} value={review}>
              {({ active }) => (
                <span
                  className={`block px-2 truncate w-full ${
                    active ? 'bg-orange-100' : ''
                  }`}
                >
                  {review.title}
                </span>
              )}
            </Combobox.Option>
          ))}
        </Combobox.Options>
      </Combobox>
    </div>
  );
}
