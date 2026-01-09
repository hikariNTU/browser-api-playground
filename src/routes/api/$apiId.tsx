import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/api/$apiId')({
  component: ApiLayoutRoute,
})

function ApiLayoutRoute() {
  return <Outlet />
}
