# Code Challenge Solutions

This repository contains solutions for three coding problems, demonstrating proficiency in **JavaScript**, **React**, and **frontend development**. Each solution focuses on correctness, efficiency, and maintainability.

---

## **Problem 1: Three Ways to Sum to `n`**

Implemented three unique approaches to calculate the summation from `1` to `n`:

1. **Iterative Approach**
   - Uses a simple loop to sum numbers.
   - Handles both positive and negative `n`.

2. **Recursive Approach**
   - Uses recursion to calculate the sum.
   - Illustrates the divide-and-conquer methodology.

3. **Mathematical Formula**
   - Uses the formula `sum = n * (n + 1) / 2` (or adapted for negative numbers).
   - Most efficient and scalable solution with constant time complexity.

**Key Points:**
- Handles negative numbers gracefully.
- Recursive approach demonstrates algorithmic thinking.
- Formula approach is highly efficient and maintainable.

---

## **Problem 2: Fancy Form (Currency Swap)**

A **currency swap form** implemented with **React**, **Vite**, **TailwindCSS**, and **shadcn UI components**:

**Features:**
- Dynamic token selection using a dropdown with token icons (SVG/PNG).
- Fetches real-time token prices from a public API.
- Validates input: ensures positive amounts and distinct "from" and "to" tokens.
- Handles missing or broken token icons with fallbacks.
- Computes conversion between currencies using USD as intermediate.
- Fully responsive and visually appealing with TailwindCSS styling.

**Implementation Highlights:**
- Reusable `TokenSelect` component for dropdowns.
- `useMemo` for fast token lookups.
- Error messages for invalid input.
- Safelist added in Tailwind config to ensure dynamic classes like padding/margin are not purged.
- Conditional rendering and improved UX with disabled buttons for invalid input.

---

## **Problem 3: Messy React (Wallet Page Component)**

Analyzed the **WalletPage React component**, which displays a list of wallet balances, and identified several inefficiencies:

**Issues Identified:**

1. **Redundant Computation in `sortedBalances`**
   - `getPriority` is called multiple times per item during filtering and sorting.
   - The filter logic had redundant or incorrect checks.

2. **Inefficient Mapping**
   - `formattedBalances` was computed separately but not fully utilized.
   - Each row recalculated values like `usdValue` repeatedly.

3. **Poor Type Safety**
   - `blockchain` parameter typed as `any`.
   - `balances` and `prices` were loosely typed.

4. **UI Rendering**
   - Rows were directly generated inside the component, reducing readability.
   - No memoization for rows led to unnecessary re-renders.

5. **Styling**
   - Inconsistent class usage, could benefit from Tailwind for responsive and consistent design.

---

**Refactor Highlights:**

- **Memoization & Single Computation**
  - Combined sorting, filtering, formatting, and USD calculation in one `useMemo`.
  - Reduces repeated computation and improves performance.

- **Reusable Components**
  - `WalletRow` remains reusable, rows array is memoized.

- **Improved Filtering & Sorting**
  - Corrected `getPriority` usage.
  - Handles negative or zero balances correctly.

- **Type Safety**
  - Proper interfaces for balances, formatted balances, and prices.

- **Cleaner Rendering**
  - Computed rows rendered directly.
  - Improved readability and maintainability.

- **Scalability**
  - Ready for future features like sorting, grouping, or filtering by blockchain.

**Outcome:**
- Cleaner, more maintainable WalletPage code.
- Improved performance for larger wallet lists.
- Correct handling of zero/negative balances and blockchain priority.
- Easier to extend or refactor in the future.

---

## **Tech Stack & Tools Used**

- **Frontend:** React, TypeScript, Vite, TailwindCSS, shadcn UI
- **Languages:** JavaScript, TypeScript
- **Tools:** npm, PostCSS, Vite
- **APIs:** Switcheo token prices, token icons repository

---

## **Usage**

1. Clone the repository:

```bash
git clone <repo-url>
cd <repo-folder>
