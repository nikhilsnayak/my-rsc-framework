import { Suspense } from 'react';
import { getMovies } from './db';
import { MovieList } from './movie-list';
import { Search } from './search';

export function App({ searchParams }) {
  const query = searchParams.get('query')
  const moviesPromise = getMovies(query);

  return (
    <div className='flex min-h-[100dvh] flex-col bg-gray-900 text-gray-200'>
      <main className='container mx-auto max-w-lg flex-grow px-4 py-8 space-y-4'>
        <Search query={query} />
        <Suspense fallback='Loading...'>
          <MovieList moviesPromise={moviesPromise} />
        </Suspense>
      </main>
    </div>
  );
}
