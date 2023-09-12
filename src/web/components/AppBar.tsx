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
import { useRouter } from "next/router"
import useSession from "../hooks/useSession"
import SelectLanguage from "./SelectLanguage"
import Link from "next/link"
import { useAtom } from "jotai"
import { commonAtom } from "../atom/language"
import ShareWishlist from "./ShareWishlist"
import useWishlistShared from "../hooks/useWishlistShared"
import { D } from "@tauri-apps/api/path-c062430b"

const AppBar = () => {
  const router = useRouter()
  const [common] = useAtom(commonAtom)

  const { session, signOut } = useSession()

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
