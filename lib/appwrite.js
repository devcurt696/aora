import { Client, Account, ID, Avatars, Databases, Query, Storage } from 'react-native-appwrite';

export const apperiteConfig = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: 'com.curtdev.aora',
    projectId: '664e8417001fb2618cad',
    databaseId: '664e857c0000f20f9f1a',
    userCollectionId: '664e85a9003338f32692',
    videoCollectionId: '664e85d9000d60c778a4',
    storageId: '664e86f4003c8452de6b'
}

// Init your React Native SDK
const client = new Client();

client
    .setEndpoint(apperiteConfig.endpoint) // Your Appwrite Endpoint
    .setProject(apperiteConfig.projectId) // Your project ID
    .setPlatform(apperiteConfig.platform) // Your application ID or bundle ID.
;

const account = new Account(client);

const avatars = new Avatars(client);
const databases = new Databases(client);
const storage = new Storage(client);


export const createUser = async (email, password, username) => {
    try {
        const newAccount = await account.create(
            ID.unique(),
            email,
            password,
            username
        );

        if (!newAccount) {
            throw new Error('Account not created')
        }

        const avatarUrl = avatars.getInitials(username)

        await signIn(email, password);

        const newUser = await databases.createDocument(
            apperiteConfig.databaseId,
            apperiteConfig.userCollectionId,
            ID.unique(),
            {
                accountId: newAccount.$id,
                email: email,
                username: username,
                avatar: avatarUrl
            }
        );

        return newUser;
    } catch (error) {
        console.log(error)
        throw new Error(error);
    }
}

export async function signIn(email, password) {
    try {
        const session = await account.createEmailPasswordSession(email, password);
        return session;
    } catch (error) {
        throw new Error(error);
    }
}

export async function getAccount() {
    try {
        const currentAccount = await account.get();
        return currentAccount;
    } catch (error) {
        throw new Error(error);
    }

}

export const getCurrentUser = async () => {
    try {
        const currAccount = await getAccount();

        if (!currAccount) throw Error

        const currentUser = await databases.listDocuments(
            apperiteConfig.databaseId,
            apperiteConfig.userCollectionId,
            [Query.equal('accountId', currAccount.$id)]
        );

        if (!currentUser) {
            throw new Error('User not found')
        }

        return currentUser.documents[0];
    } catch (error) {
        console.log(error)
    }
}

export const getAllPosts = async () => {
    try {
        const posts = await databases.listDocuments(
            apperiteConfig.databaseId,
            apperiteConfig.videoCollectionId,
            [Query.orderDesc('$createdAt')]
        );

        return posts.documents;
    } catch (error) {
        throw new Error(error);
    }
}

export const getLatestPosts = async () => {
    try {
        const posts = await databases.listDocuments(
            apperiteConfig.databaseId,
            apperiteConfig.videoCollectionId,
            [Query.orderDesc('$createdAt', Query.limit(7))]
        );

        return posts.documents;
    } catch (error) {
        throw new Error(error);
    }
}


export const searchPosts = async (query) => {
    try {
        const posts = await databases.listDocuments(
            apperiteConfig.databaseId,
            apperiteConfig.videoCollectionId,
            [Query.search('title', query)]
        );

        return posts.documents;
    } catch (error) {
        throw new Error(error);
    }
}


export const getUserPosts = async (userId) => {
    try {
        const posts = await databases.listDocuments(
            apperiteConfig.databaseId,
            apperiteConfig.videoCollectionId,
            [Query.equal('users', userId)]
        );

        return posts.documents;
    } catch (error) {
        throw new Error(error);
    }
}

export const signOut = async () => {
    try {
        const session = await account.deleteSession('current');

        return session;
    } catch (error) {
        throw new Error(error);
    }
}

export const createVideo = async (form) => {
    try {
        const [thumbnailUrl, videoUrl] = await Promise.all([
            uploadFile(form.thumbnail, 'image'),
            uploadFile(form.video, 'video')
        ])

        const newPost = await databases.createDocument(
            apperiteConfig.databaseId,
            apperiteConfig.videoCollectionId,
            ID.unique(),
            {
                title: form.title,
                thumbnail: thumbnailUrl,
                video: videoUrl,
                prompt: form.prompt,
                users: form.userId
            }
        );
        
        return newPost;
    } catch (error) {
        throw new Error(error);
    }
}

const uploadFile = async (file, type) => {
    if (!file) return;

    const { mimeType, ...rest} = file;
    const asset = { type: mimeType, ...rest };

    try {
        const uploadedFile = await storage.createFile(
            apperiteConfig.storageId,
            ID.unique(),
            asset
        );

        const fileUrl = await getFilePreview(uploadedFile.$id, type);

        return fileUrl;
    } catch (error) {
        throw new Error(error);
    }
}

export async function getFilePreview(fileId, type) {
    let fileUrl;
  
    try {
      if (type === "video") {
        fileUrl = storage.getFileView(apperiteConfig.storageId, fileId);
      } else if (type === "image") {
        fileUrl = storage.getFilePreview(
          apperiteConfig.storageId,
          fileId,
          2000,
          2000,
          "top",
          100
        );
      } else {
        throw new Error("Invalid file type");
      }
  
      if (!fileUrl) throw Error;
  
      return fileUrl;
    } catch (error) {
      throw new Error(error);
    }
  }
  