import loadPuzzleInput from "../utils/loadPuzzleInput.js";

const monkeys = [];

class Monkey {
    constructor(monkeyConfig) {
        this.timesInspected = 0;
        this.items = monkeyConfig.startingItems;
        this.operation = monkeyConfig.operation;
        this.test = monkeyConfig.test;
        this.trueTarget = monkeyConfig.trueTarget;
        this.falseTarget = monkeyConfig.falseTarget;
    }

    receiveItem(item) {
        this.items.push(item);
    }

    throwItem() {
        const item = Math.floor(this.operation(this.items[0]) / 3);
        this.items = this.items.slice(1);
        this.timesInspected++;
        const target = this.test(item) ? this.trueTarget : this.falseTarget;
        monkeys[target].receiveItem(item);
    }

    heldItems() {
        return this.items;
    }

    getTimesInspected() {
        return this.timesInspected;
    }
}

function processMonkey(monkeyInput) {
    let parseMonkeyInput = monkeyInput
        .replace("  Starting items: ", "")
        .replace("  Operation: new = ", "")
        .replace("  Test: divisible by ", "")
        .replace("    If true: throw to monkey ", "")
        .replace("    If false: throw to monkey ", "")
        .split("\n");

    const startingItems = JSON.parse("[" + parseMonkeyInput[1] + "]");
    const operation = (old) => {
        return eval(parseMonkeyInput[2]);
    };

    return {
        startingItems: startingItems,
        operation: operation,
        test: (worryLevel) => {
            return worryLevel % Number.parseInt(parseMonkeyInput[3]) === 0;
        },
        trueTarget: Number.parseInt(parseMonkeyInput[4]),
        falseTarget: Number.parseInt(parseMonkeyInput[5]),
    };
}

function processRound() {
    monkeys.forEach((monkey) => {
        while (monkey.heldItems().length > 0) {
            monkey.throwItem();
        }
    });
}

function star21() {
    const input = loadPuzzleInput(11, "\n\n");

    input.forEach((monkeyInput) => {
        monkeys.push(new Monkey(processMonkey(monkeyInput)));
    });

    for (let i = 0; i < 20; i++) {
        processRound();
    }

    const monkeyActivity = monkeys.map((monkey) => monkey.getTimesInspected());

    const monkeyBusiness = monkeyActivity
        .sort((a, b) => b - a)
        .slice(0, 2)
        .reduce((acc, cur) => acc * cur, 1);

    return monkeyBusiness;
}

export default star21;
