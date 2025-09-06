import { Model } from 'mongoose';
import { Gallery, GalleryDocument } from './entities/gallery.entity';
import { CreateGalleryDto } from './dto/create-gallery.dto';
import { UpdateGalleryDto } from './dto/update-gallery.dto';
export declare class GalleryService {
    private galleryModel;
    constructor(galleryModel: Model<GalleryDocument>);
    create(createGalleryDto: CreateGalleryDto): Promise<Gallery>;
    findAll(): Promise<Gallery[]>;
    findOne(id: string): Promise<Gallery>;
    update(id: string, updateGalleryDto: UpdateGalleryDto): Promise<Gallery>;
    remove(id: string): Promise<void>;
}
