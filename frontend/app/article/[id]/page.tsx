import Image from 'next/image';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import { Button } from '@/components/ui/button';
import { getArticle } from '@/lib/data';

export default async function Page(props: { params: Promise<{ id: string }> }) {

  const params = await props.params;
  const id = params.id;
  const article = await getArticle(id);

	console.log(article.content)

  return (
		<main className="container mx-auto max-w-4xl px-4 py-8">
			<div className="mb-8">
				<Button variant="outline" asChild>
					<Link href="/#gridId">← Back to Home</Link>
				</Button>
			</div>

			<article>
				<h1 className="mb-4 text-4xl font-extrabold tracking-tight lg:text-5xl">
					{article.title}
				</h1>

				<div className="relative mb-8 aspect-video w-full overflow-hidden rounded-lg">
					<Image
						src={`https://picsum.photos/seed/${article.id}/1200/600`}
						alt={article.title}
						fill
						className="object-cover"
						priority
					/>
				</div>

				<div className="flex flex-col gap-y-4">
					<ReactMarkdown>
						{article.content}
					</ReactMarkdown>
				</div>
			</article>
		</main>
  );
}