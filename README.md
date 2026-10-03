# DNA Pattern Matching with JavaScript

SCC-212 coursework exploring event-driven processing of DNA sequences with Node.js. The programs collect sequence data from a supplied callback-based harness, identify pattern matches and report positions and frequency counts.

## Implementations

| File | Description |
| --- | --- |
| `task1&2` | Exact matching for the fixed patterns AA, CC, TT and GG. |
| `task1and2vs` | Pattern matching with ambiguous IUPAC nucleotide symbols and a deferred scan at end of input. |
| `Task Sources/testlib.js` | Supplied event and reporting harness. |
| `Task Sources/minimal_demo.js` | Included harness example. |
| `Task Sources/task*.data`, `task*.seq` | Sequence data and patterns for the tasks. |

The implementation files are JavaScript even though their filenames have no `.js` extension.

## Features

- Handles `ready`, `data`, `reset` and, in the extended version, `end` callbacks.
- Accumulates input characters into a sequence buffer.
- Reports matches with their offsets and produces per-pattern frequency counts.
- Checks sequence boundaries before comparing a pattern.
- Maps ambiguous symbols to the bases they represent.

### Supported IUPAC symbols

A, C, G and T match themselves. R = A/G, Y = C/T, K = G/T, M = A/C, S = C/G, W = A/T, B = C/G/T, D = A/G/T, H = A/C/T, V = A/C/G and N = any base.

## Requirements and setup

Node.js is required. The harness uses Node's built-in `fs` module, so no npm packages are needed.

The scripts require `./testlib.js`, and the harness opens data files relative to the current working directory. Copy the supplied assets to the repository root before running:

```bash
git clone https://github.com/shaj9054/SCC-212-JavaScript.git
cd SCC-212-JavaScript
cp "Task Sources/testlib.js" .
cp "Task Sources"/task*.data "Task Sources"/task*.seq .
node 'task1&2'
node task1and2vs
```

On Windows, copy the same files using File Explorer or your shell's copy command.

The first script selects task 2 and the extended script selects task 3 via `testlib.setup(...)`.

## Output and limitations

Matches use the harness's `[MATCH]` messages; frequency tables print each pattern and its count. The extended end-of-input path schedules scanning with `setTimeout`, but reset-time scanning remains recursive and may overflow the call stack on large inputs. Sequences are buffered in memory, so this is not bounded-memory streaming. Behaviour for unknown nucleotide symbols and empty pattern lines is not fully validated.

## Project context

**Module:** SCC-212, Lancaster University. **Language:** JavaScript / Node.js. **Author:** Mohammed Shajalal Sarwar. The supplied test harness is retained alongside the coursework implementations.
