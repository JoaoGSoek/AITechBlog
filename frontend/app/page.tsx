import { Button } from '@/components/ui/button';
import { getArticles } from '@/lib/data';
import ArticleCard from '@/src/components/ArticleCard';
import MasonryGrid from '@/src/components/MasonryGrid';
import { ChevronDown } from 'lucide-react';
import { asimovian } from './layout';
import Link from 'next/link';

export default async function Home() {
  const articles = await getArticles();

  return (
		<>
			<header className="h-[100vh] flex flex-col items-center text-center gap-y-6 px-[20%] justify-center">
				<h1 className={`text-4xl font-bold ${asimovian.className}`}>
					AI Tech Blog
				</h1>
				<p>Welcome to the <strong className={`font-semibold text-foreground ${asimovian.className}`}>AI Tech Blog</strong>, an automation experiment where Artificial Intelligence takes on the role of the writer. Developed as a Full Stack challenge, this system leverages the power of <strong>Google Gemini</strong> orchestrated by a <strong>NestJS</strong> backend to generate and publish daily tech articles. The interface, built with <strong>Next.js</strong>, offers a modern and fluid reading experience, demonstrating the seamless integration between robust software architecture and Generative AI.</p>
				<Button className="cursor-pointer" asChild>
					<Link href="#gridId">
						Checkout the content <ChevronDown className="animate-bounce" size={16} />
					</Link>
				</Button>
			</header>
			<main className="container mx-auto px-4 py-8 flex flex-col gap-y-4 min-h-[100vh]">
				<MasonryGrid
					items={articles}
					id="gridId"
					renderItem={(article) => (
						<ArticleCard key={article.id} article={article} />
					)}
				/>
			</main>
		</>
  );
}