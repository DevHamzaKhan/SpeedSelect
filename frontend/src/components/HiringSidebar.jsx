import { Link } from "react-router-dom"

const HiringSidebar = () => {
  return (
    <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
      <nav
        className="grid gap-4 text-sm text-muted-foreground"
      >
        <Link href="#" className="font-semibold text-primary">
          General
        </Link>
        <Link href="#">Security</Link>
        <Link href="#">Integrations</Link>
        <Link href="#">Support</Link>
        <Link href="#">Organizations</Link>
        <Link href="#">Advanced</Link>
      </nav>
    </div>
  )
}

export default HiringSidebar