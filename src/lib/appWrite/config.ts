import {Client, Account, Storage, Databases, Avatars} from 'appwrite'

export const appwriteConfig = {
    url : import.meta.env.VITE_APPWRITE_URL,
    projectID : import.meta.env.VITE_APPWRITE_PROJECT_ID,
    storageID : import.meta.env.VITE_APPWRITE_STORAGE_ID,
    databaseId : import.meta.env.VITE_APPWRITE_DATABASE_ID,
    savesCollectionID : import.meta.env.VITE_APPWRITE_SAVES_COLLECTION_ID,
    postCollectionId : import.meta.env.VITE_APPWRITE_POST_COLLECTION_ID,
    userCollectionID : import.meta.env.VITE_APPWRITE_USER_COLLECTION_ID

    
}

export const client = new Client();

client.setProject(appwriteConfig.projectID);
client.setEndpoint(appwriteConfig.url);

export const account = new Account(client);
export const storage = new Storage(client);
export const databases = new Databases(client);
export const avatars = new Avatars(client);