import Loader from "@/components/shared/Loader";
import UserCard from "@/components/shared/UserCard";
import { useToast } from "@/hooks/use-toast";
import { getCurrentUser } from "@/lib/appWrite/api";
import { useGetUsers } from "@/lib/react-query/quriesAndMutations";
import { useEffect, useState } from "react";


const AllUsers = () => {
  const { toast } = useToast();

  const [currentUser, setCurrentUser] = useState<any>()

  const fetchCurrentUser = async () => {
    const currentAccount = await getCurrentUser()
    setCurrentUser(currentAccount)

}

useEffect(()=>{fetchCurrentUser()})

  const { data: creators, isLoading, isError: isErrorCreators } = useGetUsers();
console.log(creators)
  if (isErrorCreators) {
    toast({ title: "Something went wrong." });
    
    return;
  }

  if(!currentUser){
    return(
      <div className="flex-center w-full h-full">
  <Loader />
</div>
  )
  }

  return (
    <div className="common-container">
      <div className="user-container">
        <h2 className="h3-bold md:h2-bold text-left w-full">All Users</h2>
        {isLoading && !creators ? (
          <Loader/>
        ) : (
          <ul className="user-grid">
            {creators?.documents.filter((item: any) => item.$id !== currentUser?.$id).map((creator) => (
              <li key={creator?.$id} className="flex-1 min-w-[200px] w-full  ">
                <UserCard user={creator} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AllUsers;
