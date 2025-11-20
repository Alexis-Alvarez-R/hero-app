export const getUniverseColor = (universe: string) => {
  switch (universe.toLowerCase()) {
    case "dc":
      return "bg-white text-blue-500";
    case "marvel":
      return "bg-white text-red-500";
    default:
      return "bg-gray-500";
  }
};
