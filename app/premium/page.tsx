import { getSession } from "@/actions"
import Link from "next/link"
import { redirect } from "next/navigation"

const PremiumPage = async () => {

  const session = await getSession()

  if (!session.isLoggedIn){
    redirect("/")
  }

  if(!session.isPro){
    return (
      <div className="notPremium">
        <h1>Only premium users can see the content!</h1>
        <Link href="/profile">Go to profile page to upgrade premium</Link>
        </div>
    )
  }

  return (
    <div className="premium">
      <h1>Welcome to Premium Page</h1>
      </div>
  )
}

export default PremiumPage