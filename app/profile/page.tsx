import { changePremiumStatus, getSession, updateUsername } from "@/actions"
import { redirect } from "next/navigation";

const ProfilePage = async () => {
   const session = await getSession();

   if (!session.isLoggedIn){
    redirect("/")
   }

  return (
    <div className="profile">
      <h1>Welcome to Profile Page</h1>
      <p>Welcome <b>{session.username}</b></p>
      <span>You are a <b>{session.isPro ? "Premium" : "Free"}</b> user.</span>
      <form action={changePremiumStatus}>
        <button>{session.isPro ? "Cancel" : "Buy"} Premium</button>
      </form>
      <form action={updateUsername}>
      <input type="text" name="username" required placeholder={session.username} />
        <button>Update Username</button>
      </form>
      </div>
  )
}

export default ProfilePage