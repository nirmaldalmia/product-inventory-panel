import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="p-4 flex gap-4">
        <Link to="/products" className="[&.active]:font-bold">
          Products
        </Link>
        <Link to="/products/new" className="[&.active]:font-bold">
          Add Product
        </Link>
      </div>
      <hr />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
}) 