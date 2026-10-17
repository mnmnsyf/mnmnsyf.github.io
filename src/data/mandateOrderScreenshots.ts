export interface Screenshot {
  src: string
  alt: string
}

/** Official screenshots from the game's Steam store, retrieved 2026-10-17. */
export const mandateOrderScreenshotSource = 'https://store.steampowered.com/app/1733690/'
export const mandateOrderScreenshots: Screenshot[] = [
  {
    src: '/mandate-order-steam-1.jpg',
    alt: 'Mandate Order — fortified settlement in an autumn mountain landscape',
  },
  {
    src: '/mandate-order-steam-2.jpg',
    alt: 'Mandate Order — farmland, irrigation paths, and a riverside settlement',
  },
  {
    src: '/mandate-order-steam-3.jpg',
    alt: 'Mandate Order — archers attacking a fortified settlement',
  },
  {
    src: '/mandate-order-steam-4.jpg',
    alt: 'Mandate Order — snow-covered city and surrounding mountain terrain',
  },
]
