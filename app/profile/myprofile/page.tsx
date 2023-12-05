"use client";
import { useEffect, useState } from "react";
import Body from "../../components/Body/Body";
import Load from "../../components/Load/load";
import Profile from "../../components/Profile/Profile";
import { useAuth } from "../../Contexts/AuthContext";
import { User } from "../../util/models";
import api from "../../util/api";
export default function MyProfile() {
  const [user, setUser] = useState()
  const auth = useAuth()

  async function load<User>(){
    setUser(await api.getUser(auth.id, auth.token))
  }

  useEffect(()=>{
      load()
  }, [auth])
  
  
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
