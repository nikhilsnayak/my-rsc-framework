export async function MovieList({ moviesPromise }) {
  const movies = await moviesPromise;
  return (
    <ul
      className='max-h-[70vh] space-y-4 overflow-auto px-4'
      style={{
        scrollbarWidth: 'thin',
        scrollbarColor: '#4b5563 #1a1a1a',
      }}
    >
      {movies.length > 0 ? (
        movies.map((movie) => (
          <li
            key={movie.id}
            className='flex items-center justify-between rounded-lg bg-gray-800 p-4 shadow'
          >
            <div className='flex items-center space-x-4'>
              <span className='text-xl font-bold'>{movie.votes}</span>
              <span className='text-gray-300'>{movie.title}</span>
            </div>
          </li>
        ))
      ) : (
        <li className='p-4 text-center text-gray-500'>No movies</li>
      )}
    </ul>
  );
}
