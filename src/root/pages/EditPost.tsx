import PostForm from "@/components/forms/PostForm"
import Loader from "@/components/shared/Loader";
import { useGetPostById } from "@/lib/react-query/quriesAndMutations";
import { useParams } from "react-router-dom"


const EditPost = () => {

  const { id } = useParams();
  console.log(id)
  const { data: post, isPending } = useGetPostById(id || '');

  if (isPending)
    return (
      <div className="flex-center w-full h-full">
        <Loader />
      </div>
    );


  return (
    <div className='flex flex-1'>

      <div className='common-container'>

        <div className='max-w-5xl flex-start gap-3 justify-start w-full'>
          <img
          src='/assets/icons/add-post.svg'
          width={30}
          height={30}
          alt='add'/>
          <h2 className='h3-bold md:h2-bold text-left w-full'>Create Post</h2>
        </div>

       <PostForm action="Update" post={post}/>

      </div>

    </div>
  )
}

export default EditPost