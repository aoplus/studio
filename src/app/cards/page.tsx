'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cardTemplates } from '@/lib/data';
import CardTemplate from '@/components/card-template';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

const occasions = ['All', 'Birthday', 'Thank You', 'Farewell', 'Congratulations', 'Other'];
const ITEMS_PER_PAGE = 8;

export default function CardsPage() {
  const [occasion, setOccasion] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredTemplates = cardTemplates.filter(template => {
    const occasionMatch = occasion === 'All' || template.occasion === occasion;
    const searchMatch = template.title.toLowerCase().includes(searchTerm.toLowerCase());
    return occasionMatch && searchMatch;
  });

  const totalPages = Math.ceil(filteredTemplates.length / ITEMS_PER_PAGE);
  const paginatedTemplates = filteredTemplates.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );
  
  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };
  
  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <div className="space-y-4 text-center mb-12">
        <h1 className="text-4xl font-bold font-headline tracking-tighter sm:text-5xl">Choose Your Card</h1>
        <p className="max-w-[700px] mx-auto text-muted-foreground md:text-xl">
          Find the perfect design for any occasion. Every card is a step towards a greener planet.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search designs..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
        <Tabs value={occasion} onValueChange={(value) => {
            setOccasion(value)
            setCurrentPage(1);
        }}>
          <TabsList className="grid grid-cols-3 sm:flex">
            {occasions.map((occ) => (
              <TabsTrigger key={occ} value={occ}>{occ}</TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
        {paginatedTemplates.map((template) => (
          <CardTemplate key={template.id} template={template} />
        ))}
      </div>

       {filteredTemplates.length === 0 && (
        <div className="text-center py-16 text-muted-foreground">
            <p>No designs found. Try adjusting your search or filters.</p>
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-12">
          <Button onClick={handlePrevPage} disabled={currentPage === 1} variant="outline">Previous</Button>
          <span className="text-sm text-muted-foreground">
            Page {currentPage} of {totalPages}
          </span>
          <Button onClick={handleNextPage} disabled={currentPage === totalPages} variant="outline">Next</Button>
        </div>
      )}
    </div>
  );
}
