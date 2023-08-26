import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react"
import { useTranslation } from "next-i18next"
import Link from "next/link"
import { useRouter } from "next/router"
import useSession from "../hooks/useSession"
import SelectLanguage from "./SelectLanguage"

const AppBar = () => {
  const router = useRouter()
  const { t } = useTranslation()

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
        <NavbarItem>
          <SelectLanguage />
        </NavbarItem>
        {session ? (
          <>
            <NavbarItem>
              <Button color="danger" onPress={() => void handleSignOut()}>
                {t("logout")}
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
                {t("login")}
              </Button>
            </NavbarItem>
            <NavbarItem as={Link} href="/sign-up">
              <Button color="success">{t("register")}</Button>
            </NavbarItem>
          </>
        )}
      </NavbarContent>
    </Navbar>
  )
}

export default AppBar
