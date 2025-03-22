import type React from "react"
import { TimeProps } from "./type"

/**
 * `Time` is a React functional component that displays a time-related information block.
 * It shows a title and a time value within a styled container.
 *
 * @component
 * @param {Object} props - The props object.
 * @param {string} props.title - The title to be displayed above the time.
 * @param {string} props.time - The time value to be displayed.
 *
 * @example
 * ```tsx
 * <Time title="Current Time" time="12:00 PM" />
 * ```
 *
 * @returns {JSX.Element} A styled time display component.
 */
const Time: React.FC<TimeProps> = ({ title, time }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-2 bg-background-orange-1 rounded-2xl w-[122px] h-[110px] p-4">
      <div className="px-4 py-1.5 bg-white/30 rounded-full">
        <span className="text-while-text text-sm font-medium">{title}</span>
      </div>
      <div className="text-while-text text-32px font-700 leading-32px">{time}</div>
    </div>
  )
}

export default Time
