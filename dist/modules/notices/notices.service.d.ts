import { Model } from 'mongoose';
import { Notice, NoticeDocument } from './entities/notice.entity';
import { CreateNoticeDto } from './dto/create-notice.dto';
import { UpdateNoticeDto } from './dto/update-notice.dto';
export declare class NoticesService {
    private noticeModel;
    constructor(noticeModel: Model<NoticeDocument>);
    create(createNoticeDto: CreateNoticeDto): Promise<Notice>;
    findAll(): Promise<Notice[]>;
    findOne(id: string): Promise<Notice>;
    update(id: string, updateNoticeDto: UpdateNoticeDto): Promise<Notice>;
    remove(id: string): Promise<void>;
}
