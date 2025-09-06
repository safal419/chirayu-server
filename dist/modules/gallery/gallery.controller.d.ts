import { GalleryService } from './gallery.service';
import { CreateGalleryDto } from './dto/create-gallery.dto';
import { UpdateGalleryDto } from './dto/update-gallery.dto';
export declare class GalleryController {
    private readonly galleryService;
    constructor(galleryService: GalleryService);
    create(createGalleryDto: CreateGalleryDto): Promise<import("./entities/gallery.entity").Gallery>;
    findAll(): Promise<import("./entities/gallery.entity").Gallery[]>;
    findOne(id: string): Promise<import("./entities/gallery.entity").Gallery>;
    update(id: string, updateGalleryDto: UpdateGalleryDto): Promise<import("./entities/gallery.entity").Gallery>;
    remove(id: string): Promise<void>;
}
