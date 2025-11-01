# KVNR Utils

A lightweight TypeScript library for validating, formatting, and generating German Health Insurance Numbers (Krankenversichertennummer - KVNR).

## Features

- Validates format and check digit using the official modified Luhn algorithm
- Generates valid KVNRs with proper check digit calculation
- Handles user input with whitespace and case variations
- Full type definitions included
- Lightweight with no external dependencies
- Well-tested with Jest

## Installation

```bash
npm install kvnr-utils
```

## Compatibility

This library is **framework-agnostic** and works with:

- **Vanilla JavaScript/TypeScript** (ES2020+)
- **React** (any version)
- **Angular** (any version)
- **Vue.js** (any version)
- **Node.js** (v14+)
- **Next.js, Nuxt.js, SvelteKit** etc.
- **Webpack, Vite, Rollup** - all bundlers
- **Browser & Server-Side** environments

**No dependencies** - works everywhere JavaScript runs!

## Usage

```typescript
import { isValidKVNR, generateKVNR, normalizeKVNR } from 'kvnr-utils';

// Validate a KVNR
const isValid = isValidKVNR('A123456780'); // true (if check digit is correct)

// Generate a valid KVNR
const kvnr = generateKVNR('B'); // e.g., 'B987654321'

// Normalize user input
const normalized = normalizeKVNR(' a123456780 '); // 'A123456780'
```

### Framework Examples

**React:**
```tsx
import { isValidKVNR } from 'kvnr-utils';

function KVNRInput() {
  const [kvnr, setKvnr] = useState('');
  const isValid = isValidKVNR(kvnr);
  
  return (
    <input 
      value={kvnr} 
      onChange={(e) => setKvnr(e.target.value)}
      className={isValid ? 'valid' : 'invalid'}
    />
  );
}
```

**Angular:**
```typescript
import { isValidKVNR } from 'kvnr-utils';

@Component({...})
export class KVNRComponent {
  kvnr = '';
  
  get isValid() {
    return isValidKVNR(this.kvnr);
  }
}
```

## KVNR Format

A German Health Insurance Number (KVNR) consists of:
- **Position 1**: Random uppercase letter (A-Z, no umlauts)
- **Positions 2-9**: Eight random digits
- **Position 10**: Check digit calculated using modified Luhn algorithm

## Validation Algorithm

This library implements the official German specification for KVNR validation:

1. **Format check**: Validates the pattern `^[A-Z][0-9]{9}$`
2. **Letter conversion**: Converts A-Z to 01-26
3. **Modified Luhn algorithm**: 
   - Multiply digits alternately with weights 1-2-1-2-1-2-1-2-1-2
   - Calculate cross sum of each product
   - Sum all cross sums
   - Check digit = sum modulo 10

**Source**: [Wikipedia - Krankenversichertennummer](https://de.wikipedia.org/wiki/Krankenversichertennummer)

## API Reference

### `isValidKVNR(kvnr: string): boolean`

Validates a KVNR string.

- **Parameters**: `kvnr` - The KVNR string to validate
- **Returns**: `true` if valid, `false` otherwise

### `generateKVNR(letter?: string): string`

Generates a valid KVNR with proper check digit.

- **Parameters**: `letter` - Starting letter (default: "A")
- **Returns**: A valid 10-character KVNR string
- **Throws**: Error if letter is not A-Z

### `normalizeKVNR(kvnr: string): string`

Normalizes a KVNR string by trimming whitespace and converting to uppercase.

- **Parameters**: `kvnr` - The raw KVNR string
- **Returns**: Normalized KVNR string

## Development

```bash
# Install dependencies
npm install

# Run tests
npm test

# Build
npm run build
```

## License

MIT © [Kevin Mirzaian](https://github.com/Mirzaian)