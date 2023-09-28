import { ShareIcon } from "@heroicons/react/24/outline"
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Spinner,
  useDisclosure,
} from "@nextui-org/react"
import { useAtom } from "jotai"
import { Moon } from "lucide-react"
import { useTheme } from "next-themes"
import Link from "next/link"
import { useRouter } from "next/router"
import { useState } from "react"
import { commonAtom } from "../atom/language"
import useSession from "../hooks/useSession"
import useWishlistShared from "../hooks/useWishlistShared"
import SelectLanguage from "./SelectLanguage"
import ShareWishlist from "./ShareWishlist"
import { Theme } from "../types/Theme"

const AppBar = () => {
  const router = useRouter()
  const [common] = useAtom(commonAtom)

  const { session, signOut } = useSession()
  const { theme, setTheme } = useTheme()

  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure()
  const {
    isFetching,
    usersShared,
    setCurrentWishlistShared,
    wishlistMutation,
  } = useWishlistShared()

  const handleSignOut = async () => {
    await signOut()
    void router.push("/sign-in")
  }

  const [selectedKeys, setSelectedKeys] = useState(new Set([theme ?? "system"]))

  return (
    <>
      <Navbar>
        <NavbarBrand
          as={Link}
          href={"/"}
          onClick={() => void setCurrentWishlistShared(null)}
        >
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
              <Dropdown>
                <NavbarItem>
                  <DropdownTrigger>
                    <Button isIconOnly>
                      <ShareIcon className="w-6" />
                    </Button>
                  </DropdownTrigger>
                </NavbarItem>
                <DropdownMenu
                  aria-label="actions"
                  onAction={(key) => {
                    if (key === "myWishlist") {
                      setCurrentWishlistShared(null)
                      setTimeout(() => {
                        void router.push("/")
                      }, 1000)
                    } else if (key === "more") {
                      setTimeout(() => {
                        void router.push("/share")
                      }, 1000)
                    } else if (key !== "shareWishlist") {
                      wishlistMutation.mutate(key as string)
                    }
                  }}
                >
                  <DropdownSection showDivider>
                    <DropdownItem key={"myWishlist"}>
                      {common.myWishlist}
                    </DropdownItem>
                  </DropdownSection>
                  <DropdownSection title={common.sharedWishlist} showDivider>
                    {isFetching ? (
                      <DropdownItem key={"spinner"}>
                        <Spinner size="sm" />
                      </DropdownItem>
                    ) : (
                      usersShared
                        .slice(0, 2)
                        .map((user) => (
                          <DropdownItem key={user.id}>
                            {user.username}
                          </DropdownItem>
                        ))
                    )}
                  </DropdownSection>
                  <DropdownSection showDivider>
                    <DropdownItem key={"more"}>{common.seeMore}</DropdownItem>
                  </DropdownSection>
                  <DropdownSection title={common.share}>
                    <DropdownItem
                      key={"shareWishlist"}
                      onClick={onOpen}
                      className="text-primary"
                    >
                      {common.shareWishlist}
                    </DropdownItem>
                  </DropdownSection>
                </DropdownMenu>
              </Dropdown>
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
                  <Moon className="w-6" />
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
              <DropdownItem key="system">System</DropdownItem>
              <DropdownItem key="dark">Dark</DropdownItem>
              <DropdownItem key="light">Light</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarContent>
      </Navbar>
      <ShareWishlist
        isOpen={isOpen}
        onClose={onClose}
        onOpenChange={onOpenChange}
      />
    </>
  )
}

export default AppBar
