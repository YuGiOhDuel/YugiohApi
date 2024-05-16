import { Injectable } from "@nestjs/common";
import { InjectModel } from '@nestjs/mongoose';
import { CardEvent } from '../../schema/CardEvent';
import { Model, Types } from 'mongoose';
import { RequestError } from "src/types/RequestError";

export interface CardEventAdapterInterface {
    findAll(): Promise<CardEvent[] | RequestError>
    find(id: Types.ObjectId): Promise<CardEvent | RequestError>
    save(input: Omit<CardEvent, '_id'>): Promise<CardEvent | RequestError>
    update(id: Types.ObjectId, input: Partial<CardEvent>): Promise<CardEvent | RequestError>
    remove(id: Types.ObjectId): Promise<CardEvent | RequestError>
}

@Injectable()
export class CardEventAdapter implements CardEventAdapterInterface {
    public constructor(
        @InjectModel(CardEvent.name)
        private readonly cardEventModel: Model<CardEvent>
    ) {  }

    public async findAll(): Promise<CardEvent[] | RequestError> {
        try {
            return await this.cardEventModel.find();
        }
        catch (error) {
            console.error(error);
            return new RequestError(error.message);
        }
    }

    public async find(id: Types.ObjectId): Promise<CardEvent | RequestError> {
        try {
            return await this.cardEventModel.findById(id);
        }
        catch (error) {
            console.error(error);
            return new RequestError(error.message);
        }
    } 

    public async save(input: Omit<CardEvent, '_id'>): Promise<CardEvent | RequestError> {
        try {
            return this.cardEventModel.create(input);
        }
        catch (error) {
            console.error(error);
            return new RequestError(error.message);
        }
    }

    public async update(id: Types.ObjectId, input: Partial<CardEvent>): Promise<CardEvent | RequestError> {
        try {
            return await this.cardEventModel.findByIdAndUpdate(id, input);
        }
        catch (error) {
            console.error(error);
            return new RequestError(error.message);
        }
    }

    public async remove(id: Types.ObjectId): Promise<CardEvent | RequestError> {
        try {
            return await this.cardEventModel.findByIdAndDelete(id);
        }
        catch (error) {
            console.error(error);
            return new RequestError(error.message);
        }
    }
}