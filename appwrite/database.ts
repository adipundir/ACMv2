import { client } from "@/appwrite/client";
import { Databases, ID, Models } from "appwrite";
import { Event } from "@/types";

export default class Database {
  private databaseId = "661bb5efad9f866934a4";
  private collections = {
    events: "661bb5f65f15263548f4",
  };
  private static instance: Database;
  private connection: Databases;
  constructor() {
    this.connection = new Databases(client);
    if (Database.instance) {
      return Database.instance;
    }
    Database.instance = this;
  }

  async getEvents() {
    return this.connection.listDocuments(
      this.databaseId,
      this.collections.events,
    );
  }

  async getEventById(id: string) {
    try {
      return (await this.connection.getDocument(
        this.databaseId,
        this.collections.events,
        id,
      )) as unknown as Promise<Models.Document & Event>;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async createEvent(event: Event) {
    try {
      return await this.connection.createDocument(
        this.databaseId,
        this.collections.events,
        event.id || ID.unique(),
        event,
      );
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  async updateEvent(id: string, event: Event) {
    try {
      return await this.connection.updateDocument(
        this.databaseId,
        this.collections.events,
        id,
        event,
      );
    } catch (e) {
      console.error(e);
      return null;
    }
  }
}
