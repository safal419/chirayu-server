import { AlumniService } from './alumni.service';
import { CreateAlumniDto } from './dto/create-alumni.dto';
import { UpdateAlumniDto } from './dto/update-alumni.dto';
import { Alumni } from './entities/alumni.schema';
export declare class AlumniController {
    private readonly alumniService;
    constructor(alumniService: AlumniService);
    findAll(): Promise<Alumni[]>;
    findOne(id: string): Promise<Alumni>;
    create(createAlumniDto: CreateAlumniDto): Promise<Alumni>;
    update(id: string, updateAlumniDto: UpdateAlumniDto): Promise<Alumni>;
    remove(id: string): Promise<void>;
}
