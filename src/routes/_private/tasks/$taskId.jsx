import { createFileRoute } from '@tanstack/react-router'
import Frame from '../../../ui/Divs/Frame'

export const Route = createFileRoute('/_private/tasks/$taskId')({
  component: RouteComponent,
})
//back={true} 
function RouteComponent() {
  return (
    <Frame back={true} css={'w-full mx-5'}>
      <div>Hello "/_private/tasks/$cardId"!</div>
    </Frame>
  )
}
