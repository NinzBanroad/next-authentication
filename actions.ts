"use server"

import { sessionOptions, SessionData, defaultSession } from "@/lib";
import { error } from "console";
import { getIronSession } from 'iron-session';
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

let username = "ivy"
let isPro = true
let isBlocked = true
  
 export const getSession = async () => {
    // const session = await getIronSession<SessionData>(cookies(), sessionOptions);
    const cookiesData = await cookies();  // Await the cookies Promise
    const session = await getIronSession<SessionData>(cookiesData, sessionOptions);

    if (!session.isLoggedIn){
      session.isLoggedIn = defaultSession.isLoggedIn;
    }

    //Check the user in the DB
    //This is to check if the user is blocked by administrator or if the premium is removed by the administrator
    session.isBlocked = isBlocked
    session.isPro = isPro

    return session;
  }

export const login = async (prevState: {error: undefined | string}, formData: FormData) => {
  const session = await getSession()

  const formUsername = formData.get("username") as string
  const formPassword = formData.get("password") as string

  //CHECK USER IN THE DB
  // const user = await db.getUser({ username, password })

  if (formUsername !== username) {
    return { error: "Wrong Credentials"}
  }

  session.userId = "1";
  session.username = formUsername;
  session.isPro = isPro;
  session.isLoggedIn = true;

  await session.save()
  redirect("/")
} 

export const logout = async () => {
  const session = await getSession()

  session.destroy();
  redirect("/")
}

//update premium status and save after
export const changePremiumStatus = async () => {
  const session = await getSession()
  
  session.isPro ? session.isPro = false : session.isPro = isPro

  await session.save()
  revalidatePath("/profile")
}

//update the current username in the session
export const updateUsername = async (formData: FormData) => {
  const session = await getSession()
  
  const formUsername = formData.get("username") as string

  session.username = formUsername

  await session.save()
  revalidatePath("/profile") //will validate the whole page of the profile path
}