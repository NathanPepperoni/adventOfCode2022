import loadPuzzleInput from "../utils/loadPuzzleInput.js";

function copyObject(object) {
    return JSON.parse(JSON.stringify(object));
}

function parseInput(input) {
    const blueprints = [];

    input
        .filter((l) => l.length > 0)
        .forEach((line) => {
            const parsedLine = line
                .split("robot")
                .slice(1)
                .map((elem) => {
                    const split = elem.split(" ").map((chunk) => Number.parseInt(chunk));
                    return split.filter((chunk) => !Number.isNaN(chunk));
                });

            const blueprint = {
                ore: {
                    ore: parsedLine[0][0],
                },
                clay: {
                    ore: parsedLine[1][0],
                },
                obsidian: {
                    ore: parsedLine[2][0],
                    clay: parsedLine[2][1],
                },
                geode: {
                    ore: parsedLine[3][0],
                    obsidian: parsedLine[3][1],
                },
            };

            blueprints.push(blueprint);
        });

    return blueprints;
}

class Simulator {
    constructor(blueprint) {
        this.blueprint = blueprint;
        this.branches = [
            {
                resources: {
                    geode: 0,
                    obsidian: 0,
                    clay: 0,
                    ore: 0,
                },

                robots: {
                    geode: 0,
                    obsidian: 0,
                    clay: 0,
                    ore: 1,
                },
            },
        ];
    }

    generateResources(branch) {
        branch.resources.geode += branch.robots.geode;
        branch.resources.obsidian += branch.robots.obsidian;
        branch.resources.clay += branch.robots.clay;
        branch.resources.ore += branch.robots.ore;
    }

    canAfford(cost, branch) {
        let canAfford = true;
        Object.keys(cost).forEach((resource) => {
            canAfford = canAfford && branch.resources[resource] >= cost[resource];
        });

        return canAfford;
    }

    spendResources(cost, branch) {
        Object.keys(cost).forEach((resource) => {
            branch.resources[resource] -= cost[resource];
        });
    }

    buildRobot(type, branch) {
        const cost = this.blueprint[type];
        if (this.canAfford(cost, branch)) {
            this.spendResources(cost, branch);
            branch.robots[type]++;
            return true;
        } else {
            console.log("this shouldnt happen");
        }
        return false;
    }

    possibleBranches(branch) {
        const types = ["ore", "clay", "obsidian", "geode"];

        return types.filter((type) => this.canAfford(this.blueprint[type], branch));
    }

    incrementBranches() {
        const newBranches = [];
        this.branches.forEach((branch) => {
            const doNothing = copyObject(branch);
            newBranches.push(doNothing);
            this.possibleBranches(branch).forEach((type) => {
                const newBranch = copyObject(branch);
                this.buildRobot(type, newBranch);
                newBranches.push(newBranch);
            });
        });

        newBranches.forEach((branch) => this.generateResources(branch));

        this.branches = newBranches;
    }

    simulate(minutes) {
        let time = 0;
        const obsidianCutoff = 23 - this.blueprint["geode"]["obsidian"];
        const clayCutoff = obsidianCutoff - this.blueprint["obsidian"]["clay"];
        while (time < minutes) {
            if (time > obsidianCutoff) {
                this.branches = this.branches.filter((branch) => branch.robots.obsidian > 0);
            }
            if (time > clayCutoff) {
                this.branches = this.branches.filter((branch) => branch.robots.clay > 0);
            }
            if (time >= 16) {
                this.branches = this.branches.filter((branch) => branch.robots.geode > 0);
            }
            if (time >= 18) {
                this.branches.sort((a, b) => a.resources.geode + a.robots.geode - (b.resources.geode + b.robots.geode));
                this.branches = this.branches.slice(0, Math.floor(this.branches.length * 0.5));
            }
            this.incrementBranches();
            console.log(time);
            time++;
        }

        let mostGeodes = 0;
        this.branches.forEach((branch) => {
            mostGeodes = Math.max(branch.resources.geode, mostGeodes);
        });

        return mostGeodes;
    }
}

function star37() {
    const input = loadPuzzleInput(19);
    const blueprints = parseInput(input);
    blueprints.forEach((blueprint) => {
        const sim = new Simulator(blueprint);
        console.log(sim.simulate(24));
    });
}

export default star37;
