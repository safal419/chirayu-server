import { Model } from 'mongoose';
import { Result, ResultDocument } from './entities/result.entity';
import { CreateResultDto } from './dto/create-result.dto';
import { UpdateResultDto } from './dto/update-result.dto';
export declare class ResultsService {
    private resultModel;
    constructor(resultModel: Model<ResultDocument>);
    create(createResultDto: CreateResultDto): Promise<Result>;
    findAll(): Promise<Result[]>;
    findOne(id: string): Promise<Result>;
    update(id: string, updateResultDto: UpdateResultDto): Promise<Result>;
    remove(id: string): Promise<void>;
}
