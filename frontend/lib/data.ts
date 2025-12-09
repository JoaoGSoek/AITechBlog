interface Article {
  id: number;
  title: string;
  content: string;
  createdAt: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export async function getArticle(id: string): Promise<Article> {
	const res = await fetch(`${API_URL}/articles/${id}`);
	if (!res.ok) null;
	return res.json();
}

export async function getArticles(): Promise<Article[]> {
  try {
    const res = await fetch(`${API_URL}/articles`, {cache: 'no-store'});
    if (!res.ok) throw new Error('Failed to fetch articles');
    return res.json();
  } catch (error) {
    console.error('Error fetching articles:', error);
    return [];
  }
}