export const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "active":
      return "bg-green-500";
    case "deceased":
      return "bg-red-500";
    case "retired":
      return "bg-blue-500";
    default:
      return "bg-gray-500";
  }
};
