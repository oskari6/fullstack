import { redirect } from "next/navigation";
import { getCurrentUser } from "../services/session";
import MeClient, { User } from "./MeClient";

export default async function MePage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return <MeClient user={user as User} />;
}
