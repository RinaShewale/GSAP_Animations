/**
 * 8 × 20 grid. Two tiles per row, 20 imageIds × 2 each.
 * Hardcoded --r / --c; optional align for editorial stagger (tiles overlap rows).
 */
export const GRID_COLS = 8
export const GRID_ROWS = 20

/** Picsum IDs biased toward portraits / fashion-style photography */
const PORTRAIT_IDS = [
  64, 65, 177, 338, 399, 447, 453, 505, 669, 836, 1011, 1012, 1025, 1027, 1035, 1040, 1044, 1050, 1051, 1060,
]

export const gridPlacements = [
  { r: 1, c: 1, imageId: 1, align: 'start' },
  { r: 1, c: 6, imageId: 2, align: 'end' },
  { r: 2, c: 3, imageId: 3, align: 'center' },
  { r: 2, c: 8, imageId: 4, align: 'start' },
  { r: 3, c: 2, imageId: 5, align: 'end' },
  { r: 3, c: 5, imageId: 6, align: 'center' },
  { r: 4, c: 7, imageId: 7, align: 'start' },
  { r: 4, c: 1, imageId: 8, align: 'end' },
  { r: 5, c: 4, imageId: 9, align: 'center' },
  { r: 5, c: 8, imageId: 10, align: 'start' },
  { r: 6, c: 2, imageId: 11, align: 'end' },
  { r: 6, c: 6, imageId: 12, align: 'center' },
  { r: 7, c: 3, imageId: 13, align: 'start' },
  { r: 7, c: 7, imageId: 14, align: 'end' },
  { r: 8, c: 1, imageId: 15, align: 'center' },
  { r: 8, c: 5, imageId: 16, align: 'start' },
  { r: 9, c: 4, imageId: 17, align: 'end' },
  { r: 9, c: 8, imageId: 18, align: 'center' },
  { r: 10, c: 2, imageId: 19, align: 'start' },
  { r: 10, c: 6, imageId: 20, align: 'end' },
  { r: 11, c: 7, imageId: 1, align: 'center' },
  { r: 11, c: 2, imageId: 2, align: 'start' },
  { r: 12, c: 4, imageId: 3, align: 'end' },
  { r: 12, c: 8, imageId: 4, align: 'center' },
  { r: 13, c: 1, imageId: 5, align: 'start' },
  { r: 13, c: 5, imageId: 6, align: 'end' },
  { r: 14, c: 3, imageId: 7, align: 'center' },
  { r: 14, c: 6, imageId: 8, align: 'start' },
  { r: 15, c: 2, imageId: 9, align: 'end' },
  { r: 15, c: 8, imageId: 10, align: 'center' },
  { r: 16, c: 4, imageId: 11, align: 'start' },
  { r: 16, c: 7, imageId: 12, align: 'end' },
  { r: 17, c: 1, imageId: 13, align: 'center' },
  { r: 17, c: 6, imageId: 14, align: 'start' },
  { r: 18, c: 3, imageId: 15, align: 'end' },
  { r: 18, c: 8, imageId: 16, align: 'center' },
  { r: 19, c: 5, imageId: 17, align: 'start' },
  { r: 19, c: 2, imageId: 18, align: 'end' },
  { r: 20, c: 7, imageId: 19, align: 'center' },
  { r: 20, c: 4, imageId: 20, align: 'start' },
]

export function imageSrc(imageId) {
  const id = PORTRAIT_IDS[(imageId - 1) % PORTRAIT_IDS.length]
  return `https://picsum.photos/id/${id}/900/900`
}
