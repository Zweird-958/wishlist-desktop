import { ShareIcon } from "@heroicons/react/24/outline"
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react"
import { useAtom } from "jotai"
import { MoonIcon } from "@heroicons/react/24/outline"
import { useTheme } from "next-themes"
import Link from "next/link"
import { useRouter } from "next/router"
import { useState } from "react"
import { commonAtom } from "../atom/language"
import useSession from "../hooks/useSession"
import { Theme } from "../types/Theme"
import SelectLanguage from "./SelectLanguage"

const AppBar = () => {
  const router = useRouter()
  const [common] = useAtom(commonAtom)

  const { session, signOut } = useSession()
  const { theme, setTheme } = useTheme()

  const handleSignOut = async () => {
    await signOut()
    void router.push("/sign-in")
  }

  const [selectedKeys, setSelectedKeys] = useState(new Set([theme ?? "system"]))

  return (
    <>
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
              <NavbarItem>
                <Button isIconOnly as={Link} href="/share">
                  <ShareIcon className="w-6" />
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
          <Dropdown>
            <NavbarItem>
              <DropdownTrigger>
                <Button isIconOnly>
                  <MoonIcon className="w-6" />
                </Button>
              </DropdownTrigger>
            </NavbarItem>
            <DropdownMenu
              aria-label="theme"
              variant="flat"
              disallowEmptySelection
              selectionMode="single"
              selectedKeys={selectedKeys}
              onAction={(key) => {
                setSelectedKeys(new Set([key as Theme]))
                setTheme(key as Theme)
              }}
            >
              <DropdownItem key="system">{common.system}</DropdownItem>
              <DropdownItem key="dark">{common.dark}</DropdownItem>
              <DropdownItem key="light">{common.light}</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarContent>
      </Navbar>
    </>
  )
}

export default AppBar
