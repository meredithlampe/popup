// import { withDocument } from 'part:@sanity/form-builder'
import { useFormValue } from 'sanity'

export const MyCustomStringInput = (props) => {
  const artistSlug = useFormValue(['artist'])
  return <div>Value: {props.value}</div>
}
