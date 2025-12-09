import React from 'react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

interface Article {
  id: number;
  title: string;
  content: string;
  createdAt: string;
}

interface ArticleCardProps {
  article: Article;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  const generatePreview = (content: string) => {
    // 1. Strip basic markdown characters and replace newlines with spaces
    const plainText = content.replace(/(\r\n|\n|\r)/gm, " ").replace(/[#*\[\]_`]/g, '');
    // 2. Limit to ~150 characters
    if (plainText.length <= 150) {
      return plainText;
    }
    return `${plainText.substring(0, 150)}...`;
  };
  const contentPreview = generatePreview(article.content);

  const formattedDate = new Date(article.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
		<Link href={`/article/${article.id}`}>
			<Card className="flex flex-col overflow-hidden rounded-lg shadow-md transition-transform duration-300 ease-in-out hover:-translate-y-1.5 pt-0">
				<div className="aspect-video w-full overflow-hidden">
					<img
						src={`https://picsum.photos/seed/${article.id}/600/400`}
						alt={article.title}
						className="h-full w-full object-cover"
					/>
				</div>
				<CardHeader>
					<h3 className="text-xl font-bold leading-tight">{article.title}</h3>
				</CardHeader>
				<CardContent className="flex-grow">
					<p className="text-sm text-muted-foreground">{contentPreview}</p>
				</CardContent>
				<CardFooter>
					<Badge variant="secondary">{formattedDate}</Badge>
				</CardFooter>
			</Card>
		</Link>
  );
};

export default ArticleCard;