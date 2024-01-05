import { cx } from '@/styled-system/css'
import { tooltip, type TooltipVariantProps } from '@/styled-system/recipes/tooltip'
import { type MergeOmitting } from '@/types/utilities'
import { type DetailedHTMLProps, type FC, type HTMLAttributes, type ReactNode } from 'react'

type ComposedTooltipProps = MergeOmitting<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, TooltipVariantProps> & {
  title: ReactNode
}

const Tooltip: FC<ComposedTooltipProps> = ({ children, className, title, ...rest }) => {
  const [tooltipRecipeArgs, allOtherTooltipProps] = tooltip.splitVariantProps(rest)
  return (
    <div
      className={cx(tooltip(tooltipRecipeArgs), className)}
      {...allOtherTooltipProps}
    >
      {children}
      <span
        className="tooltip__content"
        aria-hidden="true"
      >
        {title}
      </span>
    </div>
  )
}

export default Tooltip
