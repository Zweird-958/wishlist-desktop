import { commonAtom } from "@/web/atom/language"
import Page from "@/web/components/Page"
import ShareWishlist from "@/web/components/ShareWishlist"
import UnshareWishlist from "@/web/components/UnshareWishlist"
import UsersListbox from "@/web/components/UsersListbox"
import useUsersSharedWith from "@/web/hooks/useUsersSharedWith"
import useWishlistShared from "@/web/hooks/useWishlistShared"
import User from "@/web/types/User"
import {
  ChevronRightIcon,
  PlusIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline"
import { Button, useDisclosure } from "@nextui-org/react"
import { useAtom } from "jotai"
import { useRouter } from "next/router"
import { useState } from "react"

const Share = () => {
  const { wishlistShared, isFetching } = useWishlistShared()
  const { usersSharedWith, isFetching: usersSharedFetching } =
    useUsersSharedWith()
  const router = useRouter()
  const [common] = useAtom(commonAtom)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure()
  const {
    isOpen: isOpenUnshare,
    onOpen: onOpenUnshare,
    onClose: onCloseUnshare,
    onOpenChange: onOpenChangeUnshare,
  } = useDisclosure()

  return (
    <Page>
      <div className="flex justify-center mt-10 flex-col items-center gap-8">
        <UsersListbox
          title={common.sharedWishlist}
          users={wishlistShared}
          isFetching={isFetching}
          action={(key) => {
            void router.push(`/wishlist/${key}`)
          }}
          endContent={<ChevronRightIcon className="w-4" />}
        />
        <UsersListbox
          title={common.usersSharedWith}
          users={usersSharedWith}
          isFetching={usersSharedFetching}
          action={(key) => {
            const user = usersSharedWith.find(({ id }) => id === Number(key))

            if (!user) {
              return
            }

            setSelectedUser(user)
            onOpenUnshare()
          }}
          listboxColor="danger"
          endContent={<XMarkIcon className="w-4" />}
        />
      </div>
      <ShareWishlist
        isOpen={isOpen}
        onClose={onClose}
        onOpenChange={onOpenChange}
      />
      <UnshareWishlist
        isOpen={isOpenUnshare}
        onClose={onCloseUnshare}
        onOpenChange={onOpenChangeUnshare}
        user={selectedUser}
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
