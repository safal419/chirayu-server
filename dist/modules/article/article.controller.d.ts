import { ArticlesService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { Article } from './entities/article.schema';
import { UpdateArticleDto } from './dto/update-article.dto';
export declare class ArticlesController {
    private readonly articlesService;
    constructor(articlesService: ArticlesService);
    findAll(): Promise<Article[]>;
    findOne(id: string): Promise<Article>;
    create(createArticleDto: CreateArticleDto): Promise<Article>;
    update(id: string, updateArticleDto: UpdateArticleDto): Promise<Article>;
    remove(id: string): Promise<void>;
}
