# SCC212 – JavaScript Coursework

**DNA Pattern Matching**

## Overview

This coursework implements a JavaScript program that processes streamed DNA sequences and identifies occurrences of given patterns. It reports both **match positions** and **frequency counts** using a provided testing framework (`testlib.js`).

---

## Functionality

* Collects DNA sequence data incrementally
* Matches patterns at all valid positions
* Supports **ambiguous nucleotide symbols** (e.g. `R`, `Y`, `N`)
* Reports each match position
* Outputs a frequency table per pattern
* Resets correctly between test cases

---

## Approach

* Event-driven architecture using `testlib` callbacks
* Recursive pattern scanning across the sequence
* Character-level matching using an IUPAC nucleotide mapping
* Bounds checking to prevent invalid substring access

---

## Supported Symbols

Supports standard DNA bases (`A, C, G, T`) and ambiguous IUPAC symbols (e.g. `R, Y, K, M, S, W, B, D, H, V, N`).

---

## Running the Program

```bash
node yourScriptName.js
```

Test configuration is selected via:

```js
testlib.setup(2); // or testlib.setup(3)
```

---

## Module Details

* **Module:** SCC212 – JavaScript
* **Language:** JavaScript (Node.js)
* **Assessment:** Coursework

---

