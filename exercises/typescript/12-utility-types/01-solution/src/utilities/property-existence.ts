type Person = {
  role: "developer";
  email?: string;
  id: number;
  firstName: string;
  lastName: string;
  team: "React" | "Angular" | "backend";
};

export type UpdateablePerson = Partial<Person>;

export type FullyDefinedPerson = Required<Person>;

export type NonEditablePerson = Readonly<Person>;