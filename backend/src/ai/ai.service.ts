import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { GoogleGenerativeAI } from '@google/generative-ai';

@Injectable()
export class AiService {
  private readonly genAI: GoogleGenerativeAI;
  private readonly logger = new Logger(AiService.name);

  constructor() {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY is not set in environment variables.');
    }
    this.genAI = new GoogleGenerativeAI(apiKey);
  }

  async generateBlogArticle(title: string): Promise<string> {
    try {
      const model = this.genAI.getGenerativeModel({ model: 'gemini-2.5-flash-lite' });
      const prompt = `
				You are a professional tech blog writer.
				Write an engaging, well-structured blog article about: "${title}".
				
				CRITICAL OUTPUT RULES:
				1. Output ONLY raw Markdown text.
				2. Do NOT wrap the content in code blocks (like \`\`\`markdown ... \`\`\`).
				3. Do NOT include any conversational filler (like "Here is the article").
				4. Start directly with a level 1 header (# Title).
				5. Use ## for main sections and ### for subsections.
				6. Language: English.
			`;

      const result = await model.generateContent(prompt);
      const response = result.response;
			let text = response.text();
			text = text.replace(/^```markdown\s*/i, '').replace(/^```\s*/i, '').replace(/```\s*$/i, '');
      return text;
    } catch (error) {
      this.logger.error('Error generating blog article:', error);
      throw new InternalServerErrorException('Failed to generate blog article.');
    }
  }
}
