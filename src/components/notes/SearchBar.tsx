import { forwardRef } from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchBar = forwardRef<HTMLInputElement, SearchBarProps>(({ value, onChange }, ref) => {
  return (
    <div className="relative">
      <Search
        size={18}
        className="
            absolute
            left-4
            top-1/2
            -translate-y-1/2
            text-slate-400
            dark:text-slate-500
          "
      />

      <input
        ref={ref}
        type="text"
        placeholder="Search your notes..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="
            w-full
            rounded-xl
            border
            border-slate-300
            bg-white
            py-3
            pl-11
            pr-4
            text-slate-700
            outline-none
            transition

            placeholder:text-slate-400

            focus:border-blue-500
            focus:ring-4
            focus:ring-blue-100

            dark:border-slate-700
            dark:bg-slate-900
            dark:text-white
            dark:placeholder:text-slate-500
            dark:focus:border-blue-500
            dark:focus:ring-blue-900/30
          "
      />
    </div>
  );
});

SearchBar.displayName = 'SearchBar';

export default SearchBar;
