export const getCategoryColor = (category: string) => {
  switch (category.toLowerCase()) {
    case "hero":
      return "bg-blue-500";
    case "villain":
      return "bg-red-500";
    case "antihero":
      return "bg-purple-500";
    default:
      return "bg-gray-500";
  }
};
