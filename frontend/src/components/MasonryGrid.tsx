import React from 'react';

interface MasonryGridProps<T> {
  items: T[];
	id: string;
  renderItem: (item: T, index: number) => React.ReactNode;
}

const MasonryGrid = <T,>({ items, id, renderItem }: MasonryGridProps<T>) => {
  const columns: T[][] = [[], [], [], []];

	items.forEach((item, index) => {
		columns[index % 4].push(item);
	});

  return (
    <div
      className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4"
      data-testid="masonry-grid"
			id={id}
    >
      {columns.map((column, colIndex) => (
        <div
          key={`column-${colIndex}`}
          className="flex flex-col gap-4"
          data-testid={`column-${colIndex}`}
        >
          {column.map((item, itemIndex) => {
            const originalIndex = colIndex + itemIndex * 4;
            return renderItem(item, originalIndex);
          })}
        </div>
      ))}
    </div>
  );
};

export default MasonryGrid;