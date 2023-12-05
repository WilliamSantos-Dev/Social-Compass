"use client";
import { useEffect, useState } from "react";
import Profile from "../../components/Profile/Profile";
import api from "../../util/api";
import { User } from "../../util/models";
import Load from "../../components/Load/load";
import Body from "../../components/Body/Body";
import { useRouter } from "next/navigation";
import { useAuth } from "../../Contexts/AuthContext";

type Props = { params: { id: string } };

export default function UserProfile({ params }: Props) {
  const auth = useAuth()
  const [user, setUser] = useState<User>();
  const [userDisplayed, setUserDisplayed] = useState<User>();
  const id = params.id;
  const {push} = useRouter()

  if(user && user?.id === userDisplayed?.id){
    push("/profile/myprofile")
  }

  async function load() {
    setUser(
      (await api.getUser(
        auth.id,
        auth.token
      )) as User
    );
    setUserDisplayed(
      (await api.getUser(id, auth.token)) as User
    );
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div>
      {user && userDisplayed &&(
        <Body user={user}>
          <Profile user={userDisplayed} />
        </Body>
      )}

      {!user && <Load />}
    </div>
  );
}
