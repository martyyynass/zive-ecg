const statuses = ["Good", "Warning", "Alarm"];

export type TSoldier = {
  id: number;
  name: string;
  status: string;
};

export const generateSoldierData = () => {
  const names = [
    "John Doe",
    "Jane Smith",
    "Mike Johnson",
    "Sarah Connor",
    "Kyle Reese",
  ];

  const soldiers: TSoldier[] = names.map((name, index) => ({
    id: index,
    name,
    status: statuses[Math.floor(Math.random() * statuses.length)],
  }));

  return soldiers;
};
