import axios from 'axios'
import { load } from 'cheerio'

async function fetchPosterSrc(tconst: string): Promise<string | undefined> {
  try {
    const url = `https://www.imdb.com/title/${tconst}`
    const { data } = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    })

    const $ = load(data)

    const posterDiv = $('.ipc-media.ipc-media--poster-27x40.ipc-image-media-ratio--poster-27x40.ipc-media--baseAlt.ipc-media--poster-l.ipc-poster__poster-image.ipc-media__img')

    const posterSrc = posterDiv.find('img').attr('src')

    return posterSrc || undefined
  } catch (error: any) {
    console.error('Error getting poster:', error.message)
    return undefined
  }
}

export default fetchPosterSrc