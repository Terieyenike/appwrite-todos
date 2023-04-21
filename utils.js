import { Client, Databases, ID } from "appwrite";
const client = new Client();

const databases = new Databases(client);

const DATABASE_ID = "64413003872edcc024b5";
const COLLECTION_ID = "64413314c2db8572aab6";
const PROJECT_ID = "64412e965abb651cc102";
const API_ENDPOINT = "https://cloud.appwrite.io/v1";

client.setEndpoint(API_ENDPOINT).setProject(PROJECT_ID);

export const getTodo = databases.listDocuments(DATABASE_ID, COLLECTION_ID);

export const create = (data) =>
  databases.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), data);

export const deleteTodo = (database_id, collection_id, document_id) =>
  databases.deleteDocument(database_id, collection_id, document_id);
