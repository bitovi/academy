type Person = {
  role: "developer";
  email?: string;
  id: number;
  firstName: string;
  lastName: string;
  team: "React" | "Angular" | "backend";
};

export type UpdateablePerson = Person; 

export type FullyDefinedPerson = Person;

export type NonEditablePerson = Person; 