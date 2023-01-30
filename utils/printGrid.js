function printGrid(grid) {
    console.clear();
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[0].length; j++) {
            process.stdout.write(grid[i][j]);
        }
        process.stdout.write("\n");
    }
}

export default printGrid;
