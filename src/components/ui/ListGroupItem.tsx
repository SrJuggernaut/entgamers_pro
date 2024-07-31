import { cx } from '@/styled-system/css'
import { listGroup, type ListGroupVariantProps } from '@/styled-system/recipes/list-group'
import { type MergeOmitting } from '@/types/utilities'
import { type DetailedHTMLProps, type FC, type LiHTMLAttributes } from 'react'

type ComposedInputProps = MergeOmitting<DetailedHTMLProps<LiHTMLAttributes<HTMLLIElement>, HTMLLIElement>, ListGroupVariantProps>

const ListGroupItem: FC<ComposedInputProps> = ({ children, className, ...rest }) => {
  const [listGroupRecipeArgs, allOtherListGroupProps] = listGroup.splitVariantProps(rest)
  return (
    <li
      className={cx(listGroup(listGroupRecipeArgs).item, className)}
      {...allOtherListGroupProps}
    >
      {children}
    </li>
  )
}
export default ListGroupItem
