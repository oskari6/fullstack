import { getCurrentUser } from "../services/session";
import MeClient, { User } from "./MeClient";

export default async function MePage() {
  const user = await getCurrentUser();
  if (!user) {
    return null;
  }

  return <MeClient user={user as User} />;
}
