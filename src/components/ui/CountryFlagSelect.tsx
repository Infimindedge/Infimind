import {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type ComponentType,
  type FocusEvent,
} from 'react';
import { ChevronDown, Search } from 'lucide-react';
import { getCountryCallingCode, type Country } from 'react-phone-number-input';

interface CountryOption {
  value?: Country;
  label: string;
}

interface CountryFlagSelectProps {
  value?: Country;
  onChange: (country?: Country) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  options: CountryOption[];
  iconComponent: ComponentType<{ country?: Country }>;
  disabled?: boolean;
  readOnly?: boolean;
  tabIndex?: number | string;
  className?: string;
}

export function CountryFlagSelect({
  value,
  onChange,
  onFocus,
  onBlur,
  options,
  iconComponent: Icon,
  disabled,
  readOnly,
  tabIndex,
  className,
}: CountryFlagSelectProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const rootRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listboxId = useId();

  const countryOptions = useMemo(() => options.filter((option) => option.value), [options]);
  const selected = countryOptions.find((option) => option.value === value);
  const filteredOptions = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return countryOptions;
    return countryOptions.filter((option) => {
      const callingCode = option.value ? `+${getCountryCallingCode(option.value)}` : '';
      return option.label.toLowerCase().includes(normalizedQuery) || callingCode.includes(normalizedQuery);
    });
  }, [countryOptions, query]);

  useEffect(() => {
    if (open) searchRef.current?.focus();
  }, [open]);

  useEffect(() => {
    function closeOnOutsideClick(event: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setOpen(false);
        setQuery('');
      }
    }

    document.addEventListener('mousedown', closeOnOutsideClick);
    return () => document.removeEventListener('mousedown', closeOnOutsideClick);
  }, []);

  function handleBlur(event: FocusEvent<HTMLDivElement>) {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
      setOpen(false);
      setQuery('');
      onBlur?.();
    }
  }

  function chooseCountry(country: Country) {
    onChange(country);
    setOpen(false);
    setQuery('');
    triggerRef.current?.focus();
  }

  return (
    <div
      ref={rootRef}
      className={`${className ?? ''} country-flag-select`}
      onFocus={onFocus}
      onBlur={handleBlur}
    >
      <button
        ref={triggerRef}
        type="button"
        className="country-flag-select__trigger"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listboxId}
        aria-label={selected ? `Country: ${selected.label}` : 'Choose country'}
        disabled={disabled}
        tabIndex={typeof tabIndex === 'string' ? Number(tabIndex) : tabIndex}
        onClick={() => {
          if (!readOnly) setOpen((current) => !current);
        }}
        onKeyDown={(event) => {
          if (event.key === 'Escape') {
            setOpen(false);
            setQuery('');
          }
        }}
      >
        <span className="country-flag-select__selected">
          {selected?.value ? <Icon country={selected.value} /> : <span aria-hidden="true">🌐</span>}
          <span>{selected?.label ?? 'Select country'}</span>
        </span>
        <ChevronDown size={15} aria-hidden="true" />
      </button>

      {open ? (
        <div className="country-flag-select__popover">
          <label className="country-flag-select__search">
            <Search size={15} aria-hidden="true" />
            <span className="sr-only">Search countries</span>
            <input
              ref={searchRef}
              type="search"
              value={query}
              placeholder="Search country or code"
              onChange={(event) => setQuery(event.target.value)}
            />
          </label>
          <div id={listboxId} role="listbox" aria-label="Countries" className="country-flag-select__list">
            {filteredOptions.map((option) => {
              const country = option.value as Country;
              return (
                <button
                  key={country}
                  type="button"
                  role="option"
                  aria-selected={country === value}
                  className="country-flag-select__option"
                  onClick={() => chooseCountry(country)}
                >
                  <Icon country={country} />
                  <span>{option.label}</span>
                  <small>+{getCountryCallingCode(country)}</small>
                </button>
              );
            })}
            {filteredOptions.length === 0 ? (
              <p className="country-flag-select__empty">No country found</p>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}
