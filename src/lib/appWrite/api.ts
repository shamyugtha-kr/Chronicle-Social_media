import { INewUser, IUser } from "@/types";
import { account, appwriteConfig, avatars, databases } from "./config";
import { ID, Query } from "appwrite";




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
        console.log(error);
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
