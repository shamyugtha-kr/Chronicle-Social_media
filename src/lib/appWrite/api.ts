import { INewPost, INewUser, IUser } from "@/types";
import { account, appwriteConfig, avatars, databases, storage } from "./config";
import { ID, ImageGravity, Query } from "appwrite";




export async function createUserAccount(user: INewUser) {
    try{
        const newAccount = await account.create(
            ID.unique(),
            user.email,
            user.password,
            user.name
        )
        
        if(!newAccount) throw Error;

        const avatarUrl = avatars.getInitials(user.name);

        const newUser = await saveUserToDB({
            accountId:newAccount.$id,
            name: newAccount.name,
            email: newAccount.email,
            username: user.username,
            imageUrl:avatarUrl
            
        })
        return newUser

    }
    catch(error){
        console.log(JSON.stringify(error));
        return error;
    }
}

export async function saveUserToDB(user: {
    accountId : string;
    email : string;
    name : string;
    imageUrl: string;
    username ?: string; 
}) {
    try{
        const newUser = await databases.createDocument(
            appwriteConfig.databaseID,
            appwriteConfig.userCollectionID,
            ID.unique(),
            user,
        );
        return newUser;

    }
    catch(error){
        console.log(JSON.stringify(error));
    }

}

export async function SignInAccount(user: {
    email:string;
    password:string;
}){
    try{
        const session = await account.createEmailPasswordSession( user.email, user.password)
return session;
    }
    catch(error){
console.log(error)
    }
}

export async function getCurrentUser(): Promise<IUser | null> {
    try {
      const currentAccount = await account.get();
  
      // If no current account is found, return null
      if (!currentAccount) return null;
  
      const currentUser = await databases.listDocuments(
        appwriteConfig.databaseID,
        appwriteConfig.userCollectionID,
        [Query.equal('accountId', currentAccount.$id)]
      );
  
      // If no user is found, return null
      if (!currentUser || currentUser.documents.length === 0) return null;
  
      // Return the first document found as IUser
      const userDoc = currentUser.documents[0];
  
      // Assuming the document matches the IUser structure
      const user: IUser = {
        id: userDoc.accountId, // Assuming accountId maps to id in IUser
        name: userDoc.name,
        username: userDoc.username,
        email: userDoc.email,
        imageUrl: userDoc.imageUrl,
        bio: userDoc.bio,
      };
  
      return user;  // Successfully return the user as IUser
  
    } catch (error) {
      console.error('Error fetching current user:', error);
      return null;  // Return null in case of any errors
    }
  }

export async function SignOutAccount(){
    try{
        const session = await account.deleteSession("current");
        return session;

    }
    catch(error){
        console.log(error)
    }

}

export async function createPost(post: INewPost){
    try{
        //upload img to storage
        const uploadedFile = await uploadFile(post.file[0])

        if(!uploadedFile) throw Error;

        //get file url
        
        const fileUrl =await getFilePreview(uploadedFile.$id);

        if(!fileUrl) {
            await deleteFile(uploadedFile.$id)
            throw Error;
        }

        //convert tags in an array
        const tags =  post.tags?.replace(/ /g, '').split(',') || []
        //save post to database

        const newPost = await databases.createDocument(
            appwriteConfig.databaseID,
            appwriteConfig.postCollectionID,
            ID.unique(),
            {
                creator: post.userId,
                caption: post.caption,
                imageUrl: fileUrl,
                imageId: uploadedFile.$id,
                location: post.location,
                tags: tags

            }
        )

        if(!newPost) {
            await deleteFile(uploadedFile.$id)
            console.log(newPost)
            throw Error
        }
        return newPost


    }
    catch(error){
        console.log(error)
    }

}

export async function uploadFile(file: File){
    try{
        const uploadedFile = await storage.createFile(
            appwriteConfig.storageID,
            ID.unique(),
            file
        )
        return uploadedFile

    }
    catch(error){
        console.log(error)
    }
}

export async function getFilePreview(fileId: string){
     try {
    const fileUrl = storage.getFilePreview(
      appwriteConfig.storageID,
      fileId,
      2000,
      2000,
      ImageGravity.Top,
      100
    );

    if (!fileUrl) throw Error;

    return fileUrl;
  }
  catch(error){
    console.log(error)
}
}

export async function deleteFile(fileId:string) {

    try{
        await storage.deleteFile(appwriteConfig.storageID, fileId)
        return{ status : 'ok'}

    }

    catch(error){
        console.log(error)
    }
    
}
