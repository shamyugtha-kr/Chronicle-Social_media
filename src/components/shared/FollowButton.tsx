
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { followUser, getCurrentUser, unFollowUser } from "@/lib/appWrite/api";



type FollowButtonProps = {
    userId : string,

}

const FollowButton = ({userId, } : FollowButtonProps) => {

    const [currentUser, setCurrentUser] = useState<any>()

    

    const fetchCurrentUser = async () => {
        const currentAccount = await getCurrentUser()
        setCurrentUser(currentAccount)

    }

    useEffect(()=>{fetchCurrentUser()})

    if(!currentUser){
        return(
          <Button type="button" className="shad-button_primary px-8" onClick={() => {followUser(userId)}}>
          Follow
        </Button>
        )
    }

    if( currentUser?.$id === userId){
        return null
    }

  return (
    <> {currentUser?.following.indexOf(userId) !== -1 ?
    (<Button type="button" className="shad-button_primary px-8" onClick={() => {unFollowUser(userId)}}>
      Following
    </Button>) : (<Button type="button" className="shad-button_primary px-8" onClick={() => {followUser(userId)}}>
      Follow
    </Button>)
}</>
  );
};

export default FollowButton;
