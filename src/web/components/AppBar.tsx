import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react"
import { I18NLink, localize } from "i18next-ssg"
import { useTranslation } from "next-i18next"
import { useRouter } from "next/router"
import useSession from "../hooks/useSession"
import SelectLanguage from "./SelectLanguage"

const AppBar = () => {
  const router = useRouter()
  const { t } = useTranslation()

  const { session, signOut } = useSession()

  const handleSignOut = async () => {
    await signOut()
    void router.push(localize("/sign-in"))
  }

  return (
    <Navbar>
      <NavbarBrand as={I18NLink} href={"/"}>
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
                {t("logout")}
              </Button>
            </NavbarItem>
            {/* <NavbarItem as={Link} href="/profile">
              <Avatar />
            </NavbarItem> */}
          </>
        ) : (
          <>
            <NavbarItem as={I18NLink} href="/sign-in">
              <Button color="primary" variant="bordered">
                {t("login")}
              </Button>
            </NavbarItem>
            <NavbarItem as={I18NLink} href="/sign-up">
              <Button color="success">{t("register")}</Button>
            </NavbarItem>
          </>
        )}
      </NavbarContent>
    </Navbar>
  )
}

export default AppBar
