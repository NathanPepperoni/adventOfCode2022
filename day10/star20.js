import loadPuzzleInput from "../utils/loadPuzzleInput.js";

class CPU {
    constructor() {
        this.cycle = 0;
        this.xReg = 1;
        this.signalSum = 0;
    }

    noop() {
        this.render();
        this.cycle += 1;
    }

    addX(value) {
        for (let i = 0; i < 1; i++) {
            this.render();
            this.cycle++;
        }
        this.render();
        this.cycle++;
        this.xReg += value;
    }

    getX() {
        return this.xReg;
    }

    render() {
        if (this.cycle % 40 === 0) {
            process.stdout.write("\n");
        }
        const pixelLocation = this.cycle % 40;
        const isSpriteVisible = [pixelLocation - 1, pixelLocation, pixelLocation + 1].includes(this.xReg);
        const pixel = isSpriteVisible ? "X" : ".";
        process.stdout.write(pixel);
    }
}

function star20() {
    const input = loadPuzzleInput(10);

    const cpu = new CPU();
    input.forEach((instruction) => {
        const keyword = instruction.split(" ")[0];
        const value = Number.parseInt(instruction.split(" ")[1]);
        if (keyword === "noop") {
            cpu.noop();
        }
        if (keyword === "addx") {
            cpu.addX(value);
        }
    });
}

export default star20;
