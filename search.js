'use client';

export function Search({ query }) {
  const handleSearch = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const query = formData.get('query')?.toString() ?? '';
    const response = await fetch(`/rsc?query=${query}`);
    window.__updateTree?.(response.body);
  };

  return (
    <form onSubmit={handleSearch}>
      <input
        type='search'
        placeholder='Search movies...'
        className='w-full rounded-md border border-gray-700 bg-gray-800 px-8 py-2 text-gray-300 placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none'
        name='query'
        defaultValue={query}
      />
    </form>
  );
}
