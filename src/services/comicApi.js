export async function getComics() {
  const response = await fetch('/kineticCore/data/comics.json')

  if (!response.ok) {
    throw new Error('Could not load comics')
  }

  const comics = await response.json()

  return comics
    .filter((comic) => !comic.hidden)
    .map((comic, index) => ({
      ...comic,
      rank: index + 1
    }))
}