export { getStaticProps, getStaticPaths } from "i18next-ssg/Redirect"
import Loading from "@/web/components/Loading"
import { useRootPathRedirect } from "i18next-ssg"

export default function Page() {
  useRootPathRedirect()

  return (
    <div className="flex items-center justify-center h-screen">
      <Loading />
    </div>
  )
}
