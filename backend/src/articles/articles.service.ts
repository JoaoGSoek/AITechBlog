import {
  Injectable,
  Logger,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { AiService } from 'src/ai/ai.service';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class ArticlesService implements OnModuleInit {
  private readonly logger = new Logger(ArticlesService.name);
  private readonly TOPICS = [
    'Docker vs. Kubernetes',
    'The Rise of TypeScript in Web Development',
    'AI in 2024: Trends and Predictions',
    'Getting Started with NestJS: A Beginner’s Guide',
    'Serverless Architecture: Pros and Cons',
    'The Importance of CI/CD in Modern Software Development',
    'GraphQL vs. REST: Which is Better for Your API?',
    'Micro-frontends: The Future of Frontend Development?',
    'A Deep Dive into WebAssembly',
    'State Management in React: Redux vs. Zustand',
  ];

  constructor(
    private readonly prisma: PrismaService,
    private readonly aiService: AiService,
  ) {}

  async onModuleInit() {
    const count = await this.prisma.article.count();
    this.logger.log(`Found ${count} articles in the database.`);
    if (count < 3) {
      this.logger.log('Database has less than 3 articles. Generating new ones...');
      for (let i = count; i < 3; i++) {
        const topic = this.TOPICS[i % this.TOPICS.length];
        await this.create({ title: topic });
        this.logger.log(`Generated article for topic: "${topic}"`);
      }
    }
  }

  async create({ title }: CreateArticleDto) {
    const content = await this.aiService.generateBlogArticle(title);

    return this.prisma.article.create({
      data: {
        title,
        content,
      },
    });
  }

  async findAll() {
    return this.prisma.article.findMany({ orderBy: { createdAt: 'desc' } });
  }

  async findOne(id: number) {
    const article = await this.prisma.article.findUnique({ where: { id } });
    if (!article) {
      throw new NotFoundException(`Article with ID #${id} not found`);
    }
    return article;
  }

  update(id: number, updateArticleDto: UpdateArticleDto) {
    return `This action updates a #${id} article`;
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async handleCron() {
    this.logger.log('Running daily article generation cron job...');
    const randomIndex = Math.floor(Math.random() * this.TOPICS.length);
    const randomTopic = this.TOPICS[randomIndex];
    await this.create({ title: randomTopic });
    this.logger.log(`Daily article generated for topic: "${randomTopic}"`);
  }
}
