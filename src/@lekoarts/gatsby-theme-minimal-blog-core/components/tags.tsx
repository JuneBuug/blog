type Props = {
  data: {
    allPost: {
      group: {
        fieldValue: string
        totalCount: number
      }[]
    }
  }
  [key: string]: any
}

export default function MinimalBlogCoreTags({ ...props }: Props) {
  const {
    data: { allPost },
  } = props

  return <Tags list={allPost.group} {...props} />
}