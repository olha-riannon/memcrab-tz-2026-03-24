# Matrix App

An interactive matrix application built with React and TypeScript.
The app allows users to generate a matrix, manipulate its data, and visualize relationships between values through dynamic interactions.

---

## Features

### Matrix Generation

- Generate a matrix with a custom number of rows (M) and columns (N)
- Each cell is filled with a random value
- Input validation is applied (range: 0–100)

---

### Cell Interactions

- Clicking on a cell increases its value by 1
- All dependent calculations update automatically

---

### Row Sum

- Each row includes a "Sum" column
- Values are recalculated dynamically after any change

---

### Column Percentile

- An additional row displays the 60th percentile for each column
- Uses interpolation (similar to spreadsheet behavior)
- Values are rounded to one decimal place

---

### Nearest Values Highlight

- Hovering over a cell highlights X closest values in the matrix
- X is configurable by the user
- Distance is calculated using absolute difference

---

### Row Percentage Mode and Heatmap

- Hovering over a row's "Sum" cell:
  - Replaces cell values with percentages of the row total
  - Displays a heatmap based on each value relative to the maximum in the row

- The heatmap uses a blue-green gradient for visual clarity

---

### Row Management

- Ability to add new rows dynamically
- Ability to remove any row
- Table updates automatically after changes

---

### Validation and Error Handling

- Prevents generating a matrix with zero rows or columns
- Displays clear error messages
- Inputs support flexible editing

---

## Tech Stack

- React
- TypeScript
- Vite
- CSS

---

## Installation

```bash
npm install
npm run dev
```

---

## Architecture Notes

- The matrix is the single source of truth
- All derived values (sum, percentiles) are calculated dynamically
- Logic is separated into reusable utility functions:
  - generateRow
  - generateMatrix

- Inputs are controlled components with internal state synchronization

---

## Key Implementation Details

- Percentile is calculated using interpolation:

  ```
  rank = percentile * (n - 1)
  ```

- State updates are immutable
- Each cell has a unique identifier for stable rendering

---

## Possible Improvements

- Persist data using localStorage
- Add animations for better UX
- Support column addition/removal
- Improve accessibility (keyboard navigation)

---

## Author

Built as part of a technical assignment.
