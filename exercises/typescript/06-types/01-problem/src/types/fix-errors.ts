let isLoading: boolean;
isLoading = true;
isLoading = "false";

let inventory: Array<number> = [];

inventory.push("tacos", "hamburgers");

function greet(name: string, age: number): string {
  return `${name} is ${age} years young.`;
}

export const jessica = greet(30, "Jessica");

export const tom = greet("Tom", 42, "software");

export { isLoading, inventory };
