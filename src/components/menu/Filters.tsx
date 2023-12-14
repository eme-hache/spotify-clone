import { TAGS } from '@/utils/consts'

export default function Filters() {
  return (
    <div className="relative min-w-0 my-2 mx-4 overflow-hidden">
      <div
        className="whitespace-nowrap mask-image scroll-smooth flex items-center overflow-x-scroll overscroll-x-contain scrollbar-hide relative z-10"
      >
        {
          TAGS.map((tag) => (
            <button className="mr-2">
              <Tag slot={tag} />
            </button>
          ))
        }
      </div>

      <div
        className="absolute top-0 left-0 right-0 bottom-0 flex justify-between items-center"
      >
        <button className="rotate-180">
          {/* <ChevronIcon /> */}
        </button>

        <button
          className="bg-elevated-base hover:bg-elevated-highlight text-subtle hover:text-base-white duration-200 transition-all rounded-full flex items-center justify-center w-8 h-8 z-10"
          onClick={() => console.log('click')}
        >
          {/* <ChevronIcon /> */}
          <img src={'/icons/svg/chevron.svg'} alt="" />
        </button>
      </div>
    </div>
  )
}

function Tag({ slot }: { slot: string }) {
  return <span className="bg-elevated-base hover:bg-elevated-highlight text-subtle hover:text-base-white duration-200 transition-all rounded-full px-2 py-1">
    {slot}
  </span>
}