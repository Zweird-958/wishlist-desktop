import {
  Avatar,
  Button,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react"
import Link from "next/link"
import { useContext, useRef } from "react"
import AppContext from "./AppContext"

const AppBar = () => {
  const parentRef = useRef(null)
  const {
    state: { session },
    actions: { signOut },
  } = useContext(AppContext)

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
      fn: signOut,
      props: { color: "danger" },
    },
    {
      href: "/profile",
      authRequired: true,
      component: <Avatar />,
    },
  ]

  return (
    <Navbar parentRef={parentRef}>
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
                <Button {...props} onPress={fn} key={index}>
                  {label}
                </Button>
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
        {/* {session ? (
          <NavbarItem as={Link} href="profile">
            <Avatar />
          </NavbarItem>
        ) : (
          <>
            <NavbarItem as={Link} href="sign-in">
              Se connecter
            </NavbarItem>
            <NavbarItem as={Link} href="sign-up">
              S'inscire
            </NavbarItem>
          </>
        )} */}
      </NavbarContent>
    </Navbar>
  )
}

export default AppBar
