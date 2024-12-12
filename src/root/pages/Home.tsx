import Loader from "@/components/shared/Loader"
import PostCard from "@/components/shared/PostCard";
import UserCard from "@/components/shared/UserCard";
import { getCurrentUser } from "@/lib/appWrite/api";
import { useGetRecentPosts, useGetUsers } from "@/lib/react-query/quriesAndMutations"
import { Models } from "appwrite";
import { useEffect, useState } from "react";


const Home = () => {

  const { data: posts, 
    isPending :isPostLoading, 
    isError: isErrorPosts} = useGetRecentPosts();

  const { data: creators, 
    isPending: isUserLoading,
    isError: isErrorCreators,
  } = useGetUsers();

  const [currentUser, setCurrentUser] = useState<any>();

  const fetchCurrentUser = async () =>{
   const currentUser = await getCurrentUser()
    setCurrentUser(currentUser)
  }

  useEffect (()=>{fetchCurrentUser()})

  if (isErrorPosts || isErrorCreators) {
    return (
      <div className="flex flex-1">
        <div className="home-container">
          <p className="body-medium text-light-1">Something bad happened</p>
        </div>
        <div className="home-creators">
          <p className="body-medium text-light-1">Something bad happened</p>
        </div>
      </div>
    );
  }

  return (

    <div className="flex flex-1">
      <div className="home-container">
        <div className="home-posts">
          <h2 className="h3-bold md:h2-bold text-left w-full">Home Feed</h2>
          {isPostLoading && !posts ? (
            <div className="flex justify-center items-center h-full">
            <Loader />
          </div>
          ) : (
            <ul className=" flex flex-1 flex-col gap-9 w-full">
              {posts?.documents.map((post: Models.Document) => (
                <PostCard post={post}
                key={post.caption}
                />
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="home-creators">
        <h3 className="h3-bold text-light-1">Top Creators</h3>
        {isUserLoading && !creators ? (
          <div className="flex justify-center  h-full">
          <Loader />
        </div>
        ) : (
          <ul className="grid 2xl:grid-cols-2 gap-6">
            {creators?.documents.filter((item: any) => item.$id !== currentUser?.$id).map((creator) => (
              <li key={creator?.$id}>
                <UserCard user={creator} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default Home