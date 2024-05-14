import { UpdateUserDto } from "../input/dto/UpdateUserDto";
import { RequestError } from "src/types/RequestError";
import { User } from "src/MongooseModule/schema/User";
import { InjectModel } from "@nestjs/mongoose";
import { Injectable } from "@nestjs/common";
import { Model, Types } from "mongoose";

export interface UserAdapterInterface {
    findAll: () => Promise<User[] | RequestError>
    find: (id: Types.ObjectId) => Promise<User | RequestError>
    save: (input: Omit<User, '_id'>) => Promise<User | RequestError>
    update: (id: Types.ObjectId, input: UpdateUserDto) => Promise<User | RequestError>
    remove: (id: Types.ObjectId) => Promise<void | RequestError>
}

@Injectable()
export class UserAdapter implements UserAdapterInterface {

    public constructor(
        @InjectModel(User.name)
        private readonly userModel: Model<User>
    ) {  }

    public async findAll(): Promise<User[] | RequestError> {
        try {
            return await this.userModel.find();   
        }
        catch (error) {
            return new RequestError(error.message);
        }
    }

    public async find(id: Types.ObjectId): Promise<User | RequestError> {
        try {
            return await this.userModel.findById(id);   
        }
        catch (error) {
            return new RequestError(error.message);
        }
    }

    public async save(input: Omit<User, '_id'>): Promise<User | RequestError> {
        try {
            return await this.userModel.create(input);
        }
        catch (error) {
            return new RequestError(error.message);
        }
    }

    public async update(id: Types.ObjectId, input: UpdateUserDto): Promise<User | RequestError> {
        try {
            return await this.userModel.findByIdAndUpdate(id, input);
        }
        catch (error) {
            return new RequestError(error.message);
        }
    }

    public async remove(id: Types.ObjectId): Promise<void | RequestError> {
        try {
            return await this.userModel.findByIdAndDelete(id);
        }
        catch (error) {
            return new RequestError(error.message);
        }
    }
}