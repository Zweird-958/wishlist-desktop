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

  const handleSignOut = async () => {
    await signOut()
    void router.push("/sign-in")
  }

  return (
    <Navbar>
      <NavbarBrand>
        <Link className="font-bold hidden sm:block text-inherit" href="/">
          My Wishlist
        </Link>
      </NavbarBrand>

      <NavbarContent justify="end">
        {session ? (
          <>
            <NavbarItem>
              <Button color="danger" onPress={() => handleSignOut}>
                Se déconnecter
              </Button>
            </NavbarItem>
            <NavbarItem as={Link} href="/profile">
              <Avatar />
            </NavbarItem>
          </>
        ) : (
          <>
            <NavbarItem as={Link} href="/sign-in">
              <Button color="primary" variant="bordered">
                Se connecter
              </Button>
            </NavbarItem>
            <NavbarItem as={Link} href="/sign-up">
              <Button color="success">S'inscrire</Button>
            </NavbarItem>
          </>
        )}
      </NavbarContent>
    </Navbar>
  )
}

export default AppBar
