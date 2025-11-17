import React, { useState } from 'react';
import { Button, Input } from './ui';
import { DateRangePicker } from './ui/date-range-picker';
import { Search } from 'lucide-react';
import { Stepper } from './ui/stepper';
import type { Availability } from '@/types';
import { addDays } from 'date-fns';

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
  const initialAvailability: Availability = {
    from: new Date(),
    to: addDays(new Date(), 3),
  };
  const [dates, setDates] = useState(initialAvailability);
  const [guests, setGuests] = useState(1);
  const [search, setSearch] = useState('');

  const handleSubmit = () => {
    onChange({ dates, guests, search });
  };

  return (
    <div className='flex flex-row items-center justify-center gap-2'>
      <Input
        className='w-[250px]'
        placeholder='Search destinations'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <DateRangePicker
        initialDateFrom={dates.from}
        initialDateTo={dates.to}
        onUpdate={(values) => {
          setDates({
            from: values.range.from,
            to: values.range.to!,
          });
        }}
      />
      <Stepper label='guest' value={guests} onChange={setGuests} />
      <Button onClick={handleSubmit}>
        <Search className='h-4 w-4' />
      </Button>
    </div>
  );
}

export default ListingFilters;
