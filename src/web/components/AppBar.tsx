import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react"
import { useRouter } from "next/router"
import useSession from "../hooks/useSession"
import SelectLanguage from "./SelectLanguage"
import Link from "next/link"
import { useAtom } from "jotai"
import { commonAtom } from "../atom/language"

const AppBar = () => {
  const router = useRouter()
  const [common] = useAtom(commonAtom)

  const { session, signOut } = useSession()

  const handleSignOut = async () => {
    await signOut()
    void router.push("/sign-in")
  }

  return (
    <Navbar>
      <NavbarBrand as={Link} href={"/"}>
        <p className="font-bold hidden sm:block text-inherit">My Wishlist</p>
      </NavbarBrand>

      <NavbarContent justify="end">
        <NavbarItem>
          <SelectLanguage />
        </NavbarItem>
        {session ? (
          <>
            <NavbarItem>
              <Button color="danger" onPress={() => void handleSignOut()}>
                {common.logout}
              </Button>
            </NavbarItem>
            {/* <NavbarItem as={Link} href="/profile">
              <Avatar />
            </NavbarItem> */}
          </>
        ) : (
          <>
            <NavbarItem as={Link} href="/sign-in">
              <Button color="primary" variant="bordered">
                {common.login}
              </Button>
            </NavbarItem>
            <NavbarItem as={Link} href="/sign-up">
              <Button color="success">{common.register}</Button>
            </NavbarItem>
          </>
        )}
      </NavbarContent>
    </Navbar>
  )
}

export default AppBar
