import { Model } from 'mongoose';
import { Alumni, AlumniDocument } from './entities/alumni.schema';
import { CreateAlumniDto } from './dto/create-alumni.dto';
import { UpdateAlumniDto } from './dto/update-alumni.dto';
export declare class AlumniService {
    private alumniModel;
    constructor(alumniModel: Model<AlumniDocument>);
    findAll(): Promise<Alumni[]>;
    findOne(id: string): Promise<Alumni>;
    create(createAlumniDto: CreateAlumniDto): Promise<Alumni>;
    update(id: string, updateAlumniDto: UpdateAlumniDto): Promise<Alumni>;
    remove(id: string): Promise<void>;
}
