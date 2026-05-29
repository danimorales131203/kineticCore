const BASE_SEARCH_URL = 'https://archive.org/advancedsearch.php'
const BASE_METADATA_URL = 'https://archive.org/metadata'

const blockedWords = [
  'adult',
  'mature',
  'erotic',
  'sex',
  'romance',
  'horror',
  'nude',
  'pin-up',
  'pinup'
]

function isSafeComic(comic) {
  const title = (comic.title || comic.identifier || '').toLowerCase()

  return !blockedWords.some((word) => title.includes(word))
}

function isReadableImageFile(fileName) {
  const name = fileName.toLowerCase()

  return (
    (name.endsWith('.jpg') ||
      name.endsWith('.jpeg') ||
      name.endsWith('.png') ||
      name.endsWith('.jp2')) &&
    !name.includes('thumb') &&
    !name.includes('cover') &&
    !name.includes('itemimage')
  )
}

export async function getComicPages(identifier) {
  const response = await fetch(`${BASE_METADATA_URL}/${identifier}`)

  if (!response.ok) {
    throw new Error('Error loading comic pages')
  }

  const data = await response.json()

  return data.files
    .filter((file) => isReadableImageFile(file.name))
    .sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true }))
    .slice(0, 12)
    .map((file) => {
      return `https://archive.org/download/${identifier}/${encodeURIComponent(file.name)}`
    })
}

async function comicHasReadablePages(identifier) {
  const pages = await getComicPages(identifier)
  return pages.length > 0
}

export async function getTrendingComics() {
  const randomPage = Math.floor(Math.random() * 8) + 1

  const params = new URLSearchParams({
    q: '(superhero OR "super hero" OR "golden age comics" OR "public domain comics") AND comic AND mediatype:texts NOT adult NOT mature NOT erotic NOT romance NOT horror',
    sort: 'downloads desc',
    rows: '30',
    page: randomPage.toString(),
    output: 'json'
  })

  params.append('fl[]', 'identifier')
  params.append('fl[]', 'title')

  const response = await fetch(`${BASE_SEARCH_URL}?${params.toString()}`)

  if (!response.ok) {
    throw new Error('Error loading comics')
  }

  const data = await response.json()

  const safeComics = data.response.docs
    .filter(isSafeComic)
    .sort(() => Math.random() - 0.5)

  const readableComics = []

  for (const comic of safeComics) {
    if (readableComics.length >= 4) break

    const hasPages = await comicHasReadablePages(comic.identifier)

    if (hasPages) {
      readableComics.push(comic)
    }
  }

  return readableComics.map((comic, index) => {
    const title = comic.title || comic.identifier

    return {
      id: comic.identifier,
      title,
      rank: index + 1,
      cover: `https://archive.org/services/img/${comic.identifier}`
    }
  })
}