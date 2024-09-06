const statuses = ["Good", "Warning", "Alarm"];

export type TSoldier = {
  id: number;
  name: string;
  status: string;
  bpm: number[];
  ecg: number[];
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
    bpm: Array.from({ length: 10 }, () => Math.floor(Math.random() * 40) + 100), // Generate BPMs between 60-140
    ecg: Array.from(
      { length: 100 },
      (_, i) => Math.sin(i * 0.1) * 10 + (Math.random() * 2 - 1)
    ), // ECG waveform simulation
  }));

  return soldiers;
};
