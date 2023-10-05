import { commonAtom } from "@/web/atom/language"
import { PlusIcon } from "@heroicons/react/24/outline"
import Loading from "@/web/components/Loading"
import Page from "@/web/components/Page"
import ShareWishlist from "@/web/components/ShareWishlist"
import useWishlistShared from "@/web/hooks/useWishlistShared"
import {
  Button,
  Listbox,
  ListboxItem,
  ListboxSection,
  useDisclosure,
} from "@nextui-org/react"
import { useAtom } from "jotai"
import { useRouter } from "next/router"

const Share = () => {
  const { usersShared, isFetching } = useWishlistShared()
  const router = useRouter()
  const [common] = useAtom(commonAtom)
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure()

  return (
    <Page>
      <div className="flex justify-center mt-10">
        <div className="w-full max-w-[280px] border-small px-1 py-2 rounded-small border-default-200">
          <Listbox
            aria-label="users"
            onAction={(key) => {
              void router.push(`/wishlist/${key}`)
            }}
          >
            <ListboxSection title={common.sharedWishlist}>
              {isFetching ? (
                <ListboxItem key={"loader"}>
                  <Loading />
                </ListboxItem>
              ) : (
                usersShared.map((user) => (
                  <ListboxItem key={user.id}>{user.username}</ListboxItem>
                ))
              )}
            </ListboxSection>
          </Listbox>
        </div>
      </div>
      <ShareWishlist
        isOpen={isOpen}
        onClose={onClose}
        onOpenChange={onOpenChange}
      />
      <Button
        onPress={onOpen}
        isIconOnly
        className="z-20 fixed right-5 bottom-5"
        color={"primary"}
      >
        <PlusIcon className="w-6" />
      </Button>
    </Page>
  )
}

export default Share
