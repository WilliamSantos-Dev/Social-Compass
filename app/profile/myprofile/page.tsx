"use client";
import Body from "../../components/Body/Body";
import Load from "../../components/Load/load";
import Profile from "../../components/Profile/Profile";
import { useAuth } from "../../Contexts/AuthContext";
export default function MyProfile() {
  const user = useAuth().user
  return (
    <>
      {user && (
        <div>
          <Body user={user} myprofile>
            <Profile user={user} myprofile></Profile>
          </Body>
        </div>
      )}
       {!user && <Load/> }
    </>
  );
}
