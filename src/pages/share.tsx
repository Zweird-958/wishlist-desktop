import { commonAtom } from "@/web/atom/language"
import Page from "@/web/components/Page"
import useWishlistShared from "@/web/hooks/useWishlistShared"
import { Listbox, ListboxItem, ListboxSection } from "@nextui-org/react"
import { useAtom } from "jotai"
import { useRouter } from "next/router"

const Share = () => {
  const { usersShared, wishlistMutation } = useWishlistShared()
  const router = useRouter()
  const [common] = useAtom(commonAtom)

  return (
    <Page>
      <div className="flex justify-center mt-10">
        <div className="w-full max-w-[280px] border-small px-1 py-2 rounded-small border-default-200">
          <Listbox
            aria-label="users"
            onAction={(key) => {
              wishlistMutation.mutate(key as string)
              void router.push("/")
            }}
          >
            <ListboxSection title={common.sharedWishlist}>
              {usersShared.map((user) => (
                <ListboxItem key={user.id}>{user.username}</ListboxItem>
              ))}
            </ListboxSection>
          </Listbox>
        </div>
      </div>
    </Page>
  )
}

export default Share
