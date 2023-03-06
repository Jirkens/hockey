import { IMetricsRecord, OrderType } from "../types";

export const sortArray = <T,>(array: T[], order: OrderType | undefined, orderBy: keyof T | undefined) => {
  if (!orderBy || !order) {
    return array;
  }

  return [...array].sort((a, b) => {
    const result = b[orderBy] < a[orderBy] ? -1 : 1;
    return order === OrderType.descending ? result : -result;
  });
};

export const transformMetrics = (metrics: IMetricsRecord): string[] => {
  const array: string[] = [];

  Object.entries(metrics).forEach(([key, value]) => {
    if (value.isChecked === true) {
      array.push(key);
    }
  });

  return array;
};
