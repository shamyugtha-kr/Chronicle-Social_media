import Loader from "@/components/shared/Loader";
import UserCard from "@/components/shared/UserCard";
import { useToast } from "@/hooks/use-toast";
import { useGetUsers } from "@/lib/react-query/quriesAndMutations";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

const AllUsers = () => {
  const { ref, inView } = useInView();

  const { toast } = useToast();

  const {
    data: users,
    isLoading,
    isError: isErrorCreators,
    fetchNextPage,
    hasNextPage,
  } = useGetUsers();
  useEffect(() => {
    if (inView) fetchNextPage();
  }, [inView]);
  console.log("hoo", users);
  if (!users)
    return (
      <div className="flex-center w-full h-full">
        <Loader />
      </div>
    );

  if (isErrorCreators) {
    toast({ title: "Something went wrong." });
    return;
  }

  return (
    <div className="common-container">
      <div className="user-container">
        <h2 className="h3-bold md:h2-bold text-left w-full">All Users</h2>
        {isLoading && !users ? (
          <Loader />
        ) : (
          <ul className="user-grid">
            {users?.pages.map((page, pageIndex) =>
              page.documents?.map((user: any) => (
                <li
                  key={`page-${pageIndex}-user-${user?.$id}`}
                  className="flex-1 min-w-[200px] w-full"
                >
                  <UserCard user={user} />
                </li>
              ))
            )}
          </ul>
        )}
      </div>
      {hasNextPage && (
        <div ref={ref} className="mt-10">
          <Loader />
        </div>
      )}
    </div>
  );
};

export default AllUsers;
