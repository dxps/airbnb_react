import React, { useState } from 'react';
import { Button, Input } from './ui';
import { DateRangePicker } from './ui/date-range-picker';
import { Search } from 'lucide-react';
import { Stepper } from './ui/stepper';

type onChangeFn = ({
  dates,
  guests,
  search,
}: {
  dates: any;
  guests: number;
  search: string;
}) => void;

function ListingFilters({ onChange: onChange }: { onChange: onChangeFn }) {
  const [dates, setDates] = useState();
  const [guests, setGuests] = useState(0);
  const [search, setSearch] = useState('');

  const handleSubmit = () => {
    onChange({ dates, guests, search });
  };

  return (
    <div className='flex flex-row items-center justify-center gap-2'>
      <Input
        className='w-[400px]'
        placeholder='Search destinations'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <DateRangePicker />
      <Stepper label='guest' value={guests} onChange={setGuests} />
      <Button onClick={handleSubmit}>
        <Search className='h-4 w-4' />
      </Button>
    </div>
  );
}

export default ListingFilters;
