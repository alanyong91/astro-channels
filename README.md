# Astro Channels

- CRA with typescript
- SASS for CSS preprocessor

[Demo Link](https://60f2bcb4f706dbe3871b6a71--adoring-brown-27be6b.netlify.app/)

## Installation/Setup

*No environment file require in this project.*

1. Install dependencies

    ```bash
    npm ci
    ```

1. Run locally

    ```bash
    npm run start
    ```

## Feautures

### Level 1

- able to sort by **channel number** and **channel name** ascending or descending
- able to search by **channel number** and **channel name**
- all pages are responsive
- install `react-virtualized` package for large list render optimization

### Level 2

- responsive detail page
- generate param ID with channel's **title** and **id**
- install `react-helmet-async` for title and meta information
- display channel with schedule date
- filter past schedule

### Level 3

- able to filter by category, language and resolution

### Level 4

- public users able to bookmark channel and remove channel from bookmark
- bookmark data will save in local storage
