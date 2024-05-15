import { Card } from "src/MongooseModule/schema/Card";
import { RequestError } from "src/types/RequestError";
import { InjectModel } from "@nestjs/mongoose";
import { Injectable } from "@nestjs/common";
import { Model, Types } from "mongoose";

export interface CardAdapterInterface {
    findAll: () => Promise<Card[] | RequestError>
    find: (id: Types.ObjectId) => Promise<Card | RequestError>
    save: (input: Omit<Card, '_id'>) => Promise<Card | RequestError>
    upload: (id: Types.ObjectId, input: Partial<Card>) => Promise<Card | RequestError>
    remove: (id: Types.ObjectId) => Promise<Card | RequestError>
}

@Injectable()
export class CardAdapter implements CardAdapterInterface {
    public constructor(
        @InjectModel(Card.name)
        private readonly cardModel: Model<Card>
    ) {  }

    public async findAll(): Promise<Card[] | RequestError> {
        try {
            return await this.cardModel.find();
        }
        catch (error) {
            console.error(error);
            return new RequestError(error.message);
        }
    }

    public async find(id: Types.ObjectId): Promise<Card | RequestError> {
        try {
            return await this.cardModel.findById(id);
        }
        catch (error) {
            console.error(error);
            return new RequestError(error.message);
        }
    }

    public async save(input: Omit<Card, 'id'>): Promise<Card | RequestError> {
        try {
            return await this.cardModel.create(input);
        }
        catch (error) {
            console.error(error);
            return new RequestError(error.message);
        }
    }

    public async upload(id: Types.ObjectId, input: Partial<Card>): Promise<Card | RequestError> {
        try {
            return await this.cardModel.findByIdAndUpdate(id, input);
        }
        catch (error) {
            console.error(error);
            return new RequestError(error.message);
        }
    }

    public async remove(id: Types.ObjectId): Promise<Card | RequestError> {
        try {
            return await this.cardModel.findByIdAndDelete(id);
        }
        catch (error) {
            console.error(error);
            return new RequestError(error.message);
        }
    }
}