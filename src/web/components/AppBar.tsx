import {
  Avatar,
  Button,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react"
import Link from "next/link"
import { useRouter } from "next/router"
import useSession from "../hooks/useSession"

const AppBar = () => {
  const router = useRouter()

  const { session, signOut } = useSession()

  const pages = [
    {
      label: "Se connecter",
      href: "/sign-in",
      hideIfAuth: true,
      props: { color: "primary", variant: "bordered" },
    },
    {
      label: "S'inscrire",
      href: "/sign-up",
      hideIfAuth: true,
      props: { color: "success" },
    },
    {
      label: "Se déconnecter",
      authRequired: true,
      fn: async () => {
        signOut()
        await router.push("/sign-in")
      },
      props: { color: "danger" },
    },
    {
      href: "/profile",
      authRequired: true,
      component: <Avatar />,
    },
  ]

  return (
    <Navbar>
      <NavbarBrand>
        <Link className="font-bold hidden sm:block text-inherit" href="/">
          My Wishlist
        </Link>
      </NavbarBrand>

      <NavbarContent justify="end">
        {pages.map(
          (
            { label, href, authRequired, hideIfAuth, fn, component, props },
            index
          ) => {
            if ((authRequired && !session) || (hideIfAuth && session)) {
              return
            }

            if (fn) {
              return (
                <NavbarItem key={index}>
                  <Button {...props} onPress={fn}>
                    {label}
                  </Button>
                </NavbarItem>
              )
            } else {
              return (
                <NavbarItem as={Link} href={href} key={index}>
                  {component ? component : <Button {...props}>{label}</Button>}
                </NavbarItem>
              )
            }
          }
        )}
      </NavbarContent>
    </Navbar>
  )
}

export default AppBar
