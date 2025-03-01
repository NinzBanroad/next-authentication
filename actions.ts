"use server"

import { sessionOptions, SessionData, defaultSession } from "@/lib";
import { error } from "console";
import { getIronSession } from 'iron-session';
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

let username = "ivy"
let isPro = true
  
 export const getSession = async () => {
    // const session = await getIronSession<SessionData>(cookies(), sessionOptions);
    const cookiesData = await cookies();  // Await the cookies Promise
    const session = await getIronSession<SessionData>(cookiesData, sessionOptions);

    if (!session.isLoggedIn){
      session.isLoggedIn = defaultSession.isLoggedIn;
    }
    return session;
  }

export const login = async (formData: FormData) => {
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
  session.destroy
  redirect("/premium")
}