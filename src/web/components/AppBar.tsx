import {
  Avatar,
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
  } = useContext(AppContext)

  return (
    <Navbar parentRef={parentRef}>
      <NavbarBrand>
        <Link className="font-bold hidden sm:block text-inherit" href="/">
          My Wishlist
        </Link>
      </NavbarBrand>

      <NavbarContent justify="end">
        {session ? (
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
        )}
      </NavbarContent>
    </Navbar>
  )
}

export default AppBar
