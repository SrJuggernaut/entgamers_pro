import { cx } from '@/styled-system/css'
import { listGroup, type ListGroupVariantProps } from '@/styled-system/recipes/list-group'
import { type MergeOmitting } from '@/types/utilities'
import { type DetailedHTMLProps, type FC, type HTMLAttributes } from 'react'

type ComposedInputProps = MergeOmitting<DetailedHTMLProps<HTMLAttributes<HTMLUListElement>, HTMLUListElement>, ListGroupVariantProps>

const ListGroup: FC<ComposedInputProps> = ({ children, className, ...rest }) => {
  const [listGroupRecipeArgs, allOtherListGroupProps] = listGroup.splitVariantProps(rest)
  return (
    <ul
      className={cx(listGroup(listGroupRecipeArgs).root, className)}
      {...allOtherListGroupProps}
    >
      {children}
    </ul>
  )
}

export default ListGroup
