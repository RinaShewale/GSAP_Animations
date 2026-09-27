import { imageSrc } from '../data/gridPlacements'

const alignClass = {
  start: 'place-self-start',
  center: 'place-self-center',
  end: 'place-self-end',
}

export default function GridTile({ r, c, imageId, align = 'center' }) {
  return (
    <div
      className={`grid-tile [grid-row:var(--r)] [grid-column:var(--c)] aspect-square size-[clamp(3.75rem,18vw,13.5rem)] overflow-hidden bg-neutral-900 will-change-transform ${alignClass[align] ?? alignClass.center}`}
      style={{
        '--r': r,
        '--c': c,
        gridRow: r,
        gridColumn: c,
      }}
    >
      <img
        src={imageSrc(imageId)}
        alt=""
        className="h-full w-full object-cover select-none pointer-events-none"
        loading="lazy"
        draggable={false}
      />
    </div>
  )
}