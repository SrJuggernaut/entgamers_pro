import { cx } from '@/styled-system/css'
import { typography, type TypographyVariantProps } from '@/styled-system/recipes/typography'
import type { MergeOmitting } from '@/types/utilities'
import { type ElementType, type FC, type HTMLAttributes, createElement } from 'react'

type ComposedTypographyProps = MergeOmitting<HTMLAttributes<HTMLElement>, TypographyVariantProps>

export interface TypographyProps extends ComposedTypographyProps {
  component?: ElementType
}

const variantToComponent = (variant: TypographyVariantProps['variant']): ElementType => {
  switch (variant) {
    case 'h1':
    case 'h2':
    case 'h3':
    case 'h4':
    case 'h5':
    case 'h6':
      return variant
    case 'subtitle1':
    case 'subtitle2':
      return 'div'
    case 'button':
    case 'overline':
    case 'srOnly':
    case 'caption':
      return 'span'
    case 'body1':
    case 'body2':
    default:
      return 'p'
  }
}

const Typography: FC<TypographyProps> = ({ children, className, component, ...rest }) => {
  const [typographyRecipeArgs, allOtherTypographyProps] = typography.splitVariantProps(rest)
  typographyRecipeArgs.color = typographyRecipeArgs.color ?? (
    typeof typographyRecipeArgs.variant === 'string' && typographyRecipeArgs.variant.startsWith('h')
      ? 'primary'
      : 'inherit'
  )
  return createElement(
    component ?? variantToComponent(typographyRecipeArgs.variant),
    {
      className: cx(typography(typographyRecipeArgs), className),
      ...allOtherTypographyProps
    },
    children
  )
}

export default Typography
