enum Direction {
    Up,
    Down,
    Left,
    Right
}

function move(direction: Direction): string {
    switch (direction) {
        case Direction.Up:
        case Direction.Down:
            return "Vertical movement!";
        case Direction.Left:
        case Direction.Right:
            return "Horizontal movement!";
    }
}

console.info(move(Direction.Up)); // Output: Vertical movement!