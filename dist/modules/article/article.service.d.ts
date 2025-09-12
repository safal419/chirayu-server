import { Model } from 'mongoose';
import { Article, ArticleDocument } from './entities/article.schema';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
export declare class ArticlesService {
    private articleModel;
    constructor(articleModel: Model<ArticleDocument>);
    findAll(): Promise<Article[]>;
    findOne(id: string): Promise<Article>;
    create(createArticleDto: CreateArticleDto): Promise<Article>;
    update(id: string, updateArticleDto: UpdateArticleDto): Promise<Article>;
    remove(id: string): Promise<void>;
}
