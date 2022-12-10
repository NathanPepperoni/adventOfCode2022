import loadPuzzleInput from "../utils/loadPuzzleInput.js";

class CPU {
    constructor() {
        this.cycle = 1;
        this.xReg = 1;
        this.signalSum = 0;
    }

    noop() {
        this.cycle += 1;
        this.outputSignal();
    }

    addX(value) {
        for (let i = 0; i < 1; i++) {
            this.cycle++;
            this.outputSignal();
        }
        this.cycle++;
        this.xReg += value;
        this.outputSignal();
    }

    getX() {
        return this.xReg;
    }

    outputSignal() {
        if (this.cycle === 20 || (this.cycle - 20) % 40 === 0) {
            this.signalSum += this.cycle * this.xReg;
        }
    }

    getSignalSum() {
        return this.signalSum;
    }
}

function star19() {
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

    return cpu.getSignalSum();
}

export default star19;
